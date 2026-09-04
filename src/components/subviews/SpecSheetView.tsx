// src/components/views/SpecSheetView.tsx
import React from "react";
import { useUIStore } from "../../store/useUIStore";
import { dictionaries, type Locale } from "../../i18n";

export const SpecSheetView: React.FC = () => {
  const rawLocale = useUIStore((state) => state.locale);
  const locale = rawLocale && dictionaries[rawLocale] ? rawLocale : "ja";
  const t: any = dictionaries[locale as Locale] || dictionaries["ja"];
  const subviews = t.subviews || {};
  const panels = t.panels || {};

  // ストアから必要な状態をすべて取得
  const category = useUIStore((state) => state.category);
  const measurements = useUIStore((state) => state.measurements);
  const calculatorParams = useUIStore((state) => state.calculatorParams);
  const patternPieces = useUIStore((state) => state.patternPieces);
  const sewingMachineType = useUIStore((state) => state.sewingMachineType);
  const stitchLength = useUIStore((state) => state.stitchLength);
  const threadTension = useUIStore((state) => state.threadTension);
  const fabric = useUIStore((state) => state.fabric);
  const fabricStretch = useUIStore((state) => state.fabricStretch);
  const userMode = useUIStore((state) => state.userMode);
  const unitSystem = useUIStore((state) => state.unitSystem); // "mm" | "cm" | "inch"

  // ----------------------------------------------------
  // 単位変換ヘルパー（ストア内の cm 基準の値を現在の単位系に変換）
  // ----------------------------------------------------
  const convertValue = (valInCm: number) => {
    if (unitSystem === "mm") return Number((valInCm * 10).toFixed(1));
    if (unitSystem === "inch") return Number((valInCm / 2.54).toFixed(2));
    return Number(valInCm.toFixed(1)); // "cm"
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 text-slate-200">
      {/* ヘッダータイトル */}
      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
        <div>
          <h1 className="text-xl font-bold text-amber-400">
            {subviews.specSheetTitle || "Production Specification Sheet"}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {subviews.specSheetSubtitle || "Odawara Pattern CAD & Sewing Suite"}
          </p>
        </div>
        <div className="text-right text-xs text-slate-400 bg-[#1f2937] px-3 py-2 rounded-lg border border-slate-700">
          <div>
            Mode:{" "}
            <span className="text-amber-400 font-semibold">{userMode}</span>
          </div>
          <div>
            Unit System:{" "}
            <span className="text-amber-400 font-semibold uppercase">
              {unitSystem}
            </span>
          </div>
        </div>
      </div>

      {/* 基本情報・カテゴリ・生地 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#1f2937] p-4 rounded-lg border border-slate-700/60 space-y-2 text-xs">
          <h2 className="font-bold text-amber-300 text-sm mb-3">
            {subviews.projectOverview || "Project Overview"}
          </h2>
          <div className="flex justify-between border-b border-slate-700/50 py-1">
            <span className="text-slate-400">Category:</span>
            <span className="font-medium uppercase">{category}</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 py-1">
            <span className="text-slate-400">Sewing Machine:</span>
            <span className="font-medium uppercase">{sewingMachineType}</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 py-1">
            <span className="text-slate-400">Stitch Length:</span>
            <span className="font-medium">{stitchLength} mm</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">Thread Tension:</span>
            <span className="font-medium">{threadTension}</span>
          </div>
        </div>

        <div className="bg-[#1f2937] p-4 rounded-lg border border-slate-700/60 space-y-2 text-xs">
          <h2 className="font-bold text-amber-300 text-sm mb-3">
            {panels.fabricStretchTitle || "Fabric Physics & Stretch"}
          </h2>
          <div className="flex justify-between border-b border-slate-700/50 py-1">
            <span className="text-slate-400">Fabric Name:</span>
            <span className="font-medium">{fabric.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 py-1">
            <span className="text-slate-400">Horizontal Stretch (H):</span>
            <span className="font-medium text-amber-400">
              {fabricStretch.hStretch} %
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 py-1">
            <span className="text-slate-400">Vertical Stretch (V):</span>
            <span className="font-medium text-amber-400">
              {fabricStretch.vStretch} %
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">Weight / Thickness:</span>
            <span className="font-medium">
              {fabric.weight} g/m² / {fabric.thickness} mm
            </span>
          </div>
        </div>
      </div>

      {/* 寸法データ (Measurements) - 単位に完全連動 */}
      <div className="bg-[#1f2937] p-4 rounded-lg border border-slate-700/60">
        <h2 className="font-bold text-amber-300 text-sm mb-3">
          {panels.measurementTitle || "Measurements"} ({unitSystem})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
          {Object.entries(measurements).map(([key, val]) => {
            if (typeof val !== "number") return null;
            return (
              <div
                key={key}
                className="bg-[#111827] p-3 rounded border border-slate-700"
              >
                <div className="text-slate-400 capitalize text-[10px] mb-1">
                  {key}
                </div>
                <div className="text-base font-bold text-white">
                  {convertValue(val)}{" "}
                  <span className="text-xs font-normal text-slate-400">
                    {unitSystem}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 計算パラメータ (Calculator Params) */}
      <div className="bg-[#1f2937] p-4 rounded-lg border border-slate-700/60">
        <h2 className="font-bold text-amber-300 text-sm mb-3">
          {subviews.calculatorParamsTitle || "Calculator & Ease Parameters"} (
          {unitSystem})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
          {Object.entries(calculatorParams).map(([key, val]) => {
            if (typeof val !== "number") return null;
            return (
              <div
                key={key}
                className="bg-[#111827] p-3 rounded border border-slate-700"
              >
                <div className="text-slate-400 capitalize text-[10px] mb-1">
                  {key}
                </div>
                <div className="text-base font-bold text-white">
                  {convertValue(val)}{" "}
                  <span className="text-xs font-normal text-slate-400">
                    {unitSystem}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* パターンピース一覧 */}
      <div className="bg-[#1f2937] p-4 rounded-lg border border-slate-700/60">
        <h2 className="font-bold text-amber-300 text-sm mb-3">
          {subviews.patternPiecesTitle || "Pattern Pieces Breakdown"}
        </h2>
        <div className="space-y-2">
          {patternPieces.map((piece, index) => (
            <div
              key={piece.id || index}
              className="bg-[#111827] p-3 rounded border border-slate-700 flex justify-between items-center text-xs"
            >
              <div>
                <span className="font-bold text-white">{piece.name}</span>
                <span className="text-slate-400 ml-3">
                  Points: {piece.points.length} pts
                </span>
              </div>
              <div className="text-slate-300">
                Seam Allowance:{" "}
                <span className="text-amber-400 font-semibold">
                  {convertValue(piece.seamAllowance)} {unitSystem}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecSheetView;
