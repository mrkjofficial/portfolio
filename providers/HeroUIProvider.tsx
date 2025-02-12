"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { HeroUIProvider } from "@heroui/react";

export default function Provider({ children }: { children: ReactNode }) {
	const router = useRouter();
	return <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>;
}
