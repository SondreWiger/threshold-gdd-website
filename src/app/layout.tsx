import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "THRESHOLD — Game Design Document",
  description: "Squad-based tactical survival-horror FPS. Northem Developments. Unreal Engine 5.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground scanlines grid-overlay">
        <Navigation />
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
