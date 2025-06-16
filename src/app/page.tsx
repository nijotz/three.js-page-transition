'use client'

import { ReactNode } from "react";
import CubeColor from "@/app/components/CubeColor";
import { useAppStore, Cube } from "@/app/store";
import { ColorValue, Cube } from '@/app/types';

export default function Home() {
  const { cubes, updateCubes } = useAppStore();

  const handleSelect = (id: number): void => {
  }

  return (
    <div className="flex flex-col h-full">
      <div className="text-left p-8">
        <h1 className="text-4xl font-bold text-gray-900">Home</h1>
      </div>
      <div className="flex">
        {cubes.map((cube: Cube): ReactNode => (
          <CubeColor
            key={cube.id}
            id={cube.id}
            color={cube.color}
            handleSelect={() => handleSelect(cube.id)}
            setColor={(color: ColorValue): void => updateCubes(cube.id, color)}
          />
        ))}
      </div>
    </div>
  );
}
