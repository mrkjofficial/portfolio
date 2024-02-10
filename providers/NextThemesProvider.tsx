"use client";
import { useEffect, useState } from "react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
