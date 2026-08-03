import "server-only";

import { cacheLife } from "next/cache";

import { getBattleNetCredentials } from "@/lib/battle-net/config";

type TokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
};

/**
 * App-level OAuth token via client credentials.
 * Cached aggressively — Blizzard tokens last ~24h; we refresh hourly.
 */
async function getAccessToken() {
    "use cache";
    cacheLife("hours");

    const { clientId, clientSecret } = getBattleNetCredentials();
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch("https://oauth.battle.net/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });

    if (!response.ok) {
        throw new Error(`Battle.net token request failed (${response.status})`);
    }

    const data = (await response.json()) as TokenResponse;
    return data.access_token;
}

export { getAccessToken };
