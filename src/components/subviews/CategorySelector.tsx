// src/components/subviews/CategorySelector.tsx
import { useState } from "react";

export type PatternCategory = "human" | "doll" | "pet" | "cosplay" | "free";
export type HumanSubCategory = "womens" | "mens" | "kids";

interface CategoryOption {
  id: PatternCategory;
  label: string;
  description: string;
  icon: string;
}

const CATEGORIES: CategoryOption[] = [
  {
    id: "human",
    label: "人間の服",
    description: "婦人服・紳士服・子供服・原型",
    icon: "👔",
  },
  {
    id: "doll",
    label: "ドール服 (Doll CAD)",
    description: "1/1, 1/3, 1/4, 1/6 縮尺対応",
    icon: "🧸",
  },
  {
    id: "pet",
    label: "ペット服 (Pet CAD)",
    description: "小型犬〜大型犬の体型特性",
    icon: "🐕",
  },
  {
    id: "cosplay",
    label: "コスプレ & 造形",
    description: "サーキュラー・EVAフォーム展開図",
    icon: "✨",
  },
  {
    id: "free",
    label: "フリー描画",
    description: "点・ベジエ・直線で完全自由作図",
    icon: "✏️",
  },
];

export default function CategorySelector() {
  const [selectedCategory, setSelectedCategory] =
    useState<PatternCategory>("human");
  const [humanSub, setHumanSub] = useState<HumanSubCategory>("womens");

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <span>📂</span> 作図対象カテゴリの選択
        </h3>
        <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
          {selectedCategory === "human"
            ? `人間の服 (${humanSub === "womens" ? "レディース" : humanSub === "mens" ? "メンズ" : "キッズ"})`
            : selectedCategory === "doll"
              ? "ドール服 CAD"
              : selectedCategory === "pet"
                ? "ペット服 CAD"
                : selectedCategory === "cosplay"
                  ? "コスプレ & 造形"
                  : "フリー描画モード"}
        </span>
      </div>

      {/* メインカテゴリ一覧 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                isSelected
                  ? "border-amber-600 bg-amber-50/55 shadow-sm ring-1 ring-amber-600"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{cat.icon}</span>
                <span
                  className={`text-xs font-bold ${isSelected ? "text-amber-900" : "text-gray-800"}`}
                >
                  {cat.label}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 leading-tight">
                {cat.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* 「人間の服」が選択された時だけ出現するサブカテゴリ選択（紳士・婦人・子供） */}
      {selectedCategory === "human" && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 animate-fadeIn">
          <span className="text-xs text-gray-500 font-medium mr-1">
            対象ターゲット:
          </span>
          <button
            onClick={() => setHumanSub("womens")}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
              humanSub === "womens"
                ? "bg-amber-700 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            👗 婦人服 (レディース)
          </button>
          <button
            onClick={() => setHumanSub("mens")}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
              humanSub === "mens"
                ? "bg-amber-700 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            👔 紳士服 (メンズ)
          </button>
          <button
            onClick={() => setHumanSub("kids")}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
              humanSub === "kids"
                ? "bg-amber-700 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🧒 子供服 (キッズ)
          </button>
        </div>
      )}
    </div>
  );
}
