import { expect, test } from "@playwright/test";

test.describe("Theme Toggle", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		// Wait for hydration — ThemeToggle mounts after a setTimeout(0)
		await page.waitForSelector("[role='switch']");
	});

	test("theme toggle switch is present in header", async ({ page }) => {
		// ThemeToggle renders as a HeroUI Switch ([role="switch"])
		await expect(page.getByRole("switch")).toBeVisible();
	});

	test("page loads with a valid theme class", async ({ page }) => {
		// The html element should have either 'light' or 'dark' class/attribute
		const html = page.locator("html");
		const classList = await html.getAttribute("class");
		const dataTheme = await html.getAttribute("data-theme");
		const hasTheme = (classList?.includes("light") || classList?.includes("dark") || dataTheme === "light" || dataTheme === "dark") ?? false;
		expect(hasTheme).toBe(true);
	});

	test("clicking theme toggle changes the theme", async ({ page }) => {
		const html = page.locator("html");

		// Get initial theme state
		const initialClass = await html.getAttribute("class");
		const initialDataTheme = await html.getAttribute("data-theme");

		// The Switch input is visually covered by control spans; use force:true to dispatch the click
		await page.getByRole("switch").click({ force: true });

		// Wait for next-themes to apply changes to the html element
		await page.waitForTimeout(400);

		const newClass = await html.getAttribute("class");
		const newDataTheme = await html.getAttribute("data-theme");

		// Either the class list or data-theme attribute must have changed
		const classChanged = newClass !== initialClass;
		const dataThemeChanged = newDataTheme !== initialDataTheme;
		expect(classChanged || dataThemeChanged).toBe(true);
	});

	test("toggling theme twice returns to original theme", async ({ page }) => {
		const html = page.locator("html");
		const getThemeState = async () => ({
			class: await html.getAttribute("class"),
			dataTheme: await html.getAttribute("data-theme"),
		});

		const initial = await getThemeState();
		const toggle = page.getByRole("switch");
		const isDark = (initial.class ?? "").includes("dark");

		// First toggle
		await toggle.click({ force: true });
		// Wait for the switch's native checked state to reflect the new React state.
		// HeroUI Switch uses a native <input type="checkbox">; toBeChecked() polls the
		// .checked property driven by isSelected={theme === "dark"}.
		if (isDark) {
			await expect(toggle).not.toBeChecked({ timeout: 3000 });
		} else {
			await expect(toggle).toBeChecked({ timeout: 3000 });
		}

		// Use a Space keypress for the second toggle. Firefox's React Aria pointer-event
		// tracking does not fully reset between two rapid forced clicks, causing the
		// second mouse click to be swallowed. Keyboard events bypass that tracking.
		await toggle.focus();
		await page.keyboard.press("Space");
		if (isDark) {
			await expect(toggle).toBeChecked({ timeout: 5000 });
		} else {
			await expect(toggle).not.toBeChecked({ timeout: 5000 });
		}

		const final = await getThemeState();
		expect(final.class).toBe(initial.class);
	});

	test("dark theme applies dark background color", async ({ page }) => {
		const html = page.locator("html");
		const classList = (await html.getAttribute("class")) ?? "";

		// Force dark mode if not already set
		if (!classList.includes("dark")) {
			await page.getByRole("switch").click({ force: true });
			await page.waitForTimeout(400);
		}

		const bgColor = await page.locator("body").evaluate(el => getComputedStyle(el).backgroundColor);
		// Dark background should not be pure white
		expect(bgColor).not.toBe("rgb(255, 255, 255)");
	});
});
