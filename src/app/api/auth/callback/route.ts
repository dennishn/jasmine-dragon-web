import { NextResponse } from "next/server";

import { ACCESS_TOKEN_COOKIE, apiUrl } from "@/lib/auth/config";
import type {
    ApiErrorResponse,
    ApiSuccessResponse,
    SessionExchangeData,
} from "@/lib/auth/types";

const COOKIE_MAX_AGE_SECONDS = 12 * 60 * 60;

export async function GET(request: Request) {
    const url = new URL(request.url);
    const error = url.searchParams.get("error");
    const code = url.searchParams.get("code");

    if (error) {
        const loginUrl = new URL("/login", url.origin);
        loginUrl.searchParams.set("error", error);
        return NextResponse.redirect(loginUrl);
    }

    if (!code) {
        const loginUrl = new URL("/login", url.origin);
        loginUrl.searchParams.set("error", "missing_code");
        return NextResponse.redirect(loginUrl);
    }

    const exchangeResponse = await fetch(apiUrl("/auth/session/exchange"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        cache: "no-store",
    });

    const body = (await exchangeResponse.json()) as
        ApiSuccessResponse<SessionExchangeData> | ApiErrorResponse;

    if (!exchangeResponse.ok || !("data" in body)) {
        const loginUrl = new URL("/login", url.origin);
        const errorCode = "error" in body ? body.error.code : "exchange_failed";
        loginUrl.searchParams.set("error", errorCode);
        return NextResponse.redirect(loginUrl);
    }

    const response = NextResponse.redirect(new URL("/", url.origin));
    response.cookies.set(ACCESS_TOKEN_COOKIE, body.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: COOKIE_MAX_AGE_SECONDS,
    });

    return response;
}
