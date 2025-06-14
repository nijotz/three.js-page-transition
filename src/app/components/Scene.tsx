'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useFrame, useThree, createRoot, events, extend } from '@react-three/fiber';
import { Mesh, PerspectiveCamera } from 'three';
import * as THREE from 'three'
import { useAppStore } from '@/app/store';

extend(THREE);

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

function Resizer({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement> | null }) {
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

function Canvas() {
  const canvasRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    async function load() {
      if (!canvasRef?.current) return;
      if (rootRef.current) return;
      const root = createRoot(canvasRef.current)
      await root.configure({ events, camera: { position: [0, 0, 5], fov: 75 } });

      const resize = () => {
        if (!canvasRef?.current) return;
        const width = (canvasRef.current as HTMLElement)?.parentElement?.clientWidth || 0;
        const height = (canvasRef.current as HTMLElement)?.parentElement?.clientHeight || 0;
        root.configure({ size: { width, height, top: 0, left: 0 } });
      };

      window.addEventListener('resize', () => resize());
      resize();

      root.render(
        <>
          {canvasRef && <Scene canvasRef={canvasRef} />}
        </>
      )
      rootRef.current = root;

      return () => {
        root.unmount();
        rootRef.current = null;
      };
    }

    void load();
  }, [canvasRef]);

  return (
    <canvas ref={canvasRef}>
    </canvas>
  );
}

function Scene({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement> }) {
  const { color } = useAppStore();

  return (
    <>
      <Resizer canvasRef={canvasRef} />
      <color attach="background" args={['lightgray']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[-5, 5, 10]} intensity={2} distance={100} decay={0} color="white" />
      <RotatingCube color={color} />
    </>
  );
}

export default Canvas;
