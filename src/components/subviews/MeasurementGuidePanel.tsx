// src/components/subviews/MeasurementGuidePanel.tsx
import { useUIStore } from "../../store/useUIStore";

export default function MeasurementGuidePanel() {
  const store = useUIStore();
  const measurements = store.measurements;
  const unitSystem = store.unitSystem;

  const handleChange = (key: keyof typeof measurements, val: number) => {
    store.updateMeasurements({ [key]: isNaN(val) ? 0 : val });
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <span>📏</span> ヌード寸法設定 ({unitSystem})
        </h3>
        <span className="text-xs text-gray-400">リアルタイム連動</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-gray-500 font-medium block mb-1">
            バスト (Bust)
          </label>
          <input
            type="number"
            value={measurements.bust}
            onChange={(e) => handleChange("bust", parseFloat(e.target.value))}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-gray-800"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium block mb-1">
            ウエスト (Waist)
          </label>
          <input
            type="number"
            value={measurements.waist}
            onChange={(e) => handleChange("waist", parseFloat(e.target.value))}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-gray-800"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium block mb-1">
            ヒップ (Hip)
          </label>
          <input
            type="number"
            value={measurements.hip}
            onChange={(e) => handleChange("hip", parseFloat(e.target.value))}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-gray-800"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium block mb-1">
            背丈 (Back Length)
          </label>
          <input
            type="number"
            value={measurements.backLength}
            onChange={(e) =>
              handleChange("backLength", parseFloat(e.target.value))
            }
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-gray-800"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium block mb-1">
            肩幅 (Shoulder)
          </label>
          <input
            type="number"
            value={measurements.shoulderWidth}
            onChange={(e) =>
              handleChange("shoulderWidth", parseFloat(e.target.value))
            }
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-gray-800"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium block mb-1">
            袖丈 (Sleeve)
          </label>
          <input
            type="number"
            value={measurements.sleeveLength}
            onChange={(e) =>
              handleChange("sleeveLength", parseFloat(e.target.value))
            }
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
