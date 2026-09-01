// src/components/subviews/SidebarControls.tsx

import React from "react";

// 1. モードや単位の型をアプリケーション全体（あるいはコンポーネント内）で統一・拡張
export type AppMode = "beginner" | "pro" | "professional";
export type MeasurementUnit = "cm" | "inch" | "mm";

interface SidebarControlsProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  unit: MeasurementUnit;
  onUnitChange: (unit: MeasurementUnit) => void;
}

export const SidebarControls: React.FC<SidebarControlsProps> = ({
  mode,
  onModeChange,
  unit,
  onUnitChange,
}) => {
  return (
    <aside className="bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col gap-6 w-72 h-full shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
          Contrôles CAD
        </h2>
        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
          v1.0
        </span>
      </div>

      {/* モード切替セクション */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          Mode d'Utilisation
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => onModeChange("beginner")}
            className={`py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === "beginner"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => onModeChange("pro")}
            className={`py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === "pro"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Pro
          </button>
          <button
            onClick={() => onModeChange("professional")}
            className={`py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === "professional"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Expert
          </button>
        </div>
      </div>

      {/* 単位切替セクション（mm にも完全対応） */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          Unité de Mesure
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          {(["cm", "inch", "mm"] as MeasurementUnit[]).map((u) => (
            <button
              key={u}
              onClick={() => onUnitChange(u)}
              className={`py-1.5 text-xs font-medium uppercase rounded-md transition-all ${
                unit === u
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* ステータス情報 */}
      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex justify-between items-center mb-1">
          <span>Mode Actuel:</span>
          <span className="font-semibold capitalize text-amber-600 dark:text-amber-400">
            {mode}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Unité:</span>
          <span className="font-semibold uppercase text-emerald-600 dark:text-emerald-400">
            {unit}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default SidebarControls;
