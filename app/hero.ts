import { heroui } from "@heroui/react";

const Hero = heroui({
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
});

export default Hero;
