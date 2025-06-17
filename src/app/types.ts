import { HtmlPortalNode } from 'react-reverse-portal';

export const Colors = ['blue', 'green', 'purple'] as const;
export type ColorValue = (typeof Colors)[number];

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
