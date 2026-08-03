import { BattleNetItemSearch } from "@/lib/battle-net/components/battle-net-item-search";

export default function BattleNetPlaygroundPage() {
    return (
        <div className="flex flex-col gap-4 p-8">
            <h1>Battle.net Item Search</h1>
            <BattleNetItemSearch />
        </div>
    );
}
