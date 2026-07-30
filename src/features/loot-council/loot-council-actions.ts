import {
    createLootAward as sdkCreateLootAward,
    voidLootAward as sdkVoidLootAward,
} from "@/lib/api/__generated/openapi.ts/sdk.gen";
import {
    zCreateLootAwardBody,
    zVoidLootAwardBody,
} from "@/lib/api/__generated/openapi.ts/zod.gen";
import { updateTag } from "next/cache";

const createLootAward = async (raidId: string, data: FormData) => {
    const parsed = zCreateLootAwardBody.safeParse({
        characterId: data.get("characterId"),
        itemId: data.get("itemId"),
        itemName: data.get("itemName"),
        itemLevel: data.get("itemLevel"),
        slot: data.get("slot"),
        decisionType: data.get("decisionType"),
        priority: data.get("priority"),
        note: data.get("note"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const {
        characterId,
        itemId,
        itemName,
        itemLevel,
        slot,
        decisionType,
        priority,
        note,
    } = parsed.data;

    try {
        const { data, error } = await sdkCreateLootAward({
            path: {
                raidId,
            },
            body: {
                characterId,
                itemId: parseInt(itemId.toString()),
                itemName,
                itemLevel,
                slot,
                decisionType,
                priority,
                note,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to create loot award",
                ok: false as const,
            };
        }

        updateTag(`raid:${raidId}:loot-awards`);
        updateTag(`raid:${raidId}`);
        updateTag(`character:${characterId}:loot`);
        updateTag(`player:${data.data.userId}:loot`);

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to create loot award", ok: false as const };
    }
};

const voidLootAward = async (
    raidId: string,
    awardId: string,
    data: FormData,
) => {
    const parsed = zVoidLootAwardBody.safeParse({
        reason: data.get("reason"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const { reason } = parsed.data;

    try {
        const { data, error } = await sdkVoidLootAward({
            path: {
                raidId,
                awardId,
            },
            body: {
                reason,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to void loot award",
                ok: false as const,
            };
        }

        updateTag(`raid:${raidId}:loot-awards`);
        updateTag(`raid:${raidId}`);
        updateTag(`character:${data.data.characterId}:loot`);
        updateTag(`player:${data.data.userId}:loot`);

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to void loot award", ok: false as const };
    }
};

export { createLootAward, voidLootAward };
