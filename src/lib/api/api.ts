import type { CreateClientConfig } from "./__generated/openapi.ts/client.gen";

export const createClientConfig: CreateClientConfig = (config) => ({
    ...config,
    baseUrl: "https://ffnymsg0fb.execute-api.eu-north-1.amazonaws.com",
});
