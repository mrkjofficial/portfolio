// "use client" is needed for Framer Motion animations.
"use client";
import { about } from "@data";
import { useRef } from "react";
import Link from "next/link";
import splitWords from "@lib/splitWords";
import { motion, useInView } from "framer-motion";
import { Avatar, Card, Chip } from "@heroui/react";
import { CalendarDays, ExternalLink } from "lucide-react";

// Heading animation: each word slides in 0.08 s after the previous one and takes 0.4 s.
const WORD_STAGGER = 0.08;
const WORD_DURATION = 0.4;

// Work experience section: one entry per job, with logo, company link, role, dates and achievements.
const Work = () => {
	const ref = useRef(null);
	// Becomes true the first time the section scrolls into view, which starts the heading animation.
	const inView = useInView(ref, { once: true });
	return (
		// id="work" is the target of the "Work" link in the navigation.
		<div ref={ref} className="flex w-full flex-col justify-center gap-3" id="work">
			<h2 className="text-2xl font-bold">
				{splitWords("Work Experience").map(({ key, word }, i) => (
					<motion.span key={key} className="mr-1 inline-block" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: WORD_DURATION, delay: i * WORD_STAGGER, ease: "easeOut" }}>
						{word}
					</motion.span>
				))}
			</h2>
			<Card className="flex w-full flex-col items-center justify-center gap-0 p-0" variant="transparent">
				{about.work.map(work => (
					// One job. Every entry except the last gets a bottom border as a divider.
					<Card.Content className="flex w-full flex-col justify-center gap-3 py-5 not-last:border-b" key={work.id}>
						<div className="xs:flex-row xs:items-center flex flex-col justify-between gap-4">
							{/* Left: logo, company and role, sliding in from the left. */}
							<motion.div className="flex items-center justify-center gap-2" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut" }}>
								<Avatar>
									<Avatar.Image alt={work.organization} src={work.logo} />
									{/* Shows the company's first letter if the logo fails to load. */}
									<Avatar.Fallback>{work.organization.charAt(0)}</Avatar.Fallback>
								</Avatar>
								{/* whileHover="hover" triggers the "hover" variants of the children below. */}
								<motion.div whileHover="hover" className="flex w-full flex-col justify-center">
									{/* Opens the company's site in a new tab; noopener stops it from controlling this tab. */}
									<Link className="flex items-center gap-1 hover:gap-2" href={work?.organizationUrl} target="_blank" rel="noreferrer noopener">
										{/* On hover, the name grows slightly and the link icon wiggles. */}
										<motion.h3 className="line-clamp-1 font-semibold break-all" variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.2, ease: "easeOut" }}>
											{work.organization}
										</motion.h3>
										<motion.div variants={{ hover: { x: [0, -3, 3, -3, 3, 0] } }} transition={{ duration: 0.4, ease: "easeInOut" }}>
											<ExternalLink size={16} />
										</motion.div>
									</Link>
									<p className="text-muted-foreground text-xs">{work.role}</p>
								</motion.div>
							</motion.div>
							{/* Right: employment dates, sliding in from the right. */}
							<motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}>
								<Chip className="whitespace-nowrap" color="default" size="lg" variant="soft">
									<CalendarDays size={16} />
									{work.startDate} - {work.endDate}
								</Chip>
							</motion.div>
						</div>
						{/* Achievements as a bullet list, each sliding in one after another. */}
						<ul className="list-inside list-disc">
							{work.achievements &&
								work.achievements.map((achievement, i) => (
									<motion.li
										className="indent-3 text-sm"
										key={achievement.id}
										initial={{ opacity: 0, x: -30 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: "easeOut" }}
									>
										{achievement.title}
									</motion.li>
								))}
						</ul>
					</Card.Content>
				))}
			</Card>
		</div>
	);
};

export default Work;
