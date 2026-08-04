"use client";

import { useAppContext } from "@/lib/app/app-context";
import { useEffect } from "react";

const RaidsShell = ({ children }: { children: React.ReactNode }) => {
    const { setPageTitle } = useAppContext();

    useEffect(() => {
        setPageTitle("Raids");
    }, [setPageTitle]);

    return <>{children}</>;
};

export { RaidsShell };
