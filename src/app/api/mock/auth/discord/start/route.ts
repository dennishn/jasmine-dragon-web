import { NextResponse } from "next/server";

import { MOCK_LOGIN_CODE } from "@/app/api/mock/_fixtures";

export function GET(request: Request) {
    const url = new URL(request.url);
    const callback = new URL("/api/auth/callback", url.origin);
    callback.searchParams.set("code", MOCK_LOGIN_CODE);

    return NextResponse.redirect(callback);
}
