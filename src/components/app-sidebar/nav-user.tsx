import {
    DiscordAvatar,
    DiscordAvatarSkeleton,
} from "@/features/user/components/discord-avatar";
import { LogoutButton } from "@/features/user/components/logout-button";
import {
    PlayerNameAndRole,
    PlayerNameAndRoleSkeleton,
} from "@/features/user/components/player-name-and-role";
import { Suspense } from "react";
import { SidebarMenu, SidebarMenuItem } from "../ui/sidebar";

const NavUser = () => {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-1 items-center justify-between gap-2">
                        <Suspense fallback={<DiscordAvatarSkeleton />}>
                            <DiscordAvatar size="lg" className="shrink-0" />
                        </Suspense>
                        <Suspense fallback={<PlayerNameAndRoleSkeleton />}>
                            <PlayerNameAndRole className="flex-1" />
                        </Suspense>
                    </div>
                    <div>
                        <LogoutButton />
                    </div>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export { NavUser };
