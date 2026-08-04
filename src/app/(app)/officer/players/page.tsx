import { getCurrentUser } from "@/features/user/user-queries";
import { Unauthorized } from "@/lib/auth/unauthorized";
import { PlayersShell } from "./shell";

export default async function PlayersPage() {
    const { data: user } = await getCurrentUser();

    if (!user?.player.isOfficer) {
        return <Unauthorized pageTitle="Manage Players (Officer Only)" />;
    }

    return (
        <PlayersShell>
            <div className="flex flex-col items-center justify-center gap-4 h-full">
                <h1 className="text-2xl font-bold">Players</h1>
            </div>
        </PlayersShell>
    );
}
