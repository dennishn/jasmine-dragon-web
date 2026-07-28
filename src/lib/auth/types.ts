/**
 * Temporary types for the backend API.
 */

export type Player = {
    discordUserId: string;
    discordUsername: string;
    displayName: string;
    avatarHash: string | null;
    isOfficer: boolean;
    teamIds: string[];
    timeZone: string | null;
};

export type SessionExchangeData = {
    accessToken: string;
    expiresAt: string;
    player: Player;
};

export type ApiSuccessResponse<T> = {
    data: T;
};

export type ApiErrorResponse = {
    error: {
        code: string;
        message: string;
        details: unknown;
    };
};

export type MeData = {
    player: Player;
    characters: unknown[];
};
