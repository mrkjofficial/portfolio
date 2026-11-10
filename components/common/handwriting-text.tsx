// "use client" is needed because the font is loaded and parsed in the browser.
"use client";
import type { Font, Path } from "opentype.js";
import { motion } from "framer-motion";
import * as opentype from "opentype.js";
import { useEffect, useState } from "react";

// Fonts already requested, by URL, so each font file is downloaded and parsed only once.
// It stores the promise rather than the font, so two components asking at once share one download.
const FONT_CACHE = new Map<string, Promise<Font>>();

type Glyph = {
	/** SVG path data for one drawn character. */
	d: string;
	/** Stable React key: the character's position in the source text. */
	key: string;
};

// Everything needed to draw the text as an SVG.
type SvgData = {
	glyphs: Glyph[];
	width: number;
	height: number;
};

// The easing options Framer Motion accepts: a cubic-bezier, a named curve, or a custom function.
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

// Downloads and parses a font file, reusing the cached result if it was requested before.
const loadFont = async (url: string) => {
	const cached = FONT_CACHE.get(url);
	if (cached) {
		return cached;
	}

	const fontPromise = fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Failed to load font at ${url}: ${response.status} ${response.statusText}`);
			}

			return response.arrayBuffer();
		})
		.then(buffer => opentype.parse(buffer));

	FONT_CACHE.set(url, fontPromise);
	// If loading fails, forget it so a later attempt can try again instead of reusing the failure.
	void fontPromise.catch(() => FONT_CACHE.delete(url));
	return fontPromise;
};

// Converts an opentype.js path into an SVG path string (the "d" attribute).
// Numbers are rounded to 2 decimals to keep the string short.
const pathToData = (path: Path) => {
	const format = (value: number) => Number(value.toFixed(2)).toString();

	return path.commands
		.map(command => {
			switch (command.type) {
				// Move to, or draw a line to, a point.
				case "M":
				case "L":
					return `${command.type}${format(command.x)} ${format(command.y)}`;
				// Quadratic curve: one control point, then the end point.
				case "Q":
					return `Q${format(command.x1)} ${format(command.y1)} ${format(command.x)} ${format(command.y)}`;
				// Cubic curve: two control points, then the end point.
				case "C":
					return `C${format(command.x1)} ${format(command.y1)} ${format(command.x2)} ${format(command.y2)} ${format(command.x)} ${format(command.y)}`;
				// Close the shape.
				case "Z":
					return "Z";
			}
		})
		.join("");
};

// Draws text as if written by hand: each letter's outline is traced, then filled in, one letter after another.
// It turns each character into an SVG path using the given font, then animates the paths with Framer Motion.
const HandwritingText = ({ className, delay = 0, duration = 0.4, ease = "easeInOut", font, fontSize = 60, strokeWidth = 3, stagger = 0.25, text }: HandwritingTextProps) => {
	const [svgData, setSvgData] = useState<SvgData | null>(null);

	// Load the font and build the letter paths whenever the font, size or text changes.
	useEffect(() => {
		// Set when the component unmounts or the inputs change, so a slow, outdated load doesn't overwrite newer data.
		let cancelled = false;

		loadFont(font)
			.then(font => {
				if (cancelled) {
					return;
				}

				// Font metrics are in "font units"; scale them to fontSize.
				// ascender: height above the baseline. The total height adds the part below it (descender).
				const ascender = (font.ascender / font.unitsPerEm) * fontSize;
				const height = ascender + Math.abs(font.descender / font.unitsPerEm) * fontSize;

				// Horizontal position of the next character.
				let curX = 0;
				const glyphs: Glyph[] = [];

				// Array.from splits by Unicode code point, so characters like emoji aren't cut in half.
				for (const [position, char] of Array.from(text).entries()) {
					const glyph = font.charToGlyph(char);
					const path = glyph.getPath(curX, ascender, fontSize);
					// Spaces and empty glyphs have nothing to draw, but still take up width.
					if (char !== " " && path.commands.length > 0) {
						const d = pathToData(path);
						if (d) glyphs.push({ d, key: `${position}-${char}` });
					}
					// Move right by this character's width.
					curX += ((glyph.advanceWidth ?? 0) / font.unitsPerEm) * fontSize;
				}

				setSvgData({ glyphs, width: curX, height });
			})
			.catch(console.error);

		return () => {
			cancelled = true;
		};
	}, [font, fontSize, text]);

	if (!svgData) {
		// While the font loads, render the text invisibly so it takes up roughly the right space.
		return (
			<span className={className} style={{ opacity: 0, whiteSpace: "nowrap" }}>
				{text}
			</span>
		);
	} else {
		return (
			// The viewBox matches the measured text size; className (e.g. "h-5") scales it to fit.
			<svg className={className} style={{ width: "auto", overflow: "visible", display: "block" }} viewBox={`0 0 ${svgData.width} ${svgData.height}`} width={svgData.width} height={svgData.height}>
				{svgData.glyphs.map(({ d, key }, i) => (
					// One letter. pathLength animates from 0 to 1, which traces the outline like a pen.
					// Letter i starts "stagger" seconds after the one before it.
					<motion.path
						animate={{ pathLength: 1, fillOpacity: 1, strokeOpacity: 1 }}
						d={d}
						fill="currentColor"
						initial={{ pathLength: 0, fillOpacity: 0, strokeOpacity: 0 }}
						key={key}
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={strokeWidth}
						transition={{
							// The fill fades in only after this letter's outline has finished drawing.
							fillOpacity: { duration: duration * 0.75, delay: delay + i * stagger + duration },
							pathLength: { duration, delay: delay + i * stagger, ease },
							// The stroke appears instantly when this letter starts, so nothing shows before then.
							strokeOpacity: { duration: 0, delay: delay + i * stagger },
						}}
					/>
				))}
			</svg>
		);
	}
};

export default HandwritingText;
