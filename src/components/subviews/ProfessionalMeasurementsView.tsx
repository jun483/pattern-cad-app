// src/components/subviews/ProfessionalMeasurementsView.tsx
import React from "react";
import { useUIStore } from "../../store/useUIStore";

export const ProfessionalMeasurementsView: React.FC = () => {
  const measurements = useUIStore((state) => state.measurements);
  const setMeasurements = useUIStore((state) => state.setMeasurements);
  const locale = useUIStore((state) => state.locale);

  const labels = {
    ja: {
      tag: "ODAWARA SEWING — PRO MEASUREMENTS",
      title: "プロフェッショナル立体採寸・CAD補正パラメータ",
      subtitle:
        "高度なアパレルパターン設計および3Dシミュレーションのための精密寸法設定",
      shoulder: "肩幅 (Shoulder Width)",
      sleeve: "袖丈 (Sleeve Length)",
      neck: "首回り (Neck Girth)",
      frontLen: "前身丈 (Front Waist Length)",
      apex: "乳間距離 (Bust Apex Distance)",
      reset: "標準値にリセット",
    },
    en: {
      tag: "ODAWARA SEWING — PRO MEASUREMENTS",
      title: "Professional Draping & CAD Correction Parameters",
      subtitle:
        "Precision dimension settings for advanced apparel pattern making and 3D simulation",
      shoulder: "Shoulder Width",
      sleeve: "Sleeve Length",
      neck: "Neck Girth",
      frontLen: "Front Waist Length",
      apex: "Bust Apex Distance",
      reset: "Reset to Standard",
    },
  };

  const tText = labels[locale as keyof typeof labels] || labels.en;

  return (
    <div className="bg-[#111827] rounded-xl p-6 shadow-2xl border border-amber-500/20 flex flex-col gap-6 text-slate-200">
      <div className="flex justify-between items-center border-b border-slate-700/60 pb-4">
        <div>
          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded uppercase tracking-wider">
            {tText.tag}
          </span>
          <h2 className="text-base font-bold text-slate-100 mt-1.5 flex items-center gap-2">
            <span>📐 {tText.title}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#1f2937] text-amber-400 border border-slate-700">
              High-End Custom Tailoring
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">{tText.subtitle}</p>
        </div>
        <button
          onClick={() => useUIStore.getState().resetMeasurements()}
          className="px-3 py-1.5 bg-[#1f2937] hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-600 transition-all cursor-pointer"
        >
          {tText.reset}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {/* 肩幅 */}
        <div className="bg-[#161e2e] p-4 rounded-xl border border-slate-700/60 flex flex-col gap-2">
          <label className="text-slate-300 font-bold flex justify-between">
            <span>{tText.shoulder}</span>
            <span className="text-amber-400">
              {measurements.shoulderWidth} cm
            </span>
          </label>
          <input
            type="range"
            min="30"
            max="60"
            step="0.5"
            value={measurements.shoulderWidth}
            onChange={(e) =>
              setMeasurements({ shoulderWidth: parseFloat(e.target.value) })
            }
            className="accent-amber-500 cursor-pointer"
          />
        </div>

        {/* 袖丈 */}
        <div className="bg-[#161e2e] p-4 rounded-xl border border-slate-700/60 flex flex-col gap-2">
          <label className="text-slate-300 font-bold flex justify-between">
            <span>{tText.sleeve}</span>
            <span className="text-amber-400">
              {measurements.sleeveLength} cm
            </span>
          </label>
          <input
            type="range"
            min="40"
            max="75"
            step="0.5"
            value={measurements.sleeveLength}
            onChange={(e) =>
              setMeasurements({ sleeveLength: parseFloat(e.target.value) })
            }
            className="accent-amber-500 cursor-pointer"
          />
        </div>

        {/* 首回り */}
        <div className="bg-[#161e2e] p-4 rounded-xl border border-slate-700/60 flex flex-col gap-2">
          <label className="text-slate-300 font-bold flex justify-between">
            <span>{tText.neck}</span>
            <span className="text-amber-400">{measurements.neckGirth} cm</span>
          </label>
          <input
            type="range"
            min="28"
            max="50"
            step="0.5"
            value={measurements.neckGirth}
            onChange={(e) =>
              setMeasurements({ neckGirth: parseFloat(e.target.value) })
            }
            className="accent-amber-500 cursor-pointer"
          />
        </div>

        {/* 前身丈 */}
        <div className="bg-[#161e2e] p-4 rounded-xl border border-slate-700/60 flex flex-col gap-2">
          <label className="text-slate-300 font-bold flex justify-between">
            <span>{tText.frontLen}</span>
            <span className="text-amber-400">
              {measurements.frontLength} cm
            </span>
          </label>
          <input
            type="range"
            min="35"
            max="55"
            step="0.5"
            value={measurements.frontLength}
            onChange={(e) =>
              setMeasurements({ frontLength: parseFloat(e.target.value) })
            }
            className="accent-amber-500 cursor-pointer"
          />
        </div>

        {/* 乳間距離 */}
        <div className="bg-[#161e2e] p-4 rounded-xl border border-slate-700/60 flex flex-col gap-2">
          <label className="text-slate-300 font-bold flex justify-between">
            <span>{tText.apex}</span>
            <span className="text-amber-400">
              {measurements.bustApexDistance} cm
            </span>
          </label>
          <input
            type="range"
            min="12"
            max="25"
            step="0.5"
            value={measurements.bustApexDistance}
            onChange={(e) =>
              setMeasurements({ bustApexDistance: parseFloat(e.target.value) })
            }
            className="accent-amber-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
export default ProfessionalMeasurementsView;
