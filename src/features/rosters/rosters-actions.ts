import { saveRoster as sdkSaveRoster } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { zSaveRosterBody } from "@/lib/api/__generated/openapi.ts/zod.gen";
import { updateTag } from "next/cache";

const saveRoster = async (raidId: string, data: FormData) => {
    const parsed = zSaveRosterBody.safeParse({
        expectedVersion: data.get("expectedVersion"),
        roster: data.get("roster"),
        bench: data.get("bench"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const { expectedVersion, roster, bench } = parsed.data;

    try {
        const { data, error } = await sdkSaveRoster({
            path: {
                raidId,
            },
            body: {
                expectedVersion,
                roster,
                bench,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to save roster",
                ok: false as const,
            };
        }

        updateTag(`raid:${raidId}:roster`);
        updateTag(`raid:${raidId}`);

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to save roster", ok: false as const };
    }
};

export { saveRoster };
