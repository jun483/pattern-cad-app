// src/utils/bodicePattern.ts
import type { CalculatedPart, Point2D } from "../@types/pattern";

interface Measurements {
  bust: number;
  waist: number;
  backLength: number;
  shoulder?: number;
  neck?: number;
}

/**
 * 身頃などのパターン輪郭線を計算する関数
 */
export function calculateBodicePattern(
  measurements: Measurements,
): CalculatedPart[] {
  const { bust = 88, waist = 66, backLength = 38 } = measurements;

  const hBust = bust / 4;
  const hWaist = waist / 4;

  const frontOutline: Point2D[] = [
    { x: 0, y: 0 },
    { x: hBust + 2, y: 0 },
    { x: hBust + 3, y: backLength * 0.4 },
    { x: hWaist + 1, y: backLength },
    { x: 0, y: backLength },
  ];

  const backOutline: Point2D[] = [
    { x: 0, y: 0 },
    { x: hBust, y: 0 },
    { x: hBust, y: backLength * 0.45 },
    { x: hWaist, y: backLength },
    { x: 0, y: backLength },
  ];

  return [
    {
      name: "Front Bodice (前身頃)",
      outline: frontOutline,
      seamAllowance: 10,
    },
    {
      name: "Back Bodice (後身頃)",
      outline: backOutline,
      seamAllowance: 10,
    },
  ];
}
