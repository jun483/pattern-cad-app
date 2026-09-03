// src/PatternCanvas.tsx
import React, { useRef, useEffect } from "react";
import { calculateBodicePattern } from "./utils/bodicePattern";
import type {
  PatternPart,
  SeamAllowanceConfig,
  CalculatedPart,
} from "./@types/pattern";

interface PatternCanvasProps {
  measurements?: {
    bust: number;
    waist: number;
    backLength: number;
  };
}

export const PatternCanvas: React.FC<PatternCanvasProps> = ({
  measurements = { bust: 88, waist: 66, backLength: 38 },
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // キャンバスのクリアと背景描画
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0f172a"; // ダーク背景
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 計算されたパターンパーツの取得
    const rawParts: CalculatedPart[] = calculateBodicePattern(measurements);

    // 型定義 (PatternPart) に適合させる変換処理
    const parts: PatternPart[] = rawParts.map(
      (p: CalculatedPart, idx: number) => ({
        id: `part-${idx}`,
        name: p.name,
        outline: p.outline,
        notches: [
          {
            id: `notch-${idx}-1`,
            position: p.outline[0] || { x: 0, y: 0 },
            type: "v-shape" as const,
            label: "BP",
          },
        ],
        seamAllowance: {
          enabled: true,
          width: p.seamAllowance ?? 10,
          cornerType: "right-angle" as const,
        } as SeamAllowanceConfig,
        grainLine: {
          start: { x: 20, y: 10 },
          end: { x: 20, y: 50 },
        },
        quantity: 2,
      }),
    );

    // グリッド線（方眼紙風）の描画
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // 各パーツの輪郭と付加情報の描画
    parts.forEach((part, index) => {
      if (!part.outline || part.outline.length === 0) return;

      ctx.save();
      // パーツごとに少し位置をずらして表示
      ctx.translate(60 + index * 200, 60);

      // 1. 本体アウトライン描画
      ctx.beginPath();
      part.outline.forEach((pt, i) => {
        const scale = 3;
        const px = pt.x * scale;
        const py = pt.y * scale;

        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      });
      ctx.closePath();

      // ゴールドブランドカラーのフィル＆ストローク
      ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
      ctx.fill();
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 2;
      ctx.stroke();

      // 2. 縫い代線のシミュレーション描画
      if (part.seamAllowance.enabled) {
        ctx.strokeStyle = "rgba(59, 130, 246, 0.4)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 3. 地目線の描画
      if (part.grainLine) {
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(part.grainLine.start.x * 3, part.grainLine.start.y * 3);
        ctx.lineTo(part.grainLine.end.x * 3, part.grainLine.end.y * 3);
        ctx.stroke();
      }

      // 4. パーツ名と数量のテキスト表示
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "12px sans-serif";
      ctx.fillText(`${part.name} (x${part.quantity})`, 10, -10);

      ctx.restore();
    });
  }, [measurements]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0b0f19] rounded-xl overflow-hidden border border-[#1f2937] shadow-inner">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};

export default PatternCanvas;
