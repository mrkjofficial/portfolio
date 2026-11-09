import { Ratelimit } from "@upstash/ratelimit";

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

const checkRateLimit = async (ratelimit: Ratelimit, identifier: string): Promise<RateLimitOutput> => {
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
