'use client';

import { useParams } from 'next/navigation';
import { motion } from "framer-motion";
import { OutPortal } from "react-reverse-portal";
import { useAppStore } from "@/app/store";
import { Cube } from "@/app/types";

export default function CubePage() {
  const { cubes, transition, setTransition } = useAppStore();

  const params = useParams();
  const id = Number(params.id);
  const cube = cubes.find((c: Cube): boolean => c.id === id);

  if (!cube) return <></>

  return (
    <div className="flex flex-col h-full">
      <div className="text-left p-8">
        <h1 className="text-4xl font-bold text-gray-900">Cube</h1>
      </div>
      <div className="flex-grow min-h-0 flex">
        <motion.div
          className={`flex-grow ${transition === cube.id && "z-10"}`}
          key={cube.id}
          layoutId={`canvas-${cube.id}`}
          transition={{ duration: 0.4 }}
          onLayoutAnimationStart={() => setTransition(cube.id)}
          onLayoutAnimationComplete={() => setTransition(null)}
        >
          <OutPortal node={cube.portalNode} />
        </motion.div>
      </div>
    </div>
  );
}
