// src/components/subviews/Simulation3DView.tsx
import React from "react";
import { useUIStore } from "../../store/useUIStore";

export const Simulation3DView: React.FC = () => {
  const activeCategory = useUIStore((state) => state.activeCategory);
const fabric = useUIStore((state) => state.fabric);
// 横方向または縦方向の伸縮率を利用する場合
const fabricStretch = fabric.stretchH;
  const locale = useUIStore((state) => state.locale);

  // 安全にストレッチ値を取り出すためのデフォルト値フォールバック
const hStretch = fabric.stretchH;
const vStretch = fabric.stretchV;
  // 言語ごとのテキスト定義
  const labels = {
    ja: {
      tag: "SUBVIEW: 3D CLOTH SIMULATION & FITTING",
      title: "3D シミュレーション・着せ替えビュー",
      physics: "物性反映：",
      cardTitle: "Three.js / React 3D フィッティング空間",
      cardDesc:
        "設定された生地の2軸ストレッチ物性と採寸データを元に、立体マネキン上でのドレーピングと着用シミュレーションを高精度にレンダリングします。",
      startBtn: "3Dドレーピング開始",
      resetBtn: "視点リセット",
    },
    en: {
      tag: "SUBVIEW: 3D CLOTH SIMULATION & FITTING",
      title: "3D Cloth Simulation & Virtual Fitting",
      physics: "Fabric Stretch:",
      cardTitle: "Three.js / React 3D Fitting Space",
      cardDesc:
        "High-precision rendering of draping and virtual wear simulation on a 3D mannequin based on dual-axis stretch properties and measurement data.",
      startBtn: "Start 3D Draping",
      resetBtn: "Reset View",
    },
    fr: {
      tag: "SOUS-MODULE : SIMULATION 3D & ESSAYAGE",
      title: "Simulation 3D & Vue d'essayage virtuel",
      physics: "Élasticité :",
      cardTitle: "Espace d'essayage 3D Three.js / React",
      cardDesc:
        "Rendu haute précision du drapé et de la simulation de vêtement sur mannequin 3D basé sur l'élasticité biaxiale et les mesures.",
      startBtn: "Lancer le drapé 3D",
      resetBtn: "Réinitialiser la vue",
    },
    es: {
      tag: "SUBVISTA: SIMULACIÓN 3D Y AJUSTE DE PRENDAS",
      title: "Simulación 3D y Vista de Prueba Virtual",
      physics: "Elasticidad:",
      cardTitle: "Espacio de Ajuste 3D Three.js / React",
      cardDesc:
        "Renderizado de alta precisión del drapeado y simulación de uso en maniquí 3D basado en propiedades de estiramiento biaxial y medidas.",
      startBtn: "Iniciar drapeado 3D",
      resetBtn: "Restablecer vista",
    },
    zh: {
      tag: "子视图: 3D 布料模拟与虚拟试衣",
      title: "3D 模拟与试衣视图",
      physics: "面料弹力：",
      cardTitle: "Three.js / React 3D 试衣空间",
      cardDesc:
        "基于设定的双向面料弹力物性与尺寸数据，高精度渲染立体人台上的随形褶皱与穿着模拟。",
      startBtn: "开始 3D 造型",
      resetBtn: "重置视角",
    },
    ko: {
      tag: "하위뷰: 3D 천 시뮬레이션 및 피팅",
      title: "3D 시뮬레이션·가상 착용 뷰",
      physics: "물성 반영:",
      cardTitle: "Three.js / React 3D 피팅 공간",
      cardDesc:
        "설정된 원단의 2축 스트레치 물성과 치수 데이터를 바탕으로 입체 마네킹 위에서의 드레이핑과 착용 시뮬레이션을 고정밀로 렌더링합니다.",
      startBtn: "3D 드레이핑 시작",
      resetBtn: "시점 초기화",
    },
  };

  const tText = labels[locale as keyof typeof labels] || labels.en;

  return (
    <div className="bg-[#111827] rounded-xl p-6 shadow-2xl border border-[#1f2937] flex flex-col gap-6 text-slate-200 min-h-[500px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#1f2937] pb-4 gap-2">
        <div>
          <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1 rounded uppercase tracking-wider">
            {tText.tag}
          </span>
          <h2 className="text-base font-bold text-slate-100 mt-1.5 flex items-center gap-2">
            <span>🌐 {tText.title}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#1f2937] text-indigo-400 border border-slate-700">
              Target: {activeCategory}
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">{tText.physics}</span>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded font-semibold">
            {locale === "en"
              ? `H: ${hStretch}% / V: ${vStretch}%`
              : `横 ${hStretch}% / 縦 ${vStretch}%`}
          </span>
        </div>
      </div>

      {/* 3Dレンダリングプレビューエリア */}
      <div className="relative flex-1 bg-[#0b0f19] rounded-xl border border-[#1f2937] flex items-center justify-center overflow-hidden p-8 shadow-inner min-h-[350px]">
        {/* 3D空間風の立体グリッド */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1f293730_0,transparent_70%)]" />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl shadow-[0_0_20px_rgba(99,102,241,0.15)] animate-pulse">
            🪐
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-200">
              {tText.cardTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-1">{tText.cardDesc}</p>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => alert("3D Draping Started")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-indigo-600/20"
            >
              {tText.startBtn}
            </button>
            <button
              onClick={() => alert("View Reset")}
              className="px-4 py-2 bg-[#1f2937] hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-all border border-slate-700"
            >
              {tText.resetBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation3DView;
