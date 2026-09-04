// src/App.tsx
import { useState } from "react";
import { useUIStore } from "./store/useUIStore";

// ミシン仕様連動フックのインポート
import { useMachineIntegration } from "./hooks/useMachineIntegration";

// ヘッダーコンポーネントのインポート
import { HeaderControls } from "./components/HeaderControls";

// 各種パネルのインポート
import { MeasurementPanel } from "./components/panels/MeasurementPanel";
import { FabricStretchPanel } from "./components/panels/FabricStretchPanel";
import { SewingModePanel } from "./components/panels/SewingModePanel";

// 各種サブビューのインポート
import { Canvas2DView } from "./components/subviews/Canvas2DView";
import { Simulation3DView } from "./components/subviews/Simulation3DView";
import { NestingView } from "./components/subviews/NestingView";
import { SpecSheetView } from "./components/subviews/SpecSheetView";
import { DxfExporterView } from "./components/subviews/DxfExporterView";
import { PdfGeneratorView } from "./components/subviews/PdfGeneratorView";

export function App() {
  // ミシン切り替え（家庭用・工業用）の自動連動を完全有効化
  useMachineIntegration();

  const locale = useUIStore((state) => state.locale) || "ja";
  const activeCategory = useUIStore((state) => state.activeCategory);
  const setActiveCategory = useUIStore((state) => state.setActiveCategory);

  // アクティブなタブの状態管理
  const [activeTab, setActiveTab] = useState<string>("canvas2d");

  // 言語ごとのカテゴリ名リスト（全言語完全対応）
  const categoryLabels: Record<string, Record<string, string>> = {
    human: {
      ja: "人間用",
      en: "Human",
      fr: "Humain",
      es: "Humano",
      zh: "人类",
      ko: "인간용",
    },
    doll: {
      ja: "ドール",
      en: "Doll",
      fr: "Poupée",
      es: "Muñeca",
      zh: "娃娃",
      ko: "인형",
    },
    pet: {
      ja: "ペット",
      en: "Pet",
      fr: "Animal",
      es: "Mascota",
      zh: "宠物",
      ko: "반려동물",
    },
    cosplay: {
      ja: "コスプレ",
      en: "Cosplay",
      fr: "Cosplay",
      es: "Cosplay",
      zh: "角色扮演",
      ko: "코스프레",
    },
  };

  // 言語ごとのタブ名リスト（全言語完全対応）
  const tabLabels: Record<string, Record<string, string>> = {
    canvas2d: {
      ja: "Canvas 2D",
      en: "Canvas 2D",
      fr: "Canvas 2D",
      es: "Canvas 2D",
      zh: "二维画布",
      ko: "2D 캔버스",
    },
    simulation3d: {
      ja: "3D 着せ替え",
      en: "3D Simulation",
      fr: "Simulation 3D",
      es: "Simulación 3D",
      zh: "3D 试衣",
      ko: "3D 피팅",
    },
    nesting: {
      ja: "自動ネスティング",
      en: "Auto Nesting",
      fr: "Imbrication auto",
      es: "Anidamiento",
      zh: "自动排料",
      ko: "자동 네스팅",
    },
    specsheet: {
      ja: "仕様書レシピ",
      en: "Spec Sheet",
      fr: "Fiche technique",
      es: "Hoja de especificaciones",
      zh: "规格说明书",
      ko: "사양서 레시피",
    },
    dxf: {
      ja: "DXF CAD入出力",
      en: "DXF CAD I/O",
      fr: "E/S DXF CAD",
      es: "E/S DXF CAD",
      zh: "DXF CAD 输入输出",
      ko: "DXF CAD 입출력",
    },
    pdf: {
      ja: "PDF 実物大印刷",
      en: "PDF Print",
      fr: "Impression PDF",
      es: "Impresión PDF",
      zh: "PDF 实物打印",
      ko: "PDF 실물 인쇄",
    },
  };

  // パラメータコントロールのタイトル
  const parameterControlsTitle =
    {
      ja: "パラメータコントロール",
      en: "Parameter Controls",
      fr: "Contrôles des paramètres",
      es: "Controles de parámetros",
      zh: "参数控制",
      ko: "매개변수 제어",
    }[locale] || "Parameter Controls";

  return (
    <div className="w-screen h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-[#0b0f19] overflow-hidden m-0 p-0 box-border">
      {/* ================= ヘッダーコントロール ================= */}
      <HeaderControls />

      {/* ================= メインコンテンツエリア ================= */}
      <main className="flex-1 flex flex-row w-full h-[calc(100vh-4rem-2rem)] overflow-hidden p-3 gap-3">
        {/* 左側：サイドバー */}
        <aside className="w-[380px] flex-shrink-0 h-full overflow-y-auto bg-[#111827]/90 backdrop-blur rounded-2xl p-4 border border-[#1f2937] shadow-xl flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[#1f2937] pb-3 px-1 sticky top-0 bg-[#111827]/95 z-10">
            <h2 className="text-xs font-black text-amber-400 uppercase tracking-widest">
              ⚙️ {parameterControlsTitle}
            </h2>
            <div className="flex items-center gap-2">
              {/* カテゴリー切替セレクトボックス */}
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="bg-[#161e2e] text-slate-200 text-[11px] px-2 py-1 rounded-md border border-[#1f2937] outline-none cursor-pointer focus:border-amber-500"
              >
                <option value="human">
                  👗 {categoryLabels.human[locale] || categoryLabels.human.en}
                </option>
                <option value="doll">
                  🧸 {categoryLabels.doll[locale] || categoryLabels.doll.en}
                </option>
                <option value="pet">
                  🐾 {categoryLabels.pet[locale] || categoryLabels.pet.en}
                </option>
                <option value="cosplay">
                  ✨{" "}
                  {categoryLabels.cosplay[locale] || categoryLabels.cosplay.en}
                </option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <MeasurementPanel />
            <FabricStretchPanel />
            <SewingModePanel />
          </div>
        </aside>

        {/* 右側：メイン作業エリア */}
        <section className="flex-1 flex flex-col h-full min-w-0 gap-2 overflow-hidden">
          {/* タブ切り替えバー */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#1f2937] bg-[#111827]/60 p-2 rounded-xl shadow-md flex-shrink-0">
            {[
              { id: "canvas2d", icon: "📐" },
              { id: "simulation3d", icon: "🌐" },
              { id: "nesting", icon: "📦" },
              { id: "specsheet", icon: "📜" },
              { id: "dxf", icon: "🗂️" },
              { id: "pdf", icon: "🖨️" },
            ].map((tab) => {
              const labelText =
                tabLabels[tab.id]?.[locale] || tabLabels[tab.id]?.en || tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
                    activeTab === tab.id
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                      : "bg-[#111827] text-slate-400 border-[#1f2937] hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  {tab.icon} {labelText}
                </button>
              );
            })}
          </div>

          {/* ビュー表示コンテナ */}
          <div className="flex-1 w-full h-full bg-[#111827]/40 border border-[#1f2937] rounded-2xl p-3 shadow-inner overflow-hidden flex flex-col relative">
            <div className="absolute inset-3 overflow-auto">
              {activeTab === "canvas2d" && <Canvas2DView />}
              {activeTab === "simulation3d" && <Simulation3DView />}
              {activeTab === "nesting" && <NestingView />}
              {activeTab === "specsheet" && <SpecSheetView />}
              {activeTab === "dxf" && <DxfExporterView />}
              {activeTab === "pdf" && <PdfGeneratorView />}
            </div>
          </div>
        </section>
      </main>

      {/* ================= フッター ================= */}
      <footer className="h-8 bg-[#111827] border-t border-[#1f2937] px-6 flex items-center justify-between text-[10px] text-slate-500 flex-shrink-0">
        <div>
          © 2026 小田原ミシン (Odawara Sewing Machine Store) - All Rights
          Reserved.
        </div>
        <div className="flex items-center gap-4">
          <span>GitHub: jun483/pattern-cad-app</span>
          <span className="text-amber-400 font-semibold">
            Cinematic Dark Mode Active
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
