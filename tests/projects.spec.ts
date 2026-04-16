import { expect, test } from "@playwright/test";

test.describe("Projects Section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("projects section heading is displayed", async ({ page }) => {
		// Heading is "Notable Projects" — use role to avoid matching nav button
		await expect(page.getByRole("heading", { name: "Notable Projects" })).toBeVisible();
	});

	test("Cognition project card is visible", async ({ page }) => {
		await expect(page.getByText("Cognition")).toBeVisible();
	});

	test("Certify project card is visible", async ({ page }) => {
		// Use heading role to avoid matching the description paragraph
		await expect(page.getByRole("heading", { name: "Certify" })).toBeVisible();
	});

	test("Greenrhea project card is visible", async ({ page }) => {
		await expect(page.getByRole("heading", { name: "Greenrhea" })).toBeVisible();
	});

	test("Neosmile project card is visible", async ({ page }) => {
		await expect(page.getByRole("heading", { name: "Neosmile" })).toBeVisible();
	});

	test("Cognition project thumbnail is displayed", async ({ page }) => {
		const img = page.locator("img[src*='cognition']");
		await expect(img).toBeVisible();
	});

	test("Certify project thumbnail is displayed", async ({ page }) => {
		const img = page.locator("img[src*='certify']");
		await expect(img).toBeVisible();
	});

	test("Greenrhea project thumbnail is displayed", async ({ page }) => {
		const img = page.locator("img[src*='greenrhea']");
		await expect(img).toBeVisible();
	});

	test("Neosmile project thumbnail is displayed", async ({ page }) => {
		const img = page.locator("img[src*='neosmile']");
		await expect(img).toBeVisible();
	});

	test("Cognition project description is shown", async ({ page }) => {
		await expect(page.getByText(/beginner basics to advanced expertise/)).toBeVisible();
	});

	test("Certify project description is shown", async ({ page }) => {
		await expect(page.getByText(/certification body/)).toBeVisible();
	});

	test("Greenrhea project description is shown", async ({ page }) => {
		await expect(page.getByText(/deep web intelligence/)).toBeVisible();
	});

	test("Neosmile project description is shown", async ({ page }) => {
		await expect(page.getByText(/top-tier dental care/)).toBeVisible();
	});

	test("project cards display skill chips", async ({ page }) => {
		// Verify the projects section renders skill chips by checking for a skill that appears in all projects
		const projectsSection = page.locator("[id='projects']");
		await expect(projectsSection.getByText("Next.js").first()).toBeVisible();
	});

	test("project name links are clickable", async ({ page }) => {
		// Project names render as <Link> (anchor tags), not buttons
		const cognitionLink = page.getByRole("link", { name: "Cognition" });
		await expect(cognitionLink).toBeVisible();
	});

	test("all 4 project thumbnails are loaded (no broken images)", async ({ page }) => {
		for (const name of ["Cognition", "Certify", "Greenrhea", "Neosmile"]) {
			const img = page.locator(`img[alt='${name}']`);
			// Scroll each image individually into view to trigger lazy loading in all browsers
			await img.scrollIntoViewIfNeeded();
			await expect(img).toBeVisible();
			// Wait until the image has fully decoded in the browser — reliable across all engines
			await page.waitForFunction(
				alt => {
					const el = document.querySelector(`img[alt='${alt}']`) as HTMLImageElement;
					return el?.complete && el.naturalWidth > 0;
				},
				name,
				{ timeout: 15000 }
			);
		}
	});
});
