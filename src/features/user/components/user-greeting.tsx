import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { cn } from "@/styles/utils";
import type { ComponentProps } from "react";

const UserGreeting = async ({ className, ...props }: ComponentProps<"div">) => {
    const { data } = await getCurrentUser();

    return (
        <div
            aria-hidden
            className={cn(
                "flex items-center justify-center gap-1 font-semibold",
                "text-xs",
                className,
            )}
            {...props}
        >
            <span>Welcome,</span>
            <span className="text-primary">
                {data?.data.player.displayName}
            </span>
        </div>
    );
};

UserGreeting.displayName = "UserGreeting";

const UserGreetingSkeleton = () => {
    return (
        <div
            aria-hidden
            className={cn(
                "flex items-center justify-center gap-1 font-semibold",
                "text-xs",
            )}
        >
            <span>Welcome,</span>
            <Skeleton className="h-4 w-24" />
        </div>
    );
};

UserGreetingSkeleton.displayName = "UserGreetingSkeleton";

export { UserGreeting, UserGreetingSkeleton };
