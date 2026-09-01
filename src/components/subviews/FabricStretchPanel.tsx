// src/components/subviews/FabricStretchPanel.tsx
import { useUIStore } from "../../store/useUIStore";

export default function FabricStretchPanel() {
  const store = useUIStore();
  const stretch = store.fabricStretch;

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <span>🧵</span> 生地ストレッチ率補正 (%)
        </h3>
        <span className="text-xs text-gray-400">自動スケーリング</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>横方向ストレッチ (H-Stretch)</span>
            <strong className="text-amber-700">{stretch.hStretch}%</strong>
          </div>
          <input
            type="range"
            min="-20"
            max="50"
            step="1"
            value={stretch.hStretch}
            onChange={(e) =>
              store.updateFabricStretch({
                hStretch: parseInt(e.target.value) || 0,
              })
            }
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>縦方向ストレッチ (V-Stretch)</span>
            <strong className="text-amber-700">{stretch.vStretch}%</strong>
          </div>
          <input
            type="range"
            min="-20"
            max="50"
            step="1"
            value={stretch.vStretch}
            onChange={(e) =>
              store.updateFabricStretch({
                vStretch: parseInt(e.target.value) || 0,
              })
            }
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
