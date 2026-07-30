"use client";

import type { ComponentProps } from "react";
import { cn } from "@/styles/utils";

function Label({ className, ...props }: ComponentProps<"label">) {
    return (
        // Association is provided by consumers via htmlFor or nesting.
        // eslint-disable-next-line jsx-a11y/label-has-associated-control -- primitive label; association is caller-provided
        <label
            data-slot="label"
            className={cn(
                "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                className,
            )}
            {...props}
        />
    );
}

export { Label };
