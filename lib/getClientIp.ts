import { NextRequest } from "next/server";

const getClientIp = (request: NextRequest) => {
	// Vercel overwrites x-forwarded-for with the real client IP, so clients cannot spoof it there.
	// If this app is ever hosted elsewhere, read the IP from a header that host's proxy sets instead.
	return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";
};

export default getClientIp;
