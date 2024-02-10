import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { name, email, message } = (await request.json()) as { name: string; email: string; message: string };

		if (!name || !email || !message) {
			const response = NextResponse.json({ message: "Invalid Request!" }, { status: 400 });
			return response;
		}

		console.log({ name, email, message })

		const response = NextResponse.json({ message: "Message Sent Successfully!" }, { status: 200 });
		return response;
	} catch (error: unknown) {
		const response = NextResponse.json({ message: "Internal Server Error!" }, { status: 500 });
		return response;
	}
}
