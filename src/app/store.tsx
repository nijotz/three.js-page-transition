'use client'

import { create } from 'zustand';
import { ColorValue, Cube } from '@/app/types';

interface AppStore {
  cubes: Cube[],
  setCubes: (cubes: Cube[]) => void;
  updateCubes: (id: number, color: ColorValue) => void;
  transition: number | null;
  setTransition: (transition: number | null) => void;
  selectedCube: Cube | null;
  setSelectedCube: (id: number) => void;
}

export const useAppStore = create<AppStore>(set => ({
  cubes: [],
  setCubes: (cubes: Cube[]): void => set((): { cubes: Cube[] } => ({ cubes })),
  updateCubes: (id: number, color: ColorValue): void => set((state: AppStore): { cubes: Cube[] } => ({
    cubes: state.cubes.map((cube: Cube): Cube => cube.id === id ? { ...cube, color } : cube)
  })),
  transition: null,
  setTransition: (transition: number | null): void => set({ transition }),
  selectedCube: null,
  setSelectedCube: (selectedCubeId: number): void => set((state: AppStore): { selectedCube: Cube | undefined } =>
    ({ selectedCube: state.cubes.find((cube: Cube): boolean => cube.id === selectedCubeId) })),
}))
