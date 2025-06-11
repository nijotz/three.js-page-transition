'use client'

import { Geist, Geist_Mono } from "next/font/google";
import { InPortal } from 'react-reverse-portal'
import { useAppContext, AppContextProvider } from "@/app/context";
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContextProvider>
          <App>
            {children}
          </App>
        </AppContextProvider>
      </body>
    </html>
  );
}

function App({ children }: Readonly<{ children: React.ReactNode }>) {
  const { color, portalNode } = useAppContext();

  return (
    <>
      <Toolbar />

      <InPortal node={portalNode}>
        <Scene color={color} />
      </InPortal>

      <main className="h-[calc(100vh-4rem)]">
        {children}
      </main>
    </>
  );
}
