import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Next.js + Clerk",
    description: "A Next.js template with Clerk authentication.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Providers>
            <html lang="en">
                <body
                    className={cn(
                        "min-h-screen antialiased bg-background text-foreground",
                        font.className,
                    )}
                >
                    <Toaster richColors theme="light" />
                    <Navbar />
                    {children}
                </body>
            </html>
        </Providers>
    );
};
