import { Suspense } from "react";
import { UserDebug } from "@/features/user/components/user-debug";
import { DiscordAvatar } from "@/features/user/components/discord-avatar";
import { MeShell } from "./shell";

export default function MePage() {
    return (
        <MeShell>
            <div className="flex flex-col items-center justify-center gap-4 h-full">
                <h1 className="text-2xl font-bold">My Profile</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <DiscordAvatar />
                    <UserDebug />
                </Suspense>
            </div>
        </MeShell>
    );
}
