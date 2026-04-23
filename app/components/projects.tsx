"use client";
import Link from "next/link";
import { about } from "@data";
import Image from "next/image";
import { useRef } from "react";
import { Card, Chip } from "@heroui/react";
import { ExternalLink } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";

const WORD_STAGGER = 0.08;
const WORD_DURATION = 0.4;
const DURATION = 2.0;
const REPEAT_DELAY = 5.0;

const pseudoRandom = (seed: number) => {
	const x = Math.sin(seed + 1) * 10000;
	return x - Math.floor(x);
};

const ThumbnailWithReveal = ({ src, alt }: { src: string; alt: string }) => {
	const ref = useRef<HTMLDivElement>(null);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 30 });
	const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 30 });

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = ref.current?.getBoundingClientRect();
		if (!rect) return;
		mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
		mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
	};

	const handleMouseLeave = () => {
		mouseX.set(0);
		mouseY.set(0);
	};

	return (
		<div style={{ perspective: 800 }} className="h-full w-full">
			<motion.div ref={ref} className="relative h-full w-full" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
				<Image alt={alt} className="border-border rounded-3xl border" fill={true} sizes="100vw, (min-width: 768px) 640px" src={src} />
			</motion.div>
		</div>
	);
};

const ProjectContent = ({ name, description, url, githubUrl }: { name: string; description: string; url: string; githubUrl: string }) => {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true });
	const words = name.split(" ");
	const descriptionDelay = (words.length - 1) * WORD_STAGGER + WORD_DURATION + 0.1;

	return (
		<div ref={ref} className="flex w-full flex-col justify-center gap-2">
			<motion.div whileHover="hover" className="flex w-fit items-center gap-1">
				<Link className="flex items-center gap-1" href={url || githubUrl} target="_blank" rel="noreferrer noopener">
					<motion.h3 className="font-semibold" variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.2, ease: "easeOut" }}>
						{words.map((word, i) => (
							<motion.span key={i} className="mr-[0.25em] inline-block" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: WORD_DURATION, delay: i * WORD_STAGGER, ease: "easeOut" }}>
								{word}
							</motion.span>
						))}
					</motion.h3>
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

const Projects = () => {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true });
	return (
		<div ref={ref} className="flex w-full flex-col justify-center gap-3" id="projects">
			<h2 className="text-2xl font-bold">
				{"Notable Projects".split(" ").map((word, i) => (
					<motion.span key={i} className="mr-[0.25em] inline-block" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: WORD_DURATION, delay: i * WORD_STAGGER, ease: "easeOut" }}>
						{word}
					</motion.span>
				))}
			</h2>
			<div className="flex w-full flex-col items-center justify-center gap-6">
				{about.projects.map(project => (
					<Card key={project.name} variant="transparent">
						<Card.Header className="relative aspect-2/1 w-full overflow-hidden">
							<ThumbnailWithReveal src={project.thumbnail} alt={project.name} />
						</Card.Header>
						<Card.Content>
							<ProjectContent name={project.name} description={project.description} url={project.url} githubUrl={project.githubUrl} />
						</Card.Content>
						<Card.Footer className="flex flex-wrap gap-2">
							{project.skills.map((skill, index) => {
								const Icon = skill.icon;
								const rand = pseudoRandom(index);
								const shouldAnimate = rand > 0.4;
								const initialDelay = rand * 8;
								return (
									<Chip color="default" key={skill?.name} variant="soft">
										<motion.div
											animate={shouldAnimate ? { rotate: [0, 360], y: [0, -10, 0] } : {}}
											transition={{ duration: DURATION, repeat: Infinity, repeatType: "reverse", repeatDelay: REPEAT_DELAY, delay: initialDelay, ease: "easeInOut" }}
										>
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
