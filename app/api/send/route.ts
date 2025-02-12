import { Resend } from "resend";
import { list } from "@vercel/blob";
import { Contact, Reply } from "@emails";
import { APP_NAME, firstName } from "@data";
import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
	try {
		const { name, email, message } = (await request.json()) as { name: string; email: string; message: string };

		if (!name || !email || !message) {
			const response = NextResponse.json({ message: "Invalid request!" }, { status: 400 });
			return response;
		}
		const path = process.env.BLOB_PATH as string;
		const data = await list({ limit: 1, prefix: `${path}/logo` });
		const url = data?.blobs?.at(0)?.url as string;

		const promises = [sendMessage(url, name, email, message), autoReply(url, name, email)];
		await Promise.all(promises);

		const response = NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
		return response;
	} catch (error: unknown) {
		console.error((error as Error)?.message);
		const response = NextResponse.json({ message: "Internal server error!" }, { status: 500 });
		return response;
	}
}

async function sendMessage(url: string, name: string, email: string, message: string) {
	const htmlTemplate = await render(
		Contact({
			logoURL: url,
			senderName: name,
			recipientName: firstName,
			message,
			appURL: process.env.NEXT_PUBLIC_URL as string,
			appName: APP_NAME,
		}),
		{ pretty: true }
	);

	const textTemplate = await render(
		Contact({
			logoURL: url,
			senderName: name,
			recipientName: firstName,
			message,
			appURL: process.env.NEXT_PUBLIC_URL as string,
			appName: APP_NAME,
		}),
		{ plainText: true }
	);

	return resend.emails.send({
		from: `${firstName} <${process.env.CONTACT_EMAIL_ADDRESS}>`,
		to: [process.env.PERSONAL_EMAIL_ADDRESS as string],
		subject: `Message from ${name}`,
		html: htmlTemplate,
		text: textTemplate,
		replyTo: email,
	});
}

async function autoReply(url: string, name: string, email: string) {
	const htmlTemplate = await render(
		Reply({
			logoURL: url,
			senderName: firstName,
			recipientName: name,
			appURL: process.env.NEXT_PUBLIC_URL as string,
			appName: APP_NAME,
		}),
		{ pretty: true }
	);

	const textTemplate = await render(
		Reply({
			logoURL: url,
			senderName: firstName,
			recipientName: name,
			appURL: process.env.NEXT_PUBLIC_URL as string,
			appName: APP_NAME,
		}),
		{ plainText: true }
	);

	return resend.emails.send({
		from: `${firstName} <${process.env.CONTACT_EMAIL_ADDRESS}>`,
		to: [email],
		subject: `Message from ${firstName}`,
		html: htmlTemplate,
		text: textTemplate,
		replyTo: process.env.PERSONAL_EMAIL_ADDRESS as string,
	});
}
