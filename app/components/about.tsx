"use client";
import { about } from "@data";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { animate, motion } from "framer-motion";
import { Avatar, Button, Chip, Surface } from "@heroui/react";
import HandwritingText from "@/components/common/handwriting-text";

const About = () => {
	const router = useRouter();
	const ringRef = useRef<HTMLDivElement>(null);
	const glowRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const setGradient = (value: number) => {
			const bg = `conic-gradient(from ${value}deg, var(--danger) 0deg, var(--warning) 40deg, var(--success) 80deg, var(--accent) 110deg, transparent 140deg)`;
			if (ringRef.current) ringRef.current.style.background = bg;
			if (glowRef.current) glowRef.current.style.background = bg;
		};
		setGradient(0);
		const controls = animate(0, 360, { duration: 4, repeat: Infinity, ease: "linear", onUpdate: setGradient });
		return () => controls.stop();
	}, []);

	return (
		<Surface className="flex h-full max-h-fit w-full flex-col items-center justify-start gap-6 rounded-3xl p-6 md:sticky md:top-22 md:my-6 md:min-h-[calc(100vh-10rem)]">
			<div className="relative">
				<div aria-hidden className="absolute -inset-2 rounded-full opacity-60 blur-xl" ref={glowRef} />
				<div className="relative rounded-full p-1" ref={ringRef}>
					<div className="bg-background relative rounded-full p-0.5">
						<Avatar className="size-48">
							<Avatar.Image alt={about.name} src={about.avatarUrl} />
							<Avatar.Fallback className="text-7xl" />
						</Avatar>
						<Chip className="absolute right-0 bottom-0 z-50" color="default" size="lg" variant="secondary">
							<HandwritingText className="h-5" font="/fonts/dancing-script.ttf" text={about.name} />
						</Chip>
					</div>
				</div>
			</div>
			<div className="xs:grid-cols-2 grid w-full grid-cols-1 items-center justify-center gap-3 sm:grid-cols-4 md:grid-cols-1">
				{about.links.map((link, index) => (
					<motion.div key={link.name} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -5, scale: 1.03 }} whileTap={{ scale: 0.94 }} transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}>
						<Button className="w-full" onPress={() => router.push(link.url)} size="lg" variant="outline">
							<link.icon />
							{link.name}
						</Button>
					</motion.div>
				))}
			</div>
		</Surface>
	);
};

export default About;
