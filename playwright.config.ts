import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	outputDir: "./.playwright/results",

	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [["list"], ["html", { open: "never", outputFolder: "./.playwright/report" }]],
	use: {
		baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},
	projects: [
		// Desktop browsers
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
		{
			name: "edge",
			use: { ...devices["Desktop Edge"], channel: "msedge" },
		},
		// Mobile browsers
		{
			name: "mobile-chrome",
			use: { ...devices["Pixel 5"] },
		},
		{
			name: "mobile-safari",
			use: { ...devices["iPhone 14"] },
		},
	],
	webServer: {
		command: "npm run dev",
		url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
		timeout: 120000,
	},
});
