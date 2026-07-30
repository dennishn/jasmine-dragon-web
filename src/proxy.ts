import { type NextRequest, NextResponse } from "next/server";

import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/config";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAuthed = request.cookies.has(ACCESS_TOKEN_COOKIE);

    // Public auth routes (login, Discord start/callback, admin break-glass).
    if (pathname.startsWith("/auth")) {
        return NextResponse.next();
    }

    if (!isAuthed) {
        const url = request.nextUrl.clone();
        url.pathname = "/auth";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|api|icon|favicon).*)"],
};
