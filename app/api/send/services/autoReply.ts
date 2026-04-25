import { Reply } from "@emails";
import { render } from "react-email";
import { type Resend } from "resend";
import { about, APP_NAME } from "@data";

const autoReply = async (resend: Resend, url: string, name: string, email: string) => {
	return resend.emails.send({
		from: `${about.name} <${process.env.CONTACT_EMAIL_ADDRESS}>`,
		to: [email],
		subject: `Message from ${about.name}`,
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
		replyTo: process.env.PERSONAL_EMAIL_ADDRESS as string,
	});
};

export default autoReply;
