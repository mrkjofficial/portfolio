"use client";
import Image from "next/image";
import { navItems } from "@data";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { Button, cn } from "@heroui/react";
import { useRouter } from "next/navigation";

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
						{navItems.map(navItem => {
							const Icon = navItem.icon;
							return (
								<li key={navItem.label}>
									<Button onPress={() => onNavItemPress(navItem.src)} variant="ghost">
										<Icon size={16} />
										{navItem.label}
									</Button>
								</li>
							);
						})}
					</ul>
					<ThemeToggle />
				</nav>
			</div>
			<nav className={cn("border-border bg-background w-full border-t transition-all duration-300 ease-in-out md:hidden", isOpen ? "block" : "hidden")}>
				<ul className="flex flex-col px-2 py-2">
					{navItems.map(navItem => {
						const Icon = navItem.icon;
						return (
							<li key={navItem.label}>
								<Button className="flex w-full items-center justify-start gap-2" onPress={() => onNavItemPress(navItem.src)} variant="ghost">
									<Icon size={16} />
									{navItem.label}
								</Button>
							</li>
						);
					})}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
