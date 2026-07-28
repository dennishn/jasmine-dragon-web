import { defineConfig } from "eslint/config";
import { config as baseESLintConfig } from "@akqa-denmark/eslint/nextjs";

const config = defineConfig([
    {
        ignores: ["**/__generated/**"],
    },
    ...baseESLintConfig,
]);

export default config;
