import { Ratelimit } from "@upstash/ratelimit";
import redis from "@config/redis";

const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(5, "10 m"),
	prefix: "ratelimit:contact",
});

export default ratelimit;
