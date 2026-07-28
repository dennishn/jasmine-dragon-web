import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";
import { getMe } from "@/lib/auth/session";
import type { Player } from "@/lib/auth/types";
import { cn } from "@/styles/utils";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme-toggle";

function AppNav({ player }: { player: Player }) {
    return (
        <header className="border-border border-b">
            <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-6 py-3">
                <Link
                    className="font-heading text-sm font-semibold tracking-tight inline-flex items-center gap-2"
                    href="/"
                >
                    <Logo className="text-primary size-10" />
                    Jasmine Dragon
                </Link>
                <nav className="flex flex-1 items-center gap-3 text-sm">
                    <Link
                        className="text-muted-foreground hover:text-foreground"
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="text-muted-foreground hover:text-foreground"
                        href="/me"
                    >
                        Me
                    </Link>
                    {player.isOfficer ? (
                        <Link
                            className="text-muted-foreground hover:text-foreground"
                            href="/admin"
                        >
                            Admin
                        </Link>
                    ) : null}
                </nav>
                <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted-foreground">
                        Welcome, {player.displayName}
                    </span>
                    <a
                        className={cn(
                            buttonVariants({ variant: "outline", size: "sm" }),
                        )}
                        href="/api/auth/logout"
                    >
                        Log out
                    </a>
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
    const player = await getMe();

    if (!player) {
        redirect("/login");
    }

    return (
        <>
            <AppNav player={player} />
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
