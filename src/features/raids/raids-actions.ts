import {
    createRaid as sdkCreateRaid,
    updateRaid as sdkUpdateRaid,
} from "@/lib/api/__generated/openapi.ts/sdk.gen";
import {
    zCreateRaidBody,
    zUpdateRaidBody,
} from "@/lib/api/__generated/openapi.ts/zod.gen";
import { updateTag } from "next/cache";

const createRaid = async (data: FormData) => {
    const parsed = zCreateRaidBody.safeParse({
        teamId: data.get("teamId"),
        title: data.get("title"),
        instanceName: data.get("instanceName"),
        startsAt: data.get("startsAt"),
        endsAt: data.get("endsAt"),
        lootMode: data.get("lootMode"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const { teamId, title, instanceName, startsAt, endsAt, lootMode } =
        parsed.data;

    try {
        const { data, error } = await sdkCreateRaid({
            body: {
                teamId,
                title,
                instanceName,
                startsAt,
                endsAt,
                lootMode,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to create raid",
                ok: false as const,
            };
        }

        updateTag(`raids:${teamId}`);

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to create raid", ok: false as const };
    }
};

const updateRaid = async (raidId: string, data: FormData) => {
    const parsed = zUpdateRaidBody.safeParse({
        expectedVersion: data.get("expectedVersion"),
        title: data.get("title"),
        instanceName: data.get("instanceName"),
        startsAt: data.get("startsAt"),
        endsAt: data.get("endsAt"),
        status: data.get("status"),
        lootMode: data.get("lootMode"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const {
        expectedVersion,
        title,
        instanceName,
        startsAt,
        endsAt,
        status,
        lootMode,
    } = parsed.data;

    try {
        const { data, error } = await sdkUpdateRaid({
            path: {
                raidId,
            },
            body: {
                expectedVersion,
                title,
                instanceName,
                startsAt,
                endsAt,
                status,
                lootMode,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to update raid",
                ok: false as const,
            };
        }

        updateTag(`raid:${raidId}`);
        updateTag(`raids:${data.data.teamId}`);

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to update raid", ok: false as const };
    }
};

export { createRaid, updateRaid };
