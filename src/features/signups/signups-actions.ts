import { saveSignup as sdkSaveSignup } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { zSaveSignupBody } from "@/lib/api/__generated/openapi.ts/zod.gen";
import { updateTag } from "next/cache";

const saveSignup = async (raidId: string, data: FormData) => {
    const parsed = zSaveSignupBody.safeParse({
        characterId: data.get("characterId"),
        status: data.get("status"),
        note: data.get("note"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const { characterId, status, note } = parsed.data;

    try {
        const { data, error } = await sdkSaveSignup({
            path: {
                raidId,
            },
            body: {
                characterId,
                status,
                note,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to save signup",
                ok: false as const,
            };
        }

        updateTag(`raid:${raidId}:signups`);
        updateTag(`raid:${raidId}`);

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to save signup", ok: false as const };
    }
};

export { saveSignup };
