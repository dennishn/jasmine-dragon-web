import type { ComponentProps } from "react";
import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar";

import { Logo } from "@/components/ui/logo";
import { NavUser } from "./nav-user";
import { NavPlayer } from "./nav-player";
import { NavOfficer } from "./nav-officer";

const AppSidebar = async ({ ...props }: ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <Link
                    className="font-heading text-sm font-semibold tracking-tight inline-flex items-center gap-2"
                    href="/"
                >
                    <Logo className="text-primary size-10" />
                    <div className="flex flex-col">
                        <span>Jasmine Dragon</span>
                        <span className="text-xs text-muted-foreground">
                            Companion App ( alpha )
                        </span>
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <NavPlayer />
                <NavOfficer />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
};

AppSidebar.displayName = "AppSidebar";

export { AppSidebar };
