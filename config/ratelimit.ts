import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

export const ratelimit = new Ratelimit({
	redis: kv,
	limiter: Ratelimit.slidingWindow(5, "10s"),
});
