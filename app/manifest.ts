import { APP_DESCRIPTION, APP_NAME } from "@data";

export default function manifest() {
	return {
		name: APP_NAME,
		short_name: APP_NAME,
		description: APP_DESCRIPTION,
		start_url: "/",
		scope: "/",
		display: "standalone",
		background_color: "#FFFFFF",
		theme_color: "#FFFFFF",
		icons: [
			{
				src: "icons/icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "icons/icon-256x256.png",
				sizes: "256x256",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "icons/icon-384x384.png",
				sizes: "384x384",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "icons/icon-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "icons/icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "icons/icon-256x256.png",
				sizes: "256x256",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "icons/icon-384x384.png",
				sizes: "384x384",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "icons/icon-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
		screenshots: [
			{
				form_factor: "narrow",
				sizes: "1080x1920",
				src: "images/home-narrow-1.png",
				type: "image/png",
			},
			{
				form_factor: "wide",
				sizes: "1920x1080",
				src: "images/home-wide-1.png",
				type: "image/png",
			},
			{
				form_factor: "narrow",
				sizes: "1080x1920",
				src: "images/home-narrow-2.png",
				type: "image/png",
			},
			{
				form_factor: "wide",
				sizes: "1920x1080",
				src: "images/home-wide-2.png",
				type: "image/png",
			},
		],
	};
}
