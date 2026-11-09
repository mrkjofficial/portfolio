import redis from "@config/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Per recipient address: at most 1 auto-reply per 24 hours, so the form can't be used to flood someone's inbox.
export const autoReplyRateLimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(1, "1 d"),
	prefix: "ratelimit:contact:auto-reply",
});

// Across all visitors: at most 50 messages sent per day, so abuse can never exhaust the email quota.
export const dailyRateLimit = new Ratelimit({
	redis,
	limiter: Ratelimit.fixedWindow(50, "1 d"),
	prefix: "ratelimit:contact:daily",
});

// Per visitor IP: 5 contact-form requests per 10 minutes.
export const ipRateLimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(5, "10 m"),
	prefix: "ratelimit:contact",
});
