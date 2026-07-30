import {
    listCharacters,
    getCharacter as sdkGetCharacter,
    getBisList as sdkGetBisList,
} from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { cacheTag } from "next/cache";
import type { VERIFICATION_STATUS, TEAM_ID } from "@/lib/api/constants";

const getCharacters = async (query: {
    verificationStatus?: (typeof VERIFICATION_STATUS)[keyof typeof VERIFICATION_STATUS];
    teamId?: (typeof TEAM_ID)[keyof typeof TEAM_ID];
}) => {
    "use cache";
    cacheTag(`characters:${query.verificationStatus}:${query.teamId}`);

    try {
        const { data, error } = await listCharacters({
            query: {
                verificationStatus: query.verificationStatus,
                teamId: query.teamId,
            },
        });

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

const getCharacterById = async (characterId: string) => {
    "use cache";
    cacheTag(`character:${characterId}`);

    try {
        const { data, error } = await sdkGetCharacter({
            path: {
                characterId,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to get character",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to get character", ok: false as const };
    }
};

const getCharacterBestInSlotList = async (characterId: string) => {
    "use cache";
    cacheTag(`character:${characterId}:best-in-slot-list`);

    try {
        const { data, error } = await sdkGetBisList({
            path: {
                characterId,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error:
                    error?.error?.message ??
                    "Failed to get character best in slot list",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return {
            error: "Failed to get character best in slot list",
            ok: false as const,
        };
    }
};

export { getCharacters, getCharacterById, getCharacterBestInSlotList };
