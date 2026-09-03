// src/components/panels/FabricStretchPanel.tsx
import React from "react";
import { useUIStore } from "../../store/useUIStore";
import { dictionaries, type Locale } from "../../i18n";

export const FabricStretchPanel: React.FC = () => {
  const locale = useUIStore((state: any) => state.locale);
  const fabricStretch = useUIStore((state: any) => state.fabricStretch) || {
    hStretch: 0,
    vStretch: 0,
  };
  const updateFabricStretch =
    useUIStore((state: any) => state.updateFabricStretch) || (() => {});

  const t = dictionaries[locale as Locale] || dictionaries["ja"];
  const panels = (t.panels || (dictionaries["ja"] as any).panels) as Record<
    string,
    any
  >;

  return (
    <div className="bg-[#1f2937] p-3 rounded-lg border border-slate-700/60 text-slate-200">
      <h3 className="text-xs font-semibold text-slate-200 mb-3 flex items-center justify-between">
        <span>{panels?.fabricStretchTitle || "Fabric Physics & Stretch"}</span>
        <span className="text-[10px] text-amber-400">
          {panels?.realtimeSync || "Active Simulator"}
        </span>
      </h3>

      <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
        {panels?.fabricPhysicsDesc ||
          "2-axis stretch simulator for actual fabrics."}
      </p>

      <div className="space-y-3 text-xs">
        <div>
          <label className="block text-slate-400 mb-1">
            {panels?.horizontalStretch || "Horizontal Stretch"} (%)
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
            {panels?.verticalStretch || "Vertical Stretch"} (%)
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
  );
};

export default FabricStretchPanel;
