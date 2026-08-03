import { type NextRequest, NextResponse } from "next/server";

import { exchangeDiscordCode } from "@/features/discord/exchange-discord-code";
import { setAccessToken } from "@/lib/auth/cookies";

function redirectToAuthWithError(request: NextRequest, message: string) {
    const url = new URL("/auth", request.url);
    url.searchParams.set("error", message);
    return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const discordError = searchParams.get("error");
    const discordErrorDescription = searchParams.get("error_description");
    const code = searchParams.get("code");

    if (discordError) {
        return redirectToAuthWithError(
            request,
            discordErrorDescription ??
                discordError ??
                "Discord sign-in was cancelled or failed",
        );
    }

    if (!code) {
        return redirectToAuthWithError(request, "Missing Discord login code");
    }

    const result = await exchangeDiscordCode(code);

    if (!result.ok) {
        return redirectToAuthWithError(request, result.error);
    }

    await setAccessToken(result.accessToken, result.expiresAt);

    return NextResponse.redirect(new URL("/", request.url));
}
