// src/components/MainCanvas.tsx
import React from "react";
import { useUIStore } from "../store/useUIStore";
import Canvas2DView from "./subviews/Canvas2DView";
import { dictionaries, type Locale } from "../i18n";

export const MainCanvas: React.FC = () => {
  // 型競合を防ぐため any キャストを挟んでストアから安全に値を取得
  const store = useUIStore();
  const locale =
    useUIStore((state: any) => state.locale || state.currentLanguage) || "ja";
  const activeModule =
    useUIStore((state: any) => state.activeModule) || "tabCanvas2D";
  const userMode = useUIStore((state: any) => state.userMode) || "beginner";
  const unitSystem = useUIStore((state: any) => state.unitSystem) || "cm";
  const measurements = useUIStore((state: any) => state.measurements) || {
    bust: 88,
  };
  const fabricStretch = useUIStore((state: any) => state.fabricStretch) || {
    hStretch: 0,
  };

  const t = dictionaries[locale as Locale] || dictionaries["ja"];

  return (
    <div className="relative w-full h-screen flex flex-row bg-slate-100 overflow-hidden">
      {/* 左側サイドパネル領域 */}
      <aside className="w-80 min-w-[320px] h-full bg-white border-r border-slate-200 p-4 flex flex-col gap-4 shadow-sm z-10 overflow-y-auto">
        <div className="flex items-center justify-between border-b pb-2 flex-shrink-0">
          <h2 className="text-lg font-bold text-slate-800">
            {t.panels?.parameterControls || "Pattern Controls"}
          </h2>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium uppercase">
            {userMode}
          </span>
        </div>

        {/* 各種コントロール群 */}
        <div className="flex flex-col gap-4 flex-shrink-0">
          <div className="flex flex-col gap-2 pt-2 border-t">
            <label className="text-xs font-semibold text-slate-600">
              {locale === "ja" ? "単位系 (Unit System)" : "Unit System"}
            </label>
            <div className="flex gap-2">
              {(["mm", "cm", "inch"] as const).map((unit) => (
                <button
                  key={unit}
                  onClick={() => store.setUnitSystem(unit)}
                  className={`flex-1 py-1.5 text-xs rounded border font-medium ${
                    unitSystem === unit
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {unit.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t">
            <label className="text-xs font-semibold text-slate-600">
              {t.panels?.bust || "Bust"} (cm)
            </label>
            <input
              type="number"
              value={measurements.bust}
              onChange={(e) =>
                store.updateMeasurements({ bust: Number(e.target.value) })
              }
              className="text-sm border border-slate-300 rounded p-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t">
            <label className="text-xs font-semibold text-slate-600">
              {t.panels?.horizontalStretch || "Horizontal Stretch"} (%)
            </label>
            <input
              type="number"
              value={fabricStretch.hStretch}
              onChange={(e) =>
                store.updateFabricStretch({ hStretch: Number(e.target.value) })
              }
              className="text-sm border border-slate-300 rounded p-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t">
            <label className="text-xs font-semibold text-slate-600">
              {locale === "ja" ? "モジュール切替 (Modules)" : "Modules"}
            </label>
            <button
              onClick={() => store.setActiveModule("tabCanvas2D")}
              className={`text-left px-3 py-2 text-xs rounded font-medium ${
                activeModule === "tabCanvas2D"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              2D Canvas View
            </button>
            <button
              onClick={() => store.setActiveModule("mod-viewer-3d")}
              className={`text-left px-3 py-2 text-xs rounded font-medium ${
                activeModule === "mod-viewer-3d"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              3D Viewer (CAD)
            </button>
          </div>
        </div>
      </aside>

      {/* メインビュー領域 */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center bg-slate-100">
        {activeModule === "tabCanvas2D" && <Canvas2DView />}
        {activeModule !== "tabCanvas2D" && (
          <div className="flex flex-col items-center justify-center text-slate-500 font-medium gap-2">
            <p>Active Module: {activeModule}</p>
            <button
              onClick={() => store.setActiveModule("tabCanvas2D")}
              className="text-xs text-blue-600 underline"
            >
              {locale === "ja" ? "2Dキャンバスに戻る" : "Back to 2D Canvas"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainCanvas;
