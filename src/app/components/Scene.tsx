'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useAppContext } from "@/app/context";

function RotatingCube({ color }: { color: string }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color || "#4f46e5"} />
    </mesh>
  );
}

function Scene({ color }: { color: string }) {
  const canvasRef = useRef(null);
  const { transition } = useAppContext();
  const frameRef = useRef<number | null>(null);
  const sizeRef = useRef("100%");

  // I can't find a way to trigger resizing the canvas with react-three-fiber.
  // It uses react-use-measure which uses a ResizeObserver. I was trying to
  // programmatically have the Canvas resize during framer motion transitions,
  // but nothing worked. So I'm triggering a re-render by slightly changing the
  // size of the element...
  const jiggle = useCallback(() => {
    if (!canvasRef?.current) return null
    const elem = canvasRef.current as HTMLCanvasElement;

    if (sizeRef.current === "100%") {
      sizeRef.current = "100.01%";
    } else {
      sizeRef.current = "100%";
    }

    elem.style.width = sizeRef.current;
    elem.style.height = sizeRef.current;

    frameRef.current = requestAnimationFrame(jiggle);
  }, []);

  useEffect(() => {
    if (transition) {
      // Start animation loop when transitioning
      frameRef.current = requestAnimationFrame(jiggle);
    } else {
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
  }, [jiggle, transition]);

  return (
    <Canvas ref={canvasRef} camera={{ position: [0, 0, 5], fov: 75 }}>
      <color attach="background" args={['lightgray']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[-5, 5, 10]} intensity={2} distance={100} decay={0} color="white" />
      <RotatingCube color={color} />
    </Canvas>
  );
}

export default Scene;
