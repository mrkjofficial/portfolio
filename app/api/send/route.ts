import { Resend } from "resend";
import { ContactSchema } from "@schemas/contact";
import { autoReply, sendMessage } from "./services";
import { NextRequest, NextResponse } from "next/server";

const publicUrl = process.env.NEXT_PUBLIC_URL as string;
const resendApiKey = process.env.RESEND_API_KEY as string;

export async function POST(request: NextRequest) {
	try {
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

		const logoUrl = `${publicUrl}/logo.png`;
		const resend = new Resend(resendApiKey);

		const promises = [sendMessage(resend, logoUrl, name, email, message), autoReply(resend, logoUrl, name, email)];
		await Promise.all(promises);

		const response = NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
		return response;
	} catch (error: unknown) {
		console.error((error as Error)?.message);
		const response = NextResponse.json({ message: "Internal server error!" }, { status: 500 });
		return response;
	}
}
