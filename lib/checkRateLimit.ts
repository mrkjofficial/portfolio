import { Ratelimit } from "@upstash/ratelimit";

const nodeEnv = process.env.NODE_ENV;

// The three possible results of a rate-limit check, told apart by "status".

// The request is within the limit.
type RateLimitAllowedOutput = {
	status: "ALLOWED";
};

// The limit has been reached. The numbers are returned so the route can send them as X-RateLimit-* headers.
type RateLimitLimitedOutput = {
	status: "LIMITED";
	limit: number;
	remaining: number;
	// When the limit resets, as a Unix timestamp in milliseconds.
	reset: number;
};

// Redis couldn't be reached, so the limit couldn't be checked.
type RateLimitUnavailableOutput = {
	status: "UNAVAILABLE";
};

export type RateLimitOutput = RateLimitAllowedOutput | RateLimitLimitedOutput | RateLimitUnavailableOutput;

// Checks one request against a limiter from config/ratelimit.ts.
// identifier is the key being limited: an IP address, "global", or a hashed email address.
// It never throws; errors come back as UNAVAILABLE so the caller decides what to do.
const checkRateLimit = async (ratelimit: Ratelimit, identifier: string): Promise<RateLimitOutput> => {
	// Rate limiting only runs in production, so local development doesn't need Redis.
	if (nodeEnv !== "production") {
		return { status: "ALLOWED" };
	}

	try {
		const { success, limit, remaining, reset } = await ratelimit.limit(identifier);
		return success ? { status: "ALLOWED" } : { status: "LIMITED", limit, remaining, reset };
	} catch (error: unknown) {
		console.error((error as Error)?.message);
		return { status: "UNAVAILABLE" };
	}
};

export default checkRateLimit;
