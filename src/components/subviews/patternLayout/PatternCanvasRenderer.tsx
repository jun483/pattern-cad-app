// src/components/subviews/patternLayout/PatternCanvasRenderer.tsx
import React from "react";
import { useUIStore } from "../../../store/useUIStore";
import type { PatternPart } from "../../../@types/pattern";

interface PatternCanvasRendererProps {
  targetCategory: string;
  patternType: string;
  params: {
    width: number;
    height: number;
    seamAllowance: number;
    hemAllowance: number;
  };
  currentParts: PatternPart[];
  printSettings: {
    layout: string;
    showRegistrationMarks: boolean;
    showScaleChecker: boolean;
  };
}

const translations = {
  ja: {
    canvasTitle: "2D オートマジック・パターンキャンバス",
    seamAllowance: "縫い代",
    hemAllowance: "三つ折り",
    autoDeploy: "世界一の精度で自動展開中",
    outputMode: "出力モード",
    notchText: "📌 合印 / ノッチ完備",
    cutCount: "裁断枚数",
    cutUnit: "枚",
    scaleCheckerText:
      "👑 小田原ミシン公式 10cmスケールチェッカー同梱（プロクオリティ保証）",
  },
  en: {
    canvasTitle: "2D Auto-Magic Pattern Canvas",
    seamAllowance: "Seam Allowance",
    hemAllowance: "Hem",
    autoDeploy: "Auto-deploying with world-class precision",
    outputMode: "Output Mode",
    notchText: "📌 Notches Included",
    cutCount: "Cut Qty",
    cutUnit: "pcs",
    scaleCheckerText:
      "👑 Odawara Sewing Official 10cm Scale Checker Included (Pro Quality Guaranteed)",
  },
  fr: {
    canvasTitle: "Canevas de Patron Auto-Magique 2D",
    seamAllowance: "Marge de couture",
    hemAllowance: "Ourlet",
    autoDeploy: "Déploiement automatique avec une précision de classe mondiale",
    outputMode: "Mode de sortie",
    notchText: "📌 Repères / Crans inclus",
    cutCount: "Qté à couper",
    cutUnit: "pcs",
    scaleCheckerText:
      "👑 Vérificateur d'échelle officiel 10 cm Odawara Sewing inclus (Qualité Pro garantie)",
  },
  zh: {
    canvasTitle: "2D 自动魔法纸样画布",
    seamAllowance: "缝份",
    hemAllowance: "折边",
    autoDeploy: "正在以世界一流的精度自动展开",
    outputMode: "输出模式",
    notchText: "📌 包含对位剪口",
    cutCount: "裁剪数量",
    cutUnit: "片",
    scaleCheckerText: "👑 小田原缝纫官方 10cm 比例校准器已包含（专业品质保证）",
  },
} as const;

type LangKey = keyof typeof translations;

export const PatternCanvasRenderer: React.FC<PatternCanvasRendererProps> = ({
  targetCategory,
  patternType,
  params,
  currentParts,
  printSettings,
}) => {
  const { currentLanguage } = useUIStore();
  const langKey: LangKey = (
    currentLanguage in translations ? currentLanguage : "ja"
  ) as LangKey;
  const t = translations[langKey];

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-xl border border-amber-500/20 flex flex-col overflow-hidden relative p-5">
      {/* ヘッダーセクション */}
      <div className="flex justify-between items-center pb-3 border-b border-gray-100 mb-4">
        <div>
          <h4 className="font-extrabold text-slate-800 text-sm flex items-center space-x-2">
            <span>✂️ {t.canvasTitle}</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
              {targetCategory.toUpperCase()} / {patternType.toUpperCase()}
            </span>
          </h4>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {t.seamAllowance}:{" "}
            <strong className="text-amber-600">{params.seamAllowance}cm</strong>{" "}
            | {t.hemAllowance}:{" "}
            <strong className="text-amber-600">{params.hemAllowance}cm</strong>{" "}
            | {t.autoDeploy}
          </p>
        </div>
        <div className="text-[10px] bg-slate-900 text-amber-400 px-3 py-1 rounded-lg font-bold border border-amber-500/30 shadow-sm">
          {t.outputMode}: {printSettings.layout.toUpperCase()}
        </div>
      </div>

      {/* キャンバス本体エリア */}
      <div className="flex-1 bg-gradient-to-br from-slate-50 via-amber-50/20 to-slate-100 border-2 border-dashed border-amber-200/80 rounded-xl relative overflow-hidden flex items-center justify-center p-6 shadow-inner">
        {printSettings.showScaleChecker && (
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #d97706 1px, transparent 1px), linear-gradient(to bottom, #d97706 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        )}

        {printSettings.showRegistrationMarks && (
          <>
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-amber-600" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-amber-600" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-amber-600" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-amber-600" />
          </>
        )}

        {/* 各パーツの描画 */}
        <div className="flex flex-wrap gap-6 items-center justify-center max-w-4xl z-10">
          {currentParts.map((part, index) => {
            const xCoords = part.outline.map(
              (pt: { x: number; y: number }) => pt.x,
            );
            const yCoords = part.outline.map(
              (pt: { x: number; y: number }) => pt.y,
            );
            const width =
              xCoords.length > 0
                ? Math.max(...xCoords) - Math.min(...xCoords)
                : 100;
            const height =
              yCoords.length > 0
                ? Math.max(...yCoords) - Math.min(...yCoords)
                : 100;

            const colors = [
              "#d97706",
              "#3b82f6",
              "#10b981",
              "#ec4899",
              "#8b5cf6",
              "#06b6d4",
            ];
            const partColor = colors[index % colors.length];

            return (
              <div
                key={part.id || index}
                className="bg-white/95 backdrop-blur-md border-2 rounded-2xl shadow-xl p-5 flex flex-col items-center justify-center relative transition-transform hover:scale-105 duration-200"
                style={{
                  borderColor: partColor,
                  minWidth: `${Math.max(140, width * 1.5)}px`,
                  minHeight: `${Math.max(110, height * 1.2)}px`,
                }}
              >
                <div
                  className="absolute inset-2 border-2 border-dashed rounded-xl pointer-events-none opacity-40"
                  style={{ borderColor: partColor }}
                />
                <div className="absolute top-2 text-[9px] font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full shadow-sm">
                  {t.notchText} ({part.notches ? part.notches.length : 0})
                </div>
                <span className="text-xs font-black text-slate-800 mt-3 text-center">
                  {part.name}
                </span>
                <span className="text-[11px] text-gray-500 mt-1 font-mono">
                  {Math.round(width)}cm × {Math.round(height)}cm
                </span>
                <span
                  className="text-[10px] font-bold mt-2 px-2.5 py-1 rounded-full text-white shadow"
                  style={{ backgroundColor: partColor }}
                >
                  {t.cutCount}: {part.quantity} {t.cutUnit}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* スケールチェッカー表示（有効時） */}
      {printSettings.showScaleChecker && (
        <div className="mt-3 py-2 px-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-900 font-bold flex justify-between items-center shadow-sm">
          <span>{t.scaleCheckerText}</span>
          <span className="font-mono bg-white px-2 py-0.5 rounded border border-amber-300">
            Scale 1:1
          </span>
        </div>
      )}
    </div>
  );
};
