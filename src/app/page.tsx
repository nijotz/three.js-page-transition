'use client'

import { OutPortal } from 'react-reverse-portal'
import { usePortalContext } from "@/app/context/PortalContext";

export default function Home() {
  const portalNode = usePortalContext();

  return (
    <div className="flex flex-col h-full">
      <div className="text-center py-2">
        <h1 className="text-4xl font-bold text-gray-900">Home</h1>
      </div>
      <div className="flex-1">
        <div className="w-full h-full bg-gray-100 overflow-hidden">
          <OutPortal node={portalNode} />
        </div>
      </div>
    </div>
  );
}
