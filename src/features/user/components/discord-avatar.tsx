import type { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { Skeleton } from "@/components/ui/skeleton";

const DiscordAvatar = async ({ ...props }: ComponentProps<typeof Avatar>) => {
    const { data } = await getCurrentUser();

    const avatarUrl = data?.data.player.avatarHash
        ? `https://cdn.discordapp.com/avatars/${data.data.player.discordUserId}/${data.data.player.avatarHash}.png?size=512`
        : undefined;

    const fallback = data?.data.player.displayName.charAt(0).toUpperCase();

    return (
        <Avatar size="lg" {...props}>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    );
};

DiscordAvatar.displayName = "DiscordAvatar";

const DiscordAvatarSkeleton = () => {
    return <Skeleton className="w-10 h-10 rounded-full" />;
};

export { DiscordAvatar, DiscordAvatarSkeleton };
