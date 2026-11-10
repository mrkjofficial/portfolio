// "use client" is needed for Framer Motion animations and pointer tracking.
"use client";
import Link from "next/link";
import { about } from "@data";
import Image from "next/image";
import { Card, Chip } from "@heroui/react";
import { ExternalLink } from "lucide-react";
import splitWords from "@lib/splitWords";
import { type MouseEvent, type TouchEvent, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";

// Heading animation: each word slides in 0.08 s after the previous one and takes 0.4 s.
const WORD_STAGGER = 0.08;
const WORD_DURATION = 0.4;
// Timing of each skill icon's spin-and-hop: 2 seconds of motion, then a 5-second pause.
const DURATION = 2.0;
const REPEAT_DELAY = 5.0;

// Returns a number between 0 and 1 that looks random but is always the same for the same seed.
// Used instead of Math.random() so the server and browser render identical values (no hydration mismatch).
const pseudoRandom = (seed: number) => {
	const x = Math.sin(seed + 1) * 10000;
	return x - Math.floor(x);
};

// Project screenshot that tilts in 3D towards the mouse or finger, and springs back flat when released.
const ThumbnailWithReveal = ({ src, alt }: { src: string; alt: string }) => {
	const ref = useRef<HTMLDivElement>(null);
	// Pointer position relative to the image's centre, from -0.5 (left/top edge) to 0.5 (right/bottom edge).
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	// Turn the pointer position into a tilt of up to 12 degrees, smoothed with a spring so it doesn't jerk.
	const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 30 });
	const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 30 });

	// Track the mouse over the image.
	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		const rect = ref.current?.getBoundingClientRect();
		if (!rect) {
			return;
		}
		mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
		mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
	};

	// Mouse left: tilt back to flat.
	const handleMouseLeave = () => {
		mouseX.set(0);
		mouseY.set(0);
	};

	// Same as mouse tracking, but for the first finger on touch screens.
	const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
		const touch = e.touches[0];
		const rect = ref.current?.getBoundingClientRect();
		if (!rect || !touch) {
			return;
		}
		mouseX.set((touch.clientX - rect.left) / rect.width - 0.5);
		mouseY.set((touch.clientY - rect.top) / rect.height - 0.5);
	};

	// Finger lifted: tilt back to flat.
	const handleTouchEnd = () => {
		mouseX.set(0);
		mouseY.set(0);
	};

	return (
		// perspective gives the tilt real 3D depth instead of looking like a flat skew.
		<div style={{ perspective: 800 }} className="size-full">
			<motion.div
				ref={ref}
				className="border-border relative size-full rounded-3xl border"
				style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				{/* fill makes the image cover its box; sizes tells the browser which image width to download. */}
				<Image alt={alt} className="rounded-3xl" fill={true} sizes="100vw, (min-width: 768px) 640px" src={src} />
			</motion.div>
		</div>
	);
};

// A project's title (linked) and description, animated when first scrolled into view.
const ProjectContent = ({ name, description, url, githubUrl }: { name: string; description: string; url: string; githubUrl: string }) => {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true });
	const words = splitWords(name);
	// Show the description just after the title's last word has landed.
	const descriptionDelay = (words.length - 1) * WORD_STAGGER + WORD_DURATION + 0.1;

	return (
		<div ref={ref} className="flex w-full flex-col justify-center gap-2">
			{/* whileHover="hover" triggers the "hover" variants of the children below. */}
			<motion.div whileHover="hover" className="flex w-fit items-center gap-1">
				{/* Links to the live site, or to GitHub if there isn't one. Opens in a new tab. */}
				<Link className="flex items-center gap-1 hover:gap-2" href={url || githubUrl} target="_blank" rel="noreferrer noopener">
					{/* Title slides in word by word, and grows slightly on hover. */}
					<motion.h3 className="font-semibold" variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.2, ease: "easeOut" }}>
						{words.map(({ key, word }, i) => (
							<motion.span key={key} className="mr-1 inline-block" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: WORD_DURATION, delay: i * WORD_STAGGER, ease: "easeOut" }}>
								{word}
							</motion.span>
						))}
					</motion.h3>
					{/* Link icon wiggles on hover. */}
					<motion.div variants={{ hover: { x: [0, -3, 3, -3, 3, 0] } }} transition={{ duration: 0.4, ease: "easeInOut" }}>
						<ExternalLink size={16} />
					</motion.div>
				</Link>
			</motion.div>
			<motion.p className="text-muted-foreground text-sm" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: WORD_DURATION, delay: descriptionDelay, ease: "easeOut" }}>
				{description}
			</motion.p>
		</div>
	);
};

// Projects section: one card per project with a tilting screenshot, title, description and skill chips.
const Projects = () => {
	const ref = useRef(null);
	// Becomes true the first time the section scrolls into view, which starts the heading animation.
	const inView = useInView(ref, { once: true });
	return (
		// id="projects" is the target of the "Projects" link in the navigation.
		<div ref={ref} className="flex w-full flex-col justify-center gap-3" id="projects">
			<h2 className="text-2xl font-bold">
				{splitWords("Notable Projects").map(({ key, word }, i) => (
					<motion.span key={key} className="mr-1 inline-block" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: WORD_DURATION, delay: i * WORD_STAGGER, ease: "easeOut" }}>
						{word}
					</motion.span>
				))}
			</h2>
			<div className="flex w-full flex-col items-center justify-center gap-10">
				{about.projects.map(project => (
					// overflow-visible so the tilted screenshot isn't clipped at the card's edges.
					<Card className="overflow-visible p-0" key={project.id} variant="transparent">
						{/* Screenshot area with a fixed 2:1 shape. */}
						<Card.Header className="relative aspect-2/1 w-full">
							<ThumbnailWithReveal src={project.thumbnail} alt={project.name} />
						</Card.Header>
						<Card.Content>
							<ProjectContent name={project.name} description={project.description} url={project.url} githubUrl={project.githubUrl} />
						</Card.Content>
						{/* Technologies used in the project. */}
						<Card.Footer className="flex flex-wrap gap-2">
							{project.skills.map((skill, index) => {
								// Capitalized so JSX treats it as a component.
								const Icon = skill.icon;
								// Start each icon's spin at a different moment (0–8 s), so they don't all spin together.
								const initialDelay = pseudoRandom(index) * 8;

								return (
									<Chip className="gap-1 whitespace-nowrap" color="default" key={skill.id} size="lg" variant="soft">
										{/* Icon spins a full turn while hopping up, then pauses and repeats. */}
										<motion.div animate={{ rotate: [0, 360], y: [0, -10, 0] }} transition={{ duration: DURATION, repeat: Infinity, repeatType: "reverse", repeatDelay: REPEAT_DELAY, delay: initialDelay, ease: "easeInOut" }}>
											<Icon className="size-4" />
										</motion.div>
										{skill.name}
									</Chip>
								);
							})}
						</Card.Footer>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Projects;
