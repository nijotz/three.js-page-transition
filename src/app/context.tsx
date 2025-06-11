'use client'

import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { createHtmlPortalNode, HtmlPortalNode } from 'react-reverse-portal';
import { ColorValue } from './types';

interface AppContextType {
  portalNode: HtmlPortalNode;
  color: ColorValue;
  setColor: (color: ColorValue) => void;
  transition: boolean;
  setTransition: (arg0: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const portalNode = useMemo(() => createHtmlPortalNode({ attributes: { class: "h-full w-full" } }), []);
  const [color, setColor] = useState<ColorValue>('blue');
  const [transition, setTransition] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ portalNode, color, setColor, transition, setTransition }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
