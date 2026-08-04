import type { ComponentProps } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { cn } from "@/styles/utils";

const PlayerNameAndRole = async ({
    className,
    ...props
}: ComponentProps<"div">) => {
    const { data } = await getCurrentUser();

    const playerName = data?.data.player.displayName;

    return (
        <div className={cn("flex flex-col", className)} {...props}>
            <p className="text-sm text-primary">{playerName}</p>
            <p className="text-xs text-muted-foreground">
                {data?.data?.player.isOfficer
                    ? "Guild Officer"
                    : "Guild Member"}
            </p>
        </div>
    );
};

PlayerNameAndRole.displayName = "PlayerNameAndRole";

const PlayerNameAndRoleSkeleton = () => {
    return (
        <div className="flex flex-col items-center w-full flex-1">
            <Skeleton className="w-full h-9" />
        </div>
    );
};

PlayerNameAndRoleSkeleton.displayName = "PlayerNameAndRoleSkeleton";

export { PlayerNameAndRole, PlayerNameAndRoleSkeleton };
