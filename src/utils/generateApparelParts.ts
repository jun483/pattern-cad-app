// src/utils/generateApparelParts.ts
import type { PatternPart } from "../@types/pattern";
import type { ItemId } from "../@types/identifiers";

export interface MeasurementParams {
  width?: number;
  height?: number;
  depth?: number;
  bust?: number;
  waist?: number;
  seamAllowanceDefault?: number;
}

export function generateApparelParts(
  itemId: ItemId,
  measurements?: MeasurementParams,
): PatternPart[] {
  const w = measurements?.width || 400;
  const h = measurements?.height || 300;
  const d = measurements?.depth || 60;
  const sa = measurements?.seamAllowanceDefault || 10;

  switch (itemId) {
    // ==========================================
    // 1. レッスンバッグ（本体・ポケット・持ち手）
    // ==========================================
    case "lesson-bag": {
      const pocketW = Math.round(w * 0.4);
      const pocketH = 180;
      const handleL = 350;
      const handleW = 25;

      return [
        {
          id: "lesson-bag-body",
          name: "レッスンバッグ 本体",
          outline: [
            { x: 0, y: 0 },
            { x: w + sa * 2, y: 0 },
            { x: w + sa * 2, y: h * 2 + d + sa * 2 },
            { x: 0, y: h * 2 + d + sa * 2 },
          ],
          notches: [
            {
              id: "notch-center-top",
              position: { x: (w + sa * 2) / 2, y: 0 },
              type: "v-shape",
              label: "上中心",
            },
            {
              id: "notch-gusset-left",
              position: { x: 0, y: h + sa },
              type: "slit",
              label: "マチ位置",
            },
            {
              id: "notch-gusset-right",
              position: { x: w + sa * 2, y: h + sa },
              type: "slit",
              label: "マチ位置",
            },
          ],
          seamAllowance: {
            enabled: true,
            width: sa,
            cornerType: "right-angle",
          },
          grainLine: {
            start: { x: (w + sa * 2) / 2, y: 50 },
            end: { x: (w + sa * 2) / 2, y: h * 2 + d + sa * 2 - 50 },
          },
          quantity: 2,
        },
        {
          id: "lesson-bag-pocket",
          name: "内ポケット",
          outline: [
            { x: 0, y: 0 },
            { x: pocketW, y: 0 },
            { x: pocketW, y: pocketH },
            { x: 0, y: pocketH },
          ],
          notches: [
            {
              id: "notch-pocket-fold",
              position: { x: pocketW / 2, y: 0 },
              type: "cross",
              label: "折り返し",
            },
          ],
          seamAllowance: { enabled: true, width: 10, cornerType: "folded" },
          grainLine: {
            start: { x: pocketW / 2, y: 20 },
            end: { x: pocketW / 2, y: pocketH - 20 },
          },
          quantity: 1,
        },
        {
          id: "lesson-bag-handle",
          name: "持ち手テープ",
          outline: [
            { x: 0, y: 0 },
            { x: handleL, y: 0 },
            { x: handleL, y: handleW },
            { x: 0, y: handleW },
          ],
          notches: [],
          seamAllowance: {
            enabled: false,
            width: 0,
            cornerType: "right-angle",
          },
          grainLine: {
            start: { x: 0, y: handleW / 2 },
            end: { x: handleL, y: handleW / 2 },
          },
          quantity: 2,
        },
      ];
    }

    // ==========================================
    // 2. シューズバッグ（本体・Dカンタブ）
    // ==========================================
    case "shoe-bag": {
      const sbW = measurements?.width || 230;
      const sbH = measurements?.height || 280;
      const tabL = 80;
      const tabW = 30;

      return [
        {
          id: "shoe-bag-body",
          name: "シューズバッグ 本体",
          outline: [
            { x: 0, y: 0 },
            { x: sbW + sa * 2, y: 0 },
            { x: sbW + sa * 2, y: sbH * 2 + 80 },
            { x: 0, y: sbH * 2 + 80 },
          ],
          notches: [
            {
              id: "notch-sb-center",
              position: { x: (sbW + sa * 2) / 2, y: 0 },
              type: "v-shape",
              label: "中心",
            },
          ],
          seamAllowance: {
            enabled: true,
            width: sa,
            cornerType: "right-angle",
          },
          grainLine: {
            start: { x: (sbW + sa * 2) / 2, y: 40 },
            end: { x: (sbW + sa * 2) / 2, y: sbH * 2 + 40 },
          },
          quantity: 2,
        },
        {
          id: "shoe-bag-d-tab",
          name: "Dカン用タブ",
          outline: [
            { x: 0, y: 0 },
            { x: tabL, y: 0 },
            { x: tabL, y: tabW },
            { x: 0, y: tabW },
          ],
          notches: [],
          seamAllowance: {
            enabled: false,
            width: 0,
            cornerType: "right-angle",
          },
          grainLine: {
            start: { x: 0, y: tabW / 2 },
            end: { x: tabL, y: tabW / 2 },
          },
          quantity: 1,
        },
      ];
    }
    // ==========================================
    //巾着
    // ==========================================
    case "drawstring": {
      const bagW = measurements?.width || 200;
      const bagH = measurements?.height || 250;
      const channelH = 30; // 紐通し口の高さ

      return [
        {
          id: "drawstring-body",
          name: "巾着 本体",
          outline: [
            { x: 0, y: 0 },
            { x: bagW + sa * 2, y: 0 },
            { x: bagW + sa * 2, y: bagH * 2 + channelH * 2 + sa * 2 },
            { x: 0, y: bagH * 2 + channelH * 2 + sa * 2 },
          ],
          notches: [
            {
              id: "notch-draw-center",
              position: { x: (bagW + sa * 2) / 2, y: 0 },
              type: "v-shape",
              label: "中心（わ）",
            },
            {
              id: "notch-channel-start",
              position: { x: 0, y: channelH },
              type: "slit",
              label: "紐通し口開き止まり",
            },
          ],
          seamAllowance: {
            enabled: true,
            width: sa,
            cornerType: "right-angle",
          },
          grainLine: {
            start: { x: (bagW + sa * 2) / 2, y: 40 },
            end: { x: (bagW + sa * 2) / 2, y: bagH * 2 + channelH * 2 - 40 },
          },
          quantity: 2,
        },
      ];
    }

    // ==========================================
    // 3. 基本シャツ（洋服用パターンベース）
    // ==========================================
    case "basic-shirt": {
      const b = measurements?.bust || 880;
      const bl = measurements?.height || 600;

      return [
        {
          id: "shirt-front",
          name: "シャツ 前身頃",
          outline: [
            { x: 0, y: 0 },
            { x: b / 4 + 40, y: 0 },
            { x: b / 4 + 40, y: bl },
            { x: 0, y: bl },
          ],
          notches: [
            {
              id: "n-front-center",
              position: { x: 0, y: bl / 2 },
              type: "v-shape",
              label: "前中心",
            },
          ],
          seamAllowance: {
            enabled: true,
            width: 10,
            cornerType: "right-angle",
          },
          grainLine: { start: { x: 50, y: 100 }, end: { x: 50, y: bl - 100 } },
          quantity: 2,
        },
        {
          id: "shirt-back",
          name: "シャツ 後身頃",
          outline: [
            { x: 0, y: 0 },
            { x: b / 4 + 30, y: 0 },
            { x: b / 4 + 30, y: bl + 10 },
            { x: 0, y: bl + 10 },
          ],
          notches: [
            {
              id: "n-back-center",
              position: { x: 0, y: (bl + 10) / 2 },
              type: "slit",
              label: "背中心（わ）",
            },
          ],
          seamAllowance: {
            enabled: true,
            width: 10,
            cornerType: "right-angle",
          },
          grainLine: { start: { x: 50, y: 100 }, end: { x: 50, y: bl - 100 } },
          quantity: 1,
        },
      ];
    }

    // ==========================================
    // 4. 基本スカート
    // ==========================================
    case "basic-skirt": {
      const wVal = measurements?.waist || 660;
      const skH = measurements?.height || 650;

      return [
        {
          id: "skirt-panel",
          name: "スカート身頃",
          outline: [
            { x: 0, y: 0 },
            { x: wVal / 2 + 50, y: 0 },
            { x: (wVal / 2 + 50) * 1.2, y: skH },
            { x: -(wVal / 2 + 50) * 0.2, y: skH },
          ],
          notches: [
            {
              id: "n-skirt-center",
              position: { x: (wVal / 2 + 50) / 2, y: 0 },
              type: "v-shape",
              label: "ウエスト中心",
            },
          ],
          seamAllowance: { enabled: true, width: 15, cornerType: "mitered" },
          grainLine: {
            start: { x: 100, y: 100 },
            end: { x: 100, y: skH - 100 },
          },
          quantity: 2,
        },
      ];
    }

    // ==========================================
    // 5. デフォルト / フリーパーツ
    // ==========================================
    default:
      return [
        {
          id: "default-body",
          name: "標準フリーパーツ",
          outline: [
            { x: 0, y: 0 },
            { x: w, y: 0 },
            { x: w, y: h },
            { x: 0, y: h },
          ],
          notches: [],
          seamAllowance: {
            enabled: true,
            width: sa,
            cornerType: "right-angle",
          },
          grainLine: {
            start: { x: w / 2, y: 50 },
            end: { x: w / 2, y: h - 50 },
          },
          quantity: 1,
        },
      ];
  }
}
