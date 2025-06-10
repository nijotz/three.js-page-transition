import { createContext, useContext } from 'react';

export const PortalContext = createContext(null);

export function usePortalContext() {
  const portalNode = useContext(PortalContext);
  if (!portalNode) throw new Error('PortalContext.Provider missing');
  return portalNode;
}
