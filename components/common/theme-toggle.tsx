"use client";
import { Switch } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import useThemeToggle from "@hooks/useThemeToggle";

const ThemeToggle = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, toggleTheme } = useThemeToggle();

	useLayoutEffect(() => {
		setTimeout(() => setMounted(true), 0);
	}, []);

	if (mounted) {
		return (
			<Switch aria-label="Toggle dark mode" isSelected={theme === "dark"} onChange={toggleTheme} size="lg">
				{({ isSelected }) => (
					<Switch.Content>
						<Switch.Control>
							<Switch.Thumb>
								<Switch.Icon>{isSelected ? <Moon size={16} /> : <Sun size={16} />}</Switch.Icon>
							</Switch.Thumb>
						</Switch.Control>
					</Switch.Content>
				)}
			</Switch>
		);
	}
};

export default ThemeToggle;
