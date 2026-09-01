/* cspell:ignore bento knapsack */

export type PatternType =
  | "tote"
  | "lesson"
  | "shoe"
  | "drawstring"
  | "bento"
  | "cup"
  | "knapsack"
  | string;

export type ViewMode = "2d" | "3d" | "2D" | "3D";

export interface PatternParameters {
  width: number;
  height: number;
  depth: number;
  seamAllowance: number;
  hasBottomSwitch?: boolean;
  bottomRatio?: number;
  handleWidth?: number;
  handleLength?: number;
  hasZipperFacing?: boolean;
  zipperMargin?: number;
  patternType?: PatternType;
  [key: string]: any;
}

export interface PatternPart {
  id: string;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  color?: string;
  instructions?: string;
  [key: string]: any;
}

export interface PatternRenderData {
  params: PatternParameters;
  parts: PatternPart[];
  totalFabricWidth?: number;
  totalFabricLength?: number;
  [key: string]: any;
}
