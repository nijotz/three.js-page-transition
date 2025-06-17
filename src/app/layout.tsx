'use client'

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";
import { createHtmlPortalNode } from 'react-reverse-portal'
import { useAppStore } from "@/app/store";
import Toolbar from "@/app/components/Toolbar";
import CanvasSelector from "@/app/components/CanvasSelector";
import { Colors, Cube } from "@/app/types";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setCubes } = useAppStore();

  useEffect(() => {
    const cubes = [1, 2, 3].map((i) => ({
      id: i,
      color: Colors[i - 1],
      portalNode: createHtmlPortalNode({ attributes: { class: "h-full w-full" } }),
    } as Cube));
    setCubes(cubes);
  }, [setCubes]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toolbar />
        <CanvasSelector />
        <main className="h-[calc(100vh-4rem)]">
          {children}
        </main>
      </body>
    </html>
  );
}
