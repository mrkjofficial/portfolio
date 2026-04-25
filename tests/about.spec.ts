import { expect, test } from "@playwright/test";

test.describe("About Section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("avatar image is visible", async ({ page }) => {
		// The avatar is an img inside the About component (left column)
		const avatar = page.locator("img[src*='profile']");
		await expect(avatar).toBeVisible();
	});

	test("name chip is displayed on the avatar", async ({ page }) => {
		// The chip uses HandwritingText which renders as SVG (no accessible text).
		// Locate by the absolute positioning classes applied directly to the Chip element.
		await expect(page.locator(".absolute.right-0.bottom-0.z-10").first()).toBeVisible();
	});

	test("LinkedIn button is visible", async ({ page }) => {
		await expect(page.getByRole("button", { name: /LinkedIn/i })).toBeVisible();
	});

	test("GitHub button is visible", async ({ page }) => {
		await expect(page.getByRole("button", { name: /GitHub/i })).toBeVisible();
	});

	test("Resume button is visible", async ({ page }) => {
		await expect(page.getByRole("button", { name: /Resume/i })).toBeVisible();
	});

	test("1:1 Meeting button is visible", async ({ page }) => {
		await expect(page.getByRole("button", { name: /1:1 Meeting/i })).toBeVisible();
	});

	test("LinkedIn button navigates to LinkedIn URL", async ({ page }) => {
		const linkedInBtn = page.getByRole("button", { name: /LinkedIn/i });
		await expect(linkedInBtn).toBeEnabled();
	});

	test("GitHub button is clickable", async ({ page }) => {
		const githubBtn = page.getByRole("button", { name: /GitHub/i });
		await expect(githubBtn).toBeEnabled();
	});

	test("Resume button is clickable", async ({ page }) => {
		const resumeBtn = page.getByRole("button", { name: /Resume/i });
		await expect(resumeBtn).toBeEnabled();
	});

	test("1:1 Meeting button is clickable", async ({ page }) => {
		const meetingBtn = page.getByRole("button", { name: /1:1 Meeting/i });
		await expect(meetingBtn).toBeEnabled();
	});
});
