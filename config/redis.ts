import { Redis } from "@upstash/redis";

// Shared Upstash Redis client, used by the rate limiters in config/ratelimit.ts.
// fromEnv() reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
// It talks to Upstash over HTTPS (no open connection), which suits serverless functions.
const redis = Redis.fromEnv();

export default redis;
