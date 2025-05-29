import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
      "plugin:import/errors",
      "plugin:import/warnings",
    ],
    plugins: ["jsx-a11y", "prettier", "import"],
    rules: {
      semi: ["error", "always"],
      "import/no-named-as-default": 0,
      "react/jsx-filename-extension": [
        1,
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
        },
      ],
      "react/jsx-props-no-spreading": "off",
      "prefer-object-spread": "off",
      "no-nested-ternary": "off",
      "react/prop-types": "off",
      camelcase: "off",
      // "no-unneeded-ternary": "off",
      "react/destructuring-assignment": "off",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "sibling", "unknown"],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "react-dom", group: "external", position: "before" },
            {
              pattern: "react-router-dom",
              group: "external",
              position: "before",
            },
            { pattern: "react-redux", group: "external", position: "before" },
            { pattern: "react-*", group: "external", position: "before" },
            { pattern: "react-*/**", group: "external", position: "before" },
            { pattern: "routes", group: "internal", position: "before" },
            { pattern: "API/**", group: "internal", position: "before" },
            { pattern: "Constants", group: "internal", position: "before" },
            { pattern: "hooks", group: "internal", position: "before" },
            { pattern: "utils", group: "internal", position: "before" },
            { pattern: "utils/**", group: "internal", position: "before" },
            { pattern: "redux/**", group: "internal", position: "before" },
            { pattern: "layouts/**", group: "internal", position: "before" },
            { pattern: "components/**", group: "internal", position: "before" },
            { pattern: "assets/**", group: "sibling", position: "before" },
            { pattern: "styles/**", group: "sibling", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["react", "react-dom", "react-redux"],
        },
      ],

      // --- Code Style & Best Practices Rules ---
      eqeqeq: "error", // Enforce `===` over `==`
      curly: ["error", "all"], // Require curly braces for all control statements
      "no-console": "warn", // Warn about `console.log()`
      "no-debugger": "error", // Disallow `debugger`
      "no-unused-vars": "warn", // Warn about unused variables
      "no-alert": "error", // Disallow `alert()`, `confirm()`, `prompt()`
      // "arrow-body-style": ["error", "as-needed"], // Use concise arrow functions
      "object-shorthand": ["error", "always"], // Enforce `{ key }` instead of `{ key: key }`
      "prefer-template": "error", // Enforce template literals over string concatenation

      // Accessibility Rules (for JSX)
      "jsx-a11y/alt-text": "warn", // Ensure `alt` text in images
      "jsx-a11y/anchor-is-valid": "warn", // Ensure `<a>` tags are valid

      // --- React Hooks Rules ---
      "react-hooks/rules-of-hooks": "error", // Ensure hooks follow rules
      "react-hooks/exhaustive-deps": "warn", // Warn if dependencies in `useEffect` are incorrect

      // --- TypeScript-Specific Rules ---
      "@typescript-eslint/no-explicit-any": "off", // Allow `any` types
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ], // Ignore unused variables prefixed with `_`
      "@typescript-eslint/explicit-module-boundary-types": "off", // Don't force return types in functions

      // --- Try/Catch Safety Rules ---
      "no-unsafe-finally": "error", // Prevents unsafe finally blocks
      "no-empty": ["error", { allowEmptyCatch: true }], // Allows empty catch blocks
    },
    settings: {
      "import/resolver": {
        node: {
          paths: ["src"],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  }),
];

export default eslintConfig;
