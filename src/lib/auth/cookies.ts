import { cookies } from "next/headers";

import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/config";

const COOKIE_MAX_AGE_SECONDS = 12 * 60 * 60; // 12 hours (API session lifetime)

function maxAgeFromExpiresAt(expiresAt?: string): number {
    if (!expiresAt) {
        return COOKIE_MAX_AGE_SECONDS;
    }

    const seconds = Math.floor(
        (new Date(expiresAt).getTime() - Date.now()) / 1000,
    );

    return Math.max(0, seconds);
}

export async function getAccessToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
}

export async function setAccessToken(
    token: string,
    expiresAt?: string,
): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: maxAgeFromExpiresAt(expiresAt),
    });
}

export async function clearAccessToken(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(ACCESS_TOKEN_COOKIE);
}
