import { saveBisList } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { zSaveBisListBody } from "@/lib/api/__generated/openapi.ts/zod.gen";
import { updateTag } from "next/cache";

const upsertCharacterBestInSlotList = async (
    characterId: string,
    data: FormData,
) => {
    const parsed = zSaveBisListBody.safeParse({
        expectedVersion: data.get("expectedVersion"),
        phaseOrTier: data.get("phaseOrTier"),
        items: data.get("items"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const expectedVersion = parsed.data.expectedVersion;
    const phaseOrTier = parsed.data.phaseOrTier;
    const items = parsed.data.items.map((item) => ({
        itemId: parseInt(item.itemId.toString()),
        itemName: item.itemName,
        slot: item.slot,
        priority: item.priority,
        source: item.source,
        note: item.note,
    }));

    try {
        const { data, error } = await saveBisList({
            path: {
                characterId,
            },
            body: {
                expectedVersion,
                phaseOrTier,
                items,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error:
                    error?.error?.message ??
                    "Failed to upsert character best in slot list",
                ok: false as const,
            };
        }

        updateTag(`character:${characterId}:best-in-slot-list`);

        return { ok: true as const, data: data?.data };
    } catch {
        return {
            error: "Failed to upsert character best in slot list",
            ok: false as const,
        };
    }
};

export { upsertCharacterBestInSlotList };
