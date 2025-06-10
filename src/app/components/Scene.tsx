'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

function RotatingCube({ color }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
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

function Scene({ color }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <color attach="background" args={['lightgray']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[-5, 5, 10]} intensity={2} distance={100} decay={0} color="white" />
      <RotatingCube color={color} />
    </Canvas>
  );
}

export default Scene;
