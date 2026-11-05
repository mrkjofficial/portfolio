"use client";
import { Switch } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import useThemeToggle from "@hooks/useThemeToggle";

const subscribe = () => () => {};

const useIsClient = () =>
	useSyncExternalStore(
		subscribe,
		() => true,
		() => false
	);

const ThemeToggle = () => {
	const isClient = useIsClient();
	const { theme, toggleTheme } = useThemeToggle();

	if (isClient) {
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
