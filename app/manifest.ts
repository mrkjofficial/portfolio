import { APP_DESCRIPTION, APP_NAME } from "@data";

// Next.js special file: generates the web app manifest (/manifest.webmanifest).
// It lets visitors install the site as an app on their phone or computer.
const manifest = () => {
	return {
		name: APP_NAME,
		short_name: APP_NAME,
		description: APP_DESCRIPTION,
		start_url: "/",
		scope: "/",
		// Opens in its own window without the browser's address bar.
		display: "standalone",
		background_color: "#FFFFFF",
		theme_color: "#FFFFFF",
		// "any" icons are shown as-is. "maskable" icons can be cropped to the device's icon shape (circle, squircle, etc.).
		icons: [
			{
				src: "icons/icon-192x192.webp",
				sizes: "192x192",
				type: "image/webp",
				purpose: "any",
			},
			{
				src: "icons/icon-256x256.webp",
				sizes: "256x256",
				type: "image/webp",
				purpose: "any",
			},
			{
				src: "icons/icon-384x384.webp",
				sizes: "384x384",
				type: "image/webp",
				purpose: "any",
			},
			{
				src: "icons/icon-512x512.webp",
				sizes: "512x512",
				type: "image/webp",
				purpose: "any",
			},
			{
				src: "icons/icon-192x192.webp",
				sizes: "192x192",
				type: "image/webp",
				purpose: "maskable",
			},
			{
				src: "icons/icon-256x256.webp",
				sizes: "256x256",
				type: "image/webp",
				purpose: "maskable",
			},
			{
				src: "icons/icon-384x384.webp",
				sizes: "384x384",
				type: "image/webp",
				purpose: "maskable",
			},
			{
				src: "icons/icon-512x512.webp",
				sizes: "512x512",
				type: "image/webp",
				purpose: "maskable",
			},
		],
		// Shown in the install dialog. "narrow" is for phones, "wide" for desktops.
		screenshots: [
			{
				form_factor: "narrow",
				sizes: "1080x1920",
				src: "images/home-narrow-1.webp",
				type: "image/webp",
			},
			{
				form_factor: "wide",
				sizes: "1920x1080",
				src: "images/home-wide-1.webp",
				type: "image/webp",
			},
			{
				form_factor: "narrow",
				sizes: "1080x1920",
				src: "images/home-narrow-2.webp",
				type: "image/webp",
			},
			{
				form_factor: "wide",
				sizes: "1920x1080",
				src: "images/home-wide-2.webp",
				type: "image/webp",
			},
		],
	};
};

export default manifest;
