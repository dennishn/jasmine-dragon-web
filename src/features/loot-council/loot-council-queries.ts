import {
    listRaidLootAwards,
    getPlayerLootHistory,
    getCharacterLootHistory,
} from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { cacheTag } from "next/cache";

const getRaidLootAwards = async (raidId: string) => {
    "use cache";
    cacheTag(`raid:${raidId}:loot-awards`);

    try {
        const { data, error } = await listRaidLootAwards({
            path: {
                raidId,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error:
                    error?.error?.message ?? "Failed to get raid loot awards",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to get raid loot awards", ok: false as const };
    }
};

const getPlayerLoot = async (userId: string) => {
    "use cache";
    cacheTag(`player:${userId}:loot`);

    try {
        const { data, error } = await getPlayerLootHistory({
            path: {
                userId,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to get player loot",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to get player loot", ok: false as const };
    }
};

const getCharacterLoot = async (characterId: string) => {
    "use cache";
    cacheTag(`character:${characterId}:loot`);

    try {
        const { data, error } = await getCharacterLootHistory({
            path: {
                characterId,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to get character loot",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to get character loot", ok: false as const };
    }
};

export { getRaidLootAwards, getPlayerLoot, getCharacterLoot };
