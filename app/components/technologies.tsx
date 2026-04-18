"use client";
import { about } from "@data";
import { Chip } from "@heroui/react";
import { motion } from "framer-motion";

const DURATION = 2.0;

const pseudoRandom = (seed: number) => {
	const x = Math.sin(seed + 1) * 10000;
	return x - Math.floor(x);
};

const Technologies = () => {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-3">
			{about.technologies.map(tech => (
				<div className="flex w-full flex-col items-center justify-center gap-3" key={tech.name}>
					<motion.div className="flex w-full items-center gap-1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 5, ease: "easeOut" }}>
						<tech.icon size={24} />
						<p className="font-semibold">{tech.name}</p>
					</motion.div>
					<div className="flex w-full flex-wrap items-center gap-3">
						{tech.skills.map((skill, j) => {
							const rand = pseudoRandom(j);
							const shouldAnimate = rand > 0.5;
							const initialDelay = rand * 8;
							return (
								<motion.div key={skill.name} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: j * 0.05, ease: "easeOut" }}>
									<Chip className="gap-1" color="default" variant="soft">
										<motion.div animate={shouldAnimate ? { rotate: [0, 360], y: [0, -5, 0] } : {}} transition={{ duration: DURATION, repeat: Infinity, repeatDelay: DURATION, delay: initialDelay, ease: "easeInOut" }}>
											<skill.icon className="size-4" />
										</motion.div>
										{skill.name}
									</Chip>
								</motion.div>
							);
						})}
					</div>
				</div>
			))}
		</div>
	);
};

export default Technologies;
