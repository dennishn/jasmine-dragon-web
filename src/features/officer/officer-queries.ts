import { getPlayer } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { cacheTag } from "next/cache";

const getUserById = async (userId: string) => {
    "use cache";
    cacheTag(`player:${userId}`);

    try {
        const { data, error } = await getPlayer({
            path: {
                userId,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to get user",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to get user", ok: false as const };
    }
};

export { getUserById };
