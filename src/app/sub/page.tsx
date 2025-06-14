'use client';

import { OutPortal } from 'react-reverse-portal'
import { useAppStore } from "@/app/store";
import { motion } from 'framer-motion';

export default function Sub() {
  const { portalNode, setTransition } = useAppStore();

  return (
    <div className="flex flex-col h-full">
      <div className="text-left p-8">
        <h1 className="text-4xl font-bold text-gray-900">Sub Page</h1>
      </div>
      <div className="flex-grow min-h-0 flex">
        <motion.div
          className="flex-grow bg-gray-100 overflow-hidden"
          layoutId="canvas"
          transition={{ duration: 0.4 }}
          onLayoutAnimationStart={() => setTransition(true)}
          onLayoutAnimationComplete={() => setTransition(false)}
        >
          {portalNode && <OutPortal node={portalNode} />}
        </motion.div>
      </div>
    </div>
  );
}
