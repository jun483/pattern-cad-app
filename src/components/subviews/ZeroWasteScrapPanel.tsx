// src/components/subviews/ZeroWasteScrapPanel.tsx
import { useState } from "react";
import { useUIStore } from "../../store/useUIStore";

export default function ZeroWasteScrapPanel() {
  const { currentLanguage } = useUIStore();
  const [scrapUsage, setScrapUsage] = useState<string>("pocket_and_ribbon");

  const isEn = currentLanguage === "en";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <span>♻️</span>{" "}
            {isEn
              ? "Sustainable Zero-Waste Scrap Puzzle"
              : "サステナブル・残布ハギレ有効利用パズル (Zero-Waste)"}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {isEn
              ? "Calculate the area of margins (scraps) left after cutting out the main pattern, and efficiently place small items and pockets."
              : "メイン型紙を切り抜いた後に発生する余白（ハギレ）の面積を計算し、小物やポケットを無駄なく配置します。"}
          </p>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full border border-emerald-200">
          {isEn ? "Eco Optimization" : "エコ最適化"}
        </span>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/60 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xs font-bold text-gray-800 block mb-1">
            {isEn
              ? "Select Scrap Auto-Puzzling Target"
              : "ハギレ自動パズリング対象の選択"}
          </span>
          <p className="text-[11px] text-gray-500">
            {isEn
              ? "Specify items to place in the margin spaces."
              : "余白スペースに配置するアイテムを指定します。"}
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={scrapUsage}
            onChange={(e) => setScrapUsage(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg p-2 text-xs font-bold text-gray-800 flex-1 sm:w-64"
          >
            <option value="pocket_and_ribbon">
              {isEn
                ? "Hidden Pocket & Ribbon Tie"
                : "隠しポケット & リボンタイ"}
            </option>
            <option value="pet_mini_item">
              {isEn
                ? "Matching Pet Mini Bandana"
                : "お揃いペット用ミニバンダナ"}
            </option>
            <option value="patchwork_bag">
              {isEn ? "Patchwork Coaster" : "パッチワーク用コースター"}
            </option>
          </select>
          <button
            onClick={() =>
              alert(
                isEn
                  ? "Auto-placement calculation for scrap margin spaces completed!"
                  : "ハギレの余白スペースへの自動配置計算が完了しました！",
              )
            }
            className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-emerald-800 transition-all whitespace-nowrap"
          >
            {isEn ? "Run Placement" : "配置実行"}
          </button>
        </div>
      </div>
    </div>
  );
}
