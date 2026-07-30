"use server";

import { zExchangeBootstrapAdminTokenBody } from "@/lib/api/__generated/openapi.ts/zod.gen";
import { exchangeBootstrapAdminToken as sdkExchangeBootstrapAdminToken } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { setAccessToken } from "@/lib/auth/cookies";
import { redirect } from "next/navigation";

const exchangeBootstrapAdminToken = async (formData: FormData) => {
    const parsed = zExchangeBootstrapAdminTokenBody.safeParse({
        token: formData.get("token"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const token = parsed.data.token;

    try {
        const { data, error } = await sdkExchangeBootstrapAdminToken({
            body: { token },
        });

        if (error?.error || !data?.data.accessToken) {
            return {
                error: error?.error?.message ?? "Failed to exchange token",
                ok: false as const,
            };
        }

        await setAccessToken(data.data.accessToken, data.data.expiresAt);
    } catch {
        return { error: "Failed to exchange token", ok: false as const };
    }

    redirect("/");
};

export { exchangeBootstrapAdminToken };
