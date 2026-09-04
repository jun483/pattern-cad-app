// src/components/Sidebar.tsx
import React from "react";
import { useUIStore } from "../store/useUIStore";
import { dictionaries } from "../i18n";

export const Sidebar: React.FC = () => {
  const locale = useUIStore((state) => state.locale);
  const t: any = dictionaries[locale] || dictionaries["ja"];
  const panels = t.panels || {};
  const subviews = t.subviews || {};

  const {
    userMode,
    measurements,
    updateMeasurements,
    fabricStretch,
    updateFabricStretch,
    unitSystem, // "mm" | "cm" | "inch"
  } = useUIStore();

  // ----------------------------------------------------
  // 単位変換ヘルパー
  // ストア内は常に cm で保持し、表示・入力時に単位を換算する
  // ----------------------------------------------------
  const convertValue = (valInCm: number) => {
    if (unitSystem === "mm") return Number((valInCm * 10).toFixed(1));
    if (unitSystem === "inch") return Number((valInCm / 2.54).toFixed(2));
    return Number(valInCm.toFixed(1)); // "cm"
  };

  const parseInput = (valInput: number) => {
    if (unitSystem === "mm") return valInput / 10;
    if (unitSystem === "inch") return valInput * 2.54;
    return valInput; // "cm"
  };

  return (
    <aside className="w-80 bg-[#111827] text-slate-200 p-4 border-r border-slate-800 flex flex-col gap-6 overflow-y-auto">
      <div>
        <h2 className="text-sm font-bold text-amber-400 mb-3 uppercase tracking-wider">
          {panels.parameterControls || "PARAMETER CONTROLS"}
        </h2>

        {userMode === "beginner" && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4">
            <h3 className="text-xs font-bold text-amber-300 mb-1">
              {subviews.beginnerGuideActive || "Beginner Guide Active"}
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {subviews.beginnerGuideDesc || "Guide description..."}
            </p>
          </div>
        )}

        <div className="bg-[#1f2937] p-3 rounded-lg border border-slate-700/60">
          <h3 className="text-xs font-semibold text-slate-200 mb-3 flex items-center justify-between">
            <span>{panels.measurementTitle || "Measurements & Drafting"}</span>
            <span className="text-[10px] text-amber-400">
              ({panels.realtimeSync || "Real-time Sync"})
            </span>
          </h3>

          <div className="space-y-3 text-xs">
            {/* バスト */}
            <div>
              <label className="block text-slate-400 mb-1">
                {panels.bust || "Bust"} ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.bust)}
                onChange={(e) =>
                  updateMeasurements({
                    bust: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500"
              />
            </div>

            {/* ウエスト */}
            <div>
              <label className="block text-slate-400 mb-1">
                {panels.waist || "Waist"} ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.waist)}
                onChange={(e) =>
                  updateMeasurements({
                    waist: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500"
              />
            </div>

            {/* ヒップ */}
            <div>
              <label className="block text-slate-400 mb-1">
                {panels.hip || "Hip"} ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.hip)}
                onChange={(e) =>
                  updateMeasurements({
                    hip: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500"
              />
            </div>

            {/* 背丈 (Back Length) */}
            <div>
              <label className="block text-slate-400 mb-1">
                {panels.backLength || "Back Length"} ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.backLength)}
                onChange={(e) =>
                  updateMeasurements({
                    backLength: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500"
              />
            </div>

            {/* 肩幅 (Shoulder Width) */}
            <div>
              <label className="block text-slate-400 mb-1">
                {panels.shoulderWidth || "Shoulder Width"} ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.shoulderWidth)}
                onChange={(e) =>
                  updateMeasurements({
                    shoulderWidth: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 生地物性・ストレッチ */}
      <div className="bg-[#1f2937] p-3 rounded-lg border border-slate-700/60">
        <h3 className="text-xs font-semibold text-slate-200 mb-3">
          {panels.fabricStretchTitle || "Fabric Physics & Stretch"}
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">
              {panels.horizontalStretch || "Horizontal Stretch"} (%)
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
              {panels.verticalStretch || "Vertical Stretch"} (%)
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
          onClick={() => alert("Pattern Generated Successfully!")}
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 px-4 rounded-lg transition-all shadow text-xs cursor-pointer"
        >
          {subviews.generatePattern || "Generate Pattern"}
        </button>

        <button
          onClick={() =>
            updateMeasurements({
              bust: 88,
              waist: 68,
              hip: 92,
              backLength: 40,
              shoulderWidth: 42,
            })
          }
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-1.5 px-4 rounded-lg transition-all text-xs border border-slate-700 cursor-pointer"
        >
          {subviews.reset || "Reset Measurements"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
