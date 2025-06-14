'use client'

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";
import { InPortal } from 'react-reverse-portal'
import { useAppStore } from "@/app/store";
import Toolbar from "@/app/components/Toolbar";
import Canvas from '@/app/components/Scene';
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
  const { initPortal, portalNode } = useAppStore();

  useEffect(() => {
    initPortal();
  }, [initPortal]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toolbar />

        {portalNode &&
          <InPortal node={portalNode}>
            <Canvas />
          </InPortal>
        }

        <main className="h-[calc(100vh-4rem)]">
          {children}
        </main>
      </body>
    </html>
  );
}
