"use client";
import { logo } from "@assets";
import Image from "next/image";
import { useState } from "react";
import NextLink from "next/link";
import { menuItems } from "@data";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Tooltip } from "@heroui/react";

const NavbarComponent = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const { theme, setTheme } = useTheme();

	function toggleTheme() {
		setTheme(theme === "light" ? "dark" : "light");
	}

	return (
		<Navbar classNames={{ base: "px-6", wrapper: "px-0" }} isMenuOpen={isMenuOpen} maxWidth="2xl" onMenuOpenChange={setIsMenuOpen}>
			<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="xs:hidden" />
			<NavbarBrand>
				<Link as={NextLink} href="/">
					<Image alt="Logo" className="size-16" priority={true} src={logo} />
					<h1 className="ml-1 text-xl font-semibold text-primary">MrKJOfficial</h1>
				</Link>
			</NavbarBrand>
			<NavbarContent justify="end">
				<NavbarItem>
					<Tooltip color="default" content={theme === "light" ? "Dark Mode" : "Light Mode"} placement="bottom">
						<Button aria-label="Toggle Theme" color="default" isIconOnly onPress={toggleTheme} size="lg" variant="light">
							{theme === "light" ? <Moon className="text-foreground" /> : <Sun className="text-foreground" />}
						</Button>
					</Tooltip>
				</NavbarItem>
				{menuItems?.map((item: MenuItem) => (
					<NavbarItem className="hidden xs:list-item" key={item?.id}>
						<Link as={NextLink} color="foreground" href={item?.path}>
							{item?.title}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			<NavbarMenu>
				{menuItems?.map((item: MenuItem, index: number) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link as={NextLink} color="foreground" href={item?.path} isBlock onPress={() => setIsMenuOpen(false)} size="lg">
							{item?.title}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
};

export default NavbarComponent;
