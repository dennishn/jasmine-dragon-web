import type { CreateClientConfig } from "./__generated/openapi.ts/client.gen";
import { API_BASE_URL } from "./constants";
import { getAccessToken } from "@/lib/auth/cookies";

export const createClientConfig: CreateClientConfig = (config) => ({
    ...config,
    baseUrl: API_BASE_URL,
    auth: async () => getAccessToken(),
});
