'use client'

import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { createHtmlPortalNode, HtmlPortalNode } from 'react-reverse-portal';
import { ColorValue } from './types';

interface AppContextType {
  portalNode: HtmlPortalNode;
  color: ColorValue;
  setColor: (color: ColorValue) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const portalNode = useMemo(() => createHtmlPortalNode({ attributes: { class: "h-full w-full" } }), []);
  const [color, setColor] = useState<ColorValue>('blue');

  return (
    <AppContext.Provider value={{ portalNode, color, setColor }}>
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
