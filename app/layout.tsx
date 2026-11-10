import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Toast } from "@heroui/react";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import Header from "@components/common/header";
import Footer from "@components/common/footer";
import { APP_DESCRIPTION, APP_NAME } from "@data";
import { Analytics } from "@vercel/analytics/next";
import QueryProvider from "@providers/QueryProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextThemesProvider from "@providers/NextThemesProvider";

// Inter font, self-hosted by Next.js at build time and exposed as the --font-inter CSS variable.
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

// Site-wide metadata: page title, description, icons and link previews.
export const metadata: Metadata = {
	// Lets iPhones add the site to the home screen and open it like an app.
	appleWebApp: { capable: true, startupImage: { url: "/icon.webp" }, statusBarStyle: "default", title: APP_NAME },
	applicationName: APP_NAME,
	description: APP_DESCRIPTION,
	// Lets mobile browsers turn addresses, dates, emails, phone numbers and URLs into tappable links.
	formatDetection: { address: true, date: true, email: true, telephone: true, url: true },
	icons: { apple: ["/icons/icon-192x192.webp", "/icons/icon-256x256.webp", "/icons/icon-384x384.webp", "/icons/icon-512x512.webp"] },
	// Base for turning relative image paths below into full URLs.
	metadataBase: new URL(process.env.NEXT_PUBLIC_URL as string),
	// Link preview on sites like LinkedIn, WhatsApp and Slack.
	openGraph: { description: APP_DESCRIPTION, images: [{ alt: `${APP_NAME} logo`, url: "/icon.webp" }], siteName: APP_NAME, title: APP_NAME, type: "website", url: process.env.NEXT_PUBLIC_URL },
	title: APP_NAME,
	// Link preview on X (Twitter). "summary" shows a small square image, which suits the logo.
	twitter: { card: "summary", description: APP_DESCRIPTION, images: [{ alt: `${APP_NAME} logo`, url: "/icon.webp" }], title: APP_NAME },
};

type RootLayoutProps = Readonly<{
	children: ReactNode;
}>;

// Root layout: wraps every page with the providers, background, header and footer.
const RootLayout = async ({ children }: RootLayoutProps) => {
	// The per-request CSP nonce set by proxy.ts. Inline scripts need it to be allowed to run.
	const nonce = (await headers()).get("x-nonce") as string;
	return (
		// suppressHydrationWarning: next-themes adds the theme class to <html> before React loads,
		// which would otherwise trigger a mismatch warning.
		<html lang="en" suppressHydrationWarning={true}>
			<meta content="#000000" name="theme-color" nonce={nonce} />
			<body className={`${inter.variable} antialiased`}>
				<QueryProvider>
					{/* Theme is stored as a class on <html>; light by default, or the system setting if chosen. */}
					{/* The nonce lets its theme-setting script pass the CSP. */}
					<NextThemesProvider attribute="class" defaultTheme="light" enableSystem nonce={nonce}>
						{/* Animated gradient background (styled in globals.css); hidden from screen readers. */}
						<div className="aurora" aria-hidden="true">
							<span />
							<span />
							<span />
						</div>
						{/* Where toast notifications appear (top right). */}
						<Toast.Provider placement="top end" width={400} />
						<div className="mx-auto max-w-5xl">
							<main className="xs:px-5 flex min-h-screen w-full flex-col items-center px-2">
								<Header />
								{children}
								<Footer />
								{/* Vercel's visitor analytics and performance monitoring. */}
								<Analytics />
								<SpeedInsights />
							</main>
						</div>
					</NextThemesProvider>
				</QueryProvider>
			</body>
		</html>
	);
};

export default RootLayout;
