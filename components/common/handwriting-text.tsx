"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import opentype, { type Font } from "opentype.js";

const FONT_CACHE = new Map<string, Font>();

type SvgData = {
	paths: string[];
	width: number;
	height: number;
};

type EasingFunction = (t: number) => number;
type Easing = [number, number, number, number] | "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" | EasingFunction;

export type HandwritingTextProps = {
	/** Tailwind / CSS class for sizing the SVG (e.g. `"h-5"`). */
	className?: string;
	/** Seconds before the animation begins. @default 0 */
	delay?: number;
	/** Seconds each character takes to draw. @default 0.4 */
	duration?: number;
	/** Framer Motion easing for the stroke draw. @default "easeInOut" */
	ease?: Easing;
	/** URL to a TTF font file. */
	font: string;
	/** Internal SVG coordinate font size. Higher = more path detail. @default 60 */
	fontSize?: number;
	/** Seconds between each character starting. @default 0.25 */
	stagger?: number;
	/** Stroke width in SVG units. @default 3 */
	strokeWidth?: number;
	/** Text to render as handwriting. */
	text: string;
};

const loadFont = async (url: string) => {
	const cached = FONT_CACHE.get(url);
	if (cached) {
		return Promise.resolve(cached);
	} else {
		return opentype.load(url).then(font => {
			FONT_CACHE.set(url, font);
			return font;
		});
	}
};

const HandwritingText = ({ className, delay = 0, duration = 0.4, ease = "easeInOut", font, fontSize = 60, strokeWidth = 3, stagger = 0.25, text }: HandwritingTextProps) => {
	const [svgData, setSvgData] = useState<SvgData | null>(null);

	useEffect(() => {
		let cancelled = false;

		loadFont(font)
			.then(font => {
				if (cancelled) {
					return;
				}

				const ascender = (font.ascender / font.unitsPerEm) * fontSize;
				const height = ascender + Math.abs(font.descender / font.unitsPerEm) * fontSize;

				let curX = 0;
				const paths: string[] = [];

				for (const char of text) {
					const glyph = font.charToGlyph(char);
					if (char !== " " && glyph.path.commands.length > 0) {
						const d = glyph.getPath(curX, ascender, fontSize).toPathData(2);
						if (d) paths.push(d);
					}
					curX += ((glyph.advanceWidth ?? 0) / font.unitsPerEm) * fontSize;
				}

				setSvgData({ paths, width: curX, height });
			})
			.catch(console.error);

		return () => {
			cancelled = true;
		};
	}, [font, fontSize, text]);

	if (!svgData) {
		return (
			<span className={className} style={{ opacity: 0, whiteSpace: "nowrap" }}>
				{text}
			</span>
		);
	} else {
		return (
			<svg className={className} style={{ width: "auto", overflow: "visible", display: "block" }} viewBox={`0 0 ${svgData.width} ${svgData.height}`} width={svgData.width} height={svgData.height}>
				{svgData.paths.map((d, i) => (
					<motion.path
						animate={{ pathLength: 1, fillOpacity: 1, strokeOpacity: 1 }}
						d={d}
						fill="currentColor"
						initial={{ pathLength: 0, fillOpacity: 0, strokeOpacity: 0 }}
						key={i}
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={strokeWidth}
						transition={{
							fillOpacity: { duration: duration * 0.75, delay: delay + i * stagger + duration },
							pathLength: { duration, delay: delay + i * stagger, ease },
							strokeOpacity: { duration: 0, delay: delay + i * stagger },
						}}
					/>
				))}
			</svg>
		);
	}
};

export default HandwritingText;
