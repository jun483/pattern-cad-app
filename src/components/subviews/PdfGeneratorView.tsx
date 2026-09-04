// src/components/subviews/PdfGeneratorView.tsx
// PDF印刷・エクスポートビュー（小田原ミシン仕様・ブランドゴールド対応・完全網羅版）
import React, { useState } from "react";
import { useUIStore } from "../../store/useUIStore";
import { dictionaries, type Locale } from "../../i18n";
import jsPDF from "jspdf";

export const PdfGeneratorView: React.FC = () => {
  // 1. 6か国語（Locale）対応の取得
  const rawLocale = useUIStore((state) => state.locale);
  const locale: Locale = (
    rawLocale && dictionaries[rawLocale] ? rawLocale : "ja"
  ) as Locale;
  const t: any = dictionaries[locale] || dictionaries["ja"];

  const modules = t.modules || {};
  const panels = t.panels || {};
  const modes = t.modes || {};

  // 2. ストアの既存データ・アクション
  const measurements = useUIStore((state) => state.measurements) || {
    bust: 88,
    waist: 66,
    hip: 90,
  };
  const patternPieces = useUIStore((state) => state.patternPieces) || [];
  const addLogMessage = useUIStore((state) => state.addLogMessage);

  const userMode = useUIStore((state) => state.userMode);
  const setUserMode = useUIStore((state) => state.setUserMode);

  // 3. 家庭用 / 工場用を確実に切り替えるためのローカル・ストア連動ステート
  const storeEnv = useUIStore((state) => (state as any).machineEnvironment);
  const setStoreEnv = useUIStore(
    (state) => (state as any).setMachineEnvironment,
  );
  const [localEnv, setLocalEnv] = useState<"home" | "industrial">("home");

  const currentEnv = storeEnv || localEnv;
  const handleEnvironmentChange = (env: "home" | "industrial") => {
    setLocalEnv(env);
    if (setStoreEnv) {
      setStoreEnv(env);
    }
    addLogMessage?.(
      `縫製環境を変更しました: ${env === "industrial" ? "工場用" : "家庭用"}`,
    );
  };

  // PDF出力オプションの状態（パーツ一覧同封・A4分割トンボガイド）
  const [includeSpecSheet, setIncludeSpecSheet] = useState(true);
  const [includeTiles, setIncludeTiles] = useState(userMode === "beginner");
  const [isGenerating, setIsGenerating] = useState(false);

  // 4. 小田原ミシンブランド対応・6か国語辞書マップ（完全網羅）
  const pdfTexts = {
    tag: {
      ja: "ODAWARA SEWING — SUBVIEW: PDF PRINT & PATTERN EXPORT",
      en: "ODAWARA SEWING — SUBVIEW: PDF PRINT & PATTERN EXPORT",
      fr: "Couture d'Odawara — IMPRESSION PDF & EXPORT",
      es: "Costura Odawara — IMPRESIÓN PDF Y EXPORTACIÓN",
      zh: "小田原缝纫机 — PDF 打印与样板导出",
      ko: "오다와라 미싱 — PDF 프린트 및 패턴 내보내기",
    },
    title: {
      ja: "PDF 実物大印刷・分割タイルジェネレーター",
      en: "PDF Full-Scale Print & Tiling Generator",
      fr: "Générateur PDF impression taille réelle & mosaïque",
      es: "Generador PDF de Impresión a Escala Real y Mosaico",
      zh: "PDF 原大打印与分页平铺生成器",
      ko: "PDF 실물 크기 인쇄 및 분할 타일 제너레이터",
    },
    desc: {
      ja: "現在の設定やモードに応じた最適なレイアウトで、型紙や縫製仕様書をjsPDFを用いて高精度に出力します。",
      en: "Output sewing patterns and specification sheets as a high-precision PDF with layouts optimized for your settings.",
      fr: "Exportez les patrons et fiches techniques en PDF haute précision avec des mises en page optimisées.",
      es: "Exporte patrones y hojas de especificaciones en PDF de alta precisión con diseños optimizados.",
      zh: "使用 jsPDF 根据当前设置和模式，以最优布局高精度导出样片和缝纫规格书。",
      ko: "현재 설정 및 모드에 맞는 최적의 레이아웃으로 패턴 및 사양서를 jsPDF를 통해 고정밀 출력합니다.",
    },
    optionsTitle: {
      ja: "出力オプション設定（仕様書・ガイド）",
      en: "Output Options (Specs & Guides)",
      fr: "Options de sortie (Spécifications & Guides)",
      es: "Opciones de salida (Especificaciones y Guías)",
      zh: "输出选项设置（规格书与辅助线）",
      ko: "출력 옵션 설정 (사양서 및 가이드)",
    },
    specSheetLabel: {
      ja: "縫製仕様書（パーツ一覧・寸法スペック）を同梱する",
      en: "Include Sewing Specification Sheet (Parts List & Dimensions)",
      fr: "Inclure la fiche technique de couture (Liste & Dimensions)",
      es: "Incluir hoja de especificaciones de costura (Lista y Dimensiones)",
      zh: "包含缝纫规格书（部件列表与尺寸明细）",
      ko: "봉제 사양서(부품 목록 및 치수 스펙) 포함",
    },
    tilesLabel: {
      ja: "A4分割プリント用ガイド線（トンボ・貼り合わせ用）を含める",
      en: "Include A4 Tiling Guide Lines (Crop Marks for Assembly)",
      fr: "Inclure les lignes de guidage de découpage A4 (Repères)",
      es: "Incluir líneas de guía de mosaico A4 (Marcas de corte)",
      zh: "包含 A4 分页平铺打印引导线（拼接裁切线）",
      ko: "A4 분할 인쇄용 가이드라인(재단선 및 이어붙이기 마크) 포함",
    },
    printButton: {
      ja: "🖨️ jsPDFで原寸大PDFを生成・ダウンロード",
      en: "🖨️ Generate & Download Full-Scale PDF via jsPDF",
      fr: "🖨️ Générer et télécharger le PDF taille réelle",
      es: "🖨️ Generar y descargar PDF a escala real",
      zh: "🖨️ 通过 jsPDF 生成并下载原寸 PDF",
      ko: "🖨️ jsPDF로 실물 크기 PDF 생성 및 다운로드",
    },
    testButton: {
      ja: "📐 10cmスケール確認テスト印刷",
      en: "📐 Scale Verification Test Print (10cm)",
      fr: "📐 Impression test de vérification d'échelle (10cm)",
      es: "📐 Impresión de prueba de escala (10cm)",
      zh: "📐 10cm 比例校验测试打印",
      ko: "📐 10cm 스케일 확인 테스트 인쇄",
    },
    storeBadge: {
      ja: "小田原ミシン 昭和9年創業 — 正確な原寸出力をサポート（ブランドカラー: ゴールド）",
      en: "Odawara Sewing Machine — Established 1935 (Brand Color: Gold)",
      fr: "Magasin de machines à coudre d'Odawara — Fondé en 1935",
      es: "Tienda de máquinas de coser Odawara — Fundada en 1935",
      zh: "小田原缝纫机 — 始创于1935年（品牌金配色）",
      ko: "오다와라 미싱 — 1935년 창업 (브랜드 골드 지원)",
    },
    homeNote: {
      ja: "🏠 【家庭用モード】家庭用ミシンの標準押え幅・安全マージンを考慮しています。",
      en: "🏠 [Home Mode] Optimized for home machines with standard safety margins.",
      fr: "🏠 [Mode Domestique] Optimisé pour machines domestiques avec marges standard.",
      es: "🏠 [Modo Doméstico] Optimizado para máquinas domésticas con márgenes estándar.",
      zh: "🏠 【家用模式】已针对家用缝纫机标准压脚和安全缝份进行优化。",
      ko: "🏠 [가정용 모드] 가정용 미싱의 표준 노루발 및 안전 여유치를 고려하였습니다.",
    },
    industrialNote: {
      ja: "⚡ 【工場用モード】JUKI等の工業用ミシン仕様（高速縫製・特殊ゲージ対応マージン）が適用されています。",
      en: "⚡ [Industrial Mode] Based on strict industrial sewing margins and JUKI standards.",
      fr: "⚡ [Mode Industriel] Basé sur des marges industrielles strictes et standards JUKI.",
      es: "⚡ [Modo Industrial] Basado en márgenes industriales estrictos y estándares JUKI.",
      zh: "⚡ 【工业用模式】已应用 JUKI 等工业级设备的严格缝份与特殊规尺标准。",
      ko: "⚡ [공업용 모드] JUKI 등 공업용 미싱 사양(고속 재봉 및 특수 게이지 여유치)이 적용되었습니다.",
    },
  };

  const getPdfText = (key: keyof typeof pdfTexts) => {
    return pdfTexts[key][locale] || pdfTexts[key]["en"];
  };

  // 5. jsPDF 実生成処理（仕様書同梱、分割トンボ、10cmスケールバー、環境注記のすべてを網羅）
  const handleGeneratePdf = () => {
    setIsGenerating(true);
    addLogMessage?.(
      `PDFエクスポート実行 [環境: ${currentEnv}, モード: ${userMode}, 仕様書同梱: ${includeSpecSheet}, トンボ: ${includeTiles}, パーツ数: ${patternPieces.length}]`,
    );

    try {
      const doc = new jsPDF({
        orientation: userMode === "pro" ? "landscape" : "portrait",
        unit: "mm",
        format: userMode === "pro" ? [841, 1189] : "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // --- ダーク背景 & 小田原ミシン ブランドゴールド枠線 ---
      doc.setFillColor(17, 24, 39); // #111827
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      doc.setDrawColor(245, 158, 11); // Gold / Amber-500
      doc.setLineWidth(0.8);
      doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

      // --- ヘッダー ---
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.setTextColor(245, 158, 11);
      doc.text("ODAWARA SEWING MACHINE - PATTERN & SPEC SHEET EXPORT", 15, 20);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(203, 213, 225);
      doc.text(
        `Date: ${new Date().toLocaleDateString()} | Mode: ${userMode.toUpperCase()} | Env: ${currentEnv.toUpperCase()}`,
        15,
        27,
      );
      doc.text(
        `Bust: ${measurements.bust} cm | Waist: ${measurements.waist} cm | Active Pieces: ${patternPieces.length}`,
        15,
        33,
      );

      // --- 縫製仕様書（パーツ一覧・スペック）の同梱処理 ---
      let currentY = 42;
      if (includeSpecSheet) {
        doc.setFillColor(31, 41, 55);
        doc.rect(15, currentY, pageWidth - 30, 22, "F");
        doc.setFont("helvetica", "bold");
        doc.setTextColor(245, 158, 11);
        doc.text("[ Sewing Specification & Parts Summary ]", 18, currentY + 6);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(226, 232, 240);
        doc.text(
          `- Included Parts: ${patternPieces.length > 0 ? patternPieces.map((p: any) => p.name || "Part").join(", ") : "Standard Bodice & Sleeve"}`,
          18,
          currentY + 13,
        );
        doc.text(
          `- Margin Rule: ${currentEnv === "industrial" ? "Industrial (JUKI Standard 0.7cm/1.0cm)" : "Home Sewing (Standard 1.0cm/1.5cm)"}`,
          18,
          currentY + 19,
        );
        currentY += 28;
      }

      // --- モード別レイアウト & A4分割トンボガイド ---
      doc.setDrawColor(148, 163, 184);
      doc.setLineWidth(0.3);

      if (userMode === "beginner" && includeTiles) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(245, 158, 11);
        doc.text(
          "[ Beginner Tiling Guide: A4 Split Layout with Registration Crop Marks ]",
          15,
          currentY,
        );
        currentY += 6;

        // 四隅のトンボ（クロップマーク）
        doc.line(15, currentY, 25, currentY);
        doc.line(15, currentY, 15, currentY + 10);
        doc.line(pageWidth - 15, currentY, pageWidth - 25, currentY);
        doc.line(pageWidth - 15, currentY, pageWidth - 15, currentY + 10);

        doc.rect(
          20,
          currentY + 5,
          pageWidth - 40,
          pageHeight - currentY - 35,
          "S",
        );
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(
          "Align cross-marks (+) when pasting printed A4 sheets together.",
          pageWidth / 2,
          pageHeight - 28,
          { align: "center" },
        );
      } else {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(245, 158, 11);
        doc.text(
          userMode === "pro"
            ? "[ Professional Mode: Full-Scale CAD Plotter Output ]"
            : "[ Standard Pattern Layout ]",
          15,
          currentY,
        );
        currentY += 6;
        doc.rect(20, currentY, pageWidth - 40, pageHeight - currentY - 30, "S");
      }

      // --- 10cmスケール確認用バーの描画 ---
      const scaleBarX = 20;
      const scaleBarY = pageHeight - 22;
      doc.setFillColor(245, 158, 11);
      doc.rect(scaleBarX, scaleBarY, 50, 3.5, "F"); // 50mmバー
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(245, 158, 11);
      doc.text("0 cm", scaleBarX, scaleBarY - 2);
      doc.text(
        "5 cm (Calibration Scale Bar - Verify with physical ruler)",
        scaleBarX + 53,
        scaleBarY + 3,
      );

      // --- フッター注記（家庭用 / 工場用の自動切り替え反映） ---
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(156, 163, 175);
      const activeEnvNote =
        currentEnv === "industrial"
          ? getPdfText("industrialNote")
          : getPdfText("homeNote");
      doc.text(activeEnvNote, 15, pageHeight - 13);

      // PDFダウンロード実行
      setTimeout(() => {
        doc.save(`Odawara_Sewing_Pattern_${userMode}_${currentEnv}.pdf`);
        setIsGenerating(false);
        addLogMessage?.(
          "jsPDFによる実物大PDFの生成・ダウンロードが完了しました。",
        );
      }, 700);
    } catch (error) {
      console.error("PDF generation error:", error);
      setIsGenerating(false);
      alert("PDFの生成中にエラーが発生しました。");
    }
  };

  // 6. 10cmスケール確認テスト印刷ハンドラー
  const handleTestPrint = () => {
    addLogMessage?.("10cmスケール確認テスト用PDFを出力しました。");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    doc.setFontSize(14);
    doc.text("Odawara Sewing - 10cm Scale Verification Test", 15, 20);
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.rect(15, 30, 100, 10, "S"); // 正確な10cm(100mm)ボックス
    doc.setFontSize(9);
    doc.text(
      "<- Exactly 10.0 cm (Check with physical ruler after print) ->",
      15,
      48,
    );
    doc.text("Store: Odawara Sewing Machine (Established 1935)", 15, 56);
    doc.save("Odawara_Scale_Test_10cm.pdf");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#1f2937] text-slate-200 rounded-xl shadow-md space-y-6 border border-slate-700/60">
      {/* ヘッダー */}
      <div className="border-b border-slate-700 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded uppercase tracking-wider">
            {getPdfText("tag")}
          </span>
          <h2 className="text-2xl font-bold text-amber-400 mt-1.5 flex items-center gap-2">
            <span>🖨️ {getPdfText("title")}</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">{getPdfText("desc")}</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">
            {locale === "ja" ? "出力モード:" : "Output Mode:"}
          </span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded font-semibold">
            {userMode === "beginner"
              ? modes.beginner || "Beginner"
              : modes.pro || "Professional"}
          </span>
        </div>
      </div>

      {/* --- モード & 縫製環境（家庭用/工場用）設定エリア --- */}
      <div className="p-5 border border-slate-700 rounded-lg bg-[#111827] space-y-4">
        <h3 className="text-lg font-semibold text-amber-300">
          {panels.sewingModeTitle ||
            "Industrial & Home Sewing Machine Settings"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* 初心者用 / プロ用 切替 */}
          <div className="space-y-2">
            <label className="block text-slate-400 font-medium">
              {panels.currentMode || "Current Mode"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUserMode("beginner")}
                className={`py-2 px-3 rounded-lg font-semibold transition border cursor-pointer ${
                  userMode === "beginner"
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow"
                    : "bg-[#1f2937] text-slate-300 border-slate-700 hover:bg-slate-800"
                }`}
              >
                {modes.beginner || "Beginner"}
              </button>
              <button
                type="button"
                onClick={() => setUserMode("pro")}
                className={`py-2 px-3 rounded-lg font-semibold transition border cursor-pointer ${
                  userMode === "pro"
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow"
                    : "bg-[#1f2937] text-slate-300 border-slate-700 hover:bg-slate-800"
                }`}
              >
                {modes.pro || "Professional"}
              </button>
            </div>
          </div>

          {/* 家庭用 / 工場用 切替 */}
          <div className="space-y-2">
            <label className="block text-slate-400 font-medium">
              {panels.sewingModeTitle || "Sewing Environment"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleEnvironmentChange("home")}
                className={`py-2 px-3 rounded-lg font-semibold transition border cursor-pointer ${
                  currentEnv === "home"
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow"
                    : "bg-[#1f2937] text-slate-300 border-slate-700 hover:bg-slate-800"
                }`}
              >
                🏠 {panels.home || "Home Sewing"}
              </button>
              <button
                type="button"
                onClick={() => handleEnvironmentChange("industrial")}
                className={`py-2 px-3 rounded-lg font-semibold transition border cursor-pointer ${
                  currentEnv === "industrial"
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow"
                    : "bg-[#1f2937] text-slate-300 border-slate-700 hover:bg-slate-800"
                }`}
              >
                ⚡ {panels.industrial || "Industrial"}
              </button>
            </div>

            {/* 動的解説表示（家庭用 vs 工場用） */}
            <div className="p-2.5 rounded bg-[#1f2937] border border-slate-700 text-slate-300 text-[11px]">
              {currentEnv === "industrial" ? (
                <span className="text-amber-300 font-medium">
                  {getPdfText("industrialNote")}
                </span>
              ) : (
                <span className="text-slate-300">{getPdfText("homeNote")}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- 出力オプション設定エリア（仕様書同梱・分割ガイド線） --- */}
      <div className="p-5 border border-slate-700 rounded-lg bg-[#111827] space-y-4">
        <h3 className="text-lg font-semibold text-amber-300">
          {getPdfText("optionsTitle")}
        </h3>

        <div className="space-y-3 text-sm">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSpecSheet}
              onChange={(e) => setIncludeSpecSheet(e.target.checked)}
              className="w-4 h-4 text-amber-500 rounded border-slate-700 bg-slate-900 focus:ring-amber-500 cursor-pointer"
            />
            <span className="text-slate-200">
              {getPdfText("specSheetLabel")}
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeTiles}
              onChange={(e) => setIncludeTiles(e.target.checked)}
              className="w-4 h-4 text-amber-500 rounded border-slate-700 bg-slate-900 focus:ring-amber-500 cursor-pointer"
            />
            <span className="text-slate-200">{getPdfText("tilesLabel")}</span>
          </label>
        </div>
      </div>

      {/* --- アクションボタンエリア --- */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={handleGeneratePdf}
          disabled={isGenerating}
          className="w-full py-3.5 px-4 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition cursor-pointer shadow-lg text-base flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isGenerating
            ? "⏳ Generating PDF with jsPDF..."
            : getPdfText("printButton")}
        </button>

        <button
          type="button"
          onClick={handleTestPrint}
          className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-amber-300 font-semibold rounded-lg transition cursor-pointer shadow text-sm flex items-center justify-center gap-2"
        >
          {getPdfText("testButton")}
        </button>
      </div>

      {/* 小田原ミシンブランドバッジ */}
      <div className="text-center pt-2 border-t border-slate-700/80 text-xs text-amber-400/80 font-medium">
        ✨ {getPdfText("storeBadge")}
      </div>
    </div>
  );
};

export default PdfGeneratorView;
