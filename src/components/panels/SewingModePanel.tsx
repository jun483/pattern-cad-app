// src/components/panels/SewingModePanel.tsx
import React from "react";
import { useUIStore } from "../../store/useUIStore";
import { dictionaries, type Locale } from "../../i18n";

export const SewingModePanel: React.FC = () => {
  const locale = useUIStore((state: any) => state.locale) || "ja";
  const sewingMachineType =
    useUIStore((state: any) => state.sewingMachineType) || "home";
  const setSewingMachineType =
    useUIStore((state: any) => state.setSewingMachineType) || (() => {});

  const t = dictionaries[locale as Locale] || dictionaries["ja"];

  // 各言語用のテキスト辞書（フォールバック付き）
  const texts = {
    ja: {
      panelLabel: "PANEL: MACHINE & SEWING SPEC",
      title: "工業用・家庭用ミシン設定 (Machine Specification)",
      current: "Current: ",
      industrialLabel: "⚙️ 工業用 (Industrial / JUKI)",
      homeLabel: "🏠 家庭用 (Home Sewing)",
      homeSuiteTitle: "🏠 家庭用ミシン仕様 (Home Suite)",
      homeBadge: "Standard",
      homeDesc:
        "縫い代一律1.0cm設定、分かりやすい初心者向けの縫製ガイドと簡易的な合印（ノッチ）付与を行います。",
      industrialSuiteTitle: "⚙️ 工業用ミシン仕様 (Industrial / JUKI)",
      industrialBadge: "Pro Spec",
      industrialDesc:
        "JUKIテクニカルツール準拠。部分別の最適縫い代指定、コーナーのマイター処理、全自動合印（ノッチ）を高精度で計算します。",
    },
    en: {
      panelLabel: "PANEL: MACHINE & SEWING SPEC",
      title: "Machine & Sewing Specification",
      current: "Current: ",
      industrialLabel: "⚙️ Industrial / JUKI",
      homeLabel: "🏠 Home Sewing",
      homeSuiteTitle: "🏠 Home Sewing Suite",
      homeBadge: "Standard",
      homeDesc:
        "1.0cm uniform seam allowance, beginner-friendly sewing guides, and simplified notches.",
      industrialSuiteTitle: "⚙️ Industrial / JUKI Spec",
      industrialBadge: "Pro Spec",
      industrialDesc:
        "JUKI technical tool compliant. Precision seam allowances per section, mitered corners, and auto-notches.",
    },
    fr: {
      panelLabel: "PANEL : MACHINE & COUTURE",
      title: "Spécifications de machine et de couture",
      current: "Actuel : ",
      industrialLabel: "⚙️ Industriel / JUKI",
      homeLabel: "🏠 Couture domestique",
      homeSuiteTitle: "🏠 Suite Machine Domestique",
      homeBadge: "Standard",
      homeDesc:
        "Marge de couture uniforme de 1.0 cm, guide débutant et crans simplifiés.",
      industrialSuiteTitle: "⚙️ Spécification Industrielle / JUKI",
      industrialBadge: "Pro Spec",
      industrialDesc:
        "Conforme aux outils JUKI. Marges de couture optimisées, coins en mitre et crantage automatique.",
    },
    es: {
      panelLabel: "PANEL: MÁQUINA Y COSTURA",
      title: "Especificación de máquina y costura",
      current: "Actual: ",
      industrialLabel: "⚙️ Industrial / JUKI",
      homeLabel: "🏠 Costura doméstica",
      homeSuiteTitle: "🏠 Suite de Costura Doméstica",
      homeBadge: "Standard",
      homeDesc:
        "Margen de costura uniforme de 1.0 cm, guía para principiantes y piquetes simples.",
      industrialSuiteTitle: "⚙️ Especificación Industrial / JUKI",
      industrialBadge: "Pro Spec",
      industrialDesc:
        "Compatible con herramientas JUKI. Márgenes de costura precisos, esquinas ingleteadas y piquetes automáticos.",
    },
    zh: {
      panelLabel: "面板: 缝纫机与缝制规格",
      title: "工业与家用缝纫机设定",
      current: "当前: ",
      industrialLabel: "⚙️ 工业用 (Industrial / JUKI)",
      homeLabel: "🏠 家用 (Home Sewing)",
      homeSuiteTitle: "🏠 家用缝纫机套件",
      homeBadge: "Standard",
      homeDesc: "统一1.0cm缝份设置，适合新手的直观缝制指南及简易剪口（眼刀）。",
      industrialSuiteTitle: "⚙️ 工业用缝纫机规格 (Industrial / JUKI)",
      industrialBadge: "Pro Spec",
      industrialDesc:
        "符合JUKI技术工具标准。分部位优化缝份、拐角斜角处理及全自动高精度剪口计算。",
    },
    ko: {
      panelLabel: "PANEL: 머신 및 봉제 사양",
      title: "공업용 및 가정용 미싱 설정",
      current: "현재: ",
      industrialLabel: "⚙️ 공업용 (Industrial / JUKI)",
      homeLabel: "🏠 가정용 (Home Sewing)",
      homeSuiteTitle: "🏠 가정용 미싱 스위트",
      homeBadge: "Standard",
      homeDesc:
        "시접 일괄 1.0cm 설정, 초보자용 알기 쉬운 봉제 가이드 및 간이 가시(노치)를 부여합니다.",
      industrialSuiteTitle: "⚙️ 공업용 미싱 사양 (Industrial / JUKI)",
      industrialBadge: "Pro Spec",
      industrialDesc:
        "JUKI 테크니컬 도구 준거. 부위별 최적 시접 지정, 코너 마이터 처리, 전자동 가시(노치)를 고정밀도로 계산합니다.",
    },
  };

  // 現在のロケールに対応するテキストを選択（なければ日本語）
  const tPanel = texts[locale as keyof typeof texts] || texts.ja;

  return (
    <div className="bg-[#111827] rounded-xl p-5 shadow-xl border border-[#1f2937] flex flex-col gap-4 text-slate-200">
      <div className="flex items-center justify-between border-b border-[#1f2937] pb-3">
        <div>
          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded uppercase tracking-wider">
            {tPanel.panelLabel}
          </span>
          <h2 className="text-xs font-bold text-slate-200 mt-1">
            {tPanel.title}
          </h2>
        </div>
        <span className="text-[10px] bg-[#1f2937] text-amber-300 px-2.5 py-1 rounded border border-slate-700 font-semibold">
          {tPanel.current}
          {sewingMachineType === "industrial"
            ? tPanel.industrialLabel
            : tPanel.homeLabel}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 家庭用モードボタン */}
        <button
          onClick={() => setSewingMachineType("home")}
          className={`p-4 rounded-xl border text-left transition-all flex flex-col gap-2 ${
            sewingMachineType === "home"
              ? "border-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              : "border-[#1f2937] bg-[#161e2e] hover:border-slate-600"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-bold ${sewingMachineType === "home" ? "text-amber-400" : "text-slate-200"}`}
            >
              {tPanel.homeSuiteTitle}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded ${sewingMachineType === "home" ? "bg-amber-500 text-[#0b0f19] font-bold" : "bg-[#1f2937] text-slate-400"}`}
            >
              {tPanel.homeBadge}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">{tPanel.homeDesc}</p>
        </button>

        {/* 工業用モードボタン (JUKI連携・プロ仕様) */}
        <button
          onClick={() => setSewingMachineType("industrial")}
          className={`p-4 rounded-xl border text-left transition-all flex flex-col gap-2 ${
            sewingMachineType === "industrial"
              ? "border-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              : "border-[#1f2937] bg-[#161e2e] hover:border-slate-600"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-bold ${sewingMachineType === "industrial" ? "text-amber-400" : "text-slate-200"}`}
            >
              {tPanel.industrialSuiteTitle}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded ${sewingMachineType === "industrial" ? "bg-amber-500 text-[#0b0f19] font-bold" : "bg-[#1f2937] text-slate-400"}`}
            >
              {tPanel.industrialBadge}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">{tPanel.industrialDesc}</p>
        </button>
      </div>
    </div>
  );
};

export default SewingModePanel;
