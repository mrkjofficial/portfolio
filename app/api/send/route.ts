import { Resend } from "resend";
import { createHash } from "node:crypto";
import getClientIp from "@lib/getClientIp";
import checkRateLimit from "@lib/checkRateLimit";
import { ContactSchema } from "@schemas/contact";
import verifyTurnstile from "@lib/verifyTurnstile";
import { autoReply, sendMessage } from "./services";
import { NextRequest, NextResponse } from "next/server";
import { autoReplyRateLimit, dailyRateLimit, ipRateLimit } from "@config/ratelimit";

const publicUrl = process.env.NEXT_PUBLIC_URL as string;
const resendApiKey = process.env.RESEND_API_KEY as string;

// Redis only ever stores a hash of the visitor's email address, never the address itself.
const hashEmail = (email: string) => createHash("sha256").update(email.toLowerCase()).digest("hex");

// POST /api/send: the contact form handler.
// Checks run cheapest-first, and every response body is JSON shaped { message },
// because the contact form shows that message in its toast.
export async function POST(request: NextRequest) {
	try {
		// 1. Per-IP rate limit: 5 requests per 10 minutes.
		const clientIp = getClientIp(request);
		const rateLimit = await checkRateLimit(ipRateLimit, clientIp);

		if (rateLimit.status === "LIMITED") {
			const response = NextResponse.json({ message: "Too many requests!" }, { status: 429 });
			response.headers.set("X-RateLimit-Limit", rateLimit.limit.toString());
			response.headers.set("X-RateLimit-Remaining", rateLimit.remaining.toString());
			response.headers.set("X-RateLimit-Reset", rateLimit.reset.toString());
			return response;
		}

		// 2. Read the body. token is unknown because the client may leave it out or send the wrong type.
		const { name, email, message, token } = (await request.json()) as { name: string; email: string; message: string; token: unknown };

		if (!name || !email || !message) {
			const response = NextResponse.json({ message: "Invalid request!" }, { status: 400 });
			return response;
		}

		// 3. Validate with the same schema the form uses, so the browser's checks can't be bypassed.
		const result = ContactSchema.safeParse({ name, email, message });

		if (!result.success) {
			const response = NextResponse.json({ message: "Invalid request!" }, { status: 400 });
			return response;
		}

		// 4. Confirm with Cloudflare that the visitor passed the Turnstile challenge.
		const turnstile = await verifyTurnstile(token, clientIp);

		if (turnstile.status === "INVALID") {
			const response = NextResponse.json({ message: "Verification failed! Please try again." }, { status: 403 });
			return response;
		}

		// 5. Fail closed: if Turnstile or Redis can't be checked, send nothing rather than risk abuse.
		if (turnstile.status === "UNAVAILABLE" || rateLimit.status === "UNAVAILABLE") {
			const response = NextResponse.json({ message: "Service temporarily unavailable!" }, { status: 503 });
			return response;
		}

		// 6. Global cap of 50 sends per day across all visitors, to protect the email quota.
		// Checked last, so rejected requests above don't use up the day's allowance.
		const dailyLimit = await checkRateLimit(dailyRateLimit, "global");

		if (dailyLimit.status === "LIMITED") {
			const response = NextResponse.json({ message: "Daily limit reached. Please try again tomorrow!" }, { status: 429 });
			return response;
		}

		if (dailyLimit.status === "UNAVAILABLE") {
			const response = NextResponse.json({ message: "Service temporarily unavailable!" }, { status: 503 });
			return response;
		}

		// 7. Send the emails, using the validated and trimmed values rather than the raw body.
		const logoUrl = `${publicUrl}/logo.png`;
		const resend = new Resend(resendApiKey);
		const contact = result.data;

		// You always receive the message; the visitor gets at most one auto-reply per address per 24 hours.
		const autoReplyLimit = await checkRateLimit(autoReplyRateLimit, hashEmail(contact.email));

		// Send both emails at the same time. Only ALLOWED sends the auto-reply; LIMITED and UNAVAILABLE both skip it.
		const [messageResult, autoReplyResult] = await Promise.all([sendMessage(resend, logoUrl, contact.name, contact.email, contact.message), autoReplyLimit.status === "ALLOWED" ? autoReply(resend, logoUrl, contact.name, contact.email) : null]);

		// Resend doesn't throw when sending fails (API error, network error, unverified domain, quota);
		// it returns { error }, so each result has to be checked.
		if (messageResult.error) {
			console.error(`Failed to send contact message: ${messageResult.error.message}`);
			const response = NextResponse.json({ message: "Failed to send message!" }, { status: 502 });
			return response;
		}

		// The message itself was delivered, so a failed auto-reply is only logged; the visitor still sees success.
		if (autoReplyResult?.error) {
			console.error(`Failed to send auto-reply: ${autoReplyResult.error.message}`);
			const response = NextResponse.json({ message: "Message sent but failed to send auto-reply!" }, { status: 200 });
			return response;
		}

		const response = NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
		return response;
	} catch (error: unknown) {
		// Anything unexpected, such as a body that isn't JSON or a missing Resend API key.
		console.error((error as Error)?.message);
		const response = NextResponse.json({ message: "Internal server error!" }, { status: 500 });
		return response;
	}
}
