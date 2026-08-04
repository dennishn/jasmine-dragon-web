import { getCurrentUser } from "@/features/user/user-queries";
import { Unauthorized } from "@/lib/auth/unauthorized";
import { EncountersShell } from "./shell";

export default async function EncountersPage() {
    const { data: user } = await getCurrentUser();

    if (!user?.player.isOfficer) {
        return <Unauthorized pageTitle="Encounters (Officer Only)" />;
    }

    return (
        <EncountersShell>
            <div className="flex flex-col items-center justify-center gap-4 h-full">
                <h1 className="text-2xl font-bold">Encounters</h1>
            </div>
        </EncountersShell>
    );
}
