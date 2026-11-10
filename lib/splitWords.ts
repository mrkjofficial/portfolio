// One word of a heading, plus a React key that stays unique even when the same word repeats.
export type Word = {
	key: string;
	word: string;
};

// Splits a heading into words so each one can be animated separately.
// Keys are "word-occurrence" (e.g. "the-0", "the-1"), which are stable across renders,
// unlike array indexes, and never collide when a word appears more than once.
const splitWords = (text: string): Word[] => {
	// How many times each word has been seen so far.
	const seen = new Map<string, number>();

	return text.split(" ").map(word => {
		const occurrence = seen.get(word) ?? 0;
		seen.set(word, occurrence + 1);
		return { key: `${word}-${occurrence}`, word };
	});
};

export default splitWords;
