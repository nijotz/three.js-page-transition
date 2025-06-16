import { HtmlPortalNode } from 'react-reverse-portal';

export type ColorValue = 'blue' | 'green' | 'purple';

export interface ColorOption {
  value: ColorValue;
  label: string;
  color: string;
}

export interface Cube {
  id: number;
  color: ColorValue;
  portalNode: HtmlPortalNode;
}
