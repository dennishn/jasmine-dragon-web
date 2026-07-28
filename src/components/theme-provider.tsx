"use client";
import type { ComponentProps } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
    <NextThemesProvider {...props}>{children}</NextThemesProvider>
);

ThemeProvider.displayName = "ThemeProvider";

export { ThemeProvider };
