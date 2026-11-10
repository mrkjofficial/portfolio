import { Reply } from "@emails";
import { render } from "react-email";
import { type Resend } from "resend";
import { about, APP_NAME } from "@data";

// Sends the visitor a "thank you, I'll get back to you" email.
// resend: the Resend client. url: the logo URL. name and email: the visitor's details.
const autoReply = async (resend: Resend, url: string, name: string, email: string) => {
	return resend.emails.send({
		from: `${about.name} <${process.env.CONTACT_EMAIL_ADDRESS}>`,
		to: [email],
		subject: `Message from ${about.name}`,
		// HTML version, for email apps that show formatting.
		html: await render(
			Reply({
				logoURL: url,
				senderName: about.name,
				recipientName: name,
				appURL: process.env.NEXT_PUBLIC_URL as string,
				appName: APP_NAME,
			}),
			{ pretty: true }
		),
		// Plain-text version of the same email, for text-only email apps and better spam scores.
		text: await render(
			Reply({
				logoURL: url,
				senderName: about.name,
				recipientName: name,
				appURL: process.env.NEXT_PUBLIC_URL as string,
				appName: APP_NAME,
			}),
			{ plainText: true }
		),
		// If the visitor replies, the reply goes to your personal inbox.
		replyTo: process.env.PERSONAL_EMAIL_ADDRESS as string,
	});
};

export default autoReply;
