import { NextResponse } from "next/server";

import { ACCESS_TOKEN_COOKIE, apiUrl } from "@/lib/auth/config";
import { getAccessToken } from "@/lib/auth/cookies";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const token = await getAccessToken();

    if (token) {
        try {
            await fetch(apiUrl("/auth/logout"), {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-store",
            });
        } catch {
            // Best-effort logout against the API; always clear local session.
        }
    }

    const response = NextResponse.redirect(new URL("/login", url.origin));
    response.cookies.set(ACCESS_TOKEN_COOKIE, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });

    return response;
}
