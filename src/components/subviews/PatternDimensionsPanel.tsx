// src/components/subviews/PatternDimensionsPanel.tsx
import React, { useEffect } from "react";
import { usePatternStore } from "../../store/usePatternStore";
import { useUIStore } from "../../store/useUIStore";
import { useTranslation, type Language } from "../../i18n/dictionary";
import { generateApparelParts } from "../../utils/generateApparelParts";

export default function PatternDimensionsPanel() {
  const { currentLanguage, unitSystem } = useUIStore();
  const t = useTranslation(currentLanguage as Language);

  const {
    document,
    setDocument,
    dimensions = { width: 400, height: 300, depth: 60, bust: 84, waist: 64 },
    setDimensions = () => {},
  } = usePatternStore() as any;

  const currentItemId = document?.itemId || "lesson-bag";
  const currentDimensions = document?.dimensions || dimensions;

  // アイテム変更時のハンドラー（ItemId 型としてキャスト）
  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemId = e.target.value as any;
    if (!document) return;

    const updatedParts = generateApparelParts(newItemId, currentDimensions);

    setDocument({
      ...document,
      itemId: newItemId,
      parts: updatedParts,
      version: (document.version || 0) + 1,
    });
  };

  // 寸法が変更されたときにパーツを再生成してドキュメントを更新
  useEffect(() => {
    if (!document) return;

    const updatedParts = generateApparelParts(currentItemId, currentDimensions);

    setDocument({
      ...document,
      parts: updatedParts,
      version: (document.version || 0) + 1,
    });
  }, [currentDimensions, currentItemId]);

  const handleDimensionChange = (key: string, value: number) => {
    const newDims = {
      ...currentDimensions,
      [key]: value,
    };

    if (typeof setDimensions === "function") {
      setDimensions(newDims);
    }

    if (document) {
      setDocument({
        ...document,
        dimensions: newDims,
        parts: generateApparelParts(currentItemId, newDims),
        version: (document.version || 0) + 1,
      });
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 text-xs text-gray-800">
      <h3 className="font-bold text-gray-900 uppercase tracking-wider text-[10px] border-b border-gray-100 pb-1">
        {t.patternDimensionsTitle}
      </h3>

      {/* アイテム選択 */}
      <div className="flex flex-col gap-1.5">
        <label className="font-medium text-gray-600">{t.itemSelection}</label>
        <select
          value={currentItemId}
          onChange={handleItemChange}
          className="w-full bg-gray-50 border border-gray-300 rounded-md p-1.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
        >
          <option value="lesson-bag">{t.lessonBag}</option>
          <option value="shoe-bag">{t.shoeBag}</option>
          <option value="basic-shirt">{t.basicShirt}</option>
          <option value="basic-skirt">{t.basicSkirt}</option>
        </select>
      </div>

      {/* バッグ系などの寸法項目 */}
      {(currentItemId === "lesson-bag" || currentItemId === "shoe-bag") && (
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-600">{t.finishedWidth}</span>
              <span className="font-semibold">
                {currentDimensions.width ?? 400}
                {unitSystem}
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="700"
              step="10"
              value={currentDimensions.width ?? 400}
              onChange={(e) =>
                handleDimensionChange("width", Number(e.target.value))
              }
              className="accent-amber-600 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-600">{t.finishedHeight}</span>
              <span className="font-semibold">
                {currentDimensions.height ?? 300}
                {unitSystem}
              </span>
            </div>
            <input
              type="range"
              min="150"
              max="600"
              step="10"
              value={currentDimensions.height ?? 300}
              onChange={(e) =>
                handleDimensionChange("height", Number(e.target.value))
              }
              className="accent-amber-600 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-600">{t.bottomDepth}</span>
              <span className="font-semibold">
                {currentDimensions.depth ?? 60}
                {unitSystem}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              step="5"
              value={currentDimensions.depth ?? 60}
              onChange={(e) =>
                handleDimensionChange("depth", Number(e.target.value))
              }
              className="accent-amber-600 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* 洋服系の採寸項目 */}
      {(currentItemId === "basic-shirt" || currentItemId === "basic-skirt") && (
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-600">{t.nudeBust}</span>
              <span className="font-semibold">
                {currentDimensions.bust ?? 84} cm
              </span>
            </div>
            <input
              type="range"
              min="70"
              max="120"
              step="1"
              value={currentDimensions.bust ?? 84}
              onChange={(e) =>
                handleDimensionChange("bust", Number(e.target.value))
              }
              className="accent-amber-600 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-600">{t.nudeWaist}</span>
              <span className="font-semibold">
                {currentDimensions.waist ?? 64} cm
              </span>
            </div>
            <input
              type="range"
              min="55"
              max="100"
              step="1"
              value={currentDimensions.waist ?? 64}
              onChange={(e) =>
                handleDimensionChange("waist", Number(e.target.value))
              }
              className="accent-amber-600 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
