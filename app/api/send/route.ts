import { Resend } from "resend";
import { ContactSchema } from "@schemas/contact";
import checkRateLimit from "@lib/checkRateLimit";
import { autoReply, sendMessage } from "./services";
import { NextRequest, NextResponse } from "next/server";

const publicUrl = process.env.NEXT_PUBLIC_URL as string;
const resendApiKey = process.env.RESEND_API_KEY as string;

export async function POST(request: NextRequest) {
	try {
		const rateLimit = await checkRateLimit(request);

		if (rateLimit.status === "LIMITED") {
			const response = NextResponse.json({ message: "Too many requests!" }, { status: 429 });
			response.headers.set("X-RateLimit-Limit", rateLimit.limit.toString());
			response.headers.set("X-RateLimit-Remaining", rateLimit.remaining.toString());
			response.headers.set("X-RateLimit-Reset", rateLimit.reset.toString());
			return response;
		}

		const { name, email, message } = (await request.json()) as { name: string; email: string; message: string };

		if (!name || !email || !message) {
			const response = NextResponse.json({ message: "Invalid request!" }, { status: 400 });
			return response;
		}

		const result = ContactSchema.safeParse({ name, email, message });

		if (!result.success) {
			const response = NextResponse.json({ message: "Invalid request!" }, { status: 400 });
			return response;
		}

		if (rateLimit.status === "UNAVAILABLE") {
			const response = NextResponse.json({ message: "Service temporarily unavailable!" }, { status: 503 });
			return response;
		}

		const logoUrl = `${publicUrl}/logo.png`;
		const resend = new Resend(resendApiKey);
		const contact = result.data;

		const promises = [sendMessage(resend, logoUrl, contact.name, contact.email, contact.message), autoReply(resend, logoUrl, contact.name, contact.email)];
		await Promise.all(promises);

		const response = NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
		return response;
	} catch (error: unknown) {
		console.error((error as Error)?.message);
		const response = NextResponse.json({ message: "Internal server error!" }, { status: 500 });
		return response;
	}
}
