import { Body, Container, Font, Head, Heading, Html, Img, Link, Preview, Row, Section, Text } from "react-email";

type ContactProps = {
	// Absolute URL of the logo shown at the top of the email.
	logoURL: string;
	// The visitor who filled in the form.
	senderName: string;
	// You, the site owner.
	recipientName: string;
	// The visitor's message.
	message: string;
	// Link to the site, shown at the bottom.
	appURL: string;
	appName: string;
};

// Email template for the notification you receive when someone uses the contact form.
// Styles are inline because many email apps ignore stylesheets.
const Contact = ({ logoURL, senderName, recipientName, message, appURL, appName }: ContactProps) => {
	return (
		<Html>
			<Head>
				{/* Roboto from Google Fonts, falling back to Helvetica in email apps that block web fonts. */}
				<Font fallbackFontFamily="Helvetica" fontFamily="Roboto" fontStyle="normal" fontWeight={400} webFont={{ format: "woff2", url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2" }} />
			</Head>
			{/* Preview text shown next to the subject in the inbox list. */}
			<Preview>{`You got a new message from ${senderName}`}</Preview>
			<Body style={{ color: "#3F3F46", fontFamily: "Roboto" }}>
				<Img alt="logo" height={32} src={logoURL} style={{ margin: "20px auto" }} width={144} />
				{/* Main card. */}
				<Container style={{ background: "#F6FAFF", borderRadius: "20px", padding: "24px" }}>
					<Heading as="h2" style={{ textAlign: "center" }}>{`Message from ${senderName}`}</Heading>
					{/* Greeting. */}
					<Section>
						<Row>
							<Text style={{ fontSize: "16px", fontWeight: 500 }}>{`Dear ${recipientName},`}</Text>
							<Text style={{ fontSize: "16px" }}>{`You got a new message from ${senderName}:`}</Text>
						</Row>
					</Section>
					{/* The message itself, in a white quote box with an amber left border. */}
					<Section>
						<Row>
							<Text style={{ backgroundColor: "#FFFFFF", borderLeft: "4px solid #F5A524", borderRadius: "5px", padding: "10px" }}>{message}</Text>
						</Row>
					</Section>
					{/* Sign-off. */}
					<Section>
						<Row>
							<Text>{`Best regards,`}</Text>
							<Text style={{ fontSize: "20px", fontWeight: 500 }}>{senderName}</Text>
						</Row>
					</Section>
				</Container>
				{/* Link back to the site below the card. */}
				<Container>
					<Link href={appURL} style={{ color: "#3F3F46", display: "block", margin: "20px auto", textAlign: "center" }}>
						{appName}
					</Link>
				</Container>
			</Body>
		</Html>
	);
};

export default Contact;
