// src/components/subviews/SpecSheetView.tsx
//仕様書・縫製レシピビュー
import React from "react";
import { useUIStore } from "../../store/useUIStore";

// 翻訳データの型定義を明確化
interface TranslationType {
  tag: string;
  title: string;
  sewingSpec: string;
  industrial: string;
  standard: string;
  storeName: string;
  storeDesc: string;
  downloadBtn: string;
  section1: string;
  bust: string;
  waist: string;
  hip: string;
  backLength: string;
  section2: string;
  interlining: string;
  thread: string;
  sewingAllowance: string;
  seamInd: string;
  seamStd: string;
}

export const SpecSheetView: React.FC = () => {
  const measurements = useUIStore((state) => state.measurements);
  const sewingMachineType = useUIStore((state) => state.sewingMachineType);
  const locale = useUIStore((state) => state.locale);

  // 言語ごとのテキスト定義
  const labels: Record<string, TranslationType> = {
    ja: {
      tag: "SUBVIEW: SPEC SHEET & SEWING RECIPE",
      title: "仕様書・縫製レシピ自動生成",
      sewingSpec: "縫製仕様：",
      industrial: "⚙️ 工業用アパレル縫製手順",
      standard: "🏠 家庭用ミシン向け手順書",
      storeName: "小田原ミシン - 製品仕様書 (PRODUCTION SPEC SHEET)",
      storeDesc: "現在の採寸・物性データに基づき自動生成された公式レシピ",
      downloadBtn: "PDF形式でダウンロード",
      section1: "1. 適用サイズ・採寸データ",
      bust: "バスト:",
      waist: "ウエスト:",
      hip: "ヒップ:",
      backLength: "背丈:",
      section2: "2. 推奨副資材 & 縫製ノート",
      interlining: "接着芯: 薄手平織り芯地 (見返し・襟元補強)",
      thread: "ミシン糸: スパン糸 #60 (カラー: ブレンドゴールド)",
      sewingAllowance: "縫い代仕様:",
      seamInd: "部分別最適化 (本縫い+ロック)",
      seamStd: "一律 1.0cm ロック始末",
    },
    en: {
      tag: "SUBVIEW: SPEC SHEET & SEWING RECIPE",
      title: "Spec Sheet & Sewing Recipe Generator",
      sewingSpec: "Sewing Spec:",
      industrial: "⚙️ Industrial Apparel Procedure",
      standard: "🏠 Home Sewing Machine Guide",
      storeName: "Odawara Sewing Machine - Production Spec Sheet",
      storeDesc:
        "Official recipe auto-generated based on current measurements and property data",
      downloadBtn: "Download as PDF",
      section1: "1. Applicable Sizes & Measurements",
      bust: "Bust:",
      waist: "Waist:",
      hip: "Hip:",
      backLength: "Back Length:",
      section2: "2. Recommended Notions & Sewing Notes",
      interlining:
        "Interlining: Lightweight plain weave (facing & collar reinforcement)",
      thread: "Thread: Spun thread #60 (Color: Blend Gold)",
      sewingAllowance: "Seam Allowance:",
      seamInd: "Part-optimized (Lockstitch + Overlock)",
      seamStd: "Uniform 1.0cm Overlock finish",
    },
    fr: {
      tag: "SOUS-MODULE : FICHE TECHNIQUE & RECETTE",
      title: "Générateur de fiche technique et de couture",
      sewingSpec: "Spécification :",
      industrial: "⚙️ Procédure industrielle",
      standard: "🏠 Guide machine familiale",
      storeName: "Odawara Sewing - Fiche technique de production",
      storeDesc:
        "Recette officielle générée automatiquement selon les mesures actuelles",
      downloadBtn: "Télécharger en PDF",
      section1: "1. Tailles applicables et mesures",
      bust: "Poitrine:",
      waist: "Taille:",
      hip: "Hanches:",
      backLength: "Longueur dos:",
      section2: "2. Fournitures recommandées & Notes",
      interlining: "Entoilage : Tissé léger (renfort parementure / col)",
      thread: "Fil : Fil spun #60 (Couleur : Or mélangé)",
      sewingAllowance: "Marge de couture :",
      seamInd: "Optimisé par pièce (Piqûre + Surjet)",
      seamStd: "Marge uniforme 1.0cm surjet",
    },
    es: {
      tag: "SUBVISTA: HOJA DE ESPECIFICACIONES Y RECETA",
      title: "Generador de Hoja de Especificaciones y Costura",
      sewingSpec: "Especificación:",
      industrial: "⚙️ Procedimiento industrial",
      standard: "🏠 Guía para máquina doméstica",
      storeName: "Odawara Sewing - Hoja de Especificaciones de Producción",
      storeDesc:
        "Receta oficial generada automáticamente según las medidas y datos actuales",
      downloadBtn: "Descargar en PDF",
      section1: "1. Tallas aplicables y medidas",
      bust: "Busto:",
      waist: "Cintura:",
      hip: "Cadera:",
      backLength: "Largo de espalda:",
      section2: "2. Insumos recomendados y notas",
      interlining:
        "Entretela: Tejido plano ligero (refuerzo de vistas y cuello)",
      thread: "Hilo: Hilo spun #60 (Color: Oro mezclado)",
      sewingAllowance: "Margen de costura:",
      seamInd: "Optimizado por pieza (Punteado + Overlock)",
      seamStd: "Margen uniforme de 1.0cm",
    },
    zh: {
      tag: "子视图: 规格书与缝制工艺单",
      title: "规格书与缝制工艺单自动生成",
      sewingSpec: "缝制规范：",
      industrial: "⚙️ 工业服装缝制流程",
      standard: "🏠 家用缝纫机制作指南",
      storeName: "小田原缝纫 - 产品规格书 (PRODUCTION SPEC SHEET)",
      storeDesc: "基于当前尺寸与物性数据自动生成的官方工艺单",
      downloadBtn: "下载 PDF 格式",
      section1: "1. 适用尺寸与测量数据",
      bust: "胸围:",
      waist: "腰围:",
      hip: "臀围:",
      backLength: "背长:",
      section2: "2. 推荐辅料与缝制说明",
      interlining: "粘合衬: 轻薄平纹衬 (门襟与领口加固)",
      thread: "缝纫线: 涤纶 spun #60 (颜色: 混合金)",
      sewingAllowance: "缝份规格:",
      seamInd: "部件独立优化 (平缝+包缝)",
      seamStd: "统一 1.0cm 包边处理",
    },
    ko: {
      tag: "하위뷰: 사양서 및 봉제 레시피",
      title: "사양서 및 봉제 레시피 자동 생성",
      sewingSpec: "봉제 사양:",
      industrial: "⚙️ 산업용 어패럴 봉제 순서",
      standard: "🏠 가정용 미싱용 지침서",
      storeName: "오다와라 미싱 - 제품 사양서 (PRODUCTION SPEC SHEET)",
      storeDesc: "현재 치수 및 물성 데이터를 기반으로 자동 생성된 공식 레시피",
      downloadBtn: "PDF 형식으로 다운로드",
      section1: "1. 적용 사이즈 및 치수 데이터",
      bust: "바스트:",
      waist: "웨이스트:",
      hip: "힙:",
      backLength: "뒤등길이:",
      section2: "2. 추천 부자재 & 봉제 노트",
      interlining: "접착심: 얇은 평직 심지 (안단 및 깃 보강)",
      thread: "미싱실: 스판실 #60 (컬러: 블렌드 골드)",
      sewingAllowance: "시접 사양:",
      seamInd: "부위별 최적화 (본봉+오버록)",
      seamStd: "일률 1.0cm 오버록 마감",
    },
  };

  const tText = labels[locale] || labels.en;

  return (
    <div className="bg-[#111827] rounded-xl p-6 shadow-2xl border border-[#1f2937] flex flex-col gap-6 text-slate-200 min-h-[500px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#1f2937] pb-4 gap-2">
        <div>
          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded uppercase tracking-wider">
            {tText.tag}
          </span>
          <h2 className="text-base font-bold text-slate-100 mt-1.5 flex items-center gap-2">
            <span>📜 {tText.title}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#1f2937] text-amber-400 border border-slate-700">
              Professional Grade
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">{tText.sewingSpec}</span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-semibold">
            {sewingMachineType === "industrial"
              ? tText.industrial
              : tText.standard}
          </span>
        </div>
      </div>

      {/* 仕様書プレビューエリア */}
      <div className="relative flex-1 bg-[#161e2e] rounded-xl border border-[#1f2937] p-6 shadow-inner flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-[#1f2937] pb-4">
          <div>
            <h3 className="text-sm font-bold text-amber-400 tracking-wide">
              {tText.storeName}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {tText.storeDesc}
            </p>
          </div>
          <button
            onClick={() => alert("PDF Downloaded")}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#0b0f19] text-xs font-bold rounded-lg transition-all shadow-lg shadow-amber-500/20"
          >
            {tText.downloadBtn}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* 基本寸法サマリー */}
          <div className="bg-[#0b0f19] p-4 rounded-lg border border-[#1f2937] flex flex-col gap-3">
            <span className="font-bold text-slate-300 border-b border-[#1f2937] pb-2">
              {tText.section1}
            </span>

            <div className="grid grid-cols-2 gap-2 text-slate-400">
              <div>
                {tText.bust}{" "}
                <span className="text-amber-400 font-semibold">
                  {measurements.bust} cm
                </span>
              </div>
              <div>
                {tText.waist}{" "}
                <span className="text-amber-400 font-semibold">
                  {measurements.waist} cm
                </span>
              </div>
              <div>
                {tText.hip}{" "}
                <span className="text-amber-400 font-semibold">
                  {measurements.hip} cm
                </span>
              </div>
              <div>
                {tText.backLength}{" "}
                <span className="text-amber-400 font-semibold">
                  {measurements.backLength || 40} cm
                </span>
              </div>
            </div>
          </div>

          {/* 副資材・縫製メモ */}
          <div className="bg-[#0b0f19] p-4 rounded-lg border border-[#1f2937] flex flex-col gap-3">
            <span className="font-bold text-slate-300 border-b border-[#1f2937] pb-2">
              {tText.section2}
            </span>
            <ul className="list-disc list-inside text-slate-400 space-y-1">
              <li>{tText.interlining}</li>
              <li>{tText.thread}</li>
              <li>
                {tText.sewingAllowance}{" "}
                {sewingMachineType === "industrial"
                  ? tText.seamInd
                  : tText.seamStd}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecSheetView;
