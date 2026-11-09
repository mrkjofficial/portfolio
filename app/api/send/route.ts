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

export async function POST(request: NextRequest) {
	try {
		const clientIp = getClientIp(request);
		const rateLimit = await checkRateLimit(ipRateLimit, clientIp);

		if (rateLimit.status === "LIMITED") {
			const response = NextResponse.json({ message: "Too many requests!" }, { status: 429 });
			response.headers.set("X-RateLimit-Limit", rateLimit.limit.toString());
			response.headers.set("X-RateLimit-Remaining", rateLimit.remaining.toString());
			response.headers.set("X-RateLimit-Reset", rateLimit.reset.toString());
			return response;
		}

		const { name, email, message, token } = (await request.json()) as { name: string; email: string; message: string; token: unknown };

		if (!name || !email || !message) {
			const response = NextResponse.json({ message: "Invalid request!" }, { status: 400 });
			return response;
		}

		const result = ContactSchema.safeParse({ name, email, message });

		if (!result.success) {
			const response = NextResponse.json({ message: "Invalid request!" }, { status: 400 });
			return response;
		}

		const turnstile = await verifyTurnstile(token, clientIp);

		if (turnstile.status === "INVALID") {
			const response = NextResponse.json({ message: "Verification failed! Please try again." }, { status: 403 });
			return response;
		}

		if (turnstile.status === "UNAVAILABLE" || rateLimit.status === "UNAVAILABLE") {
			const response = NextResponse.json({ message: "Service temporarily unavailable!" }, { status: 503 });
			return response;
		}

		const dailyLimit = await checkRateLimit(dailyRateLimit, "global");

		if (dailyLimit.status === "LIMITED") {
			const response = NextResponse.json({ message: "Daily limit reached. Please try again tomorrow!" }, { status: 429 });
			return response;
		}

		if (dailyLimit.status === "UNAVAILABLE") {
			const response = NextResponse.json({ message: "Service temporarily unavailable!" }, { status: 503 });
			return response;
		}

		const logoUrl = `${publicUrl}/logo.png`;
		const resend = new Resend(resendApiKey);
		const contact = result.data;

		// You always receive the message; the visitor gets at most one auto-reply per address per 24 hours.
		const autoReplyLimit = await checkRateLimit(autoReplyRateLimit, hashEmail(contact.email));

		const promises = [sendMessage(resend, logoUrl, contact.name, contact.email, contact.message)];

		if (autoReplyLimit.status === "ALLOWED") {
			promises.push(autoReply(resend, logoUrl, contact.name, contact.email));
		}

		await Promise.all(promises);

		const response = NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
		return response;
	} catch (error: unknown) {
		console.error((error as Error)?.message);
		const response = NextResponse.json({ message: "Internal server error!" }, { status: 500 });
		return response;
	}
}
