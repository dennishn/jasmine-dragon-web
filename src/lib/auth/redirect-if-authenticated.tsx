import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_TOKEN_COOKIE } from "./config";

const RedirectIfAuthenticated = async () => {
    const store = await cookies();

    if (store.has(ACCESS_TOKEN_COOKIE)) {
        redirect("/");
    }

    return null;
};

RedirectIfAuthenticated.displayName = "RedirectIfAuthenticated";

export { RedirectIfAuthenticated };
