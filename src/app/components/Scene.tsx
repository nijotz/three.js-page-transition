'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useFrame, useThree, createRoot, events, extend } from '@react-three/fiber';
import { Mesh, PerspectiveCamera } from 'three';
import * as THREE from 'three'
import { AppContextProvider, useAppContext } from '../context';
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

function Resizer({ canvasRef }) {
  const { transition } = useAppContext();
  const { gl, camera } = useThree();
  const frameRef = useRef<number | null>(null);
  console.log('transitioning', transition)
  console.log('canvasRef', canvasRef)

  const resize = useCallback(() => {
    if (!canvasRef.current) return;
    console.log('gl', gl);
    const parent = canvasRef.current.parentElement;
    console.log('parent', parent);
    const { width, height } = parent.getBoundingClientRect();
    console.log('width', width);
    (camera as PerspectiveCamera).aspect = width / height;
    camera.updateProjectionMatrix();
    canvasRef.current.style.width = "100%";
    canvasRef.current.style.height = "100%";
    console.log('canvasRef style', canvasRef.current.style);
    frameRef.current = requestAnimationFrame(resize);
  }, [transition]);

  useEffect(() => {
    if (true) {
      console.log('transitioning useEffect', transition)
      console.log('start resizing')
      frameRef.current = requestAnimationFrame(resize);
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
  }, [resize, transition]);

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
      const width = canvasRef.current.parentElement.clientWidth;
      const height = canvasRef.current.parentElement.clientHeight;
      window.addEventListener('resize', () => {
        root.configure({ size: { width, height } });
      });

      root.render(
        <AppContextProvider>
          <Scene canvasRef={canvasRef} />
        </AppContextProvider>
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

function Scene({ color, canvasRef }: { color: string }) {
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
