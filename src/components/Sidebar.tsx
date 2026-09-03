// src/components/Sidebar.tsx
import React from "react";
import { useUIStore } from "../store/useUIStore";
import { dictionaries } from "../i18n";

export const Sidebar: React.FC = () => {
  // locale と t を確実にリアクティブに取得する
  const locale = useUIStore((state) => state.locale);
  const t = dictionaries[locale] || dictionaries["ja"];

  const {
    userMode,
    measurements,
    updateMeasurements,
    fabricStretch,
    updateFabricStretch,
  } = useUIStore();

  return (
    <aside className="w-80 bg-[#111827] text-slate-200 p-4 border-r border-slate-800 flex flex-col gap-6 overflow-y-auto">
      {/* パラメータコントロール セクション */}
      <div>
        <h2 className="text-sm font-bold text-amber-400 mb-3 uppercase tracking-wider">
          {t.panels?.parameterControls || "PARAMETER CONTROLS"}
        </h2>

        {/* 初心者ガイド / モードに応じた説明 */}
        {userMode === "beginner" && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4">
            <h3 className="text-xs font-bold text-amber-300 mb-1">
              {t.subviews?.beginnerGuideActive || "Beginner Guide Active"}
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {t.subviews?.beginnerGuideDesc || "Guide description..."}
            </p>
          </div>
        )}

        {/* 寸法・サイズ設定 パネル */}
        <div className="bg-[#1f2937] p-3 rounded-lg border border-slate-700/60">
          <h3 className="text-xs font-semibold text-slate-200 mb-3 flex items-center justify-between">
            <span>
              {t.panels?.measurementTitle || "Measurements & Drafting"}
            </span>
            <span className="text-[10px] text-amber-400">
              ({t.panels?.realtimeSync || "Real-time Sync"})
            </span>
          </h3>

          <div className="space-y-3 text-xs">
            {/* バスト */}
            <div>
              <label className="block text-slate-400 mb-1">
                {t.panels?.bust || "Bust"} (cm)
              </label>
              <input
                type="number"
                value={measurements.bust}
                onChange={(e) =>
                  updateMeasurements({ bust: Number(e.target.value) })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500"
              />
            </div>

            {/* ウエスト */}
            <div>
              <label className="block text-slate-400 mb-1">
                {t.panels?.waist || "Waist"} (cm)
              </label>
              <input
                type="number"
                value={measurements.waist}
                onChange={(e) =>
                  updateMeasurements({ waist: Number(e.target.value) })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500"
              />
            </div>

            {/* ヒップ */}
            <div>
              <label className="block text-slate-400 mb-1">
                {t.panels?.hip || "Hip"} (cm)
              </label>
              <input
                type="number"
                value={measurements.hip}
                onChange={(e) =>
                  updateMeasurements({ hip: Number(e.target.value) })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 生地物性・ストレッチシミュレーター セクション */}
      <div className="bg-[#1f2937] p-3 rounded-lg border border-slate-700/60">
        <h3 className="text-xs font-semibold text-slate-200 mb-3">
          {t.panels?.fabricStretchTitle || "Fabric Physics & Stretch"}
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">
              {t.panels?.horizontalStretch || "Horizontal Stretch"} (%)
            </label>
            <input
              type="number"
              value={fabricStretch.hStretch}
              onChange={(e) =>
                updateFabricStretch({ hStretch: Number(e.target.value) })
              }
              className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">
              {t.panels?.verticalStretch || "Vertical Stretch"} (%)
            </label>
            <input
              type="number"
              value={fabricStretch.vStretch}
              onChange={(e) =>
                updateFabricStretch({ vStretch: Number(e.target.value) })
              }
              className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* アクションボタン */}
      <div className="mt-auto space-y-2">
        <button
          onClick={() => alert("Pattern Generated!")}
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 px-4 rounded-lg transition-all shadow text-xs"
        >
          {t.subviews?.generatePattern || "Generate Pattern"}
        </button>

        <button
          onClick={() => updateMeasurements({ bust: 88, waist: 68, hip: 92 })}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-1.5 px-4 rounded-lg transition-all text-xs border border-slate-700"
        >
          {t.subviews?.reset || "Reset"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
