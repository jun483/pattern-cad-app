// src/components/panels/MeasurementPanel.tsx
import React from "react";
import { useUIStore } from "../../store/useUIStore";
import { measurementTranslations } from "./MeasurementPanel.i18n";

export const MeasurementPanel: React.FC = () => {
  // ストアからロケールと寸法データ、更新関数を安全に取得
  const locale = useUIStore((state: any) => state.locale) || "ja";
  const measurements = useUIStore((state: any) => state.measurements) || {
    bust: 88,
    waist: 68,
    hip: 92,
    backLength: 38,
    shoulderWidth: 40,
  };
  const updateMeasurements =
    useUIStore((state: any) => state.updateMeasurements) || (() => {});
  const userMode = useUIStore((state: any) => state.userMode) || "beginner";

  // 現在の言語の辞書を取得（対応していない場合は日本語にフォールバック）
  const t =
    measurementTranslations[locale as keyof typeof measurementTranslations] ||
    measurementTranslations.ja;

  return (
    <div className="bg-[#1f2937] p-3 rounded-lg border border-slate-700/60 text-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
          {t.panelLabel}
        </h3>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
          {t.modePrefix}{" "}
          <span className="text-amber-300 font-semibold">{userMode}</span>
        </span>
      </div>

      {/* モードに応じたタイトル表示 */}
      <div className="mb-3 bg-amber-500/10 border border-amber-500/30 rounded p-2">
        <p className="text-xs font-semibold text-amber-300">
          {userMode === "beginner" ? t.beginnerTitle : t.proTitle}
        </p>
      </div>

      {/* 寸法入力フィールド */}
      <div className="space-y-3 text-xs">
        {/* バスト */}
        <div>
          <label className="block text-slate-400 mb-1 font-medium">
            {t.bust} (cm)
          </label>
          <input
            type="number"
            value={measurements.bust}
            onChange={(e) =>
              updateMeasurements({ bust: Number(e.target.value) })
            }
            className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* ウエスト */}
        <div>
          <label className="block text-slate-400 mb-1 font-medium">
            {t.waist} (cm)
          </label>
          <input
            type="number"
            value={measurements.waist}
            onChange={(e) =>
              updateMeasurements({ waist: Number(e.target.value) })
            }
            className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* ヒップ */}
        <div>
          <label className="block text-slate-400 mb-1 font-medium">
            {t.hip} (cm)
          </label>
          <input
            type="number"
            value={measurements.hip}
            onChange={(e) =>
              updateMeasurements({ hip: Number(e.target.value) })
            }
            className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* 背丈 (Proモードや詳細項目がある場合) */}
        {measurements.backLength !== undefined && (
          <div>
            <label className="block text-slate-400 mb-1 font-medium">
              {t.backLength} (cm)
            </label>
            <input
              type="number"
              value={measurements.backLength}
              onChange={(e) =>
                updateMeasurements({ backLength: Number(e.target.value) })
              }
              className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        )}

        {/* 肩幅 */}
        {measurements.shoulderWidth !== undefined && (
          <div>
            <label className="block text-slate-400 mb-1 font-medium">
              {t.shoulderWidth} (cm)
            </label>
            <input
              type="number"
              value={measurements.shoulderWidth}
              onChange={(e) =>
                updateMeasurements({ shoulderWidth: Number(e.target.value) })
              }
              className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MeasurementPanel;
