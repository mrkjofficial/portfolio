"use client";
import { about } from "@data";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button, Chip } from "@heroui/react";
import HandwritingText from "@components/common/handwriting-text";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";

const DURATION = 2.0;
const REPEAT_DELAY = 5.0;

const pseudoRandom = (seed: number) => {
	const x = Math.sin(seed + 1) * 10000;
	return x - Math.floor(x);
};

const About = () => {
	const router = useRouter();
	const rotation = useMotionValue(0);
	const gradient = useMotionTemplate`conic-gradient(from ${rotation}deg, var(--danger) 0deg, var(--warning) 40deg, var(--success) 80deg, var(--accent) 110deg, transparent 140deg)`;

	useEffect(() => {
		const controls = animate(rotation, [0, 360], { duration: 4, repeat: Infinity, ease: "linear" });
		return () => controls.stop();
	}, [rotation]);

	return (
		<section className="flex h-full max-h-fit w-full flex-col items-center justify-start gap-6 rounded-3xl p-6 md:sticky md:top-22 md:my-6 md:h-[calc(100vh-7rem)] md:min-h-[calc(100vh-10rem)] md:w-1/3">
			<div className="relative p-1">
				<motion.div
					aria-hidden
					className="pointer-events-none absolute inset-0 rounded-full [-webkit-mask:radial-gradient(farthest-side,transparent_calc(100%-4px),white_calc(100%-4px))] [mask:radial-gradient(farthest-side,transparent_calc(100%-4px),white_calc(100%-4px))]"
					style={{ background: gradient }}
				/>
				<div className="relative p-0.5">
					<Avatar className="size-48 bg-transparent">
						<Avatar.Image alt={about.name} fetchPriority="high" loading="eager" src={about.avatarUrl} />
						<Avatar.Fallback className="text-7xl" />
					</Avatar>
					<Chip className="absolute right-0 bottom-0 z-10" color="default" size="lg" variant="secondary">
						<HandwritingText className="h-5" font="/fonts/dancing-script.ttf" text={about.name} />
					</Chip>
				</div>
			</div>
			<div className="xs:grid-cols-2 grid w-full grid-cols-1 items-center justify-center gap-3 sm:grid-cols-4 md:grid-cols-1">
				{about.links.map((link, index) => {
					const Icon = link.icon;
					const initialDelay = pseudoRandom(index) * 8;
					return (
						<motion.div
							key={link.name}
							initial={{ opacity: 0, y: 32 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileHover={{ y: -5, scale: 1.03 }}
							whileTap={{ scale: 0.94 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
						>
							<Button className="w-full" onPress={() => router.push(link.url)} size="lg" variant="outline">
								<motion.div animate={{ rotate: [0, 360], y: [0, -10, 0] }} transition={{ duration: DURATION, repeat: Infinity, repeatType: "reverse", repeatDelay: REPEAT_DELAY, delay: initialDelay, ease: "easeInOut" }}>
									<Icon />
								</motion.div>
								{link.name}
							</Button>
						</motion.div>
					);
				})}
			</div>
		</section>
	);
};

export default About;
