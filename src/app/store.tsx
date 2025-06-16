'use client'

import { create } from 'zustand';
import { createHtmlPortalNode, HtmlPortalNode } from 'react-reverse-portal';
import { ColorValue, Cube } from '@/app/types';

interface AppStore {
  portalNode: HtmlPortalNode | null;
  cubes: Cube[],
  updateCubes: (id: number, color: ColorValue) => void;
  transition: boolean;
  setTransition: (arg0: boolean) => void;
}

export const useAppStore = create<AppStore>(set => ({
  portalNode: null,
  initPortal: () => {
    const node = createHtmlPortalNode({ attributes: { class: "h-full w-full" } });
    set({ portalNode: node });
  },
  cubes: [
    { id: 1, color: 'blue' },
    { id: 2, color: 'blue' },
    { id: 3, color: 'blue' },
  ],
  updateCubes: (id: number, color: ColorValue): void => set((state: AppStore): { cubes: Cube[] } => ({
    cubes: state.cubes.map((cube: Cube): Cube => cube.id === id ? { id, color } : cube)
  })),
  transition: false,
  setTransition: (transition) => set({ transition }),
}))
