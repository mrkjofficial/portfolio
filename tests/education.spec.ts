import { expect, test } from "@playwright/test";

test.describe("Education Section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("education section heading is displayed", async ({ page }) => {
		await expect(page.getByRole("heading", { name: "Education" })).toBeVisible();
	});

	test("Pondicherry University entry is visible", async ({ page }) => {
		await expect(page.getByText("Pondicherry University")).toBeVisible();
	});

	test("MCA degree is displayed", async ({ page }) => {
		await expect(page.getByText("Master of Computer Applications")).toBeVisible();
	});

	test("Siliguri Institute of Technology entry is visible", async ({ page }) => {
		await expect(page.getByText("Siliguri Institute of Technology")).toBeVisible();
	});

	test("BCA degree is displayed", async ({ page }) => {
		await expect(page.getByText("Bachelor of Computer Applications")).toBeVisible();
	});

	test("Pondicherry University start date is shown", async ({ page }) => {
		await expect(page.getByText(/Oct, 2021/)).toBeVisible();
	});

	test("Pondicherry University end date is shown", async ({ page }) => {
		await expect(page.getByText(/May, 2023/)).toBeVisible();
	});

	test("Siliguri Institute of Technology dates are shown", async ({ page }) => {
		await expect(page.getByText(/Jun, 2015/)).toBeVisible();
		await expect(page.getByText(/May, 2018/)).toBeVisible();
	});

	test("MCA CGPA achievement is shown", async ({ page }) => {
		await expect(page.getByText(/9.29 out of 10.00/)).toBeVisible();
	});

	test("BCA CGPA achievement is shown", async ({ page }) => {
		await expect(page.getByText(/7.38 out of 10.00/)).toBeVisible();
	});

	test("MCA quiz competition achievement is shown", async ({ page }) => {
		await expect(page.getByText(/SecuroPoint/)).toBeVisible();
	});

	test("BCA ExQuizIT achievement is shown", async ({ page }) => {
		await expect(page.getByText(/ExQuizIT/)).toBeVisible();
	});

	test("institution logos are rendered", async ({ page }) => {
		await page.evaluate(() => document.getElementById("education")?.scrollIntoView());
		const logos = page.locator("#education img");
		await expect(logos.first()).toBeVisible({ timeout: 5000 });
		const count = await logos.count();
		expect(count).toBeGreaterThan(0);
	});
});
