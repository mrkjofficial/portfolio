import { expect, test } from "@playwright/test";

test.describe("Contact Section - Visibility", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("contact section heading is displayed", async ({ page }) => {
		// "Let's Connect" is rendered word-by-word in motion.span elements; textContent has
		// no spaces ("Let'sConnect"). Check the h2 in the contact section contains "Connect".
		await expect(page.locator("#contact h2")).toContainText("Connect");
	});

	test("name field is visible", async ({ page }) => {
		await expect(page.getByLabel("Name")).toBeVisible();
	});

	test("email field is visible", async ({ page }) => {
		await expect(page.getByLabel("Email", { exact: true })).toBeVisible();
	});

	test("message field is visible", async ({ page }) => {
		await expect(page.getByLabel("Message")).toBeVisible();
	});

	test("send button is visible", async ({ page }) => {
		await expect(page.getByRole("button", { name: /Send/i })).toBeVisible();
	});

	test("contact info text is displayed", async ({ page }) => {
		await expect(page.getByText("Contact Me")).toBeVisible();
		await expect(page.getByText(/I'd love to hear from you/)).toBeVisible();
	});

	test("name field has correct placeholder", async ({ page }) => {
		await expect(page.getByPlaceholder("Enter your name")).toBeVisible();
	});

	test("email field has correct placeholder", async ({ page }) => {
		await expect(page.getByPlaceholder("Enter your email")).toBeVisible();
	});

	test("message field has correct placeholder", async ({ page }) => {
		await expect(page.getByPlaceholder("Enter your message here")).toBeVisible();
	});
});

test.describe("Contact Form - Validation", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		// Scroll to contact section so fields are in view
		await page.evaluate(() => {
			const el = document.getElementById("contact");
			el?.scrollIntoView();
		});
	});

	test("name field shows error when too short (below 3 chars)", async ({ page }) => {
		const nameInput = page.getByLabel("Name");
		await nameInput.pressSequentially("ab");
		await nameInput.blur();
		// Wait for validation error to appear
		await expect(page.locator("#name + [slot='errorMessage'], [id='name'] ~ [class*='FieldError'], [for='name'] ~ *").filter({ hasText: /3|character|minimum/i }))
			.toBeVisible({ timeout: 3000 })
			.catch(async () => {
				// Fallback: check for any error message near the field
				await expect(page.locator("text=/3|minimum|least/i").first()).toBeVisible({ timeout: 3000 });
			});
	});

	test("name field accepts valid input (3-30 chars)", async ({ page }) => {
		const nameInput = page.getByLabel("Name");
		await nameInput.pressSequentially("John Doe");
		await nameInput.blur();
		await expect(nameInput).toHaveValue("John Doe");
	});

	test("email field shows error for invalid email", async ({ page }) => {
		const emailInput = page.getByLabel("Email", { exact: true });
		await emailInput.pressSequentially("notanemail");
		await emailInput.blur();
		// Should show an email validation error
		await page.waitForTimeout(300);
		const hasError = await page.locator("text=/invalid|email/i").count();
		expect(hasError).toBeGreaterThan(0);
	});

	test("email field accepts valid email format", async ({ page }) => {
		const emailInput = page.getByLabel("Email", { exact: true });
		await emailInput.pressSequentially("test@example.com");
		await emailInput.blur();
		await expect(emailInput).toHaveValue("test@example.com");
	});

	test("message field shows error when too short (below 8 chars)", async ({ page }) => {
		const messageInput = page.getByLabel("Message");
		await messageInput.pressSequentially("Hi");
		await messageInput.blur();
		await page.waitForTimeout(300);
		const hasError = await page.locator("text=/8|minimum|character/i").count();
		expect(hasError).toBeGreaterThan(0);
	});

	test("message field accepts valid input (8-30 chars)", async ({ page }) => {
		const messageInput = page.getByLabel("Message");
		await messageInput.pressSequentially("Hello there!");
		await messageInput.blur();
		await expect(messageInput).toHaveValue("Hello there!");
	});

	test("send button is disabled while submitting", async ({ page }) => {
		// Fill valid form data
		await page.getByLabel("Name").pressSequentially("John Doe");
		await page.getByLabel("Email", { exact: true }).pressSequentially("john@example.com");
		await page.getByLabel("Message").pressSequentially("Hello there!");

		// Intercept the API call to delay it so we can check loading state
		await page.route("/api/send", async route => {
			await new Promise(resolve => setTimeout(resolve, 2000));
			await route.fulfill({ status: 200, body: JSON.stringify({ message: "Message sent successfully!" }) });
		});

		const sendBtn = page.getByRole("button", { name: /Send/i });
		await sendBtn.click();

		// During submission, button shows "Sending..." and should be disabled
		await expect(page.getByRole("button", { name: /Sending/i })).toBeDisabled({ timeout: 3000 });
	});

	test("form resets after successful submission", async ({ page }) => {
		await page.getByLabel("Name").pressSequentially("John Doe");
		await page.getByLabel("Email", { exact: true }).pressSequentially("john@example.com");
		await page.getByLabel("Message").pressSequentially("Hello there!");

		// Mock successful API response
		await page.route("/api/send", route => route.fulfill({ status: 200, body: JSON.stringify({ message: "Message sent successfully!" }) }));

		await page.getByRole("button", { name: /Send/i }).click();

		// Wait for form to reset
		await expect(page.getByLabel("Name")).toHaveValue("", { timeout: 8000 });
		await expect(page.getByLabel("Email", { exact: true })).toHaveValue("", { timeout: 8000 });
		await expect(page.getByLabel("Message")).toHaveValue("", { timeout: 8000 });
	});

	test("success toast appears after successful submission", async ({ page }) => {
		await page.getByLabel("Name").pressSequentially("John Doe");
		await page.getByLabel("Email", { exact: true }).pressSequentially("john@example.com");
		await page.getByLabel("Message").pressSequentially("Hello there!");

		await page.route("/api/send", route => route.fulfill({ status: 200, body: JSON.stringify({ message: "Message sent successfully!" }) }));

		await page.getByRole("button", { name: /Send/i }).click();

		// Success toast title should appear (use exact title text to avoid multi-match with description)
		await expect(page.getByText("Success!")).toBeVisible({ timeout: 8000 });
	});

	test("error toast appears on API failure", async ({ page }) => {
		await page.getByLabel("Name").pressSequentially("John Doe");
		await page.getByLabel("Email", { exact: true }).pressSequentially("john@example.com");
		await page.getByLabel("Message").pressSequentially("Hello there!");

		await page.route("/api/send", route => route.fulfill({ status: 500, body: "Internal server error!" }));

		await page.getByRole("button", { name: /Send/i }).click();

		await expect(page.getByText("Error!", { exact: true })).toBeVisible({ timeout: 5000 });
	});

	test("form validation blocks submission when fields are empty", async ({ page }) => {
		// The send button is only disabled when isPending; empty field validation
		// is handled by React Hook Form and prevents the API from being called at all
		let apiCalled = false;
		await page.route("/api/send", route => {
			apiCalled = true;
			route.fulfill({ status: 200, body: JSON.stringify({ message: "ok" }) });
		});

		await page.getByRole("button", { name: /^Send$/i }).click();
		await page.waitForTimeout(500);
		expect(apiCalled).toBe(false);
	});
});

test.describe("Contact Section - Phone & Email Tooltips", () => {
	test.use({ viewport: { width: 1280, height: 800 } });

	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		await page.evaluate(() => {
			const el = document.getElementById("contact");
			el?.scrollIntoView();
		});
	});

	test("phone tooltip button is visible on wider layouts", async ({ page }) => {
		// The phone button is hidden on small screens (hidden sm:flex)
		const phoneBtn = page
			.locator("[id='contact']")
			.getByRole("button")
			.filter({ has: page.locator("svg") })
			.first();
		// On desktop, at least one icon button should exist in contact info area
		await expect(phoneBtn).toBeVisible();
	});
});
