'use client';

import { OutPortal } from 'react-reverse-portal'
import { usePortalContext } from "@/app/context/PortalContext";
import { motion } from 'framer-motion';

export default function Sub() {
  const portalNode = usePortalContext();

  return (
    <div className="flex flex-col h-full">
      <div className="text-left p-8">
        <h1 className="text-4xl font-bold text-gray-900">Sub Page - Fullscren</h1>
      </div>
      <div className="flex-1 flex">
        <motion.div
          className="flex-grow bg-gray-100 overflow-hidden"
          layoutId="canvas"
          transition={{ duration: 0.4 }}
        >
          <OutPortal node={portalNode} />
        </motion.div>
      </div>
    </div>
  );
}
