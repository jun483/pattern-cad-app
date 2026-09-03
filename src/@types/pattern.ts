// src/@types/pattern.ts
import type { ItemId, CategoryId } from "./identifiers";

export type UnitType = "mm" | "cm" | "inch";

export type CornerType = "right-angle" | "mitered" | "folded";

export interface Point2D {
  x: number;
  y: number;
}

export interface CalculatedPart {
  name: string;
  outline: Point2D[];
  seamAllowance?: number;
}

export interface SeamAllowanceConfig {
  enabled: boolean;
  width: number;
  cornerType: CornerType;
}

export type NotchType = "v-shape" | "slit" | "hole" | "cross";

export interface Notch {
  id: string;
  position: Point2D;
  type: NotchType;
  label?: string;
}

export interface GrainLine {
  start: Point2D;
  end: Point2D;
}

export interface PatternPart {
  id: string;
  name: string;
  outline: Point2D[];
  notches: Notch[];
  seamAllowance: SeamAllowanceConfig;
  grainLine: GrainLine;
  quantity: number;
}

export interface PatternDocument {
  itemId: ItemId;
  categoryId: CategoryId;
  title: string;
  version: number;
  unit: UnitType;
  scale: number;
  parts: PatternPart[];
}
