import { ApiError, fetchApi } from "@/lib/auth/api";
import { getAccessToken } from "@/lib/auth/cookies";
import type { MeData, Player } from "@/lib/auth/types";

export async function getMe(): Promise<Player | null> {
    const token = await getAccessToken();

    if (!token) {
        return null;
    }

    try {
        const data = await fetchApi<MeData>("/me");
        return data.player;
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            return null;
        }
        throw error;
    }
}
