import type { Player, SessionExchangeData } from "@/lib/auth/types";

export const MOCK_LOGIN_CODE = "mock-login-code";
export const MOCK_ACCESS_TOKEN = "mock-access-token";

export const mockOfficerPlayer: Player = {
    discordUserId: "123456789012345678",
    discordUsername: "exampleuser",
    displayName: "JasmineMage",
    avatarHash: "discord-avatar-hash",
    isOfficer: true,
    teamIds: ["team-jasmine"],
    timeZone: "Europe/Helsinki",
};

export function createMockSessionExchange(): SessionExchangeData {
    const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();

    return {
        accessToken: MOCK_ACCESS_TOKEN,
        expiresAt,
        player: mockOfficerPlayer,
    };
}
