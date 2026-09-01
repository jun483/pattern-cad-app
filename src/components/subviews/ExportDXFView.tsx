import { useUIStore } from "../../store/useUIStore";

// 各言語の翻訳辞書データ（日本語・英語・フランス語・中国語）
const translations = {
  ja: {
    title: "DXF / CAD入出力コンバーター (Full DXF Exporter)",
    langLabel: "言語",
    selectedItem: "選択アイテム",
    integration: "レーザーカッター・工業用CAD連携",
    beginnerBadge: "👤 標準DXF出力",
    proBadge: "⚡ プロ用レイヤー分離CAD出力",
    readyTitle: "リアルタイム採寸連動 DXFデータ生成スタンバイ完了",
    readyDesc: (
      bust: number,
      backLength: number,
      hStretch: number,
      vStretch: number,
      unit: string,
    ) =>
      `現在のバスト寸法 (${bust}${unit})、背丈 (${backLength}${unit})、および生地伸縮率 (H:${hStretch}% / V:${vStretch}%) が適用されたベクターデータを即座に出力できます。`,
    downloadBtn: "パターンDXFダウンロード (.dxf)",
    layerBtn: "CADレイヤー設定確認",
    footerNote:
      "✨ AutoCAD, Illustrator, その他の工業用パターンCADソフトと完全に互換性を持っています。",
    simDownload: "DXFファイルのエクスポートを実行しました（シミュレーション）",
    simLayer:
      "縫い代付きアウトラインのCADデータをクリップボードにコピーしました",
  },
  en: {
    title: "DXF / CAD I/O Converter (Full DXF Exporter)",
    langLabel: "Language",
    selectedItem: "Selected Item",
    integration: "Laser Cutter & Industrial CAD Integration",
    beginnerBadge: "👤 Standard DXF Export",
    proBadge: "⚡ Pro Layer-Separated CAD Export",
    readyTitle: "Real-time Measurement Linked DXF Data Generation Ready",
    readyDesc: (
      bust: number,
      backLength: number,
      hStretch: number,
      vStretch: number,
      unit: string,
    ) =>
      `Vector data applied with current Bust (${bust}${unit}), Back Length (${backLength}${unit}), and Fabric Stretch (H:${hStretch}% / V:${vStretch}%) can be exported instantly.`,
    downloadBtn: "Pattern DXF Download (.dxf)",
    layerBtn: "Check CAD Layer Settings",
    footerNote:
      "✨ Fully compatible with AutoCAD, Illustrator, and other industrial pattern CAD software.",
    simDownload: "DXF file export executed (Simulation)",
    simLayer: "CAD data with seam allowances copied to clipboard",
  },
  fr: {
    title: "Convertisseur E/S DXF / CAD",
    langLabel: "Langue",
    selectedItem: "Article",
    integration: "Découpe Laser & CAD",
    beginnerBadge: "👤 Standard",
    proBadge: "⚡ Pro",
    readyTitle: "Prêt pour la Génération DXF",
    readyDesc: (
      bust: number,
      backLength: number,
      hStretch: number,
      vStretch: number,
      unit: string,
    ) =>
      `Poitrine: ${bust}${unit}, Dos: ${backLength}${unit}, Extensibilité: H:${hStretch}% / V:${vStretch}%`,
    downloadBtn: "Télécharger DXF (.dxf)",
    layerBtn: "Vérifier Calques",
    footerNote: "✨ Compatible avec AutoCAD et Illustrator.",
    simDownload: "Export DXF exécuté",
    simLayer: "Données CAD copiées",
  },
  zh: {
    title: "DXF / CAD 输入输出转换器 (Full DXF Exporter)",
    langLabel: "语言",
    selectedItem: "选中项目",
    integration: "激光切割机与工业 CAD 集成",
    beginnerBadge: "👤 标准 DXF 导出",
    proBadge: "⚡ 专业图层分离 CAD 导出",
    readyTitle: "实时尺寸联动 DXF 数据生成准备就绪",
    readyDesc: (
      bust: number,
      backLength: number,
      hStretch: number,
      vStretch: number,
      unit: string,
    ) =>
      `已应用当前胸围 (${bust}${unit})、背长 (${backLength}${unit}) 以及面料弹力 (H:${hStretch}% / V:${vStretch}%) 的矢量数据可立即导出。`,
    downloadBtn: "图案 DXF 下载 (.dxf)",
    layerBtn: "检查 CAD 图层设置",
    footerNote: "✨ 与 AutoCAD、Illustrator 及其他工业CAD软件完全兼容。",
    simDownload: "DXF 文件导出已执行（模拟）",
    simLayer: "带有缝份轮廓的 CAD 数据已复制到剪贴板",
  },
};

export default function ExportDXFView() {
  const {
    userMode,
    unitSystem,
    measurements,
    fabricStretch,
    currentLanguage,
    activeCategory,
  } = useUIStore();

  const langKey = (
    translations[currentLanguage as keyof typeof translations]
      ? currentLanguage
      : "ja"
  ) as keyof typeof translations;
  const t = translations[langKey];

  return (
    <div className="flex flex-col h-full bg-gray-50 p-6 overflow-y-auto space-y-6">
      {/* DXF出力 ヘッダーコントロール */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <span>💾</span> {t.title}
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

      {/* メインDXF出力コントロールステージ */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col justify-center items-center space-y-6 text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-blue-100">
          📐
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
            <span>⬇️</span> {t.downloadBtn}
          </button>
          <button
            onClick={() => alert(t.simLayer)}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl border border-gray-300 transition-all"
          >
            {t.layerBtn}
          </button>
        </div>

        <div className="text-[11px] text-gray-400 pt-4 border-t border-gray-100 w-full">
          {t.footerNote}
        </div>
      </div>
    </div>
  );
}
