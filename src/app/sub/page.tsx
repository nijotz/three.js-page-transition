'use client';

import { OutPortal } from 'react-reverse-portal'
import { useAppContext } from "@/app/context";
import { motion } from 'framer-motion';

export default function Sub() {
  const { portalNode, setTransition } = useAppContext();

  return (
    <div className="flex flex-col h-full">
      <div className="text-left p-8">
        <h1 className="text-4xl font-bold text-gray-900">Sub Page</h1>
      </div>
      <div className="flex-grow min-h-0 flex">
        <motion.div
          className="flex-grow bg-gray-100 overflow-hidden"
          layoutId="canvas"
          transition={{ duration: 14 }}
          onLayoutAnimationStart={() => setTransition(true)}
          onLayoutAnimationComplete={() => setTransition(false)}
        >
          <OutPortal node={portalNode} />
        </motion.div>
      </div>
    </div>
  );
}
