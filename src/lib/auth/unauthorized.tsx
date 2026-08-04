"use client";

import {
    Empty,
    EmptyDescription,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Lock } from "lucide-react";
import { useAppContext } from "../app/app-context";
import { useEffect } from "react";

type UnauthorizedProps = {
    pageTitle: string;
};

const Unauthorized = ({ pageTitle }: UnauthorizedProps) => {
    const { setPageTitle } = useAppContext();

    useEffect(() => {
        setPageTitle(pageTitle);
    }, [setPageTitle, pageTitle]);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Empty>
                <EmptyMedia variant="icon">
                    <Lock className="size-10" />
                </EmptyMedia>
                <EmptyTitle>Unauthorized</EmptyTitle>
                <EmptyDescription>
                    You are not authorized to access this page.
                </EmptyDescription>
            </Empty>
        </div>
    );
};

export { Unauthorized };
