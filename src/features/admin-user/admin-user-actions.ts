"use server";

import { zExchangeBootstrapAdminTokenBody } from "@/lib/api/__generated/openapi.ts/zod.gen";
import { exchangeBootstrapAdminToken } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { redirect } from "next/navigation";
import { client } from "@/lib/api/__generated/openapi.ts/client.gen";

const signInAdmin = async (formData: FormData) => {
    const parsed = zExchangeBootstrapAdminTokenBody.safeParse({
        token: formData.get("token"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const token = parsed.data.token;

    let bearerToken: string;

    try {
        const { data, error } = await exchangeBootstrapAdminToken({
            body: { token },
        });

        if (error?.error || !data?.data.accessToken) {
            return {
                error: error?.error?.message ?? "Failed to exchange token",
                ok: false as const,
            };
        }

        bearerToken = data.data.accessToken;
    } catch {
        return { error: "Failed to exchange token", ok: false as const };
    }

    // Update SDK client to pass bearer tokens for future requests
    client.setConfig({
        auth: bearerToken,
    });

    redirect("/");
};

export { signInAdmin };
