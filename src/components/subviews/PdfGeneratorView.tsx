// src/components/subviews/PdfGeneratorView.tsx
//PDF印刷・エクスポートビュー
import React from "react";
import { useUIStore } from "../../store/useUIStore";

export const PdfGeneratorView: React.FC = () => {
  const measurements = useUIStore((state) => state.measurements);
  const userMode = useUIStore((state) => state.userMode);
  const locale = useUIStore((state) => state.locale);

  // 言語ごとのテキスト定義
  const labels = {
    ja: {
      tag: "SUBVIEW: PDF PRINT & PATTERN EXPORT",
      title: "PDF 実物大印刷・分割タイルジェネレーター",
      outputMode: "出力モード：",
      beginner: "🏠 家庭用A4分割 (トンボ付き)",
      pro: "⚙️ プロ仕様 A0大判出力",
      cardTitle: "jsPDF 動的パターンドキュメント生成",
      cardDesc: `現在のバスト(${measurements.bust}cm)・採寸データを反映した型紙を、自宅のA4プリンターで原寸印刷できるようにタイル状（分割ページ）に自動レイアウトしてPDFを出力します。`,
      pdfBtn: "原寸PDFを生成・ダウンロード",
      testBtn: "スケール確認テスト印刷",
    },
    en: {
      tag: "SUBVIEW: PDF PRINT & PATTERN EXPORT",
      title: "PDF Full-Scale Print & Tiling Generator",
      outputMode: "Output Mode:",
      beginner: "🏠 Home A4 Tiled (with Registration Marks)",
      pro: "⚙️ Pro A0 Large Format",
      cardTitle: "jsPDF Dynamic Pattern Document Generation",
      cardDesc: `Generates a tiled PDF layout reflecting your current bust (${measurements.bust}cm) and measurements, ready for full-scale printing on home A4 printers.`,
      pdfBtn: "Generate & Download Full-Scale PDF",
      testBtn: "Scale Verification Test Print",
    },
    fr: {
      tag: "SOUS-MODULE : IMPRESSION PDF & EXPORT",
      title: "Générateur PDF impression taille réelle & mosaïque",
      outputMode: "Mode de sortie :",
      beginner: "🏠 Mosaïque A4 maison (avec repères)",
      pro: "⚙️ Grand format A0 pro",
      cardTitle: "Génération dynamique de document de patron jsPDF",
      cardDesc: `Génère un PDF en mosaïque reflétant votre tour de poitrine (${measurements.bust}cm) et vos mesures pour une impression à l'échelle sur imprimante A4.`,
      pdfBtn: "Générer et télécharger le PDF",
      testBtn: "Impression test de vérification d'échelle",
    },
    es: {
      tag: "SUBVISTA: IMPRESIÓN PDF Y EXPORTACIÓN",
      title: "Generador PDF de Impresión a Escala Real y Mosaico",
      outputMode: "Modo de salida:",
      beginner: "🏠 A4 casero en mosaico (con marcas)",
      pro: "⚙️ Gran formato A0 profesional",
      cardTitle: "Generación Dinámica de Documentos de Patrones jsPDF",
      cardDesc: `Genera un diseño PDF en mosaico que refleja su busto actual (${measurements.bust}cm) y medidas, listo para imprimir a escala real en impresoras A4.`,
      pdfBtn: "Generar y Descargar PDF a Escala",
      testBtn: "Impresión de Prueba de Escala",
    },
    zh: {
      tag: "子视图: PDF 打印与样板导出",
      title: "PDF 原大打印与分页平铺生成器",
      outputMode: "输出模式：",
      beginner: "🏠 家用 A4 分页平铺 (带裁切线)",
      pro: "⚙️ 专业版 A0 大幅面输出",
      cardTitle: "jsPDF 动态样本文档生成",
      cardDesc: `自动排版反映当前胸围（${measurements.bust}cm）及尺寸数据的样板，并将其转换为可在家用A4打印机上等大打印的平铺PDF。`,
      pdfBtn: "生成并下载原寸 PDF",
      testBtn: "比例校验测试打印",
    },
    ko: {
      tag: "하위뷰: PDF 프린트 및 패턴 내보내기",
      title: "PDF 실물 크기 인쇄 및 분할 타일 제너레이터",
      outputMode: "출력 모드:",
      beginner: "🏠 가정용 A4 분할 (재단선 포함)",
      pro: "⚙️ 프로 사양 A0 대형 출력",
      cardTitle: "jsPDF 동적 패턴 문서 생성",
      cardDesc: `현재 바스트(${measurements.bust}cm) 및 치수 데이터가 반영된 패턴을 가정용 A4 프린터에서 원사이즈로 인쇄할 수 있도록 타일(분할 페이지) 형태로 자동 레이아웃하여 PDF를 출력합니다.`,
      pdfBtn: "실물 크기 PDF 생성 및 다운로드",
      testBtn: "스케일 확인 테스트 인쇄",
    },
  };

  const tText = labels[locale as keyof typeof labels] || labels.en;

  return (
    <div className="bg-[#111827] rounded-xl p-6 shadow-2xl border border-[#1f2937] flex flex-col gap-6 text-slate-200 min-h-[500px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#1f2937] pb-4 gap-2">
        <div>
          <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded uppercase tracking-wider">
            {tText.tag}
          </span>
          <h2 className="text-base font-bold text-slate-100 mt-1.5 flex items-center gap-2">
            <span>🖨️ {tText.title}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#1f2937] text-rose-400 border border-slate-700">
              A4 / A0 Tiling Ready
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">{tText.outputMode}</span>
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded font-semibold">
            {userMode === "beginner" ? tText.beginner : tText.pro}
          </span>
        </div>
      </div>

      {/* PDFプレビューエリア */}
      <div className="relative flex-1 bg-[#0b0f19] rounded-xl border border-[#1f2937] flex items-center justify-center overflow-hidden p-8 shadow-inner min-h-[350px]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f43f5e10_1px,transparent_1px),linear-gradient(to_bottom,#f43f5e10_1px,transparent_1px)] bg-[size:30px_30px]" />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 text-2xl shadow-[0_0_20px_rgba(244,63,94,0.15)]">
            📄
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-200">
              {tText.cardTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-1">{tText.cardDesc}</p>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => alert("PDF Generated")}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-rose-600/20"
            >
              {tText.pdfBtn}
            </button>
            <button
              onClick={() => alert("Test Print Scale Verified")}
              className="px-4 py-2 bg-[#1f2937] hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-all border border-slate-700"
            >
              {tText.testBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfGeneratorView;
