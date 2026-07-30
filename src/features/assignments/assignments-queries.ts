import { listAssignments } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { cacheTag } from "next/cache";

const getAssignments = async (raidId: string) => {
    "use cache";
    cacheTag(`raid:${raidId}:assignments`);

    try {
        const { data, error } = await listAssignments({
            path: {
                raidId,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to get assignments",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to get assignments", ok: false as const };
    }
};

export { getAssignments };
