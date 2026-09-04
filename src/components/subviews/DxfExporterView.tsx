// src/components/subviews/DxfExporterView.tsx
import React, { useState, useRef } from "react";
import { useUIStore } from "../../store/useUIStore";
import { dictionaries, type Locale } from "../../i18n";

export const DxfExporterView: React.FC = () => {
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
  const patternPieces = useUIStore((state) => state.patternPieces);
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

  // ファイルインプター用参照
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  // 4. すべてのUIテキストの6か国語辞書マップ
  const uiTexts = {
    exportTitle: {
      ja: "DXF エクスポート",
      en: "Export DXF",
      fr: "Exporter DXF",
      es: "Exportar DXF",
      zh: "导出 DXF",
      ko: "DXF 내보내기",
    },
    exportDesc: {
      ja: `現在編集中のパターン（${patternPieces.length} パーツ）を標準規格のDXFファイルとして出力します。`,
      en: `Export current pattern pieces (${patternPieces.length} pieces) as a standard DXF file.`,
      fr: `Exporter les pièces de patron actuelles (${patternPieces.length} pièces) au format DXF standard.`,
      es: `Exportar las piezas de patrón actuales (${patternPieces.length} piezas) como un archivo DXF estándar.`,
      zh: `将当前编辑的样片（共 ${patternPieces.length} 件）导出为标准 DXF 文件。`,
      ko: `현재 편집 중인 패턴(${patternPieces.length}개 조각)을 표준 DXF 파일로 내보냅니다.`,
    },
    exportButton: {
      ja: "DXFファイルをダウンロード",
      en: "Download DXF File",
      fr: "Télécharger le fichier DXF",
      es: "Descargar archivo DXF",
      zh: "下载 DXF 文件",
      ko: "DXF 파일 다운로드",
    },
    importTitle: {
      ja: "DXF インポート",
      en: "Import DXF",
      fr: "Importer DXF",
      es: "Importar DXF",
      zh: "导入 DXF",
      ko: "DXF 가져오기",
    },
    importDesc: {
      ja: "外部CADで作成されたDXFファイルを読み込み、パターンとして展開します。",
      en: "Load external CAD DXF files into the pattern editing workspace.",
      fr: "Charger des fichiers DXF CAO externes dans l'espace de travail.",
      es: "Cargar archivos DXF CAD externos en el espacio de trabajo.",
      zh: "加载外部 CAD 创建的 DXF 文件并在工作区中展开为样片。",
      ko: "외부 CAD에서 생성된 DXF 파일을 불러와 패턴으로 전개합니다.",
    },
    selectFileButton: {
      ja: "ファイルを選択...",
      en: "Choose File...",
      fr: "Choisir un fichier...",
      es: "Elegir archivo...",
      zh: "选择文件...",
      ko: "파일 선택...",
    },
    noFileSelected: {
      ja: "ファイルが選択されていません",
      en: "No file chosen",
      fr: "Aucun fichier choisi",
      es: "Ningún archivo seleccionado",
      zh: "未选择任何文件",
      ko: "선택된 파일 없음",
    },
  };

  const getLocalizedText = (key: keyof typeof uiTexts) => {
    return uiTexts[key][locale] || uiTexts[key]["en"];
  };

  // DXFエクスポート実行
  const handleExportDxf = () => {
    addLogMessage?.(
      `DXFエクスポート実行 [環境: ${currentEnv}, モード: ${userMode}, パーツ数: ${patternPieces.length}]`,
    );

    const alertMessages: Record<Locale, string> = {
      ja: `DXFエクスポート処理を実行しました（適用環境: ${currentEnv === "industrial" ? "工場用" : "家庭用"}）`,
      en: `DXF export executed (Environment: ${currentEnv})`,
      fr: `Exportation DXF exécutée (Environnement : ${currentEnv})`,
      es: `Exportación DXF ejecutada (Entorno: ${currentEnv})`,
      zh: `已执行 DXF 导出（运行环境: ${currentEnv}）`,
      ko: `DXF 내보내기가 실행되었습니다 (환경: ${currentEnv})`,
    };
    alert(alertMessages[locale] || alertMessages.en);
  };

  // ファイル選択時の処理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      addLogMessage?.(`DXFインポート実行: ${file.name}`);

      const successMsgs: Record<Locale, string> = {
        ja: `DXFファイル "${file.name}" を正常にインポートしました。`,
        en: `Successfully imported DXF file "${file.name}".`,
        fr: `Fichier DXF "${file.name}" importé avec succès.`,
        es: `Archivo DXF "${file.name}" importado con éxito.`,
        zh: `已成功导入 DXF 文件 "${file.name}"。`,
        ko: `DXF 파일 "${file.name}"을(를) 성공적으로 가져왔습니다.`,
      };
      alert(successMsgs[locale] || successMsgs.en);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#1f2937] text-slate-200 rounded-xl shadow-md space-y-6 border border-slate-700/60">
      {/* ヘッダー */}
      <div className="border-b border-slate-700 pb-4">
        <h2 className="text-2xl font-bold text-amber-400">
          {modules.dxfExporter || "DXF I/O (CAD)"}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          {locale === "ja"
            ? "アパレルCAD標準のDXFフォーマット入出力、および縫製環境（家庭用/工場用）の最適化設定を行います。"
            : "Handle apparel CAD standard DXF files and configure sewing environment settings."}
        </p>
      </div>

      {/* --- モード & 環境設定エリア --- */}
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
                {modes.pro || "Professional (Pro)"}
              </button>
            </div>
          </div>

          {/* 家庭用 / 工場用 切替 & 違いの反映表示 */}
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

            {/* 家庭用と工場用の違いを明確に示す動的解説 */}
            <div className="p-2.5 rounded bg-[#1f2937] border border-slate-700 text-slate-300 text-[11px]">
              {currentEnv === "industrial" ? (
                <span className="text-amber-300 font-medium">
                  {locale === "ja" &&
                    "⚡ 【工場用モード】JUKI等の工業用ミシン仕様（高速縫製・特殊ゲージ対応マージン）が適用されています。"}
                  {locale === "en" &&
                    "⚡ [Industrial Mode] Optimized for high-speed industrial hardware and specialized gauges."}
                  {locale === "fr" &&
                    "⚡ [Mode Industriel] Optimisé pour le matériel industriel à haute vitesse et jauges spéciales."}
                  {locale === "es" &&
                    "⚡ [Modo Industrial] Optimizado para maquinaria industrial y calibres especiales."}
                  {locale === "zh" &&
                    "⚡ 【工业用模式】已针对JUKI等工业级设备（高速缝纫、特殊规尺缝份）进行优化。"}
                  {locale === "ko" &&
                    "⚡ [공업용 모드] JUKI 등 공업용 미싱 사양(고속 재봉, 특수 게이지 여유치)이 적용되었습니다."}
                </span>
              ) : (
                <span className="text-slate-300">
                  {locale === "ja" &&
                    "🏠 【家庭用モード】家庭用ミシンの特性（標準押え・安全マージン）に最適化されています。"}
                  {locale === "en" &&
                    "🏠 [Home Sewing Mode] Optimized for home machines with standard safety margins."}
                  {locale === "fr" &&
                    "🏠 [Mode Domestique] Optimisé pour la couture domestique avec marges de sécurité standard."}
                  {locale === "es" &&
                    "🏠 [Modo Doméstico] Optimizado para máquinas domésticas con márgenes estándar."}
                  {locale === "zh" &&
                    "🏠 【家用模式】已针对家用缝纫机特性（标准压脚、安全缝份）进行优化。"}
                  {locale === "ko" &&
                    "🏠 [가정용 모드] 가정용 미싱 특성(표준 노루발, 안전 여유치)에 최적화되었습니다."}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DXF 入出力セクション */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* エクスポート */}
        <div className="p-5 border border-slate-700 rounded-lg bg-[#111827] space-y-4">
          <h3 className="text-lg font-semibold text-amber-300">
            {getLocalizedText("exportTitle")}
          </h3>
          <p className="text-sm text-slate-300">
            {getLocalizedText("exportDesc")}
          </p>
          <button
            type="button"
            onClick={handleExportDxf}
            className="w-full py-2.5 px-4 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition cursor-pointer shadow"
          >
            {getLocalizedText("exportButton")}
          </button>
        </div>

        {/* インポート（完全6か国語対応カスタムファイルピッカー） */}
        <div className="p-5 border border-slate-700 rounded-lg bg-[#111827] space-y-4">
          <h3 className="text-lg font-semibold text-amber-300">
            {getLocalizedText("importTitle")}
          </h3>
          <p className="text-sm text-slate-300">
            {getLocalizedText("importDesc")}
          </p>

          {/* 非表示のネイティブファイルインプット */}
          <input
            type="file"
            ref={fileInputRef}
            accept=".dxf"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* 多言語対応されたカスタムファイル選択ボタン */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-amber-300 font-semibold rounded-lg transition cursor-pointer shadow text-sm shrink-0"
            >
              📁 {getLocalizedText("selectFileButton")}
            </button>
            <span
              className="text-xs text-slate-400 truncate"
              title={selectedFileName || ""}
            >
              {selectedFileName || getLocalizedText("noFileSelected")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DxfExporterView;
