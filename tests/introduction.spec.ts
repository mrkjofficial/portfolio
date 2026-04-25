import { expect, test } from "@playwright/test";

test.describe("Introduction Section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("headline is displayed", async ({ page }) => {
		// Headline words are rendered as individual motion.span elements; textContent has no
		// spaces between words ("Iturnyourideasintoreality"). Check the h1 is visible and the
		// word "reality" (unique to this headline) is present as a substring.
		const h1 = page.locator("#home h1");
		await expect(h1).toBeVisible();
		await expect(h1).toContainText("reality");
	});

	test("subheadline is displayed", async ({ page }) => {
		// Subheadline words are individual motion.span elements; textContent has no spaces
		// ("LeadSoftwareEngineer|Architect|Full-StackSpecialist"). Check the p is visible
		// and "Specialist" (unique suffix substring) is present.
		const subheadline = page.locator("#home p.font-semibold");
		await expect(subheadline).toBeVisible();
		await expect(subheadline).toContainText("Specialist");
	});

	test("description contains greeting", async ({ page }) => {
		// The description is typed character-by-character. The aria-hidden ghost paragraph
		// always holds the complete text; use toContainText (no visibility check needed).
		await expect(page.locator("p.whitespace-pre-line[aria-hidden]")).toContainText("Frontend-heavy Full-Stack Engineer");
	});

	test("description mentions Full-Stack Engineer", async ({ page }) => {
		// Two p.whitespace-pre-line elements exist: one aria-hidden ghost spacer with the full
		// text, and one absolute-positioned typing animation. Target the ghost which always
		// has the complete description text regardless of animation progress.
		await expect(page.locator("p.whitespace-pre-line[aria-hidden]")).toContainText("Full-Stack Engineer");
	});

	test("description mentions AI/ML capabilities", async ({ page }) => {
		// This text appears at character ~436 (~10.6s after page load), well beyond the default
		// assertion timeout. The aria-hidden ghost paragraph always has the full text immediately.
		await expect(page.locator("p.whitespace-pre-line[aria-hidden]")).toContainText("integrating AI/ML capabilities");
	});
});

test.describe("Information Section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("Location info is displayed", async ({ page }) => {
		// Info values are now <p> tags (changed from <h4>); use exact text match to avoid
		// matching "in India" in the footer or "India" inside Certify's description paragraph
		await expect(page.getByText("India", { exact: true })).toBeVisible();
	});

	test("Experience info is displayed", async ({ page }) => {
		// Use exact label text and unique value "3 Year+" to avoid multi-match
		await expect(page.getByText("3 Year+")).toBeVisible();
	});

	test("Projects count info is displayed", async ({ page }) => {
		// "7+" is the unique value for the Projects info item — avoids nav "Projects" ambiguity
		await expect(page.getByText("7+")).toBeVisible();
	});
});
