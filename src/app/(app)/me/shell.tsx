"use client";

import { useAppContext } from "@/lib/app/app-context";
import { useEffect } from "react";

const MeShell = ({ children }: { children: React.ReactNode }) => {
    const { setPageTitle } = useAppContext();

    useEffect(() => {
        setPageTitle("My Profile");
    }, [setPageTitle]);

    return <>{children}</>;
};

export { MeShell };
