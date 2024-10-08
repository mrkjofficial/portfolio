const esConfig = [
	{
		extends: ["eslint:recommended", "next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
		parser: "@typescript-eslint/parser",
		plugins: ["@typescript-eslint"],
		root: true,
	},
];

export default esConfig;