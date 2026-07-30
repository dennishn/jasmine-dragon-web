import { saveAssignment as sdkSaveAssignment } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { zSaveAssignmentBody } from "@/lib/api/__generated/openapi.ts/zod.gen";
import { updateTag } from "next/cache";

const saveAssignment = async (
    raidId: string,
    bossKey: string,
    data: FormData,
) => {
    const parsed = zSaveAssignmentBody.safeParse({
        expectedVersion: data.get("expectedVersion"),
        bossName: data.get("bossName"),
        generalNotes: data.get("generalNotes"),
        tankTargetsByCharacterId: data.get("tankTargetsByCharacterId"),
        healGroupsByCharacterId: data.get("healGroupsByCharacterId"),
        interruptOrderCharacterIds: data.get("interruptOrderCharacterIds"),
        positionNotesByCharacterId: data.get("positionNotesByCharacterId"),
        personalNotesByCharacterId: data.get("personalNotesByCharacterId"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const {
        expectedVersion,
        bossName,
        generalNotes,
        tankTargetsByCharacterId,
        healGroupsByCharacterId,
        interruptOrderCharacterIds,
        positionNotesByCharacterId,
        personalNotesByCharacterId,
    } = parsed.data;

    try {
        const { data, error } = await sdkSaveAssignment({
            path: {
                raidId,
                bossKey,
            },
            body: {
                expectedVersion,
                bossName,
                generalNotes,
                tankTargetsByCharacterId,
                healGroupsByCharacterId,
                interruptOrderCharacterIds,
                positionNotesByCharacterId,
                personalNotesByCharacterId,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to save assignment",
                ok: false as const,
            };
        }

        updateTag(`raid:${raidId}:assignments`);
        updateTag(`raid:${raidId}`);

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to save assignment", ok: false as const };
    }
};

export { saveAssignment };
