// "use client" is needed because the toggle reads the theme, which only exists in the browser.
"use client";
import { Switch } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import useThemeToggle from "@hooks/useThemeToggle";

// Nothing ever changes, so there's nothing to subscribe to; this returns a no-op unsubscribe.
const subscribe = () => () => {};

// Returns false while rendering on the server (and during hydration), then true in the browser.
// useSyncExternalStore does this without an effect or extra state, so there's no flash or hydration mismatch.
const useIsClient = () =>
	useSyncExternalStore(
		subscribe,
		// Value in the browser.
		() => true,
		// Value on the server.
		() => false
	);

// Light/dark mode switch in the header.
const ThemeToggle = () => {
	const isClient = useIsClient();
	const { theme, toggleTheme } = useThemeToggle();

	// The theme is only known in the browser, so render nothing on the server.
	// Otherwise the server's guess could differ from the visitor's saved theme and cause a hydration error.
	if (isClient) {
		return (
			<Switch aria-label="Toggle dark mode" isSelected={theme === "dark"} onChange={toggleTheme} size="lg">
				{({ isSelected }) => (
					<Switch.Content>
						<Switch.Control>
							<Switch.Thumb>
								{/* Moon icon in dark mode, sun icon in light mode. */}
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
