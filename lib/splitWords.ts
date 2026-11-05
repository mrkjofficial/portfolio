export type Word = {
	key: string;
	word: string;
};

const splitWords = (text: string): Word[] => {
	const seen = new Map<string, number>();

	return text.split(" ").map(word => {
		const occurrence = seen.get(word) ?? 0;
		seen.set(word, occurrence + 1);
		return { key: `${word}-${occurrence}`, word };
	});
};

export default splitWords;
