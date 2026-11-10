import { useTheme } from "next-themes";

// Small helper around next-themes: exposes the current theme and a function that flips it.
const useThemeToggle = () => {
	const { theme, setTheme } = useTheme();

	// Switches light to dark and anything else (dark or system) to light.
	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return { theme, toggleTheme };
};

export default useThemeToggle;
