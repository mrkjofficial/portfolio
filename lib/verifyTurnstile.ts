import { type TurnstileServerValidationResponse } from "@marsidev/react-turnstile";

// Cloudflare's endpoint for checking whether a Turnstile token is genuine.
const turnstileSiteVerifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
// Cloudflare's documented maximum token length; anything longer is rejected without asking Cloudflare.
const turnstileMaxTokenLength = 2048;
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY as string;

// The three possible results of a verification, told apart by "status".

// Cloudflare confirmed the visitor passed the challenge.
type TurnstileValidOutput = {
	status: "VALID";
};

// The token is missing, malformed, expired, already used, or rejected by Cloudflare.
type TurnstileInvalidOutput = {
	status: "INVALID";
};

// Verification couldn't run: no secret key is set, or Cloudflare couldn't be reached.
type TurnstileUnavailableOutput = {
	status: "UNAVAILABLE";
};

export type TurnstileOutput = TurnstileValidOutput | TurnstileInvalidOutput | TurnstileUnavailableOutput;

// Checks a Turnstile token sent by the contact form with Cloudflare.
// token is typed unknown because it comes straight from the request body and may be missing or not a string.
// It never throws; errors come back as UNAVAILABLE so the caller decides what to do.
const verifyTurnstile = async (token: unknown, clientIp: string): Promise<TurnstileOutput> => {
	// Checked first, so a request without a valid-looking token always gets INVALID (403), even if the secret is missing.
	if (typeof token !== "string" || token.length === 0 || token.length > turnstileMaxTokenLength) {
		return { status: "INVALID" };
	}

	if (!turnstileSecretKey) {
		console.error("TURNSTILE_SECRET_KEY is not set!");
		return { status: "UNAVAILABLE" };
	}

	try {
		const response = await fetch(turnstileSiteVerifyUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			// remoteip is optional; it gives Cloudflare the visitor's IP as an extra signal.
			body: JSON.stringify({ secret: turnstileSecretKey, response: token, remoteip: clientIp }),
			// Give up after 5 seconds, so a slow Cloudflare can't hang the request.
			signal: AbortSignal.timeout(5000),
		});

		// An HTTP error means Cloudflare had a problem, not that the token is bad.
		if (!response.ok) {
			console.error(`Turnstile siteverify returned HTTP ${response.status}!`);
			return { status: "UNAVAILABLE" };
		}

		const outcome = (await response.json()) as TurnstileServerValidationResponse;
		return outcome.success ? { status: "VALID" } : { status: "INVALID" };
	} catch (error: unknown) {
		// Network failure or timeout.
		console.error((error as Error)?.message);
		return { status: "UNAVAILABLE" };
	}
};

export default verifyTurnstile;
