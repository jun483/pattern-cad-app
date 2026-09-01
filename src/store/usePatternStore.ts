// src/store/usePatternStore.ts
import { create } from "zustand";
import type { PatternPart, PatternDocument } from "../@types/pattern";

// 寸法の型定義（バッグ系・洋服系の両方に対応）
export interface PatternDimensions {
  width?: number;
  height?: number;
  depth?: number;
  bust?: number;
  waist?: number;
  [key: string]: number | undefined;
}

interface PatternState {
  document: PatternDocument | null;
  currentParts: PatternPart[];
  dimensions: PatternDimensions;
  setDocument: (doc: PatternDocument) => void;
  setDimensions: (dims: PatternDimensions) => void;
  updatePart: (partId: string, updatedProps: Partial<PatternPart>) => void;
  addPart: (part: PatternPart) => void;
  removePart: (partId: string) => void;
}

export const usePatternStore = create<PatternState>((set) => ({
  document: null,
  currentParts: [],
  dimensions: {
    width: 400,
    height: 300,
    depth: 60,
    bust: 84,
    waist: 64,
  },

  setDocument: (doc: PatternDocument) => {
    // doc に dimensions が含まれている可能性があるため any で安全に取得
    const docAny = doc as any;
    set({
      document: doc,
      currentParts: doc.parts,
      ...(docAny.dimensions ? { dimensions: docAny.dimensions } : {}),
    });
  },

  setDimensions: (dims: PatternDimensions) =>
    set((state) => {
      const currentDims = state.dimensions;
      const newDims = { ...currentDims, ...dims };
      const docAny = state.document as any;

      return {
        dimensions: newDims,
        document: state.document
          ? ({
              ...state.document,
              dimensions: {
                ...(docAny?.dimensions || {}),
                ...dims,
              },
            } as PatternDocument)
          : null,
      };
    }),

  updatePart: (partId: string, updatedProps: Partial<PatternPart>) =>
    set((state) => ({
      currentParts: state.currentParts.map((part: PatternPart) =>
        part.id === partId ? { ...part, ...updatedProps } : part,
      ),
    })),

  addPart: (part: PatternPart) =>
    set((state) => ({
      currentParts: [...state.currentParts, part],
    })),

  removePart: (partId: string) =>
    set((state) => ({
      currentParts: state.currentParts.filter(
        (part: PatternPart) => part.id !== partId,
      ),
    })),
}));
