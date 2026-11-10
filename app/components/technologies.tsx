// "use client" is needed for Framer Motion animations.
"use client";
import { about } from "@data";
import { Chip } from "@heroui/react";
import { motion } from "framer-motion";

// Timing of each skill icon's spin-and-hop: 2 seconds of motion, then a 5-second pause.
const DURATION = 2.0;
const REPEAT_DELAY = 5.0;

// Returns a number between 0 and 1 that looks random but is always the same for the same seed.
// Used instead of Math.random() so the server and browser render identical values (no hydration mismatch).
const pseudoRandom = (seed: number) => {
	const x = Math.sin(seed + 1) * 10000;
	return x - Math.floor(x);
};

// Skills section: one group per category (e.g. Frontend, Backend), each with its skill chips.
const Technologies = () => {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-3">
			{about.technologies.map((tech, index) => {
				// Capitalized so JSX treats it as a component.
				const Icon = tech.icon;
				return (
					<div className="flex w-full flex-col items-center justify-center gap-3" key={tech.id}>
						{/* Category title: fades in once when scrolled into view, and gently bobs up and down forever. */}
						<motion.div
							className="flex w-full items-center gap-1"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							animate={{ y: [0, -2, 0] }}
							viewport={{ once: true }}
							transition={{
								opacity: { duration: 5.0, delay: index * 0.1, ease: "easeOut" },
								y: { duration: 3.0, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 },
							}}
						>
							<Icon size={24} />
							<p className="font-semibold">{tech.name}</p>
						</motion.div>
						{/* The category's skills. */}
						<div className="flex w-full flex-wrap items-center gap-3">
							{tech.skills.map((skill, index) => {
								const Icon = skill.icon;
								// Start each icon's spin at a different moment (0–8 s), so they don't all spin together.
								const initialDelay = pseudoRandom(index) * 8;

								return (
									// Each chip slides in from the right, one shortly after another.
									<motion.div key={skill.id} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}>
										<Chip className="gap-1 whitespace-nowrap" color="default" size="lg" variant="soft">
											{/* Icon spins a full turn while hopping up, then pauses and repeats. */}
											<motion.div animate={{ rotate: [0, 360], y: [0, -10, 0] }} transition={{ duration: DURATION, repeat: Infinity, repeatType: "reverse", repeatDelay: REPEAT_DELAY, delay: initialDelay, ease: "easeInOut" }}>
												<Icon className="size-4" />
											</motion.div>
											{skill.name}
										</Chip>
									</motion.div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Technologies;
