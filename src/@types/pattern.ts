// src/@types/pattern.ts
import type { ItemId, CategoryId } from "./identifiers";

export type UnitType = "mm" | "cm" | "inch";

export type CornerType = "right-angle" | "mitered" | "folded";

export interface SeamAllowanceConfig {
  enabled: boolean;
  width: number;
  cornerType: CornerType;
}

export type NotchType = "v-shape" | "slit" | "hole" | "cross";

export interface Notch {
  id: string;
  position: { x: number; y: number };
  type: NotchType;
  label?: string;
}

export interface GrainLine {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

export interface PatternPart {
  id: string;
  name: string;
  outline: Array<{ x: number; y: number }>;
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
