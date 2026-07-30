import {
    getCurrentUser as sdkGetCurrentUser,
    getOwnPlayer as sdkGetOwnPlayer,
    listPlayers,
    listOwnCharacters,
} from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { cacheLife, cacheTag } from "next/cache";
import "server-only";

const getCurrentUser = async () => {
    "use cache: private";

    try {
        const { data, error } = await sdkGetCurrentUser();

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

const getOwnPlayer = async () => {
    "use cache: private";

    try {
        const { data, error } = await sdkGetOwnPlayer();

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

const getPlayers = async () => {
    "use cache";
    cacheTag("players");
    cacheLife("days");

    try {
        const { data, error } = await listPlayers();

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to get players",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to get players", ok: false as const };
    }
};

const getCurrentUserCharacters = async () => {
    "cache: private";

    try {
        const { data, error } = await listOwnCharacters();

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to get characters",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to get characters", ok: false as const };
    }
};

export { getCurrentUser, getOwnPlayer, getPlayers, getCurrentUserCharacters };
