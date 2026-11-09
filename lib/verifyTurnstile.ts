import { type TurnstileServerValidationResponse } from "@marsidev/react-turnstile";

const turnstileSiteVerifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const turnstileMaxTokenLength = 2048;
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY as string;

type TurnstileValidOutput = {
	status: "VALID";
};

type TurnstileInvalidOutput = {
	status: "INVALID";
};

type TurnstileUnavailableOutput = {
	status: "UNAVAILABLE";
};

export type TurnstileOutput = TurnstileValidOutput | TurnstileInvalidOutput | TurnstileUnavailableOutput;

const verifyTurnstile = async (token: unknown, clientIp: string): Promise<TurnstileOutput> => {
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
			body: JSON.stringify({ secret: turnstileSecretKey, response: token, remoteip: clientIp }),
			signal: AbortSignal.timeout(5000),
		});

		if (!response.ok) {
			console.error(`Turnstile siteverify returned HTTP ${response.status}!`);
			return { status: "UNAVAILABLE" };
		}

		const outcome = (await response.json()) as TurnstileServerValidationResponse;
		return outcome.success ? { status: "VALID" } : { status: "INVALID" };
	} catch (error: unknown) {
		console.error((error as Error)?.message);
		return { status: "UNAVAILABLE" };
	}
};

export default verifyTurnstile;
