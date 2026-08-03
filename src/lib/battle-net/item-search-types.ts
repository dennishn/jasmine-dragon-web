type BattleNetItemSearchHit = {
    id: number;
    name: string;
    /** Full Blizzard `data` payload for the hit — inspect in the console. */
    data: Record<string, unknown>;
};

type BattleNetItemSearchResponse = {
    page: number;
    pageSize: number;
    maxPageSize: number;
    pageCount: number;
    results: Array<{
        data: Record<string, unknown>;
    }>;
};

function itemNameFromData(data: Record<string, unknown>): string {
    const name = data.name;
    if (typeof name === "string") {
        return name;
    }
    if (name && typeof name === "object") {
        const localized = name as Record<string, string>;
        return (
            localized.en_US ??
            localized.en_GB ??
            Object.values(localized)[0] ??
            "Unknown item"
        );
    }
    return "Unknown item";
}

function mapSearchResults(
    response: BattleNetItemSearchResponse,
): BattleNetItemSearchHit[] {
    return response.results.flatMap((result) => {
        const id = result.data.id;
        if (typeof id !== "number") {
            return [];
        }
        return [
            {
                id,
                name: itemNameFromData(result.data),
                data: result.data,
            },
        ];
    });
}

export { itemNameFromData, mapSearchResults };
export type { BattleNetItemSearchHit, BattleNetItemSearchResponse };
