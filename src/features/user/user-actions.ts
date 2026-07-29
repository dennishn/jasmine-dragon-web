"use server";

import { logout } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/lib/api/__generated/openapi.ts/client.gen";

const logoutUser = async () => {
    await logout();

    const store = await cookies();
    store.delete(ACCESS_TOKEN_COOKIE);

    client.setConfig({
        auth: undefined,
    });

    redirect("/auth");
};

export { logoutUser };
