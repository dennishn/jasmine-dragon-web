import { listRaidSignups } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { cacheTag } from "next/cache";

const getRaidSignups = async (raidId: string) => {
    "use cache";
    cacheTag(`raid:${raidId}:signups`);

    try {
        const { data, error } = await listRaidSignups({
            path: {
                raidId,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to get raid signups",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to get raid signups", ok: false as const };
    }
};

export { getRaidSignups };
