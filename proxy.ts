import { NextRequest, NextResponse } from "next/server";

const nodeEnv = process.env.NODE_ENV;

export function proxy(request: NextRequest) {
	const nonce = btoa(crypto.randomUUID());

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
		.replace(/\s{2,}/g, " ")
		.trim();

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-nonce", nonce);
	requestHeaders.set("Content-Security-Policy", csp);

	const response = NextResponse.next({ request: { headers: requestHeaders } });
	response.headers.set("Content-Security-Policy", csp);
	return response;
}

export const config = {
	matcher: [
		{
			source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
			missing: [
				{ type: "header", key: "next-router-prefetch" },
				{ type: "header", key: "purpose", value: "prefetch" },
			],
		},
	],
};
