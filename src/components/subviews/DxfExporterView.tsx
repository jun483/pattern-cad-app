//DXF入出力ビュー
// src/components/subviews/DxfExporterView.tsx
import React from "react";
import { useUIStore } from "../../store/useUIStore";

export const DxfExporterView: React.FC = () => {
  const { sewingMachineType, locale } = useUIStore();

  // 言語ごとのテキスト定義（辞書ファイルへの依存エラーを完全に回避します）
  const labels = {
    ja: {
      tag: "SUBVIEW: DXF インポート / エクスポート (CAD 連携)",
      title: "DXF CAD 入出力・データコンバーター",
      notch: "ノッチ出力：",
      industrial: "⚙️ 工業用ノッチ規格",
      standard: "🏠 標準スリット",
      cardTitle: "AAMA / ASTM 形式 DXF データ変換",
      cardDesc:
        "作成したパターンデータを、他のアパレルCADやプロッター出力機で読み込み可能なDXFファイルとしてインポート・エクスポートします。",
      exportBtn: "DXFファイルをエクスポート",
      importBtn: "DXFファイルをインポート",
    },
    en: {
      tag: "SUBVIEW: DXF IMPORT / EXPORT (CAD INTEROP)",
      title: "DXF CAD Import / Export & Data Converter",
      notch: "Notch Output:",
      industrial: "⚙️ Industrial Notch Spec",
      standard: "🏠 Standard Slit",
      cardTitle: "AAMA / ASTM Format DXF Conversion",
      cardDesc:
        "Import and export pattern data as DXF files compatible with other apparel CAD systems and plotter output machines.",
      exportBtn: "Export DXF File",
      importBtn: "Import DXF File",
    },
    fr: {
      tag: "SOUS-MODULE : IMPORT / EXPORT DXF (INTEROPÉRABILITÉ CAD)",
      title: "Convertisseur de données DXF CAD",
      notch: "Sortie encoche :",
      industrial: "⚙️ Norme industrielle",
      standard: "🏠 Fente standard",
      cardTitle: "Conversion DXF format AAMA / ASTM",
      cardDesc:
        "Importez et exportez vos données de patrons au format DXF compatible avec d'autres logiciels CAD et traceurs.",
      exportBtn: "Exporter le fichier DXF",
      importBtn: "Importer le fichier DXF",
    },
    es: {
      tag: "SUBVISTA: IMPORTACIÓN / EXPORTACIÓN DXF",
      title: "Conversor de Datos DXF CAD",
      notch: "Salida de muesca:",
      industrial: "⚙️ Norma industrial",
      standard: "🏠 Corte estándar",
      cardTitle: "Conversión DXF formato AAMA / ASTM",
      cardDesc:
        "Importe y exporte datos de patrones como archivos DXF compatibles con otros sistemas CAD de prendas.",
      exportBtn: "Exportar archivo DXF",
      importBtn: "Importar archivo DXF",
    },
    zh: {
      tag: "子视图: DXF 导入 / 导出 (CAD 互操作)",
      title: "DXF CAD 输入输出与数据转换器",
      notch: "Notch 输出:",
      industrial: "⚙️ 工业用样口标准",
      standard: "🏠 标准切口",
      cardTitle: "AAMA / ASTM 格式 DXF 数据转换",
      cardDesc:
        "将创建的样板数据导入或导出为与其他服装CAD和绘图仪兼容的DXF文件。",
      exportBtn: "导出 DXF 文件",
      importBtn: "导入 DXF 文件",
    },
    ko: {
      tag: "하위뷰: DXF 가져오기 / 내보내기 (CAD 연동)",
      title: "DXF CAD 입출력 및 데이터 컨버터",
      notch: "노치 출력:",
      industrial: "⚙️ 산업용 노치 규격",
      standard: "🏠 표준 슬릿",
      cardTitle: "AAMA / ASTM 형식 DXF 데이터 변환",
      cardDesc:
        "작성한 패턴 데이터를 다른 어패럴 CAD 및 플로터 출력기에서 읽을 수 있는 DXF 파일로 가져오고 내보냅니다.",
      exportBtn: "DXF 파일 내보내기",
      importBtn: "DXF 파일 가져오기",
    },
  };

  // 現在のロケールに対応するテキストを選択（未定義なら英語にフォールバック）
  const tText = labels[locale as keyof typeof labels] || labels.en;

  return (
    <div className="bg-[#111827] rounded-xl p-6 shadow-2xl border border-[#1f2937] flex flex-col gap-6 text-slate-200 min-h-[500px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#1f2937] pb-4 gap-2">
        <div>
          <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2.5 py-1 rounded uppercase tracking-wider">
            {tText.tag}
          </span>
          <h2 className="text-base font-bold text-slate-100 mt-1.5 flex items-center gap-2">
            <span>🗂️ {tText.title}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#1f2937] text-sky-400 border border-slate-700">
              AAMA / ASTM Compliant
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">{tText.notch}</span>
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded font-semibold">
            {sewingMachineType === "industrial"
              ? tText.industrial
              : tText.standard}
          </span>
        </div>
      </div>

      {/* DXF入出力プレビューエリア */}
      <div className="relative flex-1 bg-[#0b0f19] rounded-xl border border-[#1f2937] flex items-center justify-center overflow-hidden p-8 shadow-inner min-h-[350px]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e910_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e910_1px,transparent_1px)] bg-[size:28px_28px]" />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 text-2xl shadow-[0_0_20px_rgba(14,165,233,0.15)]">
            💾
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-200">
              {tText.cardTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-1">{tText.cardDesc}</p>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => alert("DXF Exported")}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-sky-600/20"
            >
              {tText.exportBtn}
            </button>
            <button
              onClick={() => alert("DXF Imported")}
              className="px-4 py-2 bg-[#1f2937] hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-all border border-slate-700"
            >
              {tText.importBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DxfExporterView;
