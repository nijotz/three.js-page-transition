'use client';

import { motion } from "framer-motion";
import { OutPortal } from "react-reverse-portal";
import { useAppStore } from "@/app/store";

export default function Sub() {
  const { selectedCube, setTransition } = useAppStore();

  if (!selectedCube) return <></>

  return (
    <div className="flex flex-col h-full">
      <div className="text-left p-8">
        <h1 className="text-4xl font-bold text-gray-900">Sub Page</h1>
      </div>
      <div className="flex-grow min-h-0 flex">
        <motion.div
          className="flex-grow"
          key={selectedCube.id}
          layoutId={`canvas-${selectedCube.id}`}
          transition={{ duration: 0.4 }}
          onLayoutAnimationStart={() => setTransition(true)}
          onLayoutAnimationComplete={() => setTransition(false)}
        >
          {selectedCube && <OutPortal node={selectedCube.portalNode} />}
        </motion.div>
      </div>
    </div>
  );
}
