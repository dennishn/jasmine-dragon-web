import Link from "next/link";
import { Suspense } from "react";

import { Logo } from "@/components/ui/logo";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { exchangeDiscordLoginCode } from "@/features/discord/discord-actions";
import { cn } from "@/styles/utils";

type CallbackSearchParams = Promise<{
    code?: string;
    error?: string;
    error_description?: string;
}>;

const AuthError = ({ message }: { message: string }) => {
    return (
        <div className="flex flex-col gap-4">
            <p className="text-destructive text-sm">{message}</p>
            <Link
                href="/auth"
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
                Back to sign in
            </Link>
        </div>
    );
};

const DiscordCallback = async ({
    searchParams,
}: {
    searchParams: CallbackSearchParams;
}) => {
    const params = await searchParams;

    if (params.error) {
        return (
            <AuthError
                message={
                    params.error_description ??
                    params.error ??
                    "Discord sign-in was cancelled or failed"
                }
            />
        );
    }

    if (!params.code) {
        return <AuthError message="Missing Discord login code" />;
    }

    const result = await exchangeDiscordLoginCode(params.code);

    if (!result.ok) {
        return <AuthError message={result.error} />;
    }

    return null;
};

const CallbackFallback = () => {
    return (
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Spinner />
            Completing Discord sign-in…
        </div>
    );
};

const DiscordCallbackPage = ({
    searchParams,
}: {
    searchParams: CallbackSearchParams;
}) => {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="flex w-full max-w-3xl items-center gap-16">
                <div className="mb-6 flex flex-1 flex-col items-center justify-center">
                    <Logo className="size-75" />
                    <h1 className="text-3xl font-bold">Jasmine Dragon</h1>
                </div>
                <div className="flex-1">
                    <Suspense fallback={<CallbackFallback />}>
                        <DiscordCallback searchParams={searchParams} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default DiscordCallbackPage;
