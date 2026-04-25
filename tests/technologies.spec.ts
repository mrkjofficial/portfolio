import { expect, test } from "@playwright/test";

test.describe("Technologies Section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("AI/ML category heading is displayed", async ({ page }) => {
		// Category names are now <p> tags (changed from <h4>); match by text content
		await expect(page.getByText("AI/ML", { exact: true })).toBeVisible();
	});

	test("Web category heading is displayed", async ({ page }) => {
		// Category names are now <p> tags (changed from <h4>); match by text content
		// Exact match avoids "Web Development Intern" in the work section
		await expect(page.getByText("Web", { exact: true })).toBeVisible();
	});

	// AI/ML skills
	test("Claude skill chip is displayed", async ({ page }) => {
		await expect(page.getByText("Claude")).toBeVisible();
	});

	test("Gemini skill chip is displayed", async ({ page }) => {
		await expect(page.getByText("Gemini")).toBeVisible();
	});

	test("Ollama skill chip is displayed", async ({ page }) => {
		await expect(page.getByText("Ollama").first()).toBeVisible();
	});

	test("OpenAI skill chip is displayed", async ({ page }) => {
		await expect(page.getByText("OpenAI")).toBeVisible();
	});

	// Web skills
	test("React.js skill chip is displayed", async ({ page }) => {
		await expect(page.getByText("React.js").first()).toBeVisible();
	});

	test("Next.js skill chip is displayed", async ({ page }) => {
		await expect(page.getByText("Next.js").first()).toBeVisible();
	});

	test("TypeScript skill chip is displayed", async ({ page }) => {
		await expect(page.getByText("TypeScript").first()).toBeVisible();
	});

	test("Node.js skill chip is displayed", async ({ page }) => {
		await expect(page.getByText("Node.js").first()).toBeVisible();
	});

	test("PostgreSQL skill chip is displayed", async ({ page }) => {
		await expect(page.getByText("PostgreSQL").first()).toBeVisible();
	});

	test("Docker skill chip is displayed", async ({ page }) => {
		await expect(page.getByText("Docker").first()).toBeVisible();
	});

	test("Tailwind skill chip is displayed", async ({ page }) => {
		// Use exact match to avoid matching "Tailwind CSS" chips from project cards
		await expect(page.getByText("Tailwind", { exact: true })).toBeVisible();
	});

	test("Zod skill chip is displayed", async ({ page }) => {
		await expect(page.getByText("Zod").first()).toBeVisible();
	});

	test("MINIO skill chip is displayed", async ({ page }) => {
		await expect(page.getByText("MINIO").first()).toBeVisible();
	});
});
