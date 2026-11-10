// "use client" is needed for Framer Motion animations.
"use client";
import { about } from "@data";
import { motion } from "framer-motion";

// Row of quick facts under the introduction (each with an icon, a value and a label), from about.information in data/index.ts.
const Information = () => {
	return (
		<div className="border-border flex w-full flex-col items-center justify-center border-y py-3">
			<div className="xs:justify-between flex w-full flex-wrap items-center justify-center gap-4">
				{about.information.map((info, i) => {
					// Capitalized so JSX treats it as a component.
					const Icon = info.icon;
					return (
						// Fades in once when scrolled into view, and bobs up and down forever from the start.
						// Each item's delays are offset by its position, so they don't all move in sync.
						<motion.div
							key={info.id}
							className="xs:w-auto flex w-40 items-center justify-center gap-2"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							animate={{ y: [0, -5, 0] }}
							viewport={{ once: true }}
							transition={{
								opacity: { duration: 5.0, delay: i * 0.1, ease: "easeOut" },
								y: { duration: 3.0, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
							}}
						>
							<Icon size={40} strokeWidth={1} />
							<div className="flex flex-col">
								<p className="font-medium">{info.value}</p>
								<span className="text-muted-foreground text-xs">{info.name}</span>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
};

export default Information;
