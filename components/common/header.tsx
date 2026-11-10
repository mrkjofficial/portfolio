// "use client" is needed for the menu state, the router and Framer Motion animations.
"use client";
import Image from "next/image";
import { navItems } from "@data";
import { useState } from "react";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

// Timing of each nav icon's spin-and-hop: 2 seconds of motion, then a 5-second pause.
const DURATION = 2.0;
const REPEAT_DELAY = 5.0;

// Returns a number between 0 and 1 that looks random but is always the same for the same seed.
// Used instead of Math.random() so the server and browser render identical values (no hydration mismatch).
const pseudoRandom = (seed: number) => {
	const x = Math.sin(seed + 1) * 10000;
	return x - Math.floor(x);
};

// Sticky site header: logo, navigation links and the theme switch.
// Below the md breakpoint, the links move into a menu opened by a hamburger button.
const Header = () => {
	const router = useRouter();
	// Whether the mobile menu is open.
	const [isOpen, setIsOpen] = useState(false);

	// Go to a section (e.g. "#work") and close the mobile menu.
	const onNavItemPress = (url: string) => {
		router.push(url);
		setIsOpen(false);
	};

	return (
		<header className="border-border sticky top-0 z-20 w-full border-b backdrop-blur-sm">
			<div className="flex h-16 w-full items-center justify-between gap-2">
				<div className="flex items-center justify-center gap-1">
					{/* Hamburger / close button, only on small screens. */}
					<Button aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} className="flex md:hidden" variant="ghost" onPress={() => setIsOpen(!isOpen)}>
						{isOpen ? <X /> : <Menu />}
					</Button>
					{/* Logo and site name. priority loads the logo straight away, since it's always visible. */}
					<Button className="flex items-center gap-0" size="lg" variant="ghost">
						<Image alt="Logo" height={48} priority={true} src="/icon.webp" width={48} />
						<span className="text-accent text-xl font-semibold">MrKJOfficial</span>
					</Button>
				</div>
				<nav className="flex items-center justify-center gap-1">
					{/* Desktop links, hidden on small screens. */}
					<ul className="hidden md:flex md:items-center md:justify-center">
						{navItems.map((navItem, index) => {
							// Capitalized so JSX treats it as a component.
							const Icon = navItem.icon;
							// Start each icon's spin at a different moment (0–8 s), so they don't all spin together.
							const initialDelay = pseudoRandom(index) * 8;

							return (
								// Slides in from the left one after another; lifts on hover and shrinks slightly when pressed.
								<motion.li
									key={navItem.id}
									initial={{ opacity: 0, x: -16 }}
									animate={{ opacity: 1, x: 0 }}
									whileHover={{ y: -5, scale: 1.03 }}
									whileTap={{ scale: 0.94 }}
									transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
								>
									<Button onPress={() => onNavItemPress(navItem.src)} variant="ghost">
										{/* Icon spins a full turn while hopping up, then pauses and repeats. */}
										<motion.div animate={{ rotate: [0, 360], y: [0, -10, 0] }} transition={{ duration: DURATION, repeat: Infinity, repeatType: "reverse", repeatDelay: REPEAT_DELAY, delay: initialDelay, ease: "easeInOut" }}>
											<Icon size={16} />
										</motion.div>
										{navItem.label}
									</Button>
								</motion.li>
							);
						})}
					</ul>
					<ThemeToggle />
				</nav>
			</div>
			{/* Mobile menu. AnimatePresence lets it play its closing animation before it's removed. */}
			<AnimatePresence>
				{isOpen && (
					// Opens by growing from zero height, and closes the same way in reverse.
					<motion.nav className="border-border z-10 w-full border-t md:hidden" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
						<ul className="flex flex-col px-2 py-2">
							{navItems.map((navItem, i) => {
								const Icon = navItem.icon;
								const rand = pseudoRandom(i);
								// In the mobile menu, only icons whose value is above 0.5 (about half) spin.
								const shouldAnimate = rand > 0.5;
								const initialDelay = rand * 8;
								return (
									// Slides in from the left one after another; nudges right on hover.
									<motion.li
										key={navItem.id}
										initial={{ opacity: 0, x: -16 }}
										animate={{ opacity: 1, x: 0 }}
										whileHover={{ x: 5, scale: 1.03 }}
										whileTap={{ scale: 0.97 }}
										transition={{ duration: 0.3, delay: i * 0.06, ease: "easeOut" }}
									>
										<Button className="flex w-full items-center justify-start gap-2" onPress={() => onNavItemPress(navItem.src)} variant="ghost">
											<motion.div
												animate={shouldAnimate ? { rotate: [0, 360], y: [0, -10, 0] } : {}}
												transition={{ duration: DURATION, repeat: Infinity, repeatType: "reverse", repeatDelay: REPEAT_DELAY, delay: initialDelay, ease: "easeInOut" }}
											>
												<Icon size={16} />
											</motion.div>
											{navItem.label}
										</Button>
									</motion.li>
								);
							})}
						</ul>
					</motion.nav>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Header;
