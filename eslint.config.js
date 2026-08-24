import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	svelte.configs.prettier,
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } }
	},
	{
		files: ['**/*.svelte'],
		ignores: ['eslint.config.js', 'svelte.config.js'],
		languageOptions: {
			// 1. Change the main file parser to the Svelte plugin's parser
			parser: svelte.parser,

			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				// 2. Pass TypeScript's parser here so Svelte delegates script linting
				parser: ts.parser,
				svelteConfig
			}
		}
	},
	{
		files: ['**/*.ts', '**/*.svelte'],
		rules: {
		'no-undef': 'off' // Disable because TypeScript handles this natively
	}
  }
);
