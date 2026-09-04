import { useEffect } from "react";
import { useUIStore } from "../store/useUIStore";
import type { SewingMachineType } from "../store/useUIStore";

/**
 * 家庭用ミシン (home) と工業用ミシン (industrial) の仕様の違いを
 * 完全網羅・自動連動させるための統合フック。
 * 簡易化せず、計算パラメータ、縫い代、運針、糸調子、生地摩擦、ログ出力まで完全に制御します。
 */
export function useMachineIntegration() {
  const sewingMachineType = useUIStore((state) => state.sewingMachineType);
  const setCalculatorParams = useUIStore((state) => state.setCalculatorParams);
  const setStitchLength = useUIStore((state) => state.setStitchLength);
  const setThreadTension = useUIStore((state) => state.setThreadTension);
  const addLogMessage = useUIStore((state) => state.addLogMessage);
  const updateFabricProp = useUIStore((state) => state.updateFabricProp);

  useEffect(() => {
    if (sewingMachineType === "industrial") {
      // ==========================================
      // 【工業用ミシン (Industrial) モード】
      // ==========================================
      // 1. 縫い代 (seamAllowance): 工業用ラッパ・コバステッチ効率を考慮したシビアな設定 (0.8cm)
      // 2. ゆとり量 (easeBust/Waist/Hip): すっきりとしたシルエット・工業用パターン基準
      // 3. 運針・ステッチ (stitchLength): 高速縫製・目パッカリング防止のための細かめ設定 (2.2mm)
      // 4. 糸調子 (threadTension): ロータリー釜の安定した高緊張 (4.5)
      // 5. 摩擦係数 (friction): 工業用の強力な送り歯による布送りをシミュレート (0.35)

      setCalculatorParams({
        seamAllowance: 0.8,
        easeBust: 3.5,
        easeWaist: 1.5,
        easeHip: 2.5,
      });

      setStitchLength(2.2);
      setThreadTension(4.5);
      updateFabricProp("friction", 0.35);

      addLogMessage(
        "⚡ [モード切替] 工業用ミシン仕様を適用しました（縫い代: 0.8cm / 運針: 2.2mm / 高速送り・ロータリー釜最適化）",
      );
    } else {
      // ==========================================
      // 【家庭用ミシン (Home) モード】
      // ==========================================
      // 1. 縫い代 (seamAllowance): 初心者〜中級者が扱いやすく折り伏せ等もしやすい標準値 (1.0cm)
      // 2. ゆとり量 (easeBust/Waist/Hip): 一般的な着用感を考慮した標準ゆとり
      // 3. 運針・ステッチ (stitchLength): 扱いやすい標準設定 (2.5mm)
      // 4. 糸調子 (threadTension): 水平・垂直釜の標準緊張 (4.0)
      // 5. 摩擦係数 (friction): 標準的な布送り摩擦 (0.4)

      setCalculatorParams({
        seamAllowance: 1.0,
        easeBust: 4.0,
        easeWaist: 2.0,
        easeHip: 3.0,
      });

      setStitchLength(2.5);
      setThreadTension(4.0);
      updateFabricProp("friction", 0.4);

      addLogMessage(
        "🏠 [モード切替] 家庭用ミシン仕様を適用しました（縫い代: 1.0cm / 運針: 2.5mm / 標準釜設定）",
      );
    }
  }, [
    sewingMachineType,
    setCalculatorParams,
    setStitchLength,
    setThreadTension,
    updateFabricProp,
    addLogMessage,
  ]);
}

/**
 * 現在のミシンタイプに応じた仕様書（SpecSheet）向けの注記テキストを取得するヘルパー関数
 */
export function getMachineSpecificSpecNote(
  sewingMachineType: SewingMachineType,
): string {
  if (sewingMachineType === "industrial") {
    return "【縫製仕様書注記】本縫い工業用ミシン使用。上糸・下糸：スパン糸#60、針：DB×1 #11。アイロンはキワ返し・片倒し指定。高速送り対応設計。";
  }
  return "【縫製仕様書注記】家庭用ミシン使用。上糸・下糸：シャッペスパン#60、針：HA×1 #11。端部はジグザグ縫いまたはロックミシン処理。";
}
