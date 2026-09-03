// src/components/subviews/Canvas2DView.tsx
import React from "react";
import { useUIStore } from "../../store/useUIStore";
import { dictionaries } from "../../i18n";

export const Canvas2DView: React.FC = () => {
  const userMode = useUIStore((state) => state.userMode);
  const activeCategory = useUIStore((state) => state.activeCategory);
  const measurements = useUIStore((state) => state.measurements);
  const sewingMachineType = useUIStore((state) => state.sewingMachineType);
  const locale = useUIStore((state) => state.locale);

  // ロケールに対応する辞書を取得（存在しない場合は日本語にフォールバック）
  const t = dictionaries[locale] || dictionaries["ja"];

  return (
    <div className="bg-[#111827] rounded-xl p-6 shadow-2xl border border-[#1f2937] flex flex-col gap-6 text-slate-200 h-full min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#1f2937] pb-4 gap-2 flex-shrink-0">
        <div>
          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded uppercase tracking-wider">
            SUBVIEW: 2D PATTERN & DRAFTING CANVAS
          </span>
          <h2 className="text-base font-bold text-slate-100 mt-1.5 flex items-center gap-2">
            <span>📐 {t.subviews.canvas2DTitle}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#1f2937] text-amber-400 border border-slate-700">
              Category: {activeCategory}
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">
            {locale === "ja"
              ? "設定："
              : locale === "fr"
                ? "Réglage : "
                : "Setting: "}
          </span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-semibold">
            {sewingMachineType === "industrial"
              ? "⚙️ " + t.panels.industrial
              : "🏠 " + t.panels.home}
          </span>
        </div>
      </div>

      {/* 2D作図キャンバスのプレビューエリア（高さいっぱいに引き伸ばし） */}
      <div className="relative flex-1 bg-[#0b0f19] rounded-xl border border-[#1f2937] flex items-center justify-center overflow-hidden p-8 shadow-inner min-h-[500px]">
        {/* グリッド背景のシミュレーション */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-2xl shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            ✂️
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-200">
              {userMode === "beginner"
                ? t.subviews.beginnerGuideActive
                : t.modes.pro}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {t.subviews.beginnerGuideDesc} ({measurements.bust}cm /{" "}
              {measurements.waist}cm)
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#0b0f19] text-xs font-bold rounded-lg transition-all shadow-lg shadow-amber-500/20">
              {t.subviews.generatePattern}
            </button>
            <button className="px-4 py-2 bg-[#1f2937] hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-all border border-slate-700">
              {t.subviews.reset}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas2DView;
