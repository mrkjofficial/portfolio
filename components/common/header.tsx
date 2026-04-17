"use client";
import Image from "next/image";
import { navItems } from "@data";
import { useState } from "react";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const onNavItemPress = (url: string) => {
		router.push(url);
		setIsOpen(false);
	};

	return (
		<header className="bg-background border-border sticky top-0 z-10 w-full border-b">
			<div className="flex h-16 w-full items-center justify-between gap-2">
				<div className="flex items-center justify-center gap-1">
					<Button className="flex md:hidden" variant="ghost" onPress={() => setIsOpen(!isOpen)}>
						{isOpen ? <X /> : <Menu />}
					</Button>
					<Button className="flex items-center gap-0" size="lg" variant="ghost">
						<Image alt="Logo" height={48} priority={true} src="/logo.png" width={48} />
						<h1 className="text-accent text-xl font-semibold">MrKJOfficial</h1>
					</Button>
				</div>
				<nav className="flex items-center justify-center gap-1">
					<ul className="hidden md:flex md:items-center md:justify-center">
						{navItems.map((navItem, i) => {
							const Icon = navItem.icon;
							return (
								<motion.li
									key={navItem.label}
									initial={{ opacity: 0, x: -16 }}
									animate={{ opacity: 1, x: 0 }}
									whileHover={{ y: -5, scale: 1.03 }}
									whileTap={{ scale: 0.94 }}
									transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
								>
									<Button onPress={() => onNavItemPress(navItem.src)} variant="ghost">
										<Icon size={16} />
										{navItem.label}
									</Button>
								</motion.li>
							);
						})}
					</ul>
					<ThemeToggle />
				</nav>
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.nav
						className="border-border bg-background w-full border-t md:hidden"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<ul className="flex flex-col px-2 py-2">
							{navItems.map((navItem, i) => {
								const Icon = navItem.icon;
								return (
									<motion.li
										key={navItem.label}
										initial={{ opacity: 0, x: -16 }}
										animate={{ opacity: 1, x: 0 }}
										whileHover={{ x: 5, scale: 1.03 }}
										whileTap={{ scale: 0.97 }}
										transition={{ duration: 0.3, delay: i * 0.06, ease: "easeOut" }}
									>
										<Button className="flex w-full items-center justify-start gap-2" onPress={() => onNavItemPress(navItem.src)} variant="ghost">
											<Icon size={16} />
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
