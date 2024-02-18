import { Body, Container, Head, Heading, Html, Img, Link, Preview, Row, Section, Text } from "@react-email/components";

type ReplyProps = {
	logoURL: string;
	senderName: string;
	recipientName: string;
	appURL: string;
	appName: string;
};

const Reply = ({ logoURL, senderName, recipientName, appURL, appName }: ReplyProps) => {
	return (
		<Html>
			<Head />
			<Preview>{`Thank you for contacting me.`}</Preview>
			<Body style={{ color: "#3F3F46", fontFamily: "Segoe UI" }}>
				<Img alt="logo" height={32} src={logoURL} style={{ margin: "20px auto" }} width={144} />
				<Container style={{ background: "#F6FAFF", borderRadius: "20px", padding: "24px" }}>
					<Heading as="h2" style={{ textAlign: "center" }}>{`Message from ${senderName}`}</Heading>
					<Section>
						<Row>
							<Text style={{ fontSize: "16px", fontWeight: 500 }}>{`Dear ${recipientName},`}</Text>
							<Text style={{ fontSize: "16px" }}>{`Thank you for contacting me.`}</Text>
						</Row>
					</Section>
					<Section>
						<Row>
							<Text style={{ fontSize: "16px" }}>{`I appreciate you contacting me. I'll be getting back to you shortly. Thanks in advance for your patience.`}</Text>
							<Text style={{ fontSize: "16px" }}>{`Have a great day.`}</Text>
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

export default Reply;
