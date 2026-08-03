import type { Metadata, Viewport } from "next";
import "@/styles/theme.css";
import { cn } from "@/styles/utils";
import { inter } from "@/styles/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import WowheadTooltipProvider from "@/lib/wowhead/wowhead-tooltip-provider";

export const viewport: Viewport = {
    viewportFit: "cover",
};

export const metadata: Metadata = {
    title: "Jasmine Dragon",
    description: "Jasmine Dragon guild raid administration",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={cn("h-full", "antialiased", "font-sans", inter.variable)}
            suppressHydrationWarning
        >
            <WowheadTooltipProvider />
            <body className="flex min-h-full flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    disableTransitionOnChange
                >
                    <TooltipProvider>{children}</TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
