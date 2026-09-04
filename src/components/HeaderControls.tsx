// src/components/HeaderControls.tsx
import React from "react";
import { useUIStore } from "../store/useUIStore";
import { dictionaries } from "../i18n";
import type { LocaleType, UnitSystemType } from "../store/useUIStore";

export const HeaderControls: React.FC = () => {
  const {
    locale,
    setLocale,
    userMode,
    setUserMode,
    unitSystem,
    setUnitSystem,
    sewingMachineType,
    setSewingMachineType,
  } = useUIStore();

  // 現在のロケールに合わせて辞書をダイレクトに引くことで確実に再描画を誘発
  const t = dictionaries[locale] || dictionaries["ja"];

  return (
    <header className="bg-[#111827] text-white border-b border-amber-500/30 px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-lg">
      {/* アプリタイトル＆タグライン */}
      <div>
        <h1 className="text-lg font-bold text-amber-400 tracking-wide">
          {t.appName || "小田原ミシン Professional Suite"}
        </h1>
        <p className="text-xs text-slate-400">
          {t.tagline || "次世代の自動CADシステム"}
        </p>
      </div>

      {/* 各種コントロール群 */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        {/* 1. 🌐 6か国語切り替えセレクトボックス */}
        <div className="flex items-center gap-1.5 bg-[#1f2937] px-3 py-1.5 rounded-lg border border-slate-700">
          <span className="text-slate-400">🌐</span>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as LocaleType)}
            className="bg-transparent text-amber-300 font-semibold outline-none cursor-pointer"
          >
            <option value="ja" className="bg-[#1f2937] text-white">
              🇯🇵 日本語
            </option>
            <option value="en" className="bg-[#1f2937] text-white">
              🇺🇸 English
            </option>
            <option value="fr" className="bg-[#1f2937] text-white">
              🇫🇷 Français
            </option>
            <option value="es" className="bg-[#1f2937] text-white">
              🇪🇸 Español
            </option>
            <option value="zh" className="bg-[#1f2937] text-white">
              🇨🇳 中文
            </option>
            <option value="ko" className="bg-[#1f2937] text-white">
              🇰🇷 한국어
            </option>
          </select>
        </div>

        {/* 2. 👤 ユーザーモード切替（初心者 / プロ） */}
        <div className="flex bg-[#1f2937] p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setUserMode("beginner")}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              userMode === "beginner"
                ? "bg-amber-500 text-slate-950 font-bold shadow"
                : "text-slate-300 hover:text-white"
            }`}
          >
            {t.modes?.beginner || "初心者"}
          </button>
          <button
            onClick={() => setUserMode("pro")}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              userMode === "pro"
                ? "bg-amber-500 text-slate-950 font-bold shadow"
                : "text-slate-300 hover:text-white"
            }`}
          >
            {t.modes?.pro || "プロ (Pro)"}
          </button>
        </div>

        {/* 3. 📏 単位系切替（mm / cm / inch） */}
        <div className="flex bg-[#1f2937] p-1 rounded-lg border border-slate-700">
          {(["mm", "cm", "inch"] as UnitSystemType[]).map((unit) => (
            <button
              key={unit}
              onClick={() => setUnitSystem(unit)}
              className={`px-2.5 py-1 rounded-md transition-all uppercase cursor-pointer ${
                unitSystem === unit
                  ? "bg-blue-600 text-white font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {unit}
            </button>
          ))}
        </div>

        {/* 4. 🪡 ミシン設定切替（家庭用 / 工業用） */}
        <div className="flex bg-[#1f2937] p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setSewingMachineType("home")}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              sewingMachineType === "home"
                ? "bg-emerald-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t.panels?.home || "家庭用"}
          </button>
          <button
            onClick={() => setSewingMachineType("industrial")}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              sewingMachineType === "industrial"
                ? "bg-emerald-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t.panels?.industrial || "工業用"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderControls;
