import { Suspense } from "react";
import { Logo } from "@/components/ui/logo";
import { DiscordSignInButton } from "@/features/discord/components/discord-sign-in-button";
import { RedirectIfAuthenticated } from "@/lib/auth/redirect-if-authenticated";

const LoginPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Suspense>
                <RedirectIfAuthenticated />
            </Suspense>
            <div className="flex w-full max-w-3xl items-center gap-16">
                <div className="mb-6 flex flex-1 flex-col items-center justify-center">
                    <Logo className="size-75" />
                    <h1 className="text-3xl font-bold">Jasmine Dragon</h1>
                </div>
                <div className="flex flex-1 flex-col gap-3">
                    <DiscordSignInButton />
                    <p className="text-muted-foreground text-center text-xs">
                        Officers and players sign in with Discord. Your session
                        stays active for 12 hours.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
