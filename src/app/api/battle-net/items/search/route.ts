import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { BattleNetApiError, searchItems } from "@/lib/battle-net/items";

const searchQuerySchema = z.object({
    q: z.string().trim().min(2).max(100),
    page: z.coerce.number().int().positive().max(100).default(1),
});

/**
 * Browser-facing Item Search proxy (Classic EU, English).
 *
 * @example GET /api/battle-net/items/search?q=Thunderfury
 */
export async function GET(request: NextRequest) {
    const parsed = searchQuerySchema.safeParse({
        q: request.nextUrl.searchParams.get("q") ?? undefined,
        page: request.nextUrl.searchParams.get("page") ?? undefined,
    });

    if (!parsed.success) {
        return NextResponse.json(
            {
                error: "Invalid query",
                details: parsed.error.flatten().fieldErrors,
            },
            { status: 400 },
        );
    }

    try {
        const data = await searchItems({
            name: parsed.data.q,
            page: parsed.data.page,
        });

        return NextResponse.json(data, {
            headers: {
                // Item definitions are effectively immutable between patches.
                "Cache-Control":
                    "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes("BATTLENET_CLIENT")
        ) {
            return NextResponse.json(
                { error: "Battle.net credentials are not configured" },
                { status: 503 },
            );
        }

        if (error instanceof BattleNetApiError) {
            return NextResponse.json(
                { error: error.message },
                {
                    status:
                        error.status >= 400 && error.status < 600
                            ? error.status
                            : 502,
                },
            );
        }

        return NextResponse.json(
            { error: "Item search failed" },
            { status: 502 },
        );
    }
}
