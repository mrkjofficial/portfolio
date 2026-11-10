// "use client" is needed for Framer Motion animations and the router.
"use client";
import { about } from "@data";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button, Chip } from "@heroui/react";
import HandwritingText from "@components/common/handwriting-text";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";

// Timing of each link icon's spin-and-hop: 2 seconds of motion, then a 5-second pause.
const DURATION = 2.0;
const REPEAT_DELAY = 5.0;

// Returns a number between 0 and 1 that looks random but is always the same for the same seed.
// Used instead of Math.random() so the server and browser render identical values (no hydration mismatch).
const pseudoRandom = (seed: number) => {
	const x = Math.sin(seed + 1) * 10000;
	return x - Math.floor(x);
};

// Profile sidebar: avatar with a spinning rainbow ring, the name drawn in handwriting, and social links.
// On medium screens and up it stays fixed while the rest of the page scrolls.
const About = () => {
	const router = useRouter();
	// Angle of the ring's gradient, animated from 0 to 360 degrees.
	const rotation = useMotionValue(0);
	// Rainbow arc that fades to transparent, rotated by the angle above.
	const gradient = useMotionTemplate`conic-gradient(from ${rotation}deg, var(--danger) 0deg, var(--warning) 40deg, var(--success) 80deg, var(--accent) 110deg, transparent 140deg)`;

	// Spin the ring once every 4 seconds, forever. Stops when the component unmounts.
	useEffect(() => {
		const controls = animate(rotation, [0, 360], { duration: 4, repeat: Infinity, ease: "linear" });
		return () => controls.stop();
	}, [rotation]);

	return (
		<section className="flex h-full max-h-fit w-full flex-col items-center justify-start gap-6 rounded-3xl p-6 md:sticky md:top-22 md:my-6 md:h-[calc(100vh-7rem)] md:min-h-[calc(100vh-10rem)] md:w-1/3">
			<div className="relative p-1">
				{/* The spinning ring: a full circle of gradient with its middle masked out, leaving a 4px ring. */}
				<motion.div
					aria-hidden
					className="pointer-events-none absolute inset-0 rounded-full [-webkit-mask:radial-gradient(farthest-side,transparent_calc(100%-4px),white_calc(100%-4px))] [mask:radial-gradient(farthest-side,transparent_calc(100%-4px),white_calc(100%-4px))]"
					style={{ background: gradient }}
				/>
				<div className="relative p-0.5">
					<Avatar className="size-48 rounded-full bg-transparent">
						{/* Loaded eagerly at high priority because it's one of the first things visible. */}
						<Avatar.Image alt={about.name} fetchPriority="high" loading="eager" src={about.avatarUrl} />
						<Avatar.Fallback className="text-7xl" />
					</Avatar>
					{/* Name badge on the avatar's bottom-right, written out as if by hand. */}
					<Chip className="absolute right-0 bottom-0 z-10" color="default" size="lg" variant="secondary">
						<HandwritingText className="h-5" font="/fonts/dancing-script.ttf" text={about.name} />
					</Chip>
				</div>
			</div>
			{/* Social and resume links: 1 column, then 2 from 512px, 4 from 640px, and back to 1 from 768px (the sidebar layout). */}
			<div className="xs:grid-cols-2 grid w-full grid-cols-1 items-center justify-center gap-3 sm:grid-cols-4 md:grid-cols-1">
				{about.links.map((link, index) => {
					// Capitalized so JSX treats it as a component.
					const Icon = link.icon;
					// Start each icon's spin at a different moment (0–8 s), so they don't all spin together.
					const initialDelay = pseudoRandom(index) * 8;
					return (
						// Slides up into view one after another; lifts on hover and shrinks slightly when pressed.
						<motion.div
							key={link.id}
							initial={{ opacity: 0, y: 32 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileHover={{ y: -5, scale: 1.03 }}
							whileTap={{ scale: 0.94 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
						>
							<Button className="w-full" onPress={() => router.push(link.url)} size="lg" variant="outline">
								{/* Icon spins a full turn while hopping up, then pauses and repeats. */}
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
