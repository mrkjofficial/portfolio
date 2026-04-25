import { Contact } from "@emails";
import { render } from "react-email";
import { type Resend } from "resend";
import { about, APP_NAME } from "@data";

const sendMessage = async (resend: Resend, url: string, name: string, email: string, message: string) => {
	return resend.emails.send({
		from: `${about.name} <${process.env.CONTACT_EMAIL_ADDRESS}>`,
		to: [process.env.PERSONAL_EMAIL_ADDRESS as string],
		subject: `Message from ${name}`,
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
		replyTo: email,
	});
};

export default sendMessage;
