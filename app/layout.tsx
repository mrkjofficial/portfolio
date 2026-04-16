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

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

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

type RootLayoutProps = Readonly<{
	children: ReactNode;
}>;

const RootLayout = async ({ children }: RootLayoutProps) => {
	const nonce = (await headers()).get("x-nonce") as string;
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<meta content="#000000" name="theme-color" nonce={nonce} />
			<body className={`${inter.variable} antialiased`}>
				<QueryProvider>
					<NextThemesProvider attribute="class" defaultTheme="light" enableSystem nonce={nonce}>
						<Toast.Provider placement="top end" width={400} />
						<div className="mx-auto max-w-5xl">
							<main className="xs:px-5 flex min-h-screen w-full flex-col items-center px-2">
								<Header />
								{children}
								<Footer />
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
