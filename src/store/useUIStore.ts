import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ModuleId =
  | "tabCanvas2D"
  | "mod-viewer-3d"
  | "mod-nesting"
  | "mod-spec-sheet"
  | "mod-dxf-exporter"
  | "mod-pdf-generator";

export type UserMode = "beginner" | "pro";
export type UnitSystem = "mm" | "cm" | "inch";
export type Locale = "ja" | "en" | "fr" | "es" | "de";
export type SewingMachineType = "home" | "industrial"; // 家庭用 vs 工業用 (JUKI等)

export interface Measurements {
  bust: number;
  waist: number;
  hip: number;
  backLength?: number;
  shoulderWidth?: number;
  // 将来の拡張用オプショナルフィールド
  customExtras?: Record<string, number>;
}

export interface FabricStretch {
  hStretch: number; // 横方向伸縮率 (%)
  vStretch: number; // 縦方向伸縮率 (%)
}

export interface UIState {
  activeModule: ModuleId;
  userMode: UserMode;
  unitSystem: UnitSystem;
  locale: Locale;
  activeCategory: string;
  sewingMachineType: SewingMachineType; // 工業・家庭用設定
  measurements: Measurements;
  fabricStretch: FabricStretch;

  // アクション
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
      sewingMachineType: "home", // デフォルトは家庭用

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
      setLocale: (locale) => set({ locale }),
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
      name: "odawara-sewing-cad-storage", // ローカルストレージに自動保存され、リロードしても消えません
    },
  ),
);
