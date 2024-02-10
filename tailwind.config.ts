import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
import { semanticColors } from "@nextui-org/theme";

const config: Config = {
	content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	plugins: [nextui()],
	theme: {
		extend: {
			backgroundImage: {
				gradient: `linear-gradient(to right, ${semanticColors.light.primary[500]}, ${semanticColors.light.secondary[500]})`,
			},
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
