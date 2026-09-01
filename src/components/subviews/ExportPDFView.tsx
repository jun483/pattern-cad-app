import { useUIStore } from "../../store/useUIStore";

// 各言語の翻訳辞書データ（日本語・英語・フランス語・中国語）
const translations = {
  ja: {
    title: "印刷用PDF & 縫製レシピ一括ジェネレーター (Full PDF Exporter)",
    langLabel: "言語",
    selectedItem: "選択アイテム",
    integration: "家庭用プリンター・A4分割出力対応",
    beginnerBadge: "👤 A4タイル印刷モード",
    proBadge: "⚡ プロ用一括製図ドキュメント出力",
    readyTitle: "A4型紙PDF & 縫製手順書の一括生成スタンバイ完了",
    readyDesc: (
      bust: number,
      backLength: number,
      hStretch: number,
      vStretch: number,
      unit: string,
    ) =>
      `バスト ${bust}${unit}、背丈 ${backLength}${unit}、ストレッチ補正 (H:${hStretch}% / V:${vStretch}%) を反映した実寸型紙と仕様書をPDFで一括出力します。`,
    downloadBtn: "型紙 & レシピ一括PDFダウンロード (.pdf)",
    scaleBtn: "10cmスケール確認用PDF",
    footerNote:
      "✨ すべてのページに重ね合わせ用のトンボとスケールバーが自動付与されます。",
    simDownload:
      "実寸型紙PDFおよび縫製手順書のダウンロードを開始しました（シミュレーション）",
    simScale: "テスト印刷用スケール（10cm確認バー）のPDFを送信しました",
  },
  en: {
    title: "Print PDF & Sewing Recipe Generator (Full PDF Exporter)",
    langLabel: "Language",
    selectedItem: "Selected Item",
    integration: "Home Printer & A4 Tiled Output Supported",
    beginnerBadge: "👤 A4 Tiled Print Mode",
    proBadge: "⚡ Pro Batch Drafting Doc Output",
    readyTitle: "A4 Pattern PDF & Sewing Guide Batch Generation Ready",
    readyDesc: (
      bust: number,
      backLength: number,
      hStretch: number,
      vStretch: number,
      unit: string,
    ) =>
      `Exporting actual-size patterns and specs reflecting Bust ${bust}${unit}, Back Length ${backLength}${unit}, and Stretch Correction (H:${hStretch}% / V:${vStretch}%) into PDF.`,
    downloadBtn: "Pattern & Recipe Batch PDF Download (.pdf)",
    scaleBtn: "10cm Scale Verification PDF",
    footerNote:
      "✨ Alignment registration marks and scale bars are automatically added to all pages.",
    simDownload:
      "Started downloading actual-size pattern PDF and sewing instructions (Simulation)",
    simScale: "Test print scale (10cm check bar) PDF sent",
  },
  fr: {
    title: "Générateur de PDF d'Impression & Recettes de Couture",
    langLabel: "Langue",
    selectedItem: "Article",
    integration: "Impression A4 & Multipage",
    beginnerBadge: "👤 Mode A4 Tissé",
    proBadge: "⚡ Sortie Pro",
    readyTitle: "Génération PDF Prête",
    readyDesc: (
      bust: number,
      backLength: number,
      hStretch: number,
      vStretch: number,
      unit: string,
    ) =>
      `Poitrine: ${bust}${unit}, Dos: ${backLength}${unit}, Étirement (H:${hStretch}% / V:${vStretch}%) inclus dans le PDF.`,
    downloadBtn: "Télécharger PDF (.pdf)",
    scaleBtn: "Vérification Échelle 10cm",
    footerNote:
      "✨ Les repères d'alignement et barres d'échelle sont ajoutés automatiquement.",
    simDownload: "Téléchargement du PDF de patron et instructions (Simulation)",
    simScale: "PDF de vérification d'échelle 10cm envoyé",
  },
  zh: {
    title: "打印 PDF 与缝纫教程一键生成器 (Full PDF Exporter)",
    langLabel: "语言",
    selectedItem: "选中项目",
    integration: "支持家用打印机及 A4 分页输出",
    beginnerBadge: "👤 A4 拼图打印模式",
    proBadge: "⚡ 专业版批量制图文档输出",
    readyTitle: "A4 图纸 PDF & 缝纫说明书一键生成准备就绪",
    readyDesc: (
      bust: number,
      backLength: number,
      hStretch: number,
      vStretch: number,
      unit: string,
    ) =>
      `已将胸围 ${bust}${unit}、背长 ${backLength}${unit} 以及弹力修正 (H:${hStretch}% / V:${vStretch}%) 反应到实寸图纸与规格书中并打包为 PDF。`,
    downloadBtn: "图纸 & 说明书一键打包下载 (.pdf)",
    scaleBtn: "10cm 比例尺校准 PDF",
    footerNote: "✨ 所有页面均会自动添加拼版对位线（十字线）与比例尺。",
    simDownload: "已开始下载实寸图纸 PDF 及缝纫说明书（模拟）",
    simScale: "测试打印比例尺（10cm校验条）PDF 已发送",
  },
} as const;

type LangKey = keyof typeof translations;

export default function ExportPDFView() {
  const {
    userMode,
    unitSystem,
    measurements,
    fabricStretch,
    currentLanguage,
    activeCategory,
  } = useUIStore();

  const langKey: LangKey = (
    currentLanguage in translations ? currentLanguage : "ja"
  ) as LangKey;
  const t = translations[langKey];

  return (
    <div className="flex flex-col h-full bg-gray-50 p-6 overflow-y-auto space-y-6">
      {/* PDF出力 ヘッダーコントロール */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <span>📄</span> {t.title}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {t.langLabel}:{" "}
            <strong className="uppercase text-amber-700">
              {currentLanguage}
            </strong>{" "}
            | {t.selectedItem}:{" "}
            <strong className="text-blue-700">{activeCategory}</strong> |
            {t.integration}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 bg-amber-50 text-amber-800 font-semibold rounded-full border border-amber-200">
            {userMode === "beginner" ? t.beginnerBadge : t.proBadge}
          </span>
          <span className="text-xs px-3 py-1 bg-blue-50 text-blue-800 font-semibold rounded-full border border-blue-200 uppercase">
            {unitSystem}
          </span>
        </div>
      </div>

      {/* メインPDF出力コントロールステージ */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col justify-center items-center space-y-6 text-center">
        <div className="w-20 h-20 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-amber-100">
          🖨️
        </div>
        <div className="max-w-md space-y-2">
          <h3 className="text-base font-bold text-gray-800">{t.readyTitle}</h3>
          <p className="text-xs text-gray-500">
            {t.readyDesc(
              measurements.bust,
              measurements.backLength,
              fabricStretch.hStretch,
              fabricStretch.vStretch,
              unitSystem,
            )}
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => alert(t.simDownload)}
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>📥</span> {t.downloadBtn}
          </button>
          <button
            onClick={() => alert(t.simScale)}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl border border-gray-300 transition-all"
          >
            {t.scaleBtn}
          </button>
        </div>

        <div className="text-[11px] text-gray-400 pt-4 border-t border-gray-100 w-full">
          {t.footerNote}
        </div>
      </div>
    </div>
  );
}
