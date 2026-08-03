import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import {
    BATTLE_NET_API_HOST,
    BATTLE_NET_LOCALE,
    BATTLE_NET_NAMESPACE,
} from "@/lib/battle-net/config";
import { getAccessToken } from "@/lib/battle-net/token";

type SearchItemsParams = {
    name: string;
    page: number;
};

type BattleNetSearchResponse = {
    page: number;
    pageSize: number;
    maxPageSize: number;
    pageCount: number;
    results: Array<{
        data: Record<string, unknown>;
    }>;
};

/**
 * WoW Item Search (Classic EU Game Data). Item definitions rarely change —
 * cache for the longest built-in profile.
 */
async function searchItems({
    name,
    page,
}: SearchItemsParams): Promise<BattleNetSearchResponse> {
    "use cache";
    cacheLife("max");
    cacheTag("battle-net-items");

    const token = await getAccessToken();
    const url = new URL(`${BATTLE_NET_API_HOST}/data/wow/search/item`);
    url.searchParams.set("namespace", BATTLE_NET_NAMESPACE);
    url.searchParams.set("orderby", "id");
    url.searchParams.set("_page", String(page));
    url.searchParams.set(`name.${BATTLE_NET_LOCALE}`, name);

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new BattleNetApiError(
            `Item search failed (${response.status})`,
            response.status,
            body,
        );
    }

    return (await response.json()) as BattleNetSearchResponse;
}

class BattleNetApiError extends Error {
    status: number;
    body: string;

    constructor(message: string, status: number, body: string) {
        super(message);
        this.name = "BattleNetApiError";
        this.status = status;
        this.body = body;
    }
}

export { BattleNetApiError, searchItems };
export type { BattleNetSearchResponse, SearchItemsParams };
