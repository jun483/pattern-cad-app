import { jsPDF } from "jspdf";

export interface ExportParams {
  bust: number;
  waist: number;
  seamAllowance: number; // cm
}

// 曲線（ベジェ曲線）を安全に描画するヘルパー関数
const drawCubicBezier = (
  doc: jsPDF,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
) => {
  const steps = 30; // 精度向上のため20 -> 30へ変更
  let prev = p0;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;
    const x =
      mt * mt * mt * p0.x +
      3 * mt * mt * t * p1.x +
      3 * mt * t * t * p2.x +
      t * t * t * p3.x;
    const y =
      mt * mt * mt * p0.y +
      3 * mt * mt * t * p1.y +
      3 * mt * t * t * p2.y +
      t * t * t * p3.y;

    doc.line(prev.x, prev.y, x, y);
    prev = { x, y };
  }
};

export const exportToPDF = (
  params: ExportParams,
  mode: "full" | "a4_tiled",
) => {
  const { bust, waist, seamAllowance } = params;

  // 1. 寸法計算 (すべて mm 単位)
  const sa = seamAllowance * 10; // cm -> mm
  const bustWidth = (bust / 4 + 2) * 10;
  const waistWidth = (waist / 4 + 1.5) * 10;
  const length = 420; // 42cm
  const shoulderX = 140;
  const shoulderY = 60;

  // 全体描画領域の計算（余白 20mm 含む）
  const patternWidth = Math.max(bustWidth, waistWidth) + sa * 2 + 40;
  const patternHeight = length + sa * 2 + 40;

  // 型紙原点オフセット
  const offsetX = sa + 20;
  const offsetY = sa + 20;

  // ---------------------------------------------------------
  // パターン描画共通ロジック
  // ---------------------------------------------------------
  const drawPatternShape = (doc: jsPDF, originX: number, originY: number) => {
    // 各頂点座標 (mm)
    const pNeck = { x: originX, y: originY };
    const pCfWaist = { x: originX, y: originY + length };
    const pSideWaist = { x: originX + waistWidth, y: originY + length };
    const pSideBust = { x: originX + bustWidth, y: originY + length * 0.45 };
    const pShoulder = { x: originX + shoulderX, y: originY + shoulderY };

    // 1. 出来上がり線 (黒実線)
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.5);

    // 首回り -> 前中心 -> ウエスト線
    doc.line(pNeck.x, pNeck.y, pCfWaist.x, pCfWaist.y);
    doc.line(pCfWaist.x, pCfWaist.y, pSideWaist.x, pSideWaist.y);

    // 脇線 (ベジェ曲線)
    const cp1 = { x: pSideWaist.x - 30, y: pSideWaist.y - 62.5 };
    const cp2 = { x: pSideBust.x, y: pSideBust.y };
    drawCubicBezier(doc, pSideWaist, cp1, cp2, pSideBust);

    // アームホール -> 肩線 -> 首回り
    doc.line(pSideBust.x, pSideBust.y, pShoulder.x, pShoulder.y);
    doc.line(pShoulder.x, pShoulder.y, pNeck.x, pNeck.y);

    // 2. 縫い代 / 裁断線 (赤破線)
    if (sa > 0) {
      doc.setDrawColor(225, 29, 72);
      doc.setLineWidth(0.4);
      doc.setLineDashPattern([3, 2], 0);

      const saNeck = { x: originX, y: originY - sa };
      const saCfWaist = { x: originX - sa, y: originY + length + sa };
      const saSideWaist = {
        x: originX + waistWidth + sa,
        y: originY + length + sa,
      };
      const saSideBust = {
        x: originX + bustWidth + sa,
        y: originY + length * 0.45,
      };
      const saShoulder = {
        x: originX + shoulderX,
        y: originY + shoulderY - sa,
      };

      doc.line(saNeck.x, saNeck.y, saCfWaist.x, saCfWaist.y);
      doc.line(saCfWaist.x, saCfWaist.y, saSideWaist.x, saSideWaist.y);

      const saCp1 = { x: saSideWaist.x - 30, y: saSideWaist.y - 62.5 };
      drawCubicBezier(doc, saSideWaist, saCp1, saSideBust, saSideBust);

      doc.line(saSideBust.x, saSideBust.y, saShoulder.x, saShoulder.y);
      doc.line(saShoulder.x, saShoulder.y, saNeck.x, saNeck.y);

      doc.setLineDashPattern([], 0); // 破線リセット
    }

    // 3. ノッチ (合い印)
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.4);
    // ウエスト位置ノッチ
    doc.line(
      pSideWaist.x,
      pSideWaist.y,
      pSideWaist.x,
      pSideWaist.y + (sa > 0 ? sa : 5),
    );
    // バスト位置ノッチ
    doc.line(
      pSideBust.x,
      pSideBust.y,
      pSideBust.x + (sa > 0 ? sa : 5),
      pSideBust.y,
    );
  };

  // ---------------------------------------------------------
  // 出力モード判定
  // ---------------------------------------------------------
  if (mode === "full") {
    // 1:1 実寸大判 PDF
    const doc = new jsPDF({
      orientation: patternWidth > patternHeight ? "landscape" : "portrait",
      unit: "mm",
      format: [patternWidth, patternHeight],
    });

    drawPatternShape(doc, offsetX, offsetY);

    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.text(
      `洋裁CAD - 1:1実寸型紙 (Bust:${bust}cm, Waist:${waist}cm, SA:${seamAllowance}cm)`,
      10,
      15,
    );

    doc.save(`pattern_1to1_B${bust}_W${waist}.pdf`);
  } else {
    // A4 分割印刷 PDF (タイリング)
    const pageW = 210;
    const pageH = 297;
    const margin = 10;
    const printW = pageW - margin * 2; // 190mm
    const printH = pageH - margin * 2; // 277mm

    const cols = Math.ceil(patternWidth / printW);
    const rows = Math.ceil(patternHeight / printH);

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let pageCount = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (pageCount > 0) doc.addPage();
        pageCount++;

        // 1. 型紙本体の描画（表示位置シフト）
        const shiftX = margin - c * printW;
        const shiftY = margin - r * printH;

        drawPatternShape(doc, offsetX + shiftX, offsetY + shiftY);

        // 2. 印刷可能範囲（のりしろ枠）の外側を白い矩形でマスクしてハミ出しを防止
        doc.setFillColor(255, 255, 255);
        // 上マスク
        doc.rect(0, 0, pageW, margin, "F");
        // 下マスク
        doc.rect(0, margin + printH, pageW, margin, "F");
        // 左マスク
        doc.rect(0, 0, margin, pageH, "F");
        // 右マスク
        doc.rect(margin + printW, 0, margin, pageH, "F");

        // 3. ページヘッダー＆案内
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text(
          `洋裁CAD 分割型紙 [ ${r + 1}行 - ${c + 1}列 / 全${rows}行${cols}列 ]  ※印刷設定: 「実際のサイズ(100%)」で印刷`,
          margin,
          margin - 3,
        );

        // 4. のりしろ枠・ガイド線
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.2);
        doc.setLineDashPattern([2, 2], 0);
        doc.rect(margin, margin, printW, printH);
        doc.setLineDashPattern([], 0);

        // 5. トンボ (四隅の貼り合わせマーク)
        const drawCropMark = (x: number, y: number) => {
          doc.setDrawColor(148, 163, 184);
          doc.setLineWidth(0.3);
          doc.line(x - 4, y, x + 4, y);
          doc.line(x, y - 4, x, y + 4);
        };
        drawCropMark(margin, margin);
        drawCropMark(margin + printW, margin);
        drawCropMark(margin, margin + printH);
        drawCropMark(margin + printW, margin + printH);

        // 6. 実寸確認用テスト枠 (1ページ目のみ)
        if (r === 0 && c === 0) {
          const sqX = margin + 5;
          const sqY = margin + 5;
          doc.setFillColor(255, 255, 255);
          doc.rect(sqX, sqY, 50, 50, "FD"); // 背景を白で塗って型紙との被りを防止
          doc.setDrawColor(15, 23, 42);
          doc.setLineWidth(0.4);
          doc.setFontSize(8);
          doc.setTextColor(15, 23, 42);
          doc.text("実寸テスト枠", sqX + 13, sqY + 22);
          doc.text("50mm × 50mm", sqX + 12, sqY + 30);
        }
      }
    }

    doc.save(`pattern_A4_tiled_B${bust}_W${waist}.pdf`);
  }
};
