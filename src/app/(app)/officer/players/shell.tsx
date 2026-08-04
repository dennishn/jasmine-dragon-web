"use client";

import { useAppContext } from "@/lib/app/app-context";
import { useEffect } from "react";

const PlayersShell = ({ children }: { children: React.ReactNode }) => {
    const { setPageTitle } = useAppContext();

    useEffect(() => {
        setPageTitle("Players");
    }, [setPageTitle]);

    return <>{children}</>;
};

export { PlayersShell };
