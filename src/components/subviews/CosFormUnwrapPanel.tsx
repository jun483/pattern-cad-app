// src/components/subviews/CosFormUnwrapPanel.tsx
import { useState } from "react";

export default function CosFormUnwrapPanel() {
  const [shapeType, setShapeType] = useState<"cone" | "cylinder" | "sphere">(
    "cone",
  );
  const [materialThickness, setMaterialThickness] = useState<number>(5); // EVAフォーム 5mm等

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <span>🛡️</span> コスプレ・造形用 展開図・リブ自動計算 (CosForm)
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            EVAフォームやライオンボードの厚み（3mm~10mm）を考慮し、立体造形パーツの切り口角度や展開図を算出します。
          </p>
        </div>
        <span className="text-xs bg-amber-50 text-amber-800 font-semibold px-3 py-1 rounded-full border border-amber-200">
          造形CADモード
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/60 space-y-3">
          <label className="text-xs font-bold text-gray-700 block">
            立体形状の選択
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setShapeType("cone")}
              className={`p-2 rounded-lg text-xs font-bold border transition-all ${shapeType === "cone" ? "bg-amber-700 text-white border-amber-700" : "bg-white text-gray-700 border-gray-200"}`}
            >
              角・円錐 (Cone)
            </button>
            <button
              onClick={() => setShapeType("cylinder")}
              className={`p-2 rounded-lg text-xs font-bold border transition-all ${shapeType === "cylinder" ? "bg-amber-700 text-white border-amber-700" : "bg-white text-gray-700 border-gray-200"}`}
            >
              円柱・パイプ
            </button>
            <button
              onClick={() => setShapeType("sphere")}
              className={`p-2 rounded-lg text-xs font-bold border transition-all ${shapeType === "sphere" ? "bg-amber-700 text-white border-amber-700" : "bg-white text-gray-700 border-gray-200"}`}
            >
              多面体・球体
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/60 space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-gray-700">
              ボード厚み (Thickness)
            </label>
            <span className="text-xs font-bold text-amber-800">
              {materialThickness} mm
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="15"
            value={materialThickness}
            onChange={(e) => setMaterialThickness(Number(e.target.value))}
            className="w-full accent-amber-600"
          />
          <span className="text-[10px] text-gray-400 block">
            接着面のアングルカット角度（45度等）を自動補正します
          </span>
        </div>
      </div>
    </div>
  );
}
