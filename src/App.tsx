// src/App.tsx
import React from "react";
import { useUIStore } from "./store/useUIStore";
import Canvas2DView from "./components/subviews/Canvas2DView";
import type { UIState, ModuleId } from "./@types/ui";

export function App() {
  const store = useUIStore();
  const activeModule = useUIStore((state: UIState) => state.activeModule);
  const userMode = useUIStore((state: UIState) => state.userMode);
  const unitSystem = useUIStore((state: UIState) => state.unitSystem);
  const locale = useUIStore((state: UIState) => state.locale || "ja");

  // 1. トップナビゲーション（モジュール切替タブ）
  const tabs: { id: ModuleId; label: string }[] = [
    { id: "tabCanvas2D", label: "🎬 Canvas 2D / 自由描画" },
    { id: "mod-viewer-3d", label: "🎥 3D シミュレーション・着せ替え" },
    { id: "mod-nesting", label: "🎞️ 自動ネスティング" },
    { id: "mod-spec-sheet", label: "📜 仕様書・縫製レシピ" },
    { id: "mod-dxf-exporter", label: "📐 DXF 入出力 (CAD)" },
    { id: "mod-pdf-generator", label: "🖨️ PDF 印刷・エクスポート" },
  ];

  // 2. 対応カテゴリ（人間・ドール・ペット・コスプレ・自由）
  const categories = [
    { id: "men_shirt", name: "人間用アパレル", sub: "シャツ・パンツ・原型" },
    {
      id: "doll_dress",
      name: "ドール服 (Doll CAD)",
      sub: "1/6, 1/3スケール対応",
    },
    { id: "pet_wear", name: "ペット服 (Pet CAD)", sub: "小型〜大型犬対応" },
    { id: "cos_form", name: "コスプレ・造形", sub: "サーキュラー・EVA展開図" },
    { id: "free_draw", name: "完全自由描画", sub: "点・ベジエ曲線・直線" },
  ];

  return (
    <div className="w-full h-screen flex flex-col bg-[#0b0f19] text-slate-200 overflow-hidden font-sans select-none">
      {/* ==========================================
          🎬 映画館風ヘッダー ＆ ゴールドアクセント
          ========================================== */}
      <header className="bg-[#111827] border-b border-[#374151] px-6 py-3 flex items-center justify-between shadow-2xl z-20 flex-shrink-0">
        <div className="flex items-center gap-6 overflow-x-auto">
          <div className="flex items-center gap-3">
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-[#0b0f19] font-extrabold text-xs px-2.5 py-1 rounded shadow-md tracking-wider">
              小田原ミシン
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                Odawara Sewing Cinema CAD
              </span>
              <span className="text-[9px] text-slate-400">
                World's #1 Professional Suite
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-1.5 pl-4 border-l border-slate-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => store.setActiveModule(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeModule === tab.id
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-[#0b0f19] font-bold shadow-[0_0_15px_rgba(245,158,11,,0.4)]"
                    : "text-slate-300 hover:bg-[#1f2937] hover:text-amber-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ==========================================
          🎥 メインレイアウト（ダークサイドバー ＋ シアタービューポート）
          ========================================== */}
      <div className="flex-1 flex flex-row overflow-hidden bg-[#0d1322]">
        {/* サイドバーコントロールパネル */}
        <aside className="w-72 min-w-[280px] h-full bg-[#111827] border-r border-[#1f2937] p-5 flex flex-col gap-6 overflow-y-auto flex-shrink-0 shadow-2xl z-10">
          {/* 5か国語言語切替 */}
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-400/80 block mb-2 tracking-widest">
              🌐 Language / 言語設定
            </span>
            <select
              value={locale}
              onChange={(e) => store.setLocale(e.target.value)}
              className="w-full text-xs font-medium border border-slate-700 rounded-md p-2.5 bg-[#1f2937] text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
            >
              <option value="ja">日本語 (Japanese)</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          {/* 初心者 / プロモード切替 */}
          <div className="border-t border-[#1f2937] pt-5">
            <span className="text-[10px] uppercase font-bold text-amber-400/80 block mb-2 tracking-widest">
              ⭐ User Mode / モード切替
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => store.setUserMode("beginner")}
                className={`px-3 py-2 text-xs font-semibold rounded-md border transition-all ${
                  userMode === "beginner"
                    ? "bg-amber-500 text-[#0b0f19] border-amber-400 font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                    : "bg-[#1f2937] text-slate-300 border-slate-700 hover:bg-[#374151]"
                }`}
              >
                初心者 (Beginner)
              </button>
              <button
                onClick={() => store.setUserMode("pro")}
                className={`px-3 py-2 text-xs font-semibold rounded-md border transition-all ${
                  userMode === "pro"
                    ? "bg-amber-500 text-[#0b0f19] border-amber-400 font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                    : "bg-[#1f2937] text-slate-300 border-slate-700 hover:bg-[#374151]"
                }`}
              >
                プロ (Pro)
              </button>
            </div>
          </div>

          {/* 単位系グローバル切り替え (mm / cm / inch) */}
          <div className="border-t border-[#1f2937] pt-5">
            <span className="text-[10px] uppercase font-bold text-amber-400/80 block mb-2 tracking-widest">
              📏 Unit System / 単位系
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {(["mm", "cm", "inch"] as const).map((unit) => (
                <button
                  key={unit}
                  onClick={() => store.setUnitSystem(unit)}
                  className={`py-2 text-xs font-bold rounded-md border transition-all ${
                    unitSystem === unit
                      ? "bg-amber-500 text-[#0b0f19] border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                      : "bg-[#1f2937] text-slate-300 border-slate-700 hover:bg-[#374151]"
                  }`}
                >
                  {unit.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* メインビューポート（シアター風ステージ） */}
        <main className="flex-1 flex flex-col overflow-y-auto p-5 gap-5 bg-[#0b0f19]">
          {/* カテゴリ選択バー */}
          <div className="bg-[#111827] rounded-xl p-3.5 shadow-xl border border-[#1f2937] flex items-center gap-3 overflow-x-auto flex-shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => store.setActiveCategory(cat.id)}
                className={`flex flex-col items-start px-3.5 py-2.5 rounded-lg border text-left transition-all min-w-[160px] ${
                  store.activeCategory === cat.id
                    ? "border-amber-500 bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                    : "border-[#1f2937] bg-[#1f2937]/50 hover:border-slate-600"
                }`}
              >
                <span
                  className={`text-xs font-bold ${store.activeCategory === cat.id ? "text-amber-400" : "text-slate-200"}`}
                >
                  {cat.name}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {cat.sub}
                </span>
              </button>
            ))}
          </div>

          {/* 中央シネマティックキャンバスエリア */}
          <div className="flex-1 bg-[#111827] rounded-2xl shadow-2xl border border-[#1f2937] overflow-hidden flex flex-col min-h-[500px]">
            <div className="px-5 py-3 border-b border-[#1f2937] bg-[#161e2e] flex items-center justify-between text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                Theater Viewport :{" "}
                <strong className="text-amber-400">{activeModule}</strong>
              </span>
              <span className="text-[10px] bg-[#1f2937] text-amber-300/90 px-2.5 py-1 rounded-md border border-slate-700">
                Active Category: {store.activeCategory}
              </span>
            </div>

            <div className="flex-1 relative flex items-center justify-center p-6 bg-gradient-to-b from-[#111827] to-[#0b0f19]">
              {activeModule === "tabCanvas2D" ? (
                <Canvas2DView />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 gap-3 p-8 text-center">
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg">
                    シネマティック・モジュール：{activeModule}
                  </span>
                  <p className="text-xs text-slate-400 max-w-md">
                    小田原ミシンのゴールドの世界観を反映した専用ステージです。機能の神経回路と完全に同期しています。
                  </p>
                  <button
                    onClick={() => store.setActiveModule("tabCanvas2D")}
                    className="mt-3 text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-[#0b0f19] font-bold px-5 py-2.5 rounded-lg hover:from-amber-400 hover:to-amber-500 shadow-lg transition-all"
                  >
                    Canvas 2D シアターに戻る
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
