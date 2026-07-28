import { NextResponse } from "next/server";

import { MOCK_ACCESS_TOKEN, mockOfficerPlayer } from "@/app/api/mock/_fixtures";
import type {
    ApiErrorResponse,
    ApiSuccessResponse,
    MeData,
} from "@/lib/auth/types";

export function GET(request: Request) {
    const authorization = request.headers.get("authorization");
    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice("Bearer ".length)
        : null;

    if (token !== MOCK_ACCESS_TOKEN) {
        return NextResponse.json(
            {
                error: {
                    code: "unauthorized",
                    message: "Missing, invalid or expired session.",
                    details: null,
                },
            } satisfies ApiErrorResponse,
            { status: 401 },
        );
    }

    return NextResponse.json({
        data: {
            player: mockOfficerPlayer,
            characters: [],
        },
    } satisfies ApiSuccessResponse<MeData>);
}
