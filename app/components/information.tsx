"use client";
import { about } from "@data";
import { motion } from "framer-motion";

const Information = () => {
	return (
		<div className="border-border flex w-full flex-col items-center justify-center border-y py-3">
			<div className="xs:justify-between flex w-full flex-wrap items-center justify-center gap-4">
				{about.information.map((info, i) => {
					const Icon = info.icon;
					return (
						<motion.div
							key={info.name}
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
