"use server";

import {
    exchangeDiscordLoginCode as sdkExchangeDiscordLoginCode,
    publishRaidToDiscord as sdkPublishRaidToDiscord,
} from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { setAccessToken } from "@/lib/auth/cookies";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

const exchangeDiscordLoginCode = async (code: string) => {
    try {
        const { data, error } = await sdkExchangeDiscordLoginCode({
            body: { code },
        });

        if (error?.error || !data?.data.accessToken) {
            return {
                error:
                    error?.error?.message ?? "Failed to exchange Discord code",
                ok: false as const,
            };
        }

        await setAccessToken(data.data.accessToken, data.data.expiresAt);
    } catch {
        return {
            error: "Failed to exchange Discord code",
            ok: false as const,
        };
    }

    redirect("/");
};

const publishRaidToDiscord = async (raidId: string) => {
    try {
        const { data, error } = await sdkPublishRaidToDiscord({
            path: {
                raidId,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error:
                    error?.error?.message ??
                    "Failed to publish raid to Discord",
                ok: false as const,
            };
        }

        updateTag(`raid:${raidId}`);

        return { ok: true as const, data: data?.data };
    } catch {
        return {
            error: "Failed to publish raid to Discord",
            ok: false as const,
        };
    }
};

export { exchangeDiscordLoginCode, publishRaidToDiscord };
