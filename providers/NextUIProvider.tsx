"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";

export default function Provider({ children }: { children: ReactNode }) {
	const router = useRouter();
	return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
}
