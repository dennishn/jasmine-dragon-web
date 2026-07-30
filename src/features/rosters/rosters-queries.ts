import { getRoster as sdkGetRoster } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { cacheTag } from "next/cache";

const getRoster = async (raidId: string) => {
    "use cache";
    cacheTag(`raid:${raidId}:roster`);

    try {
        const { data, error } = await sdkGetRoster({
            path: {
                raidId,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to get roster",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to get roster", ok: false as const };
    }
};

export { getRoster };
