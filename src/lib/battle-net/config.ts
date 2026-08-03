import "server-only";

/** Classic EU Game Data — English only. */
const BATTLE_NET_REGION = "eu" as const;
const BATTLE_NET_LOCALE = "en_US" as const;
const BATTLE_NET_NAMESPACE = "static-classic-eu" as const;
const BATTLE_NET_API_HOST = "https://eu.api.blizzard.com" as const;

function getBattleNetCredentials() {
    const clientId = process.env.BATTLENET_CLIENT_ID;
    const clientSecret = process.env.BATTLENET_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error(
            "Missing BATTLENET_CLIENT_ID or BATTLENET_CLIENT_SECRET",
        );
    }

    return { clientId, clientSecret };
}

export {
    BATTLE_NET_API_HOST,
    BATTLE_NET_LOCALE,
    BATTLE_NET_NAMESPACE,
    BATTLE_NET_REGION,
    getBattleNetCredentials,
};
