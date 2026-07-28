import { Geist, Geist_Mono, Inter, Noto_Serif } from "next/font/google";

const notoSerifHeading = Noto_Serif({
    subsets: ["latin"],
    variable: "--font-heading",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export { notoSerifHeading, inter, geistSans, geistMono };
