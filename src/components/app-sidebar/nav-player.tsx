import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CalendarDays, User } from "lucide-react";
import Link from "next/link";

const NavPlayer = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Member</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip="Raid Calendar"
                        render={
                            <Link href="/raids">
                                <CalendarDays className="size-4" />
                                <span>Raid Calendar</span>
                            </Link>
                        }
                    />
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip="Player and Characters"
                        render={
                            <Link href="/me">
                                <User className="size-4" />
                                <span>Player and Characters</span>
                            </Link>
                        }
                    />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};

export { NavPlayer };
