import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { cn } from "@/styles/utils";
import { geistSans, geistMono, inter, notoSerifHeading } from "@/styles/fonts";

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
            className={cn(
                "h-full",
                "antialiased",
                geistSans.variable,
                geistMono.variable,
                "font-sans",
                inter.variable,
                notoSerifHeading.variable,
            )}
        >
            <body className="flex min-h-full flex-col">{children}</body>
        </html>
    );
}
