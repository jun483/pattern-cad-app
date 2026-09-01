// src/components/subviews/Canvas2DView.tsx
import React from "react";
import { useUIStore } from "../../store/useUIStore";
import { calculateBaseWidth } from "../../utils/patternCalculations";
import type { UIState } from "../../@types/ui";

export const Canvas2DView: React.FC = () => {
  const bust = useUIStore((state: UIState) => state.measurements.bust);
  const activeCategory = useUIStore((state: UIState) => state.activeCategory);
  const hStretch = useUIStore((state: UIState) => state.fabricStretch.hStretch);
  const unitSystem = useUIStore((state: UIState) => state.unitSystem);

  const stretchMultiplier = 1.0 + hStretch / 100;
  const baseW = calculateBaseWidth(bust, activeCategory) * stretchMultiplier;
  const baseH = 400;

  const frontPath = `M 50 50 Q ${baseW / 2} 20 ${baseW - 50} 50 L ${baseW - 40} ${baseH - 50} Q ${baseW / 2} ${baseH} 40 ${baseH - 50} Z`;
  const backPath = `M 60 60 Q ${baseW / 2} 30 ${baseW - 60} 60 L ${baseW - 50} ${baseH - 60} Q ${baseW / 2} ${baseH - 10} 50 ${baseH - 60} Z`;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="text-xs text-slate-500 mb-2 flex gap-4">
        <span>
          <strong>Category:</strong> {activeCategory}
        </span>
        <span>
          <strong>Unit:</strong> {unitSystem}
        </span>
        <span>
          <strong>Bust:</strong> {bust}
        </span>
        <span>
          <strong>Stretch:</strong> {hStretch}%
        </span>
      </div>
      <svg
        viewBox={`0 0 ${baseW + 120} ${baseH + 120}`}
        className="w-full h-full max-h-[800px] border border-slate-200 bg-white shadow-sm rounded-lg"
      >
        {/* バックボディパス */}
        <path
          d={backPath}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        {/* フロントボディパス */}
        <path
          d={frontPath}
          fill="rgba(59, 130, 246, 0.05)"
          stroke="#2563eb"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
};

export default Canvas2DView;
