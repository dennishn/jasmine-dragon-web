import { cn } from "@/styles/utils";
import type { ComponentProps } from "react";

type WowheadIconSize = "tiny" | "small" | "medium" | "large";

type WowheadTooltipProps = ComponentProps<"a"> & {
    iconSize?: WowheadIconSize;
    itemId: number;
    expansion?: string;
};

/** Full class names so Tailwind can see them (dynamic `icon-${size}` is purged). */
const ICON_SLOT_CLASS = {
    small: "icon-small",
    medium: "icon-medium",
    large: "icon-large",
} as const satisfies Record<Exclude<WowheadIconSize, "tiny">, string>;

/**
 * Item link enriched by Wowhead's tooltip script.
 * Pass the known item name as children — rename is disabled to avoid CLS.
 *
 * Icon reservation lives *outside* the <a>: Wowhead mutates the anchor's
 * children, so React-owned nodes inside it cause hydration mismatches.
 * Rarity color can still change (transition-colors).
 */
const WowheadTooltip = ({
    children,
    href,
    iconSize = "large",
    itemId,
    expansion = "tbc",
    className,
    ...props
}: WowheadTooltipProps) => {
    return (
        <span data-wh-tooltip className="inline-flex items-center">
            {iconSize !== "tiny" ? (
                <span
                    data-wh-icon-slot
                    aria-hidden
                    className={cn(
                        ICON_SLOT_CLASS[iconSize],
                        "inline-block shrink-0 align-middle animate-pulse rounded-sm bg-muted",
                    )}
                />
            ) : null}
            <a
                {...props}
                href={href ?? `https://wowhead.com/${expansion}/item=${itemId}`}
                data-wowhead={`item=${itemId}`}
                data-wh-icon-size={iconSize}
                data-wh-rename-link="false"
                target="_blank"
                rel="noopener noreferrer"
                suppressHydrationWarning
                className={cn(
                    "transition-colors duration-300",
                    // Tiny icons are a padding + background on the <a> (`.icontinyl`).
                    iconSize === "tiny" && "pl-[18px]",
                    className,
                )}
            >
                {children}
            </a>
        </span>
    );
};

WowheadTooltip.displayName = "WowheadTooltip";

export { WowheadTooltip };
export type { WowheadIconSize, WowheadTooltipProps };
