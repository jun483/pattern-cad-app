// src/PatternCanvas.tsx
import React, { useEffect, useRef } from "react";
import paper from "paper";
import { usePatternStore } from "./store/usePatternStore";
import { calculateBodicePattern } from "./utils/bodicePattern";
import type { PatternDocument, PatternPart } from "./types/pattern";

// 必要に応じて計算用パーツ・寸法の拡張型定義（未定義の場合のフォールバック用）
interface CalculatedCurve {
  fromIndex: number;
  toIndex: number;
  control1: { x: number; y: number };
  control2: { x: number; y: number };
}

interface Dart {
  leftPoint: { x: number; y: number };
  apex: { x: number; y: number };
  rightPoint: { x: number; y: number };
}

interface CalculatedPart extends PatternPart {
  points?: Array<{ x: number; y: number }>;
  curves?: CalculatedCurve[];
  darts?: Dart | Dart[];
}

export const PatternCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { document } = usePatternStore() as {
    document: PatternDocument | null;
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // Paper.js の初期化
    paper.setup(canvasRef.current);
    paper.project.clear();

    // 1. パターン計算の実行（ストアのドキュメント情報、またはデフォルト測定値を使用）
    const dummyMeasurements = {
      bust: 88,
      waist: 68,
      backLength: 38,
      shoulderWidth: 40,
    };

    const pattern = calculateBodicePattern(dummyMeasurements);

    // 描画原点（中央寄りに配置）
    const startX = 150;
    const startY = 150;

    // 2. 各パーツ（前身頃・後身頃等）の描画
    if (pattern && pattern.parts) {
      pattern.parts.forEach((part: CalculatedPart) => {
        const path = new paper.Path();
        path.strokeColor = new paper.Color("#ec4899"); // ピンク色の線
        path.strokeWidth = 2;

        const pts = part.points || part.outline;
        if (!pts || pts.length === 0) return;

        // 起点に移動
        path.moveTo(new paper.Point(startX + pts[0].x, startY + pts[0].y));

        // 各頂点をループ描画
        for (let i = 1; i < pts.length; i++) {
          // curves 配列から該当する曲線の制御点を検索
          const curveConfig = part.curves?.find(
            (c: CalculatedCurve) => c.fromIndex === i - 1 && c.toIndex === i,
          );

          if (curveConfig) {
            // ベジェ曲線（アームホールや衿ぐり）を描画
            const handle1 = new paper.Point(
              startX + curveConfig.control1.x,
              startY + curveConfig.control1.y,
            );
            const handle2 = new paper.Point(
              startX + curveConfig.control2.x,
              startY + curveConfig.control2.y,
            );
            const toPoint = new paper.Point(
              startX + pts[i].x,
              startY + pts[i].y,
            );

            path.cubicCurveTo(handle1, handle2, toPoint);
          } else {
            // 直線を描画
            path.lineTo(new paper.Point(startX + pts[i].x, startY + pts[i].y));
          }
        }

        // パスを閉じる（最後の点から最初の点へ）
        path.closed = true;

        // ダート（ダーツ）が存在する場合は描画
        if (part.darts) {
          const dartsList = Array.isArray(part.darts)
            ? part.darts
            : [part.darts];
          dartsList.forEach((dart: Dart) => {
            const dartPath = new paper.Path();
            dartPath.strokeColor = new paper.Color("#94a3b8");
            dartPath.dashArray = [3, 3];
            dartPath.moveTo(
              new paper.Point(
                startX + dart.leftPoint.x,
                startY + dart.leftPoint.y,
              ),
            );
            dartPath.lineTo(
              new paper.Point(startX + dart.apex.x, startY + dart.apex.y),
            );
            dartPath.lineTo(
              new paper.Point(
                startX + dart.rightPoint.x,
                startY + dart.rightPoint.y,
              ),
            );
          });
        }
      });
    }

    // ビューの更新
    paper.view.update();
  }, [document]);

  return <canvas ref={canvasRef} className="w-full h-full bg-slate-900" />;
};

export default PatternCanvas;
