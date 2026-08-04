import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CalendarClock, Shield, Swords, User } from "lucide-react";
import Link from "next/link";

const NavOfficer = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                Officer (you should not see this)
            </SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip="Attendance"
                        render={
                            <Link href="/officer/attendance">
                                <CalendarClock className="size-4" />
                                <span>Attendance</span>
                            </Link>
                        }
                    />
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip="Manage Players"
                        render={
                            <Link href="/officer/players">
                                <User className="size-4" />
                                <span>Manage Players</span>
                            </Link>
                        }
                    />
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip="Manage Encounters"
                        render={
                            <Link href="/officer/encounters">
                                <Shield className="size-4" />
                                <span>Manage Encounters</span>
                            </Link>
                        }
                    />
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip="Loot Council"
                        render={
                            <Link href="/officer/loot-council">
                                <Swords className="size-4" />
                                <span>Loot Council</span>
                            </Link>
                        }
                    />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};

export { NavOfficer };
