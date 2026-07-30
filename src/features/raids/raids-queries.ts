import {
    listRaids,
    getRaid as sdkGetRaid,
} from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { cacheTag } from "next/cache";
import type { TEAM_ID } from "@/lib/api/constants";

const getRaids = async (query?: {
    teamId?: (typeof TEAM_ID)[keyof typeof TEAM_ID];
}) => {
    "use cache";
    cacheTag(`raids:${query?.teamId ?? "team-jasmine"}`);

    try {
        const { data, error } = await listRaids({
            query: {
                teamId: query?.teamId,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to get raids",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to get raids", ok: false as const };
    }
};

const getRaidById = async (raidId: string) => {
    "use cache";
    cacheTag(`raid:${raidId}`);

    try {
        const { data, error } = await sdkGetRaid({
            path: {
                raidId,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to get raid",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to get raid", ok: false as const };
    }
};

export { getRaids, getRaidById };
