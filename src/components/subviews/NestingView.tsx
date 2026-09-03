// src/components/subviews/NestingView.tsx
import React from "react";
import { useUIStore } from "../../store/useUIStore";

export const NestingView: React.FC = () => {
  const { sewingMachineType, locale } = useUIStore();

  // 言語ごとのテキスト定義
  const labels = {
    ja: {
      tag: "SUBVIEW: AUTO NESTING & LAYOUT",
      title: "自動ネスティング（生地配置・用尺計算）",
      seamMode: "縫い代モード：",
      industrial: "⚙️ 工業用 (パーツ別最適化)",
      standard: "🏠 家庭用 (一律縫い代)",
      cardTitle: "AIパーツ自動配置 & 用尺計算エンジン",
      cardDesc:
        "生地巾（110cm / 150cm等）に合わせて、すべてのパターンピースを隙間なくパッキングし、無駄のない用尺（必要用尺：約 1.8m）を瞬時に算出します。",
      executeBtn: "ネスティング最適化を実行",
      widthBtn: "生地巾変更 (110cm)",
    },
    en: {
      tag: "SUBVIEW: AUTO NESTING & LAYOUT",
      title: "Auto Nesting & Fabric Layout Calculation",
      seamMode: "Seam Allowance Mode:",
      industrial: "⚙️ Industrial (Part-optimized)",
      standard: "🏠 Standard (Uniform allowance)",
      cardTitle: "AI Part Auto-Placement & Yardage Engine",
      cardDesc:
        "Optimally packs all pattern pieces according to fabric width (e.g., 110cm / 150cm) to instantly calculate the precise yardage required (approx. 1.8m).",
      executeBtn: "Run Nesting Optimization",
      widthBtn: "Change Fabric Width (110cm)",
    },
    fr: {
      tag: "SOUS-MODULE : IMBESTAGE AUTOMATIQUE & MISE EN PAGE",
      title: "Imbéstage automatique et calcul de métrage",
      seamMode: "Mode de couture :",
      industrial: "⚙️ Industriel (Optimisé par pièce)",
      standard: "🏠 Standard (Marge uniforme)",
      cardTitle: "Moteur IA de placement et de métrage",
      cardDesc:
        "Place optimalement toutes les pièces selon la largeur du tissu pour calculer instantanément le métrage requis (env. 1.8m).",
      executeBtn: "Exécuter l'optimisation",
      widthBtn: "Modifier la largeur (110cm)",
    },
    es: {
      tag: "SUBVISTA: ANIDAMIENTO AUTOMÁTICO Y DISEÑO",
      title: "Anidamiento Automático y Cálculo de Metraje",
      seamMode: "Modo de margen de costura:",
      industrial: "⚙️ Industrial (Optimizado por pieza)",
      standard: "🏠 Estándar (Margen uniforme)",
      cardTitle: "Motor de Colocación Automática y Metraje IA",
      cardDesc:
        "Empaqueta de forma óptima todas las piezas según el ancho de la tela para calcular al instante el metraje preciso (aprox. 1.8m).",
      executeBtn: "Ejecutar Optimización",
      widthBtn: "Cambiar Ancho de Tela (110cm)",
    },
    zh: {
      tag: "子视图: 自动排料与布料布局",
      title: "自动排料（面料排版与用料计算）",
      seamMode: "缝份模式：",
      industrial: "⚙️ 工业用 (部件独立优化)",
      standard: "🏠 家用 (统一缝份)",
      cardTitle: "AI 部件自动排版与用料计算引擎",
      cardDesc:
        "根据面料幅宽（110cm / 150cm等）无缝排布所有样片，瞬时计算出最优用料（所需用料：约 1.8m）。",
      executeBtn: "运行排料优化",
      widthBtn: "更改幅宽 (110cm)",
    },
    ko: {
      tag: "하위뷰: 자동 네스팅 및 레이아웃",
      title: "자동 네스팅 (원단 배치 및 소요량 계산)",
      seamMode: "시로(시봉) 모드:",
      industrial: "⚙️ 산업용 (부위별 최적화)",
      standard: "🏠 가정용 (일률적 시접)",
      cardTitle: "AI 패턴 자동 배치 & 소요량 계산 엔진",
      cardDesc:
        "원단 폭(110cm / 150cm 등)에 맞춰 모든 패턴 조각을 틈새 없이 패킹하여, 낭비 없는 소요량(필요 소요량: 약 1.8m)을 즉시 산출합니다.",
      executeBtn: "네스팅 최적화 실행",
      widthBtn: "원단 폭 변경 (110cm)",
    },
  };

  const tText = labels[locale as keyof typeof labels] || labels.en;

  return (
    <div className="bg-[#111827] rounded-xl p-6 shadow-2xl border border-[#1f2937] flex flex-col gap-6 text-slate-200 min-h-[500px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#1f2937] pb-4 gap-2">
        <div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded uppercase tracking-wider">
            {tText.tag}
          </span>
          <h2 className="text-base font-bold text-slate-100 mt-1.5 flex items-center gap-2">
            <span>📦 {tText.title}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#1f2937] text-emerald-400 border border-slate-700">
              Optimization: Active
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">{tText.seamMode}</span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
            {sewingMachineType === "industrial"
              ? tText.industrial
              : tText.standard}
          </span>
        </div>
      </div>

      {/* ネスティングプレビューエリア */}
      <div className="relative flex-1 bg-[#0b0f19] rounded-xl border border-[#1f2937] flex items-center justify-center overflow-hidden p-8 shadow-inner min-h-[350px]">
        {/* 布地の反物風グリッドライン */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            📐
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-200">
              {tText.cardTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-1">{tText.cardDesc}</p>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => alert("Nesting Optimization Started")}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-emerald-600/20"
            >
              {tText.executeBtn}
            </button>
            <button
              onClick={() => alert("Fabric Width Changed")}
              className="px-4 py-2 bg-[#1f2937] hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-all border border-slate-700"
            >
              {tText.widthBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NestingView;
