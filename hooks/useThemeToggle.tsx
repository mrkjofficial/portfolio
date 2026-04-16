import { useTheme } from "next-themes";

const useThemeToggle = () => {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return { theme, toggleTheme };
};

export default useThemeToggle;
