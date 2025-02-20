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
        className={`${geistSans.variable} flex font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        <div className="sticky h-8 w-8 top-2 left-full mr-2 pb-0.5 pl-0.5 flex items-center justify-center border rounded-full font-bold bg-green-500 cursor-pointer">
          <span className="scale-150">+</span>
        </div>
        <SideBar />

        <main className="flex min-h-svh w-full flex-col">{children}</main>
      </body>
    </html>
  );
}
