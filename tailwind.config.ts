import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import tailwindScrollbar from "tailwind-scrollbar";

const config: Config = {
	content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", "./node_modules/tailwind-datepicker-react/dist/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						background: "#F6FAFF",
						foreground: "#151515",
						primary: {
							foreground: "#F6FAFF",
							DEFAULT: "#006FEE",
						},
						secondary: {
							foreground: "#F6FAFF",
							DEFAULT: "#9353D3",
						},
						success: {
							foreground: "#F6FAFF",
							DEFAULT: "#17C964",
						},
						danger: {
							foreground: "#F6FAFF",
							DEFAULT: "#F31260",
						},
						warning: {
							foreground: "#F6FAFF",
							DEFAULT: "#F5A524",
						},
					},
				},
				dark: {
					colors: {
						background: "#151515",
						foreground: "#F6FAFF",
						primary: {
							foreground: "#F6FAFF",
							DEFAULT: "#006FEE",
						},
						secondary: {
							foreground: "#F6FAFF",
							DEFAULT: "#9353D3",
						},
						success: {
							foreground: "#F6FAFF",
							DEFAULT: "#17C964",
						},
						danger: {
							foreground: "#F6FAFF",
							DEFAULT: "#F31260",
						},
						warning: {
							foreground: "#F6FAFF",
							DEFAULT: "#F5A524",
						},
					},
				},
			},
		}),
		tailwindScrollbar,
	],
	theme: {
		extend: {
			colors: {
				light: "#F6FAFF",
				dark: "#151515",
			},
			screens: {
				xs: "512px",
			},
		},
	},
};
export default config;
