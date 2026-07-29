import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
    input: "https://ffnymsg0fb.execute-api.eu-north-1.amazonaws.com/openapi.yaml",
    output: {
        path: "./src/lib/api/__generated/openapi.ts",
        entryFile: false,
    },
    plugins: [
        {
            name: "@hey-api/client-next",
            runtimeConfigPath: "./src/lib/api/api",
        },
        "@hey-api/sdk",
        "@hey-api/typescript",
        "zod",
    ],
});
