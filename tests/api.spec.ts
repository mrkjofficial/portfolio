import { expect, test } from "@playwright/test";

test.describe("API - /api/send", () => {
	test("returns 400 for missing fields", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: {},
		});
		expect(response.status()).toBe(400);
		const body = await response.json();
		expect(body).toHaveProperty("message");
	});

	test("returns 400 for invalid email", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "Test User", email: "notanemail", message: "Hello world" },
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for name too short", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "ab", email: "test@example.com", message: "Hello world" },
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for message too short", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "Test User", email: "test@example.com", message: "Hi" },
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for name too long (>30 chars)", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "A".repeat(31), email: "test@example.com", message: "Hello world" },
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for message too long (>30 chars)", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "Test User", email: "test@example.com", message: "A".repeat(31) },
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for empty name string", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "", email: "test@example.com", message: "Hello world" },
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for empty email string", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "Test User", email: "", message: "Hello world" },
		});
		expect(response.status()).toBe(400);
	});

	test("returns 400 for empty message string", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "Test User", email: "test@example.com", message: "" },
		});
		expect(response.status()).toBe(400);
	});

	test("returns non-404 for valid request (may 200 or 500 depending on env config)", async ({ request }) => {
		const response = await request.post("/api/send", {
			data: { name: "Test User", email: "test@example.com", message: "Hello there" },
		});
		// With no Resend API key configured in test env, we get 500
		// But should NOT get 400 (validation passes)
		expect(response.status()).not.toBe(400);
		expect([200, 500]).toContain(response.status());
	});
});
