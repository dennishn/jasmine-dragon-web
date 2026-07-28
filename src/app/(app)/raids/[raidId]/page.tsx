import { Suspense } from "react";

async function RaidContent({
    params,
}: {
    params: Promise<{ raidId: string }>;
}) {
    const { raidId } = await params;

    return (
        <main className="space-y-2">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
                Raid
            </h1>
            <p className="text-muted-foreground text-sm">
                Workspace shell for raid{" "}
                <span className="text-foreground font-mono">{raidId}</span>.
                Signup, roster, assignments, and loot tabs will land here later.
            </p>
        </main>
    );
}

export default function RaidPage({ params }: PageProps<"/raids/[raidId]">) {
    return (
        <Suspense
            fallback={
                <main className="space-y-2">
                    <h1 className="font-heading text-2xl font-semibold tracking-tight">
                        Raid
                    </h1>
                    <p className="text-muted-foreground text-sm">Loading…</p>
                </main>
            }
        >
            <RaidContent params={params} />
        </Suspense>
    );
}
