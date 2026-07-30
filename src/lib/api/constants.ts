const API_BASE_URL = "https://ffnymsg0fb.execute-api.eu-north-1.amazonaws.com";

const VERIFICATION_STATUS = {
    PENDING: "PENDING",
    VERIFIED: "VERIFIED",
    REJECTED: "REJECTED",
} as const;

const TEAM_ID = {
    TEAM_JASMINE: "team-jasmine",
    TEAM_DRAGON: "team-dragon",
} as const;

const LOOT_MODE = {
    NONE: "NONE",
    LOOT_COUNCIL: "LOOT_COUNCIL",
} as const;

export { API_BASE_URL, VERIFICATION_STATUS, TEAM_ID, LOOT_MODE };
