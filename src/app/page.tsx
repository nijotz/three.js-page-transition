'use client'

import { useRouter } from 'next/navigation';
import CubeColor from "@/app/components/CubeColor";
import { useAppStore } from "@/app/store";
import { ColorValue, Cube } from "@/app/types";

export default function Home() {
  const { cubes, updateCubes, selectedCube, setSelectedCube } = useAppStore();
  const router = useRouter();

  const handleSelect = (id: number): void => {
    setSelectedCube(id);
  }

  const handleAction = (id: number): void => {
    router.push(`/cubes/${id}`);
  }

  return (
    <div className="flex flex-col h-full px-4">
      <div className="text-left p-8">
        <h1 className="text-4xl font-bold text-gray-900">Home</h1>
      </div>
      <div className="flex">
        {cubes.map((cube: Cube) =>
          <CubeColor
            key={cube.id}
            id={cube.id}
            color={cube.color}
            selected={cube.id === selectedCube?.id}
            handleSelect={() => handleSelect(cube.id)}
            handleAction={() => handleAction(cube.id)}
            setColor={(color: ColorValue): void => updateCubes(cube.id, color)}
            portalNode={cube.portalNode}
          />
        )}
      </div>
    </div>
  );
}
