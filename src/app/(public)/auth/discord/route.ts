import { type NextRequest, NextResponse } from "next/server";

import { API_BASE_URL } from "@/lib/api/constants";
import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/config";

/**
 * Starts Discord OAuth by redirecting the browser to the API.
 * Discord later calls the API callback; the API then redirects here with a one-time code.
 */
export function GET(request: NextRequest) {
    if (request.cookies.has(ACCESS_TOKEN_COOKIE)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const returnUrl = new URL("/auth/callback", request.url).toString();
    const startUrl = new URL("/auth/discord/start", API_BASE_URL);
    startUrl.searchParams.set("returnUrl", returnUrl);

    return NextResponse.redirect(startUrl);
}
