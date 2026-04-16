import { expect, test } from "@playwright/test";

test.describe("Work Section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("work section heading is displayed", async ({ page }) => {
		await expect(page.getByText("Work Experience")).toBeVisible();
	});

	test("Baseel Partners (Lead) entry is visible", async ({ page }) => {
		await expect(page.getByText("Lead Software Engineer").first()).toBeVisible();
	});

	test("Baseel Partners (Software Engineer) entry is visible", async ({ page }) => {
		await expect(page.getByText("Software Engineer").first()).toBeVisible();
	});

	test("Enterprise Minds entry is visible", async ({ page }) => {
		await expect(page.getByText("Enterprise Minds, Inc")).toBeVisible();
	});

	test("Web Development Intern role is visible", async ({ page }) => {
		await expect(page.getByText("Web Development Intern")).toBeVisible();
	});

	test("Baseel Partners org name is displayed", async ({ page }) => {
		await expect(page.getByText("Baseel Partners").first()).toBeVisible();
	});

	test("current role shows Present as end date", async ({ page }) => {
		await expect(page.getByText("Present")).toBeVisible();
	});

	test("Lead role start date is shown", async ({ page }) => {
		await expect(page.getByText(/Oct, 2024/)).toBeVisible();
	});

	test("Software Engineer start date is shown", async ({ page }) => {
		await expect(page.getByText(/Jun, 2023/)).toBeVisible();
	});

	test("Intern start date is shown", async ({ page }) => {
		await expect(page.getByText(/Jan, 2023/)).toBeVisible();
	});

	test("Lead role achievements are listed", async ({ page }) => {
		await expect(page.getByText(/decreasing system errors by 20%/)).toBeVisible();
	});

	test("Software Engineer achievements are listed", async ({ page }) => {
		await expect(page.getByText(/customer retention by 20%/)).toBeVisible();
	});

	test("Intern achievements are listed", async ({ page }) => {
		await expect(page.getByText(/talent acquisition platform/)).toBeVisible();
	});

	test("company logos are rendered", async ({ page }) => {
		// HeroUI Avatar.Image renders plain <img> tags; scroll to ensure they're in the DOM
		await page.evaluate(() => document.getElementById("work")?.scrollIntoView());
		await page.waitForTimeout(300);
		// Verify logos by matching organization name initials in Avatar fallback or presence of img
		const logos = page.locator("#work img");
		const count = await logos.count();
		expect(count).toBeGreaterThan(0);
	});
});
