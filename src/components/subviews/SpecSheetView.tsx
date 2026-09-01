// src/components/subviews/SpecSheetView.tsx
import { useState } from "react";
import { useUIStore } from "../../store/useUIStore";
import { useTranslation } from "../../i18n/dictionary";

export default function SpecSheetView() {
  // ストアと翻訳フックを安全に取得
  const store = useUIStore() as any;
  const currentLanguage = (store?.currentLanguage ||
    store?.language ||
    "ja") as string;

  // 型エラーを回避するため一度 unknown を経由してオブジェクトに変換
  const rawT = useTranslation(currentLanguage as any);
  const t = rawT as unknown as Record<string, string>;

  const [itemName, setItemName] = useState("スタンダード レッスンバッグ");
  const [fabric, setFabric] = useState("オックスフォードコットン / 接着芯地");
  const [thread, setThread] = useState("シャッペスパン 60番");

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-gray-200 pb-32">
      {/* ヘルパー・アクションバー */}
      <div className="bg-gray-800/80 border border-gray-700/80 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>📋</span> {t.specSheetTitle || "縫製仕様書 (Spec Sheet)"}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {t.specSheetSub ||
              "自動計算されたパターンデータに基づく仕様書と縫製手順"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-xs font-semibold rounded-xl transition-colors border border-gray-600">
            {t.recalculateBtn || "再計算実行"}
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-xs font-semibold rounded-xl transition-colors border border-gray-600">
            {t.generateBtn || "CAD図面生成"}
          </button>
          <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-900/30 transition-all flex items-center gap-1.5">
            <span>🖨️</span> {t.printPdfBtn || "PDF出力 / 印刷"}
          </button>
        </div>
      </div>

      {/* 仕様書カード本体 */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* 基本情報グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-800">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              {t.itemNameLabel || "アイテム名"}
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              {t.fabricLabel || "表地・副資材"}
            </label>
            <input
              type="text"
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              {t.threadLabel || "推奨ミシン糸"}
            </label>
            <input
              type="text"
              value={thread}
              onChange={(e) => setThread(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1 flex flex-col justify-end">
            <span className="text-[11px] font-mono text-gray-400">
              {t.modeUnitLabel || "単位: mm (縫い代込み)"}
            </span>
          </div>
        </div>

        {/* 裁断パーツ一覧テーブル */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
            {t.cuttingPartsTitle || "裁断パーツ一覧 (Cutting Parts)"}
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-800/80 text-gray-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="px-4 py-3">
                    {t.tablePartName || "パーツ名称"}
                  </th>
                  <th className="px-4 py-3">{t.tableQty || "数量"}</th>
                  <th className="px-4 py-3">{t.tableMaterial || "使用生地"}</th>
                  <th className="px-4 py-3">
                    {t.tableSeamAllowance || "縫い代"}
                  </th>
                  <th className="px-4 py-3">{t.tableNotes || "備考・仕様"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-300">
                <tr className="hover:bg-gray-800/40">
                  <td className="px-4 py-3 font-medium">
                    本体生地 {/* cspell:disable-line */}
                  </td>
                  <td className="px-4 py-3">2 枚 (表裏)</td>
                  <td className="px-4 py-3">{fabric}</td>
                  <td className="px-4 py-3">10 mm</td>
                  <td className="px-4 py-3 text-gray-400">
                    わ裁ち / 接着芯地貼付
                  </td>
                </tr>
                <tr className="hover:bg-gray-800/40">
                  <td className="px-4 py-3 font-medium">
                    持ち手 {/* cspell:disable-line */}
                  </td>
                  <td className="px-4 py-3">2 本</td>
                  <td className="px-4 py-3">アクリルテープ</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3 text-gray-400">
                    長さ 30cm / 補強ステッチ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 縫製レシピセクション */}
        <div className="space-y-4 pt-4 border-t border-gray-800">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
            {t.recipeTitle || "縫製手順・レシピ (Sewing Recipe)"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-2">
              <h4 className="font-bold text-xs text-amber-300">
                {t.step01Title || "1. 裁断と芯貼り"}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {t.step01Desc ||
                  "指定の寸法通りに生地を裁断し、必要に応じて接着芯地をアイロンでしっかりと貼り付けます。"}
              </p>
            </div>
            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-2">
              <h4 className="font-bold text-xs text-amber-300">
                {t.step02Title || "2. ポケット・持ち手の縫製"}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {t.step02Desc ||
                  "持ち手を本体の規定位置に仮止めし、ポケットがある場合は端を折り返してステッチをかけます。"}
              </p>
            </div>
            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-2">
              <h4 className="font-bold text-xs text-amber-300">
                {t.step03Title || "3. 本体組み立てと仕上げ"}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {t.step03Desc ||
                  "中表に合わせて脇を縫製し、返し口から表に返してアイロンで整え、トップステッチで仕上げます。"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
