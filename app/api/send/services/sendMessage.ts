import { Contact } from "@emails";
import { render } from "react-email";
import { type Resend } from "resend";
import { about, APP_NAME } from "@data";

// Emails you the visitor's message from the contact form.
// resend: the Resend client. url: the logo URL. name, email and message: what the visitor submitted.
const sendMessage = async (resend: Resend, url: string, name: string, email: string, message: string) => {
	return resend.emails.send({
		from: `${about.name} <${process.env.CONTACT_EMAIL_ADDRESS}>`,
		to: [process.env.PERSONAL_EMAIL_ADDRESS as string],
		subject: `Message from ${name}`,
		// HTML version, for email apps that show formatting.
		html: await render(
			Contact({
				logoURL: url,
				senderName: name,
				recipientName: about.name,
				message,
				appURL: process.env.NEXT_PUBLIC_URL as string,
				appName: APP_NAME,
			}),
			{ pretty: true }
		),
		// Plain-text version of the same email, for text-only email apps and better spam scores.
		text: await render(
			Contact({
				logoURL: url,
				senderName: name,
				recipientName: about.name,
				message,
				appURL: process.env.NEXT_PUBLIC_URL as string,
				appName: APP_NAME,
			}),
			{ plainText: true }
		),
		// Hitting "Reply" in your inbox answers the visitor directly.
		replyTo: email,
	});
};

export default sendMessage;
