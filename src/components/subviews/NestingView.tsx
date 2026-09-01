import { useState, useMemo } from "react";
import { useUIStore } from "../../store/useUIStore";

const translations = {
  ja: {
    title: "自動用尺・効率ネスティング (Automated Nesting & Layout)",
    langLabel: "言語",
    selectedItem: "選択アイテム",
    statusReady: "パーツ配置最適化アルゴリズム：スタンバイ完了",
    efficiencyLabel: "想定用尺効率 (Fabric Utilization):",
    fabricWidthLabel: "生地幅設定 (Fabric Width)",
    marginLabel: "縫い代・マージン (Seam Allowance)",
    btnOptimize: "⚡ 自動ネスティング最適化を実行",
    btnExport: "📥 配置済みCADレイアウト出力 (.dxf / .pdf)",
    note: "✨ 生地幅と用尺ロスを最小限に抑えるよう、自動でパーツを最適配置します。",
    simOptimize:
      "自動ネスティングの最適化計算を実行しました（シミュレーション）",
    simExport: "レイアウトデータをエクスポートしました（シミュレーション）",
  },
  en: {
    title: "Automated Nesting & Layout",
    langLabel: "Language",
    selectedItem: "Selected Item",
    statusReady: "Part Placement Optimization Algorithm: Ready",
    efficiencyLabel: "Estimated Fabric Utilization:",
    fabricWidthLabel: "Fabric Width",
    marginLabel: "Seam Allowance & Margin",
    btnOptimize: "⚡ Run Auto-Nesting Optimization",
    btnExport: "📥 Export Placed Layout (.dxf / .pdf)",
    note: "✨ Automatically optimizes part placement to minimize fabric width and waste.",
    simOptimize: "Executed auto-nesting optimization calculation (Simulation)",
    simExport: "Exported layout data (Simulation)",
  },
  fr: {
    title: "Nécessaire & Placement Automatique",
    langLabel: "Langue",
    selectedItem: "Article",
    statusReady: "Algorithme d'optimisation de placement : Prêt",
    efficiencyLabel: "Efficacité estimée du tissu :",
    fabricWidthLabel: "Laize du tissu",
    marginLabel: "Marge de couture",
    btnOptimize: "⚡ Exécuter l'optimisation automatique",
    btnExport: "📥 Exporter la disposition (.dxf / .pdf)",
    note: "✨ Optimise automatiquement le placement pour réduire les chutes.",
    simOptimize: "Calcul d'optimisation de placement exécuté (Simulation)",
    simExport: "Données de disposition exportées (Simulation)",
  },
  zh: {
    title: "自动排料与优化排版 (Automated Nesting & Layout)",
    langLabel: "语言",
    selectedItem: "选中项目",
    statusReady: "零件放置优化算法：就绪",
    efficiencyLabel: "预计面料利用率：",
    fabricWidthLabel: "面料幅宽设置",
    marginLabel: "缝份与间距",
    btnOptimize: "⚡ 运行自动排料优化",
    btnExport: "📥 导出排版布局 (.dxf / .pdf)",
    note: "✨ 自动优化部件排版，最大限度减少面料损耗与幅宽浪费。",
    simOptimize: "已执行自动排料优化计算（模拟）",
    simExport: "已导出排版布局数据（模拟）",
  },
} as const;

type LangKey = keyof typeof translations;

export default function NestingView() {
  const {
    currentLanguage,
    activeCategory,
    measurements,
    fabricStretch,
    unitSystem,
  } = useUIStore();

  const [fabricWidth, setFabricWidth] = useState<number>(110); // cm
  const [seamAllowance, setSeamAllowance] = useState<number>(1.5); // cm
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  const langKey: LangKey = (
    currentLanguage in translations ? currentLanguage : "ja"
  ) as LangKey;
  const t = translations[langKey];

  // 用尺効率の動的計算ロジック
  const calculatedEfficiency = useMemo(() => {
    const base = 85;
    const stretchBonus =
      (fabricStretch.hStretch + fabricStretch.vStretch) * 0.05;
    const sizeFactor = measurements.bust * 0.02;
    const total = Math.min(96, Math.max(72, base + stretchBonus - sizeFactor));
    return total.toFixed(1);
  }, [fabricStretch, measurements]);

  const handleRunOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      alert(t.simOptimize);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 p-6 overflow-y-auto space-y-6">
      {/* ヘッダーコントロール */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <span>📐</span> {t.title}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {t.langLabel}:{" "}
            <strong className="uppercase text-amber-700">
              {currentLanguage}
            </strong>{" "}
            | {t.selectedItem}:{" "}
            <strong className="text-blue-700">{activeCategory}</strong>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 bg-blue-50 text-blue-800 font-semibold rounded-full border border-blue-200 uppercase">
            {unitSystem}
          </span>
        </div>
      </div>

      {/* メインレイアウトシミュレーターステージ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左側：パラメータ制御パネル */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
          <h3 className="text-sm font-bold text-gray-800 border-b pb-2">
            ⚙️ プレースメント設定
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-600 block mb-1">
                {t.fabricWidthLabel} ({unitSystem})
              </label>
              <input
                type="number"
                value={fabricWidth}
                onChange={(e) => setFabricWidth(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">
                {t.marginLabel} ({unitSystem})
              </label>
              <input
                type="number"
                step="0.1"
                value={seamAllowance}
                onChange={(e) => setSeamAllowance(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="text-xs text-gray-500 mb-1">
              {t.efficiencyLabel}
            </div>
            <div className="text-2xl font-black text-emerald-600">
              {calculatedEfficiency}%
            </div>
          </div>
        </div>

        {/* 右側：キャンバスプレビューとアクション */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col justify-between items-center space-y-6 text-center">
          <div className="w-full flex-1 min-h-[220px] bg-slate-900 text-slate-300 rounded-xl flex flex-col items-center justify-center p-4 relative overflow-hidden shadow-inner border border-slate-800">
            <div className="absolute top-3 left-3 text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400">
              {t.statusReady}
            </div>
            <div className="text-4xl mb-2">🧵</div>
            <div className="text-xs text-slate-400">
              Active Category:{" "}
              <span className="text-amber-400 font-bold">{activeCategory}</span>{" "}
              (Width: {fabricWidth}
              {unitSystem})
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 w-full pt-2">
            <button
              onClick={handleRunOptimization}
              disabled={isOptimizing}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isOptimizing ? "計算中..." : t.btnOptimize}
            </button>
            <button
              onClick={() => alert(t.simExport)}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl border border-gray-300 transition-all"
            >
              {t.btnExport}
            </button>
          </div>

          <div className="text-[11px] text-gray-400 pt-3 border-t border-gray-100 w-full text-left">
            {t.note}
          </div>
        </div>
      </div>
    </div>
  );
}
