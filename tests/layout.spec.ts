import { expect, test } from "@playwright/test";

test.describe("Layout", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("page loads with correct title", async ({ page }) => {
		await expect(page).toHaveTitle(/MrKJOfficial/);
	});

	test("header is visible and sticky", async ({ page }) => {
		const header = page.locator("header");
		await expect(header).toBeVisible();
		// Verify it sits at the top of the viewport
		const box = await header.boundingBox();
		expect(box?.y).toBe(0);
	});

	test("header contains logo with correct text", async ({ page }) => {
		await expect(page.getByRole("heading", { name: "MrKJOfficial" })).toBeVisible();
	});

	test("header logo image is present", async ({ page }) => {
		const logoImg = page.locator("header img[alt='Logo']");
		await expect(logoImg).toBeVisible();
	});

	test("footer is visible", async ({ page }) => {
		const footer = page.locator("footer");
		await expect(footer).toBeVisible();
	});

	test("footer contains correct attribution text", async ({ page }) => {
		await expect(page.locator("footer")).toContainText("Made with");
		await expect(page.locator("footer")).toContainText("India");
		await expect(page.locator("footer")).toContainText("Karan Jaiswal");
	});

	test("theme toggle switch is visible in header", async ({ page }) => {
		// ThemeToggle renders as a HeroUI Switch ([role="switch"]) mounted after hydration
		const themeToggle = page.getByRole("switch");
		await expect(themeToggle).toBeVisible();
	});

	test("page has two-column layout on desktop", async ({ page }) => {
		const mainGrid = page.locator("div.md\\:flex-row").first();
		await expect(mainGrid).toBeVisible();
	});
});
