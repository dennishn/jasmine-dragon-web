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

const TEAMS = {
    TEAM_JASMINE: "team-jasmine",
    TEAM_DRAGON: "team-dragon",
} as const;

type Team = (typeof TEAMS)[keyof typeof TEAMS];

const AUTHENTICATION_PROVIDER = {
    DISCORD: "DISCORD",
    BOOTSTRAP: "BOOTSTRAP",
} as const;

const ELIGIBLE_ROLE = {
    TANK: "TANK",
    HEALER: "HEALER",
    DPS: "DPS",
} as const;

const RAID_STATUS = {
    DRAFT: "DRAFT",
    PUBLISHED: "PUBLISHED",
    CANCELLED: "CANCELLED",
    COMPLETED: "COMPLETED",
} as const;

const SIGNUP_STATUS = {
    ACCEPTED: "ACCEPTED",
    TENTATIVE: "TENTATIVE",
    DECLINED: "DECLINED",
} as const;

const LOOT_AWARD_STATUS = {
    ACTIVE: "ACTIVE",
    VOIDED: "VOIDED",
} as const;

export {
    API_BASE_URL,
    VERIFICATION_STATUS,
    TEAM_ID,
    LOOT_MODE,
    TEAMS,
    AUTHENTICATION_PROVIDER,
    ELIGIBLE_ROLE,
    RAID_STATUS,
    SIGNUP_STATUS,
    LOOT_AWARD_STATUS,
};
export type { Team };
