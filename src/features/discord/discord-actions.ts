"use server";

import { publishRaidToDiscord as sdkPublishRaidToDiscord } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { updateTag } from "next/cache";

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

export { publishRaidToDiscord };
