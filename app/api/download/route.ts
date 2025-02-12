import { list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { key } = (await request.json()) as { key: string };
		if (!key) {
			const response = NextResponse.json({ message: "Invalid request!" }, { status: 400 });
			return response;
		}
		const path = process.env.BLOB_PATH as string;
		const data = await list({ limit: 1, prefix: `${path}/${key}` });

		if (!data?.blobs?.length) {
			const response = NextResponse.json({ message: "File not found!" }, { status: 404 });
			return response;
		}
		const response = NextResponse.json({ url: data?.blobs?.at(0)?.url, message: "Download started successfully!" }, { status: 200 });
		return response;
	} catch (error: unknown) {
		console.error((error as Error)?.message);
		const response = NextResponse.json({ message: "Internal server error!" }, { status: 500 });
		return response;
	}
}
