import { Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";
import { getApiBaseUrl } from "@/lib/auth/config";
import { cn } from "@/styles/utils";

const ERROR_MESSAGES: Record<string, string> = {
    missing_code: "Sign-in did not return a login code. Please try again.",
    invalid_code: "The login code was invalid or expired. Please try again.",
    exchange_failed: "Could not complete sign-in. Please try again.",
};

function LoginContent({ error }: { error?: string }) {
    const signInUrl = `${getApiBaseUrl().replace(/\/$/, "")}/auth/discord/start`;
    const errorMessage = error
        ? (ERROR_MESSAGES[error] ?? "Sign-in failed. Please try again.")
        : null;

    return (
        <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-6 py-16">
            <div className="space-y-2">
                <p className="text-muted-foreground text-sm tracking-wide uppercase">
                    Jasmine Dragon
                </p>
                <h1 className="font-heading text-3xl font-semibold tracking-tight">
                    Sign in
                </h1>
                <p className="text-muted-foreground text-sm">
                    Continue with Discord to access raid administration.
                </p>
            </div>

            {errorMessage ? (
                <p
                    className="text-destructive rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm"
                    role="alert"
                >
                    {errorMessage}
                </p>
            ) : null}

            <a
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
                href={signInUrl}
            >
                Sign in with Discord
            </a>

            <p className="text-muted-foreground text-xs">
                Mock auth is enabled until the AWS API is deployed.
            </p>
        </main>
    );
}

async function LoginSearchParams({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const { error } = await searchParams;
    return <LoginContent error={error} />;
}

export default function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    return (
        <Suspense fallback={<LoginContent />}>
            <LoginSearchParams searchParams={searchParams} />
        </Suspense>
    );
}
