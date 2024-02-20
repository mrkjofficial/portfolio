import { list } from "@vercel/blob";
import { ratelimit } from "@config/ratelimit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const ip = request.ip ?? "127.0.0.1";
		const { limit, remaining, reset } = await ratelimit.limit(ip);
		if (remaining === 0) {
			const response = NextResponse.json({ message: "Rate limit exceeded!" }, { status: 429 });
			response.headers.set("X-RateLimit-Limit", limit.toString());
			response.headers.set("X-RateLimit-Remaining", remaining.toString());
			response.headers.set("X-RateLimit-Reset", reset.toString());
			return response;
		} else {
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
			response.headers.set("X-RateLimit-Limit", limit.toString());
			response.headers.set("X-RateLimit-Remaining", remaining.toString());
			response.headers.set("X-RateLimit-Reset", reset.toString());
			return response;
		}
	} catch (error: unknown) {
		const response = NextResponse.json({ message: "Internal server error!" }, { status: 500 });
		return response;
	}
}
