'use client'

import { useMemo } from 'react'
import { Geist, Geist_Mono } from "next/font/google";
import { createHtmlPortalNode, InPortal } from 'react-reverse-portal'
import { PortalContext } from "@/app/context/PortalContext";
import Toolbar from "@/app/components/Toolbar";
import Scene from '@/app/components/Scene';
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
  const portalNode = useMemo(() => createHtmlPortalNode({ attributes: { class: "h-full" } }), [])

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PortalContext.Provider value={portalNode}>
          <Toolbar />

          <InPortal node={portalNode}>
            <Scene />
          </InPortal>

          <main className="h-[calc(100vh-4rem)]">
            {children}
          </main>
        </PortalContext.Provider>
      </body>
    </html>
  );
}
