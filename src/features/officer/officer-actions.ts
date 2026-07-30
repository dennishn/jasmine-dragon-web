import {
    updatePlayer as sdkUpdatePlayer,
    updateCharacter as sdkUpdateCharacter,
    verifyCharacter as sdkVerifyCharacter,
} from "@/lib/api/__generated/openapi.ts/sdk.gen";
import {
    zUpdateCharacterBody,
    zUpdatePlayerBody,
    zVerifyCharacterBody,
} from "@/lib/api/__generated/openapi.ts/zod.gen";
import { updateTag } from "next/cache";

const updatePlayer = async (userId: string, data: FormData) => {
    const parsed = zUpdatePlayerBody.safeParse({
        displayName: data.get("displayName"),
        teamIds: data.get("teamIds"),
        timeZone: data.get("timeZone"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const displayName = parsed.data.displayName;
    const teamIds = parsed.data.teamIds;
    const timeZone = parsed.data.timeZone;

    try {
        const { data, error } = await sdkUpdatePlayer({
            path: {
                userId,
            },
            body: {
                displayName,
                teamIds,
                timeZone,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to update user",
                ok: false as const,
            };
        }

        updateTag(`player:${userId}`);

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to update user", ok: false as const };
    }
};

const updateCharacter = async (characterId: string, data: FormData) => {
    const parsed = zUpdateCharacterBody.safeParse({
        name: data.get("name"),
        realm: data.get("realm"),
        region: data.get("region"),
        characterClass: data.get("characterClass"),
        primarySpec: data.get("primarySpec"),
        eligibleRoles: data.get("eligibleRoles"),
        teamIds: data.get("teamIds"),
        isMain: data.get("isMain"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const name = parsed.data.name;
    const realm = parsed.data.realm;
    const region = parsed.data.region;
    const characterClass = parsed.data.characterClass;
    const primarySpec = parsed.data.primarySpec;
    const eligibleRoles = parsed.data.eligibleRoles;
    const teamIds = parsed.data.teamIds;
    const isMain = parsed.data.isMain;

    try {
        const { data, error } = await sdkUpdateCharacter({
            path: {
                characterId,
            },
            body: {
                name,
                realm,
                region,
                characterClass,
                primarySpec,
                eligibleRoles,
                teamIds,
                isMain,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to update character",
                ok: false as const,
            };
        }

        updateTag(`character:${characterId}`);

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to update character", ok: false as const };
    }
};

const verifyCharacter = async (characterId: string, data: FormData) => {
    const parsed = zVerifyCharacterBody.safeParse({
        approved: data.get("approved"),
        note: data.get("note"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const approved = parsed.data.approved;
    const note = parsed.data.note;

    try {
        const { data, error } = await sdkVerifyCharacter({
            path: {
                characterId,
            },
            body: {
                approved,
                note,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to verify character",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to verify character", ok: false as const };
    }
};

export { updatePlayer, updateCharacter, verifyCharacter };
