import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { SideBar } from "@/components/SideBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notesify",
  description: "Notesify - take notes everywhere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        <main className="flex min-h-svh w-full flex-col">{children}</main>
      </body>
    </html>
  );
}
