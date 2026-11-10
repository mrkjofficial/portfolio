// "use client" is needed because next-themes uses React context and browser storage.
"use client";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

// Thin client-side wrapper around next-themes, so the server-rendered root layout can use it.
// It manages light/dark mode and remembers the visitor's choice.
const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
