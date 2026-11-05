import js from "@eslint/js";
import globals from "globals";
import ts from "typescript-eslint";
import next from "@next/eslint-plugin-next";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import { importX } from "eslint-plugin-import-x";
import eslintReact from "@eslint-react/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const sourceFiles = ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"];

const eslintConfig = defineConfig([
	{
		...next.configs["core-web-vitals"],
		files: sourceFiles,
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	{
		name: "portfolio/import-rules",
		files: sourceFiles,
		plugins: {
			"import-x": importX,
		},
		rules: {
			"import-x/no-anonymous-default-export": "warn",
		},
	},
	{
		...eslintReact.configs.recommended,
		files: sourceFiles,
	},
	{
		name: "portfolio/jsx-accessibility",
		files: ["**/*.{jsx,tsx}"],
		plugins: {
			"jsx-a11y-x": jsxA11y,
		},
		rules: {
			"jsx-a11y-x/alt-text": [
				"warn",
				{
					elements: ["img"],
					img: ["Image"],
				},
			],
			"jsx-a11y-x/aria-props": "warn",
			"jsx-a11y-x/aria-proptypes": "warn",
			"jsx-a11y-x/aria-unsupported-elements": "warn",
			"jsx-a11y-x/role-has-required-aria-props": "warn",
			"jsx-a11y-x/role-supports-aria-props": "warn",
		},
	},
	js.configs.recommended,
	...ts.configs.recommended,
	{
		rules: {
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-unused-expressions": "warn",
		},
	},
	eslintConfigPrettier,
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".playwright/**"]),
]);

export default eslintConfig;
