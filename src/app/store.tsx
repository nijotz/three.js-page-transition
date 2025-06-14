'use client'

import { useMemo } from 'react';
import { create } from 'zustand';
import { createHtmlPortalNode, HtmlPortalNode } from 'react-reverse-portal';
import { ColorValue } from './types';

interface AppStore {
  portalNode: HtmlPortalNode | null;
  color: ColorValue;
  setColor: (color: ColorValue) => void;
  transition: boolean;
  setTransition: (arg0: boolean) => void;
}

export const useAppStore = create<AppStore>(set => ({
  portalNode: null,
  initPortal: () => {
    const node = createHtmlPortalNode({ attributes: { class: "h-full w-full" } });
    set({ portalNode: node });
  },
  color: 'blue',
  setColor: (color) => set({ color }),
  transition: false,
  setTransition: (transition) => set({ transition }),
}))
