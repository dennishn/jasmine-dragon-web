import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "@/features/user/components/logout-button";
import { logoutUser } from "@/features/user/user-actions";
import { CurrentUserAvatar } from "@/features/user/components/current-user-avatar";

function AppNav() {
    return (
        <header className="border-border border-b">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-3">
                <Link
                    className="font-heading text-sm font-semibold tracking-tight inline-flex items-center gap-2"
                    href="/"
                >
                    <Logo className="text-primary size-10" />
                    Jasmine Dragon
                </Link>
                <div className="flex items-center gap-3 text-sm">
                    <CurrentUserAvatar />
                    <form action={logoutUser}>
                        <LogoutButton />
                    </form>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}

function AppShellFallback() {
    return (
        <>
            <header className="border-border border-b">
                <div className="mx-auto flex w-full max-w-5xl items-center px-6 py-3">
                    <span className="font-heading text-sm font-semibold tracking-tight">
                        Jasmine Dragon
                    </span>
                </div>
            </header>
            <div className="text-muted-foreground mx-auto w-full max-w-5xl flex-1 px-6 py-8 text-sm">
                Loading…
            </div>
        </>
    );
}

async function AuthenticatedShell({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppNav />
            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-8">
                {children}
            </div>
        </>
    );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<AppShellFallback />}>
            <AuthenticatedShell>{children}</AuthenticatedShell>
        </Suspense>
    );
}
