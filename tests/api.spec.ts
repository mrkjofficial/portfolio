import { randomUUID } from "crypto";
import { expect, test } from "@playwright/test";

// Each test gets a synthetic IP so requests don't share a rate-limit bucket with
// other tests/projects — this suite runs against a production build (npm run preview),
// where rate limiting is genuinely active.
const uniqueIp = () => ({ "x-forwarded-for": randomUUID() });

// The contact form API, called directly without a browser.
// Covers validation (400), the Turnstile check (403) and a request that passes validation.
test.describe("API - /api/send", () => {
	test("returns 400 for missing fields", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: {},
			headers: uniqueIp(),
		});
		expect(response.status()).toBe(400);
		const body = await response.json();
		expect(body).toHaveProperty("message");
	});

	test("returns 400 for invalid email", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "Test User", email: "notanemail", message: "Hello world" },
			headers: uniqueIp(),
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for name too short", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "ab", email: "test@example.com", message: "Hello world" },
			headers: uniqueIp(),
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for message too short", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "Test User", email: "test@example.com", message: "Hi" },
			headers: uniqueIp(),
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for name too long (>30 chars)", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "A".repeat(31), email: "test@example.com", message: "Hello world" },
			headers: uniqueIp(),
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for message too long (>1000 chars)", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "Test User", email: "test@example.com", message: "A".repeat(1001) },
			headers: uniqueIp(),
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for name containing a line break", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "Test\nUser", email: "test@example.com", message: "Hello world" },
			headers: uniqueIp(),
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for name that is only whitespace", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "     ", email: "test@example.com", message: "Hello world" },
			headers: uniqueIp(),
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for empty name string", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "", email: "test@example.com", message: "Hello world" },
			headers: uniqueIp(),
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for empty email string", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "Test User", email: "", message: "Hello world" },
			headers: uniqueIp(),
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for empty message string", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "Test User", email: "test@example.com", message: "" },
			headers: uniqueIp(),
		});
		expect(response.status()).toBe(400);
	});

	test("returns 403 for valid input without a Turnstile token", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "Test User", email: "test@example.com", message: "Hello there" },
			headers: uniqueIp(),
		});
		expect(response.status()).toBe(403);
		expect(await response.json()).toEqual({ message: "Verification failed! Please try again." });
	});

	test("returns non-404 for valid request (may 200, 500 or 503 depending on env config)", async ({ request }) => {
		const response = await request.post("/api/send", {
			// Cloudflare's test secret keys accept this dummy token.
			data: { name: "Test User", email: "test@example.com", message: "Hello there", token: "XXXX.DUMMY.TOKEN.XXXX" },
			headers: uniqueIp(),
		});
		// With no Turnstile secret or no Upstash Redis configured, the route refuses to send (503).
		// With a production (non-test) Turnstile secret, Cloudflare rejects the dummy token (403).
		// With test keys and Redis but no Resend API key configured, sending fails (500).
		// With an invalid Resend API key or an unverified sender domain, Resend rejects the email (502).
		// Either way it should NOT get 400 (validation passes).
		expect(response.status()).not.toBe(400);
		expect([200, 403, 500, 502, 503]).toContain(response.status());
	});
});

// Per-IP rate limit (5 requests per 10 minutes). Needs Upstash Redis credentials,
// so these two tests fail locally when Redis isn't configured.
test.describe("API - /api/send - Rate Limiting", () => {
	test("allows 5 requests then blocks the 6th from the same IP", async ({ request }) => {
		const headers = uniqueIp();

		// Empty bodies still count towards the limit, because the IP check runs before validation.
		for (let i = 0; i < 5; i++) {
			const response = await request.post("/api/send", { data: {}, headers });
			expect(response.status()).toBe(400);
		}

		const blocked = await request.post("/api/send", { data: {}, headers });
		expect(blocked.status()).toBe(429);
		expect(blocked.headers()["x-ratelimit-remaining"]).toBe("0");

		const body = await blocked.json();
		expect(body).toEqual({ message: "Too many requests!" });
	});

	test("requests from a different IP are unaffected by another IP's limit", async ({ request }) => {
		const exhausted = uniqueIp();
		for (let i = 0; i < 6; i++) {
			await request.post("/api/send", { data: {}, headers: exhausted });
		}

		const other = await request.post("/api/send", { data: {}, headers: uniqueIp() });
		expect(other.status()).toBe(400);
	});
});
