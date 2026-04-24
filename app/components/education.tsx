"use client";
import { about } from "@data";
import { useRef } from "react";
import { CalendarDays } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Avatar, Card, Chip } from "@heroui/react";

const WORD_STAGGER = 0.08;
const WORD_DURATION = 0.4;

const Education = () => {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true });

	return (
		<div ref={ref} className="flex w-full flex-col justify-center gap-3" id="education">
			<h2 className="text-2xl font-bold">
				{"Education".split(" ").map((word, i) => (
					<motion.span key={i} className="mr-1 inline-block" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: WORD_DURATION, delay: i * WORD_STAGGER, ease: "easeOut" }}>
						{word}
					</motion.span>
				))}
			</h2>
			<Card className="flex w-full flex-col items-center justify-center gap-0 px-2 py-3" variant="transparent">
				{about.education.map((education, index) => (
					<Card.Content className="flex w-full flex-col justify-center gap-3 p-3 not-last:border-b" key={index}>
						<div className="xs:flex-row xs:items-center flex flex-col justify-between gap-4">
							<motion.div className="flex items-center justify-center gap-2" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut" }}>
								<Avatar>
									<Avatar.Image alt={education.institution} src={education.logo} />
									<Avatar.Fallback>{education.institution.charAt(0)}</Avatar.Fallback>
								</Avatar>
								<div className="flex w-full flex-col justify-center">
									<h3 className="line-clamp-1 font-semibold break-all">{education.institution}</h3>
									<p className="text-muted-foreground text-xs">{education.degree}</p>
								</div>
							</motion.div>
							<motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}>
								<Chip color="default" variant="soft">
									<CalendarDays size={16} />
									{education.startDate} - {education.endDate}
								</Chip>
							</motion.div>
						</div>
						<ul className="list-inside list-disc">
							{education.achievements &&
								education.achievements.map((achievement, i) => (
									<motion.li className="indent-3 text-sm" key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: "easeOut" }}>
										{achievement}
									</motion.li>
								))}
						</ul>
					</Card.Content>
				))}
			</Card>
		</div>
	);
};

export default Education;
