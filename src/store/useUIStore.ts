// src/store/useUIStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dictionaries } from "../i18n";
import type { Language } from "../i18n"; // ← ここを `import type` に変更しました

export type ModuleId =
  | "tabCanvas2D"
  | "mod-viewer-3d"
  | "mod-nesting"
  | "mod-spec-sheet"
  | "mod-dxf-exporter"
  | "mod-pdf-generator";

export type UserMode = "beginner" | "pro";
export type UnitSystem = "mm" | "cm" | "inch";
export type Locale = Language;
export type SewingMachineType = "home" | "industrial";

export interface Measurements {
  bust: number;
  waist: number;
  hip: number;
  backLength?: number;
  shoulderWidth?: number;
  customExtras?: Record<string, number>;
}

export interface FabricStretch {
  hStretch: number;
  vStretch: number;
}

export interface UIState {
  activeModule: ModuleId;
  userMode: UserMode;
  unitSystem: UnitSystem;
  locale: Locale;
  activeCategory: string;
  sewingMachineType: SewingMachineType;
  measurements: Measurements;
  fabricStretch: FabricStretch;
  t: (typeof dictionaries)["ja"];

  setActiveModule: (module: ModuleId) => void;
  setUserMode: (mode: UserMode) => void;
  setUnitSystem: (unit: UnitSystem) => void;
  setLocale: (locale: Locale) => void;
  setActiveCategory: (category: string) => void;
  setSewingMachineType: (type: SewingMachineType) => void;
  updateMeasurements: (partial: Partial<Measurements>) => void;
  updateFabricStretch: (partial: Partial<FabricStretch>) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      activeModule: "tabCanvas2D",
      userMode: "beginner",
      unitSystem: "cm",
      locale: "ja",
      activeCategory: "men_shirt",
      sewingMachineType: "home",
      t: dictionaries["ja"],

      measurements: {
        bust: 88,
        waist: 68,
        hip: 92,
        backLength: 40,
        shoulderWidth: 42,
      },

      fabricStretch: {
        hStretch: 0,
        vStretch: 0,
      },

      setActiveModule: (module) => set({ activeModule: module }),
      setUserMode: (mode) => set({ userMode: mode }),
      setUnitSystem: (unit) => set({ unitSystem: unit }),

      setLocale: (locale) =>
        set({
          locale,
          t: dictionaries[locale] || dictionaries["ja"],
        }),

      setActiveCategory: (category) => set({ activeCategory: category }),
      setSewingMachineType: (type) => set({ sewingMachineType: type }),

      updateMeasurements: (partial) =>
        set((state) => ({
          measurements: { ...state.measurements, ...partial },
        })),

      updateFabricStretch: (partial) =>
        set((state) => ({
          fabricStretch: { ...state.fabricStretch, ...partial },
        })),
    }),
    {
      name: "odawara-sewing-cad-storage",
    },
  ),
);
