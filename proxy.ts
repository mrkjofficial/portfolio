import { NextRequest, NextResponse } from "next/server";

const nodeEnv = process.env.NODE_ENV;

// Next.js proxy (formerly "middleware"): runs before every matching page request.
// It sets a Content-Security-Policy (CSP), which tells the browser which scripts, styles, frames
// and connections the page may use, so injected scripts can't run.
export function proxy(request: NextRequest) {
	// A random one-time value. Only scripts tagged with this nonce may run on this page load.
	const nonce = btoa(crypto.randomUUID());

	// default-src: anything not listed below may only load from this site.
	// script-src: scripts need the nonce; 'strict-dynamic' lets those scripts load others (e.g. Turnstile's).
	//   Development also allows 'unsafe-eval', which Next.js needs for fast refresh.
	// frame-src: only Cloudflare Turnstile may be embedded in a frame.
	// style-src: 'unsafe-inline' is needed because Framer Motion and next/image set inline style attributes.
	// img-src: blob: and data: allow images generated in the browser.
	// connect-src: fetch requests may only go to this site.
	// object-src: no plugins such as Flash.
	// base-uri and form-action: stop injected <base> tags or forms from redirecting elsewhere.
	// frame-ancestors: no other site may embed this one.
	const csp = `
		default-src 'self';
		script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://challenges.cloudflare.com${nodeEnv === "development" ? " 'unsafe-eval'" : ""};
		frame-src https://challenges.cloudflare.com;
		style-src 'self' 'unsafe-inline';
		img-src 'self' blob: data:;
		font-src 'self';
		connect-src 'self';
		object-src 'none';
		base-uri 'self';
		form-action 'self';
		frame-ancestors 'none';
	`
		// Collapse the multi-line template into a single-line header value.
		.replace(/\s{2,}/g, " ")
		.trim();

	// Pass the nonce and CSP to the app, so Next.js tags its own scripts with the nonce
	// and the root layout can read it from the x-nonce header.
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-nonce", nonce);
	requestHeaders.set("Content-Security-Policy", csp);

	// Send the CSP to the browser as well, which is where it's enforced.
	const response = NextResponse.next({ request: { headers: requestHeaders } });
	response.headers.set("Content-Security-Policy", csp);
	return response;
}

export const config = {
	matcher: [
		{
			// Run on pages only: skip API routes, static files, optimized images and the favicon.
			source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
			// Skip prefetch requests too: they only load data for client-side navigation, not a page the CSP applies to.
			missing: [
				{ type: "header", key: "next-router-prefetch" },
				{ type: "header", key: "purpose", value: "prefetch" },
			],
		},
	],
};
