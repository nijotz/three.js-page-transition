"use client";

import { useCallback, useEffect, useRef } from "react";
import { Canvas as R3FCanvas, useFrame, useThree } from "@react-three/fiber";
import { Mesh, PerspectiveCamera } from "three";
import { useAppStore } from "@/app/store";
import { Colors, Cube } from "@/app/types";

function RotatingCube({ cube }: { cube: Cube }) {
  const meshRef = useRef<Mesh>(null);
  const rotationModifier = (Colors.indexOf(cube.color) + 1) / 50.0;

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 15 * rotationModifier;
      meshRef.current.rotation.y += delta * 12 * rotationModifier;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={cube.color || "#4f46e5"} />
    </mesh>
  );
}

function Resizer({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  const { transition } = useAppStore();
  const { gl, camera } = useThree();
  const frameRef = useRef<number | null>(null);

  const resize = useCallback(() => {
    if (!canvasRef?.current) return;

    const parent = canvasRef.current.parentElement;
    if (!parent) return;

    const { width, height } = parent.getBoundingClientRect();
    (camera as PerspectiveCamera).aspect = width / height;
    camera.updateProjectionMatrix();

    canvasRef.current.style.width = "100%";
    canvasRef.current.style.height = "100%";

    frameRef.current = requestAnimationFrame(resize);
  }, [camera, canvasRef]);

  useEffect(() => {
    if (transition) {
      frameRef.current = requestAnimationFrame(resize);
    } else {
      if (!canvasRef?.current) return;
      const { width, height } = canvasRef.current.getBoundingClientRect();
      gl.setSize(width, height);
      // Cancel animation loop when done transitioning
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
      frameRef.current = null;
    }

    // Cancel animation on unmount
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    }
  }, [resize, transition, canvasRef, gl]);

  return <></>
}

const Canvas = ({ cube }: { cube: Cube }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <R3FCanvas style={{ overflow: "visible" }} ref={canvasRef} camera={{ position: [0, 0, 5], fov: 75 }}>
      <Resizer canvasRef={canvasRef} />
      <color attach="background" args={["lightgray"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[-5, 5, 10]} intensity={2} distance={100} decay={0} color="white" />
      <RotatingCube cube={cube} />
    </R3FCanvas>
  );
}

export default Canvas;
