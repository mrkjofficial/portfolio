import { expect, test } from "@playwright/test";

test.describe("Desktop Navigation", () => {
	test.use({ viewport: { width: 1280, height: 800 } });

	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("desktop nav shows all 5 navigation items", async ({ page }) => {
		const navList = page.locator("header ul").first();
		await expect(navList).toBeVisible();
		await expect(navList.locator("li")).toHaveCount(5);
	});

	test("desktop nav items are labelled correctly", async ({ page }) => {
		const nav = page.locator("header ul").first();
		for (const label of ["Home", "Projects", "Work", "Education", "Contact"]) {
			await expect(nav.getByText(label)).toBeVisible();
		}
	});

	test("clicking Home nav item scrolls to #home section", async ({ page }) => {
		await page.locator("header ul").first().getByText("Home").click();
		await expect(page).toHaveURL(/#home/, { timeout: 10000 });
	});

	test("clicking Projects nav item scrolls to #projects section", async ({ page }) => {
		await page.locator("header ul").first().getByText("Projects").click();
		await expect(page).toHaveURL(/#projects/, { timeout: 10000 });
	});

	test("clicking Work nav item scrolls to #work section", async ({ page }) => {
		await page.locator("header ul").first().getByText("Work").click();
		await expect(page).toHaveURL(/#work/, { timeout: 10000 });
	});

	test("clicking Education nav item scrolls to #education section", async ({ page }) => {
		await page.locator("header ul").first().getByText("Education").click();
		await expect(page).toHaveURL(/#education/, { timeout: 10000 });
	});

	test("clicking Contact nav item scrolls to #contact section", async ({ page }) => {
		await page.locator("header ul").first().getByText("Contact").click();
		await expect(page).toHaveURL(/#contact/, { timeout: 10000 });
	});

	test("hamburger menu button is hidden on desktop", async ({ page }) => {
		const hamburger = page
			.locator("header button")
			.filter({ has: page.locator("svg") })
			.first();
		await expect(hamburger).toBeHidden();
	});
});

test.describe("Mobile Navigation", () => {
	test.use({ viewport: { width: 375, height: 812 } });

	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("hamburger menu button is visible on mobile", async ({ page }) => {
		// The mobile hamburger toggle: first button in header left area
		const hamburger = page.locator("header").locator("button").first();
		await expect(hamburger).toBeVisible();
	});

	test("desktop nav list is hidden on mobile", async ({ page }) => {
		const desktopNav = page.locator("header ul").first();
		await expect(desktopNav).toBeHidden();
	});

	test("mobile menu is closed by default", async ({ page }) => {
		// The mobile nav is conditionally mounted by AnimatePresence (not in DOM when closed).
		// The always-visible header <nav> (which holds the ThemeToggle) is always present, so
		// "header nav.last()" would wrongly resolve to it. Use the md:hidden class that only
		// the mobile nav has — toBeHidden passes when the locator finds 0 elements.
		await expect(page.locator("header nav.md\\:hidden")).toBeHidden();
	});

	test("clicking hamburger opens mobile menu", async ({ page }) => {
		const hamburger = page.locator("header").locator("button").first();
		await hamburger.click();
		await expect(page.locator("header nav.md\\:hidden")).toBeVisible();
	});

	test("mobile menu shows all 5 navigation items when open", async ({ page }) => {
		const hamburger = page.locator("header").locator("button").first();
		await hamburger.click();
		const mobileNav = page.locator("header nav.md\\:hidden");
		for (const label of ["Home", "Projects", "Work", "Education", "Contact"]) {
			await expect(mobileNav.getByText(label)).toBeVisible();
		}
	});

	test("clicking hamburger again closes mobile menu", async ({ page }) => {
		const hamburger = page.locator("header").locator("button").first();
		await hamburger.click();
		await hamburger.click();
		// Mobile nav is removed from DOM by AnimatePresence; locator finds 0 elements → hidden
		await expect(page.locator("header nav.md\\:hidden")).toBeHidden();
	});

	test("clicking a mobile nav item closes the menu", async ({ page }) => {
		const hamburger = page.locator("header").locator("button").first();
		await hamburger.click();
		const mobileNav = page.locator("header nav.md\\:hidden");
		await mobileNav.getByText("Projects").click();
		await expect(page.locator("header nav.md\\:hidden")).toBeHidden();
		await expect(page).toHaveURL(/#projects/);
	});

	test("clicking a mobile nav item navigates to correct section", async ({ page }) => {
		const hamburger = page.locator("header").locator("button").first();
		await hamburger.click();
		await page.locator("header nav.md\\:hidden").getByText("Contact").click();
		await expect(page).toHaveURL(/#contact/);
	});
});
