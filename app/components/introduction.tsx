"use client";
import { about } from "@data";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const WORD_STAGGER = 0.08;
const WORD_DURATION = 0.4;
const CHAR_INTERVAL_MS = 20;

const headlineWords = about.introduction.headline.split(" ");
const subheadlineWords = about.introduction.subHeadline.split(" ");

const subheadlineStart = (headlineWords.length - 1) * WORD_STAGGER + WORD_DURATION + 0.05;
const descriptionStart = subheadlineStart + (subheadlineWords.length - 1) * WORD_STAGGER + WORD_DURATION + 0.05;

const Introduction = () => {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true });
	const [displayed, setDisplayed] = useState("");
	const [typingDone, setTypingDone] = useState(false);

	useEffect(() => {
		if (!inView) return;

		let interval: ReturnType<typeof setInterval>;

		const timeout = setTimeout(() => {
			let i = 0;
			interval = setInterval(() => {
				setDisplayed(about.introduction.description.slice(0, i + 1));
				i++;
				if (i === about.introduction.description.length) {
					clearInterval(interval);
					setTypingDone(true);
				}
			}, CHAR_INTERVAL_MS);
		}, descriptionStart * 1000);

		return () => {
			clearTimeout(timeout);
			clearInterval(interval);
		};
	}, [inView]);

	return (
		<div ref={ref} className="flex w-full flex-col gap-3" id="home">
			<h1 className="text-2xl font-bold">
				{headlineWords.map((word, i) => (
					<motion.span key={i} className="mr-1 inline-block" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: WORD_DURATION, delay: i * WORD_STAGGER, ease: "easeOut" }}>
						{word}
					</motion.span>
				))}
			</h1>
			<p className="font-semibold">
				{subheadlineWords.map((word, i) => (
					<motion.span
						key={i}
						className="mr-1 inline-block"
						initial={{ opacity: 0, x: -20 }}
						animate={inView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: WORD_DURATION, delay: subheadlineStart + i * WORD_STAGGER, ease: "easeOut" }}
					>
						{word}
					</motion.span>
				))}
			</p>
			<div className="relative">
				<p className="text-muted-foreground text-sm whitespace-pre-line opacity-0" aria-hidden>
					{about.introduction.description}
				</p>
				<p className="text-muted-foreground absolute inset-0 text-sm whitespace-pre-line">
					{displayed}
					{!typingDone && displayed.length > 0 && (
						<motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}>
							|
						</motion.span>
					)}
				</p>
			</div>
		</div>
	);
};

export default Introduction;
