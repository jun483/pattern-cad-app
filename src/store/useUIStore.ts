// src/store/useUIStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserMode = "beginner" | "pro" | "custom";
export type ActiveView =
  | "2d"
  | "3d"
  | "nesting"
  | "specsheet"
  | "pdf"
  | "storage"
  | "dxf";
export type CategoryType = "human" | "doll" | "pet" | "cosplay" | "other";
export type LocaleType = "ja" | "en" | "fr" | "es" | "zh" | "ko";
export type SewingMachineType = "home" | "industrial";
export type UnitSystemType = "mm" | "cm" | "inch";

export interface Measurements {
  bust: number;
  waist: number;
  hip: number;
  backLength: number;
  shoulderWidth: number;
  neckGirth: number;
  sleeveLength: number;
  height: number;
  frontLength: number;
  bustApexDistance: number;
  [key: string]: number;
}

export interface CalculatorParams {
  easeBust: number;
  easeWaist: number;
  easeHip: number;
  seamAllowance: number;
  flareAngle: number;
  dartDepth: number;
  [key: string]: number;
}

export interface FabricStretchProps {
  hStretch: number;
  vStretch: number;
}

export interface FabricProps {
  name: string;
  stretchH: number;
  stretchV: number;
  weight: number;
  thickness: number;
  friction: number;
  [key: string]: any;
}

export interface PatternPiece {
  id: string;
  name: string;
  points: { x: number; y: number }[];
  isLocked: boolean;
  seamAllowance: number;
}

export interface UIState {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;

  category: CategoryType;
  setCategory: (category: CategoryType | string) => void;
  activeCategory: CategoryType;
  setActiveCategory: (category: CategoryType | string) => void;

  locale: LocaleType;
  setLocale: (locale: LocaleType) => void;

  unitSystem: UnitSystemType;
  setUnitSystem: (system: UnitSystemType) => void;

  measurements: Measurements;
  setMeasurements: (
    update: Partial<Measurements> | ((prev: Measurements) => Measurements),
  ) => void;
  updateMeasurements: (update: Partial<Measurements>) => void;
  updateMeasurement: (key: string, value: number) => void;
  resetMeasurements: () => void;

  calculatorParams: CalculatorParams;
  setCalculatorParams: (
    update:
      | Partial<CalculatorParams>
      | ((prev: CalculatorParams) => CalculatorParams),
  ) => void;
  updateCalculatorParam: (key: string, value: number) => void;
  resetCalculatorParams: () => void;

  fabric: FabricProps;
  fabricStretch: FabricStretchProps;
  setFabric: (fabric: Partial<FabricProps>) => void;
  updateFabricStretch: (update: Partial<FabricStretchProps>) => void;
  updateFabricProp: <K extends keyof FabricProps>(
    key: K,
    value: FabricProps[K],
  ) => void;

  sewingMachineType: SewingMachineType;
  setSewingMachineType: (type: SewingMachineType) => void;
  stitchLength: number;
  setStitchLength: (length: number) => void;
  threadTension: number;
  setThreadTension: (tension: number) => void;

  patternPieces: PatternPiece[];
  addPatternPiece: (piece: PatternPiece) => void;
  updatePatternPiece: (id: string, updated: Partial<PatternPiece>) => void;
  removePatternPiece: (id: string) => void;
  clearPatternPieces: () => void;

  avatarModel: string;
  setAvatarModel: (model: string) => void;
  avatarPose: string;
  setAvatarPose: (pose: string) => void;
  windEffect: boolean;
  toggleWindEffect: () => void;

  fabricWidth: number;
  setFabricWidth: (width: number) => void;
  nestingMargin: number;
  setNestingMargin: (margin: number) => void;

  logMessages: string[];
  setLogMessages: React.Dispatch<React.SetStateAction<string[]>>;
  addLogMessage: (msg: string) => void;

  exportProjectData: () => string;
  importProjectData: (jsonString: string) => boolean;
  resetAll: () => void;
}

const initialMeasurements: Measurements = {
  bust: 88,
  waist: 68,
  hip: 92,
  backLength: 40,
  shoulderWidth: 42,
  neckGirth: 36,
  sleeveLength: 56,
  height: 160,
  frontLength: 42,
  bustApexDistance: 16,
};

const initialCalculatorParams: CalculatorParams = {
  easeBust: 4.0,
  easeWaist: 2.0,
  easeHip: 3.0,
  seamAllowance: 1.0,
  flareAngle: 0.0,
  dartDepth: 2.5,
};

const initialFabric: FabricProps = {
  name: "標準コットンブロード",
  stretchH: 0,
  stretchV: 0,
  weight: 120,
  thickness: 0.3,
  friction: 0.4,
};

const initialPatternPieces: PatternPiece[] = [
  {
    id: "front-bodice",
    name: "身頃前 (Front Bodice)",
    points: [
      { x: 0, y: 0 },
      { x: 22, y: 0 },
      { x: 22, y: 50 },
      { x: 0, y: 50 },
    ],
    isLocked: false,
    seamAllowance: 1.0,
  },
];

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      userMode: "beginner",
      setUserMode: (userMode) => set({ userMode }),
      activeView: "2d",
      setActiveView: (activeView) => set({ activeView }),

      category: "human",
      activeCategory: "human",
      setCategory: (cat) =>
        set({
          category: cat as CategoryType,
          activeCategory: cat as CategoryType,
        }),
      setActiveCategory: (cat) =>
        set({
          category: cat as CategoryType,
          activeCategory: cat as CategoryType,
        }),

      locale: "ja",
      setLocale: (locale) => set({ locale }),

      unitSystem: "cm",
      setUnitSystem: (unitSystem) => set({ unitSystem }),

      measurements: initialMeasurements,
      setMeasurements: (update) =>
        set((state) => {
          const nextValues =
            typeof update === "function" ? update(state.measurements) : update;
          return {
            measurements: {
              ...state.measurements,
              ...nextValues,
            } as Measurements,
          };
        }),
      updateMeasurements: (update) =>
        set((state) => ({
          measurements: {
            ...state.measurements,
            ...update,
          } as Measurements,
        })),
      updateMeasurement: (key, value) =>
        set((state) => ({
          measurements: {
            ...state.measurements,
            [key]: value,
          } as Measurements,
        })),
      resetMeasurements: () => set({ measurements: initialMeasurements }),

      calculatorParams: initialCalculatorParams,
      setCalculatorParams: (update) =>
        set((state) => {
          const nextValues =
            typeof update === "function"
              ? update(state.calculatorParams)
              : update;
          return {
            calculatorParams: {
              ...state.calculatorParams,
              ...nextValues,
            } as CalculatorParams,
          };
        }),
      updateCalculatorParam: (key, value) =>
        set((state) => ({
          calculatorParams: {
            ...state.calculatorParams,
            [key]: value,
          } as CalculatorParams,
        })),
      resetCalculatorParams: () =>
        set({ calculatorParams: initialCalculatorParams }),

      fabric: initialFabric,
      fabricStretch: {
        hStretch: initialFabric.stretchH,
        vStretch: initialFabric.stretchV,
      },

      setFabric: (newFabric) =>
        set((state) => {
          const updatedFabric = { ...state.fabric, ...newFabric };
          return {
            fabric: updatedFabric,
            fabricStretch: {
              hStretch: updatedFabric.stretchH,
              vStretch: updatedFabric.stretchV,
            },
          };
        }),

      updateFabricStretch: (update) =>
        set((state) => {
          const nextH =
            update.hStretch !== undefined
              ? update.hStretch
              : state.fabric.stretchH;
          const nextV =
            update.vStretch !== undefined
              ? update.vStretch
              : state.fabric.stretchV;
          return {
            fabric: {
              ...state.fabric,
              stretchH: nextH,
              stretchV: nextV,
            },
            fabricStretch: {
              hStretch: nextH,
              vStretch: nextV,
            },
          };
        }),

      updateFabricProp: (key, value) =>
        set((state) => {
          const updatedFabric = { ...state.fabric, [key]: value };
          return {
            fabric: updatedFabric,
            ...(key === "stretchH" || key === "stretchV"
              ? {
                  fabricStretch: {
                    hStretch: updatedFabric.stretchH,
                    vStretch: updatedFabric.stretchV,
                  },
                }
              : {}),
          };
        }),

      sewingMachineType: "home",
      setSewingMachineType: (sewingMachineType) => set({ sewingMachineType }),
      stitchLength: 2.5,
      setStitchLength: (stitchLength) => set({ stitchLength }),
      threadTension: 4,
      setThreadTension: (threadTension) => set({ threadTension }),

      patternPieces: initialPatternPieces,
      addPatternPiece: (piece) =>
        set((state) => ({ patternPieces: [...state.patternPieces, piece] })),
      updatePatternPiece: (id, updated) =>
        set((state) => ({
          patternPieces: state.patternPieces.map((p) =>
            p.id === id ? { ...p, ...updated } : p,
          ),
        })),
      removePatternPiece: (id) =>
        set((state) => ({
          patternPieces: state.patternPieces.filter((p) => p.id !== id),
        })),
      clearPatternPieces: () => set({ patternPieces: [] }),

      avatarModel: "standard-female",
      setAvatarModel: (avatarModel) => set({ avatarModel }),
      avatarPose: "t-pose",
      setAvatarPose: (avatarPose) => set({ avatarPose }),
      windEffect: false,
      toggleWindEffect: () =>
        set((state) => ({ windEffect: !state.windEffect })),

      fabricWidth: 110,
      setFabricWidth: (fabricWidth) => set({ fabricWidth }),
      nestingMargin: 1.0,
      setNestingMargin: (nestingMargin) => set({ nestingMargin }),

      logMessages: [],
      setLogMessages: (updater) =>
        set((state) => ({
          logMessages:
            typeof updater === "function"
              ? updater(state.logMessages)
              : updater,
        })),
      addLogMessage: (msg) =>
        set((state) => ({
          logMessages: [
            ...state.logMessages,
            `[${new Date().toLocaleTimeString()}] ${msg}`,
          ],
        })),

      exportProjectData: () => {
        const state = get();
        const exportObj = {
          userMode: state.userMode,
          locale: state.locale,
          unitSystem: state.unitSystem,
          category: state.category,
          measurements: state.measurements,
          calculatorParams: state.calculatorParams,
          fabric: state.fabric,
          sewingMachineType: state.sewingMachineType,
          patternPieces: state.patternPieces,
        };
        return JSON.stringify(exportObj, null, 2);
      },

      importProjectData: (jsonString) => {
        try {
          const data = JSON.parse(jsonString);
          set((state) => {
            const nextFabric = data.fabric
              ? { ...state.fabric, ...data.fabric }
              : state.fabric;
            return {
              ...(data.userMode && { userMode: data.userMode }),
              ...(data.locale && { locale: data.locale }),
              ...(data.unitSystem && { unitSystem: data.unitSystem }),
              ...(data.category && {
                category: data.category,
                activeCategory: data.category,
              }),
              ...(data.measurements && { measurements: data.measurements }),
              ...(data.calculatorParams && {
                calculatorParams: data.calculatorParams,
              }),
              ...(data.fabric && {
                fabric: nextFabric,
                fabricStretch: {
                  hStretch: nextFabric.stretchH,
                  vStretch: nextFabric.stretchV,
                },
              }),
              ...(data.sewingMachineType && {
                sewingMachineType: data.sewingMachineType,
              }),
              ...(data.patternPieces && { patternPieces: data.patternPieces }),
            };
          });
          return true;
        } catch (e) {
          console.error("Failed to import project data:", e);
          return false;
        }
      },

      resetAll: () =>
        set({
          userMode: "beginner",
          activeView: "2d",
          category: "human",
          activeCategory: "human",
          locale: "ja",
          unitSystem: "cm",
          measurements: initialMeasurements,
          calculatorParams: initialCalculatorParams,
          fabric: initialFabric,
          fabricStretch: {
            hStretch: initialFabric.stretchH,
            vStretch: initialFabric.stretchV,
          },
          sewingMachineType: "home",
          stitchLength: 2.5,
          threadTension: 4,
          patternPieces: initialPatternPieces,
          avatarModel: "standard-female",
          avatarPose: "t-pose",
          windEffect: false,
          fabricWidth: 110,
          nestingMargin: 1.0,
          logMessages: [],
        }),
    }),
    {
      name: "odawara-pattern-cad-store-ultimate-complete",
    },
  ),
);
