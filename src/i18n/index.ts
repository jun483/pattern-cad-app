// src/i18n/index.ts
import { ja } from "./ja";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";
import { zh } from "./zh";
import { ko } from "./ko";

// 🌐 ロケール（言語）の型を明示的に定義・エクスポート
export type Locale = "ja" | "en" | "fr" | "es" | "zh" | "ko";
export type Language = Locale; // 互換性のためエイリアスを用意

export const dictionaries = {
  ja,
  en,
  fr,
  es,
  zh,
  ko,
} as const;
