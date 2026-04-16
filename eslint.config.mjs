import js from "@eslint/js";
import ts from "typescript-eslint";
import nextTs from "eslint-config-next/typescript";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	js.configs.recommended,
	ts.configs.recommended,
	eslintConfigPrettier,
	// "plugin:react-hooks/recommended",
	// "prettier",
  // Override default ignores of eslint-config-next.
  {
    plugins: {
      "react-hooks": reactHooks,
    },
  },
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
	]),
]);

export default eslintConfig;
