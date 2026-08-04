"use client";

import { useAppContext } from "@/lib/app/app-context";
import { useEffect } from "react";

const AttendanceShell = ({ children }: { children: React.ReactNode }) => {
    const { setPageTitle } = useAppContext();

    useEffect(() => {
        setPageTitle("Attendance");
    }, [setPageTitle]);

    return <>{children}</>;
};

export { AttendanceShell };
