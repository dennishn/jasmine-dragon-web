"use client";

import { useAppContext } from "@/lib/app/app-context";
import { useEffect } from "react";

const EncountersShell = ({ children }: { children: React.ReactNode }) => {
    const { setPageTitle } = useAppContext();

    useEffect(() => {
        setPageTitle("Encounters");
    }, [setPageTitle]);

    return <>{children}</>;
};

export { EncountersShell };
