"use client";
import { about } from "@data";
import { Chip } from "@heroui/react";
import { motion } from "framer-motion";

const DURATION = 2.0;
const REPEAT_DELAY = 5.0;

const pseudoRandom = (seed: number) => {
	const x = Math.sin(seed + 1) * 10000;
	return x - Math.floor(x);
};

const Technologies = () => {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-3">
			{about.technologies.map((tech, i) => {
				const Icon = tech.icon;
				return (
					<div className="flex w-full flex-col items-center justify-center gap-3" key={tech.name}>
						<motion.div
							className="flex w-full items-center gap-1"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							animate={{ y: [0, -2, 0] }}
							viewport={{ once: true }}
							transition={{
								opacity: { duration: 5.0, delay: i * 0.1, ease: "easeOut" },
								y: { duration: 3.0, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
							}}
						>
							<Icon size={24} />
							<p className="font-semibold">{tech.name}</p>
						</motion.div>
						<div className="flex w-full flex-wrap items-center gap-3">
							{tech.skills.map((skill, j) => {
								const Icon = skill.icon;
								const rand = pseudoRandom(j);
								const shouldAnimate = rand > 0.5;
								const initialDelay = rand * 8;
								return (
									<motion.div key={skill.name} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: j * 0.05, ease: "easeOut" }}>
										<Chip className="gap-1" color="default" variant="soft">
											<motion.div
												animate={shouldAnimate ? { rotate: [0, 360], y: [0, -10, 0] } : {}}
												transition={{ duration: DURATION, repeat: Infinity, repeatType: "reverse", repeatDelay: REPEAT_DELAY, delay: initialDelay, ease: "easeInOut" }}
											>
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
