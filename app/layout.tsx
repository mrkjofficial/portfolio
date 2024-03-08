import "./globals.css";
import { Toaster } from "sonner";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Navbar } from "@components";
import { headers } from "next/headers";
import { Roboto } from "next/font/google";
import { APP_DESCRIPTION, APP_NAME } from "@data";
import { Analytics } from "@vercel/analytics/react";
import NextUIProvider from "@providers/NextUIProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextThemesProvider from "@providers/NextThemesProvider";

const roboto = Roboto({ style: ["normal"], subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
	appleWebApp: { capable: true, startupImage: { url: "/logo.png" }, statusBarStyle: "default", title: APP_NAME },
	applicationName: APP_NAME,
	description: APP_DESCRIPTION,
	formatDetection: { address: true, date: true, email: true, telephone: true, url: true },
	icons: { apple: ["/icons/icon-192x192.png", "/icons/icon-256x256.png", "/icons/icon-384x384.png", "/icons/icon-512x512.png"] },
	metadataBase: new URL(process.env.NEXT_PUBLIC_URL as string),
	openGraph: { description: APP_DESCRIPTION, images: [{ alt: `${APP_NAME} logo`, url: "/logo.png" }], title: APP_NAME, type: "website", url: process.env.NEXT_PUBLIC_URL },
	title: APP_NAME,
};

export default function RootLayout({ children }: { children: ReactNode }) {
	const nonce = headers().get("x-nonce") as string;
	return (
		<html lang="en">
			<meta content="#000000" name="theme-color" nonce={nonce} />
			<body className={roboto.className}>
				<NextUIProvider>
					<NextThemesProvider attribute="class" enableSystem nonce={nonce}>
						<Navbar />
						{children}
						<Toaster position="top-right" richColors />
						<Analytics />
						<SpeedInsights />
					</NextThemesProvider>
				</NextUIProvider>
			</body>
		</html>
	);
}
