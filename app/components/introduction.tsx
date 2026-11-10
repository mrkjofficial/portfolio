// "use client" is needed for Framer Motion animations and the typing effect.
"use client";
import { about } from "@data";
import splitWords from "@lib/splitWords";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Each word slides in 0.08 s after the previous one and takes 0.4 s.
const WORD_STAGGER = 0.08;
const WORD_DURATION = 0.4;
// The description is typed out one character every 20 ms.
const CHAR_INTERVAL_MS = 20;

const headlineWords = splitWords(about.introduction.headline);
const subheadlineWords = splitWords(about.introduction.subHeadline);

// Animation schedule, in seconds: the subheadline starts just after the headline's last word lands,
// and the typing starts just after the subheadline's last word lands.
const subheadlineStart = (headlineWords.length - 1) * WORD_STAGGER + WORD_DURATION + 0.05;
const descriptionStart = subheadlineStart + (subheadlineWords.length - 1) * WORD_STAGGER + WORD_DURATION + 0.05;

// Opening section: headline and subheadline slide in word by word, then the description types itself out.
const Introduction = () => {
	const ref = useRef(null);
	// Becomes true the first time the section scrolls into view, which starts the animations.
	const inView = useInView(ref, { once: true });
	// The part of the description typed so far.
	const [displayed, setDisplayed] = useState("");
	const [typingDone, setTypingDone] = useState(false);

	// Typing effect: once visible, wait for the headings to finish, then add one character at a time.
	useEffect(() => {
		if (!inView) {
			return;
		}

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

		// Stop the timers if the component unmounts mid-animation.
		return () => {
			clearTimeout(timeout);
			clearInterval(interval);
		};
	}, [inView]);

	return (
		// id="home" is the target of the "Home" link in the navigation.
		<div ref={ref} className="flex w-full flex-col gap-3" id="home">
			<h1 className="text-xl font-bold">
				{headlineWords.map(({ key, word }, i) => (
					<motion.span key={key} className="mr-1 inline-block" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: WORD_DURATION, delay: i * WORD_STAGGER, ease: "easeOut" }}>
						{word}
					</motion.span>
				))}
			</h1>
			<p className="font-semibold">
				{subheadlineWords.map(({ key, word }, i) => (
					<motion.span
						key={key}
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
				{/* Invisible full copy of the description that reserves its final height, */}
				{/* so the page doesn't jump while the text is being typed. Hidden from screen readers. */}
				<p className="text-muted-foreground text-sm whitespace-pre-line opacity-0" aria-hidden>
					{about.introduction.description}
				</p>
				{/* The visible typed text, laid over the invisible copy. */}
				<p className="text-muted-foreground absolute inset-0 text-sm whitespace-pre-line">
					{displayed}
					{/* Blinking cursor, shown only while typing. */}
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
