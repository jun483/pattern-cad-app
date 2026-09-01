// src/@types/ui.ts

export type UserMode = "beginner" | "pro";
export type UnitSystem = "mm" | "cm" | "inch";

export type ModuleId =
  | "tabCanvas2D"
  | "mod-canvas-2d"
  | "mod-viewer-3d"
  | "mod-nesting"
  | "mod-spec-sheet"
  | "mod-dxf-exporter"
  | "mod-pdf-generator";

export type ModalType = "settings" | "help" | "export" | "measurements" | null;

export interface Measurements {
  bust: number;
  waist: number;
  hip: number;
  backLength: number;
  shoulderWidth: number;
  sleeveLength: number;
}

export interface FabricStretch {
  hStretch: number;
  vStretch: number;
}

// ★ ここに export を追加しました
export interface UIState {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  unitSystem: UnitSystem;
  setUnitSystem: (system: UnitSystem) => void;
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeModule: ModuleId;
  setActiveModule: (module: ModuleId) => void;
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  measurements: Measurements;
  fabricStretch: FabricStretch;
  updateMeasurements: (partial: Partial<Measurements>) => void;
  updateFabricStretch: (partial: Partial<FabricStretch>) => void;
}
