import tseslint from "typescript-eslint";

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts", "tests/**/*.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "playwright-report/**",
      "allure-results/**",
      "allure-report/**",
      "test-results/**",
    ],
  }
);
