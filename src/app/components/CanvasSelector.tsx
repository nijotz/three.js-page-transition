import { ReactNode } from "react";
import { InPortal } from "react-reverse-portal";
import { useAppStore } from "@/app/store";
import { Cube } from "@/app/types";
import Canvas from "@/app/components/Canvas";

const CanvasSelector = () => {
  const { cubes, transition } = useAppStore();

  return (
    <>
      {cubes.map((cube: Cube): ReactNode => (
        <InPortal key={cube.id} node={cube.portalNode}>
          <Canvas cube={cube} transition={transition} />
        </InPortal>
      ))}
    </>
  );
};

export default CanvasSelector;
