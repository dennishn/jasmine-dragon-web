import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppProvider } from "@/lib/app/app-context";
import { AppPageTitle } from "@/lib/app/app-page-title";
import { Suspense } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-14 shrink-0 items-center gap-2">
                        <div className="flex items-center justify-between gap-2 px-4 w-full">
                            <SidebarTrigger />
                            <AppPageTitle />
                            <ThemeToggle />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-screen rounded-xl md:min-h-min">
                        <Suspense fallback={<div>Loading...</div>}>
                            {children}
                        </Suspense>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AppProvider>
    );
}
