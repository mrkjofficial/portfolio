import { Body, Container, Head, Heading, Html, Img, Link, Preview, Row, Section, Text } from "@react-email/components";

type ContactProps = {
	logoURL: string;
	senderName: string;
	recipientName: string;
	message: string;
	appURL: string;
	appName: string;
};

const Contact = ({ logoURL, senderName, recipientName, message, appURL, appName }: ContactProps) => {
	return (
		<Html>
			<Head />
			<Preview>{`You got a new message from ${senderName}`}</Preview>
			<Body style={{ color: "#3F3F46", fontFamily: "Segoe UI" }}>
				<Img alt="logo" height={32} src={logoURL} style={{ margin: "20px auto" }} width={144} />
				<Container style={{ background: "#F6FAFF", borderRadius: "20px", padding: "24px" }}>
					<Heading as="h2" style={{ textAlign: "center" }}>{`Message from ${senderName}`}</Heading>
					<Section>
						<Row>
							<Text style={{ fontSize: "16px", fontWeight: 500 }}>{`Dear ${recipientName},`}</Text>
							<Text style={{ fontSize: "16px" }}>{`You got a new message from ${senderName}:`}</Text>
						</Row>
					</Section>
					<Section>
						<Row>
							<Text style={{ backgroundColor: "#FFFFFF", borderLeft: "4px solid #F5A524", borderRadius: "5px", padding: "10px" }}>{message}</Text>
						</Row>
					</Section>
					<Section>
						<Row>
							<Text>{`Best regards,`}</Text>
							<Text style={{ fontSize: "20px", fontWeight: 500 }}>{senderName}</Text>
						</Row>
					</Section>
				</Container>
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
