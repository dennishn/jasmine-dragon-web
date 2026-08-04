"use client";

import { useAppContext } from "@/lib/app/app-context";
import { useEffect } from "react";

const LootCouncilShell = ({ children }: { children: React.ReactNode }) => {
    const { setPageTitle } = useAppContext();

    useEffect(() => {
        setPageTitle("Loot Council");
    }, [setPageTitle]);

    return <>{children}</>;
};

export { LootCouncilShell };
