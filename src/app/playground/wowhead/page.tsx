import { WowheadTooltip } from "@/lib/wowhead/wowhead-tooltip";

export default function WowheadPage() {
    return (
        <div className="flex flex-col gap-4 p-8">
            <h1>Wowhead</h1>
            <p className="text-muted-foreground max-w-prose text-sm">
                Item names are known at render time. Icons reserve space
                in-flow; rarity color transitions in when Wowhead wires the
                link.
            </p>
            <div className="flex flex-col gap-3">
                <WowheadTooltip itemId={32451} iconSize="tiny">
                    Gladiator&apos;s Salvation
                </WowheadTooltip>
                <WowheadTooltip itemId={32451} iconSize="small">
                    Gladiator&apos;s Salvation
                </WowheadTooltip>
                <WowheadTooltip itemId={32451} iconSize="medium">
                    Gladiator&apos;s Salvation
                </WowheadTooltip>
                <WowheadTooltip itemId={32451} iconSize="large">
                    Gladiator&apos;s Salvation
                </WowheadTooltip>
            </div>
            <p className="text-sm">
                Inline: before{" "}
                <WowheadTooltip itemId={32451} iconSize="tiny">
                    Gladiator&apos;s Salvation
                </WowheadTooltip>{" "}
                after.
            </p>
        </div>
    );
}
