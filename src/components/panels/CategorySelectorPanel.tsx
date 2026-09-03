// src/components/panels/CategorySelectorPanel.tsx
import React from "react";
import { dictionaries, type Locale } from "../../i18n";

interface CategorySelectorPanelProps {
  uiState: any;
}

export const CategorySelectorPanel: React.FC<CategorySelectorPanelProps> = ({
  uiState,
}) => {
  const locale = uiState?.locale || "ja";
  const targetCategory = uiState?.targetCategory || "human";
  const setTargetCategory = uiState?.setTargetCategory || (() => {});

  const t = dictionaries[locale as Locale] || dictionaries["ja"];

  // カテゴリ名の多言語対応ラベル
  const categoryLabels = {
    human: {
      ja: "人間 (型紙)",
      en: "Human Pattern",
      fr: "Humain",
      es: "Humano",
      zh: "人类 (纸样)",
      ko: "인간 (형纸)",
    },
    doll: {
      ja: "ドール服",
      en: "Doll Clothes",
      fr: "Vêtements de poupée",
      es: "Ropa de muñeca",
      zh: "娃娃服饰",
      ko: "인형 옷",
    },
    pet: {
      ja: "ペット服",
      en: "Pet Wear",
      fr: "vêtements pour animaux",
      es: "Ropa para mascotas",
      zh: "宠物服装",
      ko: "반려동물 의류",
    },
    cosplay: {
      ja: "コスプレ衣装",
      en: "Cosplay Costume",
      fr: "Costume Cosplay",
      es: "Disfraz de Cosplay",
      zh: "角色扮演服装",
      ko: "코스프레 의상",
    },
  };

  const labelTitle =
    {
      ja: "対象ターゲット (Target Category)",
      en: "Target Category",
      fr: "Catégorie cible",
      es: "Categoría objetivo",
      zh: "目标类别",
      ko: "대상 카테고리",
    }[locale as string] || "Target Category";

  return (
    <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
      <label className="text-xs font-semibold text-slate-600">
        {labelTitle}
      </label>
      <select
        value={targetCategory}
        onChange={(e) => setTargetCategory(e.target.value)}
        className="text-xs border border-slate-300 rounded p-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
      >
        <option value="human">
          {categoryLabels.human[locale as keyof typeof categoryLabels.human] ||
            categoryLabels.human.en}
        </option>
        <option value="doll">
          {categoryLabels.doll[locale as keyof typeof categoryLabels.doll] ||
            categoryLabels.doll.en}
        </option>
        <option value="pet">
          {categoryLabels.pet[locale as keyof typeof categoryLabels.pet] ||
            categoryLabels.pet.en}
        </option>
        <option value="cosplay">
          {categoryLabels.cosplay[
            locale as keyof typeof categoryLabels.cosplay
          ] || categoryLabels.cosplay.en}
        </option>
      </select>
    </div>
  );
};

export default CategorySelectorPanel;
