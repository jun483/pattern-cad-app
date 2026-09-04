// src/components/panels/MeasurementPanel.tsx
import React from "react";
import { useUIStore } from "../../store/useUIStore";
import { measurementTranslations } from "./MeasurementPanel.i18n";

export const MeasurementPanel: React.FC = () => {
  // ストアからロケール、寸法データ、更新関数、ユーザーモード、単位系を安全に取得
  const locale = useUIStore((state: any) => state.locale) || "ja";
  const measurements = useUIStore((state: any) => state.measurements) || {
    bust: 88,
    waist: 68,
    hip: 92,
    backLength: 40,
    shoulderWidth: 42,
    neckGirth: 36,
    sleeveLength: 56,
    frontLength: 42,
    bustApexDistance: 16,
    // 追加のプロ用詳細デフォルト値
    sleeveWidth: 32,
    cuffWidth: 22,
    armhole: 44,
    elbowGirth: 26,
    frontChestWidth: 34,
    backWidth: 36,
    rise: 25,
    inseam: 74,
    thighGirth: 56,
    kneeGirth: 38,
    hemWidth: 20,
    shoulderSlope: 4.5,
    dartCorrection: 0,
  };
  const updateMeasurements =
    useUIStore((state: any) => state.updateMeasurements) || (() => {});
  const userMode = useUIStore((state: any) => state.userMode) || "beginner";
  const unitSystem = useUIStore((state: any) => state.unitSystem) || "cm";

  // 現在の言語の辞書を取得（対応していない場合は日本語にフォールバック）
  const t =
    measurementTranslations[locale as keyof typeof measurementTranslations] ||
    measurementTranslations.ja;

  // ----------------------------------------------------
  // 単位変換ヘルパー
  // ----------------------------------------------------
  const convertValue = (valInCm: number) => {
    if (valInCm === undefined || valInCm === null) return 0;
    if (unitSystem === "mm") return Number((valInCm * 10).toFixed(1));
    if (unitSystem === "inch") return Number((valInCm / 2.54).toFixed(2));
    return valInCm; // "cm"
  };

  const parseInput = (valInput: number) => {
    if (unitSystem === "mm") return valInput / 10;
    if (unitSystem === "inch") return valInput * 2.54;
    return valInput; // "cm"
  };

  return (
    <div className="bg-[#1f2937] p-3 rounded-lg border border-slate-700/60 text-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
          {t.panelLabel}
        </h3>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
          {t.modePrefix}{" "}
          <span className="text-amber-300 font-semibold">{userMode}</span>
        </span>
      </div>

      {/* モードに応じたタイトル・案内表示 */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2">
        <p className="text-xs font-semibold text-amber-300">
          {userMode === "beginner" ? t.beginnerTitle : t.proTitle}
        </p>
        {userMode === "pro" && (
          <p className="text-[10px] text-slate-300 mt-1">
            マスターズ・プロフェッショナル詳細採寸モード（全18項目対応）
          </p>
        )}
      </div>

      {/* 寸法入力フィールド */}
      <div className="space-y-3 text-xs">
        {/* --- 共通（初心者・プロ共通の基本3項目） --- */}
        <div>
          <label className="block text-slate-400 mb-1 font-medium">
            {t.bust || "Bust"} ({unitSystem})
          </label>
          <input
            type="number"
            step={unitSystem === "inch" ? "0.1" : "1"}
            value={convertValue(measurements.bust)}
            onChange={(e) =>
              updateMeasurements({ bust: parseInput(Number(e.target.value)) })
            }
            className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1 font-medium">
            {t.waist || "Waist"} ({unitSystem})
          </label>
          <input
            type="number"
            step={unitSystem === "inch" ? "0.1" : "1"}
            value={convertValue(measurements.waist)}
            onChange={(e) =>
              updateMeasurements({ waist: parseInput(Number(e.target.value)) })
            }
            className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1 font-medium">
            {t.hip || "Hip"} ({unitSystem})
          </label>
          <input
            type="number"
            step={unitSystem === "inch" ? "0.1" : "1"}
            value={convertValue(measurements.hip)}
            onChange={(e) =>
              updateMeasurements({ hip: parseInput(Number(e.target.value)) })
            }
            className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* --- プロモード（Pro）のときだけ表示する超詳細・専門項目 --- */}
        {userMode === "pro" && (
          <div className="pt-3 mt-3 border-t border-slate-700/80 space-y-3">
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wide">
              --- 上半身・躯体詳細 ---
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                背丈 (Back Length) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.backLength)}
                onChange={(e) =>
                  updateMeasurements({
                    backLength: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                前丈 (Front Length) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.frontLength)}
                onChange={(e) =>
                  updateMeasurements({
                    frontLength: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                肩幅 (Shoulder Width) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.shoulderWidth)}
                onChange={(e) =>
                  updateMeasurements({
                    shoulderWidth: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                首回り (Neck Girth) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.neckGirth)}
                onChange={(e) =>
                  updateMeasurements({
                    neckGirth: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                乳間距離 / BP間 (Bust Apex Distance) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.bustApexDistance)}
                onChange={(e) =>
                  updateMeasurements({
                    bustApexDistance: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                前胸幅 (Front Chest Width) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.frontChestWidth ?? 34)}
                onChange={(e) =>
                  updateMeasurements({
                    frontChestWidth: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                背幅 (Back Width) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.backWidth ?? 36)}
                onChange={(e) =>
                  updateMeasurements({
                    backWidth: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="pt-2 text-[10px] font-bold text-amber-400 uppercase tracking-wide">
              --- 袖・アームホール詳細 ---
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                袖丈 (Sleeve Length) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.sleeveLength)}
                onChange={(e) =>
                  updateMeasurements({
                    sleeveLength: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                袖付け回り / アームホール (Armhole) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.armhole ?? 44)}
                onChange={(e) =>
                  updateMeasurements({
                    armhole: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                二の腕回り (Sleeve Width) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.sleeveWidth ?? 32)}
                onChange={(e) =>
                  updateMeasurements({
                    sleeveWidth: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                袖口幅 (Cuff Width) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.cuffWidth ?? 22)}
                onChange={(e) =>
                  updateMeasurements({
                    cuffWidth: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="pt-2 text-[10px] font-bold text-amber-400 uppercase tracking-wide">
              --- ボトムス・下半身詳細 ---
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                股上 (Rise) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.rise ?? 25)}
                onChange={(e) =>
                  updateMeasurements({
                    rise: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                股下 (Inseam) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.inseam ?? 74)}
                onChange={(e) =>
                  updateMeasurements({
                    inseam: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                太もも回り (Thigh Girth) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.thighGirth ?? 56)}
                onChange={(e) =>
                  updateMeasurements({
                    thighGirth: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                裾幅 (Hem Width) ({unitSystem})
              </label>
              <input
                type="number"
                step={unitSystem === "inch" ? "0.1" : "1"}
                value={convertValue(measurements.hemWidth ?? 20)}
                onChange={(e) =>
                  updateMeasurements({
                    hemWidth: parseInput(Number(e.target.value)),
                  })
                }
                className="w-full bg-[#111827] text-white px-3 py-1.5 rounded border border-slate-600 outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeasurementPanel;
