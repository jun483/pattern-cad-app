import { create } from "zustand";

// アプリケーション内で使用するモーダルの種類を定義します
// 必要に応じて新しいモーダルの種類を追加してください
export type ModalType =
  | "specSheet"
  | "settings"
  | "help"
  | "patternList"
  | "export"
  | null;

interface UIState {
  // --- 既存のUI状態（例） ---
  userMode: "beginner" | "professional";
  unitSystem: "mm" | "inch";
  currentLanguage: string;

  // --- モーダル管理の状態とアクション ---
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;

  // --- 既存のアクション（例） ---
  setUserMode: (mode: "beginner" | "professional") => void;
  setUnitSystem: (system: "mm" | "inch") => void;
  setCurrentLanguage: (lang: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // --- 初期値 ---
  userMode: "beginner",
  unitSystem: "mm",
  currentLanguage: "ja",
  activeModal: null,

  // --- モーダル制御の実装 ---
  openModal: (modal: ModalType) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),

  // --- アクションの実装（例） ---
  setUserMode: (userMode) => set({ userMode }),
  setUnitSystem: (unitSystem) => set({ unitSystem }),
  setCurrentLanguage: (currentLanguage) => set({ currentLanguage }),
}));
