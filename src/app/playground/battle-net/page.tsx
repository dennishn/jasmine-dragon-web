import { BattleNetItemSearch } from "@/lib/battle-net/components/battle-net-item-search";

export default function BattleNetPlaygroundPage() {
    return (
        <div className="flex flex-col gap-4 p-8">
            <h1>Battle.net Item Search</h1>
            <p className="text-muted-foreground max-w-prose text-sm">
                Combobox with debounce (300ms), min 2 characters, clear button,
                and autoHighlight. Open the browser console to inspect Blizzard
                search payloads.
            </p>
            <BattleNetItemSearch />
        </div>
    );
}
