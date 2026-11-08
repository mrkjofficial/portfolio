import ratelimit from "@config/ratelimit";
import { NextRequest } from "next/server";

const nodeEnv = process.env.NODE_ENV;

type RateLimitAllowedOutput = {
	status: "ALLOWED";
};

type RateLimitLimitedOutput = {
	status: "LIMITED";
	limit: number;
	remaining: number;
	reset: number;
};

type RateLimitUnavailableOutput = {
	status: "UNAVAILABLE";
};

export type RateLimitOutput = RateLimitAllowedOutput | RateLimitLimitedOutput | RateLimitUnavailableOutput;

const checkRateLimit = async (request: NextRequest): Promise<RateLimitOutput> => {
	if (nodeEnv !== "production") {
		return { status: "ALLOWED" };
	}

	try {
		// Vercel overwrites x-forwarded-for with the real client IP, so clients cannot spoof it there.
		// If this app is ever hosted elsewhere, read the IP from a header that host's proxy sets instead.
		const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";

		const { success, limit, remaining, reset } = await ratelimit.limit(clientIp);
		return success ? { status: "ALLOWED" } : { status: "LIMITED", limit, remaining, reset };
	} catch (error: unknown) {
		console.error((error as Error)?.message);
		return { status: "UNAVAILABLE" };
	}
};

export default checkRateLimit;
