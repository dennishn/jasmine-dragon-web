import { getCurrentUser } from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { cn } from "@/styles/utils";
import type { ComponentProps } from "react";

const CurrentUserAvatar = async ({
    className,
    ...props
}: ComponentProps<"div">) => {
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

CurrentUserAvatar.displayName = "CurrentUserAvatar";

export { CurrentUserAvatar };
