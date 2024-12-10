// https://eslint.org/docs/latest/use/configure/migration-guide

import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const config = [{
    ignores: ['**/.next/**', '.next/**']
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "next/core-web-vitals",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        parser: tsParser,
    },

    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json'
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
                moduleDirectory: ['node_modules'],
                paths: ['.'],
                alias: {
                    '@': './src'
                }
            }
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        }
    },

    rules: {
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc'
                },
                pathGroups: [
                    {
                        pattern: "react",
                        group: "external",
                        position: "before"
                    },
                    {
                        pattern: "{next,next/**}",
                        group: "external",
                        position: "before"
                    },
                    {
                        pattern: "@/lib/utils",
                        group: "internal",
                        position: "after"
                    },
                    {
                        pattern: "@/lib/**",
                        group: "internal",
                        position: "after"
                    },
                    {
                        pattern: "@/hooks/**",
                        group: "internal",
                        position: "after"
                    },
                    {
                        pattern: "@/providers/**",
                        group: "internal",
                        position: "after"
                    },
                    {
                        pattern: "@/app/**",
                        group: "internal",
                        position: "after"
                    },
                    {
                        pattern: "@/components/ui/**",
                        group: "internal",
                        position: "after"
                    },
                    {
                        pattern: "@/components/**",
                        group: "internal",
                        position: "after"
                    },
                    {
                        pattern: "@/stores/**",
                        group: "internal",
                        position: "after"
                    },
                    {
                        pattern: "@/types/**",
                        group: "internal",
                        position: "after"
                    },
                    {
                        pattern: "@heroicons/**",
                        group: "internal",
                        position: "after"
                    },
                    {
                        pattern: "@/**",
                        group: "internal",
                        position: "after"
                    }
                ],
                pathGroupsExcludedImportTypes: ['react', 'next']
            }
        ],
    },
}];

export default config;