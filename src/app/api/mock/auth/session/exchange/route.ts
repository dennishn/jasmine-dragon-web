import { NextResponse } from "next/server";

import {
    MOCK_LOGIN_CODE,
    createMockSessionExchange,
} from "@/app/api/mock/_fixtures";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/lib/auth/types";
import type { SessionExchangeData } from "@/lib/auth/types";

export async function POST(request: Request) {
    let body: { code?: unknown };

    try {
        body = (await request.json()) as { code?: unknown };
    } catch {
        return NextResponse.json(
            {
                error: {
                    code: "invalid_request",
                    message: "Request body must be JSON.",
                    details: null,
                },
            } satisfies ApiErrorResponse,
            { status: 400 },
        );
    }

    if (typeof body.code !== "string" || body.code !== MOCK_LOGIN_CODE) {
        return NextResponse.json(
            {
                error: {
                    code: "invalid_code",
                    message: "The one-time login code is invalid or expired.",
                    details: null,
                },
            } satisfies ApiErrorResponse,
            { status: 401 },
        );
    }

    return NextResponse.json({
        data: createMockSessionExchange(),
    } satisfies ApiSuccessResponse<SessionExchangeData>);
}
