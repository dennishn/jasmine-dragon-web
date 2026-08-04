import { getCurrentUser } from "@/features/user/user-queries";
import { Unauthorized } from "@/lib/auth/unauthorized";
import { LootCouncilShell } from "./shell";

export default async function LootCouncilPage() {
    const { data: user } = await getCurrentUser();

    if (!user?.player.isOfficer) {
        return <Unauthorized pageTitle="Loot Council (Officer Only)" />;
    }

    return (
        <LootCouncilShell>
            <div className="flex flex-col items-center justify-center gap-4 h-full">
                <h1 className="text-2xl font-bold">Loot Council</h1>
            </div>
        </LootCouncilShell>
    );
}
