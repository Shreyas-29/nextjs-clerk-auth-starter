import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Astra",
    description: "Astra is a Next.js auth starter kit with Clerk, Prisma, and Vercel.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Providers>
            <html lang="en">
                <body className={cn(
                    "min-h-screen antialiased bg-background text-foreground",
                    font.className,
                )}>
                    <Toaster richColors theme="light" />
                    <Navbar />
                    {children}
                </body>
            </html>
        </Providers>
    );
}
