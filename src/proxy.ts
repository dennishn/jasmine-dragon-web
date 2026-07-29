import { type NextRequest, NextResponse } from "next/server";

import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/config";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAuthed = request.cookies.has(ACCESS_TOKEN_COOKIE);

    // Auth gate: redirect unauthed page visits to /login.
    // /login itself is excluded so the form can render.
    if (pathname === "/auth/admin" && !isAuthed) {
        return NextResponse.next();
    }

    if (pathname !== "/auth" && !isAuthed) {
        const url = request.nextUrl.clone();
        url.pathname = "/auth";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|api|icon|favicon).*)"],
};
