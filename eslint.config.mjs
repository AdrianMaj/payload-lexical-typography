import { fixupConfigRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const peerDependencies = [
  "@payloadcms/richtext-lexical",
  "@payloadcms/richtext-lexical/react",
  "@payloadcms/richtext-lexical/lexical",
  "@payloadcms/richtext-lexical/client",
  "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext",
  "@payloadcms/richtext-lexical/lexical/selection",
  "@payloadcms/richtext-lexical/html",
  "@payloadcms/richtext-lexical/html-async"
];

export default [
  {
    // Ignore patterns for npm package context
    ignores: [
      "**/*.js",
      "dist/**/*",
      "coverage/**/*",
      "node_modules/**/*",
      "tsup.config.ts",
      "eslint.config.mjs",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:@typescript-eslint/stylistic-type-checked",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "prettier",
    ),
  ),
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",

      parserOptions: {
        project: "tsconfig.json",
      },
    },

    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      "import/core-modules": peerDependencies,
    },

    rules: {
      "import/order": [
        "error",
        {
          "newlines-between": "always",

          alphabetize: {
            order: "asc",
            orderImportKind: "asc",
          },

          groups: ["builtin", "external", "index", "internal", "sibling", "parent", "object", "type"],
        },
      ],

      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "import/no-mutable-exports": "error",
      "import/no-cycle": "error",
      "import/no-default-export": "error",

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
          disallowTypeAnnotations: false,
        },
      ],

      "import/no-duplicates": [
        "error",
        {
          "prefer-inline": true,
        },
      ],

      "import/namespace": ["off"],
      "no-empty-pattern": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/return-await": ["error", "in-try-catch"],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: true,
        },
      ],

      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
    },
  },
  {
    files: ["src/index.ts", "**/examples/**/*"],
    rules: {
      "import/no-default-export": "off",
    },
  },
];
