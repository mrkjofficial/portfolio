import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
	content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	plugins: [nextui()],
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
