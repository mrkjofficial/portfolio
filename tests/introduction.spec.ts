import { expect, test } from "@playwright/test";

test.describe("Introduction Section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("headline is displayed", async ({ page }) => {
		await expect(page.getByText("I turn your ideas into reality")).toBeVisible();
	});

	test("subheadline is displayed", async ({ page }) => {
		await expect(page.getByText("Lead Software Engineer | Architect | Full-Stack Specialist")).toBeVisible();
	});

	test("description contains greeting", async ({ page }) => {
		// Use a unique substring from the description that avoids apostrophe encoding issues
		await expect(page.getByText(/Frontend-heavy Full-Stack Engineer/)).toBeVisible();
	});

	test("description mentions Full-Stack Engineer", async ({ page }) => {
		// Target the description paragraph specifically (not the subheadline or li items)
		await expect(page.locator("p.whitespace-pre-line")).toContainText("Full-Stack Engineer");
	});

	test("description mentions AI/ML capabilities", async ({ page }) => {
		// Use a unique fragment that only appears in the description paragraph
		await expect(page.getByText(/integrating AI\/ML capabilities/)).toBeVisible();
	});
});

test.describe("Information Section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("Location info is displayed", async ({ page }) => {
		// Use exact heading role to avoid matching "India" in Certify description or footer
		await expect(page.getByRole("heading", { name: "India" })).toBeVisible();
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
