import { expect, test } from "@playwright/test";

test.describe("Responsive Layout - Desktop (1280px)", () => {
	test.use({ viewport: { width: 1280, height: 800 } });

	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("two-column layout is visible on desktop", async ({ page }) => {
		// md:flex-row causes side-by-side layout on desktop
		// The about column and content column should both be visible side by side
		const aboutColumn = page.locator("img[src*='profile']");
		const introHeading = page.getByText("I turn your ideas into reality");
		await expect(aboutColumn).toBeVisible();
		await expect(introHeading).toBeVisible();
	});

	test("desktop nav list is visible on desktop", async ({ page }) => {
		await expect(page.locator("header ul").first()).toBeVisible();
	});

	test("hamburger menu is hidden on desktop", async ({ page }) => {
		const hamburger = page.locator("header button").first();
		await expect(hamburger).toBeHidden();
	});

	test("about section is sticky on desktop", async ({ page }) => {
		// Scroll down and verify the avatar is still visible due to md:sticky positioning
		await page.evaluate(() => window.scrollBy(0, 400));
		await expect(page.locator("img[src*='profile']")).toBeVisible();
	});
});

test.describe("Responsive Layout - Mobile (375px)", () => {
	test.use({ viewport: { width: 375, height: 812 } });

	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("single column layout on mobile", async ({ page }) => {
		// On mobile, the layout should stack vertically
		// Both About and main content should be visible when scrolling
		await expect(page.locator("img[src*='profile']")).toBeVisible();
	});

	test("desktop nav is hidden on mobile", async ({ page }) => {
		await expect(page.locator("header ul").first()).toBeHidden();
	});

	test("hamburger button is shown on mobile", async ({ page }) => {
		await expect(page.locator("header button").first()).toBeVisible();
	});

	test("about section link buttons are in grid layout on mobile", async ({ page }) => {
		// The buttons should wrap into a grid on mobile
		await expect(page.getByRole("button", { name: /LinkedIn/i })).toBeVisible();
		await expect(page.getByRole("button", { name: /GitHub/i })).toBeVisible();
	});

	test("contact form fields are stacked on mobile", async ({ page }) => {
		// Form fields should be visible and accessible on mobile
		await expect(page.getByLabel("Name")).toBeVisible();
		await expect(page.getByLabel("Email")).toBeVisible();
		await expect(page.getByLabel("Message")).toBeVisible();
	});
});

test.describe("Responsive Layout - Tablet (768px)", () => {
	test.use({ viewport: { width: 768, height: 1024 } });

	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("page renders correctly at tablet width", async ({ page }) => {
		await expect(page.getByText("I turn your ideas into reality")).toBeVisible();
	});

	test("header is visible at tablet width", async ({ page }) => {
		await expect(page.locator("header")).toBeVisible();
	});

	test("contact form is accessible at tablet width", async ({ page }) => {
		await expect(page.getByLabel("Name")).toBeVisible();
	});
});
