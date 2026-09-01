import { useUIStore } from "../../store/useUIStore";

const translations = {
  ja: {
    moduleBadge: "MODULE 03: APPAREL CATEGORY SELECTOR",
    title: "作図アイテム・型紙カテゴリ選択パネル",
    currentSelected: "現在選択中:",
    activeLabel: "ACTIVE",
    footerInfo:
      "選択したアイテムに応じて、自動計算ロジックおよびSVGベクター型紙の寸法基準が即座に切り替わります。",
    categories: {
      lesson_bag: { name: "レッスンバッグ", desc: "通園・通学用トートバッグ" },
      shoe_bag: { name: "シューズバッグ", desc: "Dカン付き上履き入れ" },
      drawstring: { name: "巾着袋（各種）", desc: "コップ袋・お弁当袋等" },
      tote_bag: { name: "本格トート", desc: "マチ付き立体トートバッグ" },
      knapsack: { name: "ナップサック", desc: "紐通し口付きリュック" },
    },
  },
  en: {
    moduleBadge: "MODULE 03: APPAREL CATEGORY SELECTOR",
    title: "Pattern Item & Category Selector",
    currentSelected: "Currently Selected:",
    activeLabel: "ACTIVE",
    footerInfo:
      "Automatic calculation logic and SVG vector pattern dimension standards switch instantly based on the selected item.",
    categories: {
      lesson_bag: { name: "Lesson Bag", desc: "School tote bag" },
      shoe_bag: { name: "Shoe Bag", desc: "Shoe pouch with D-ring" },
      drawstring: {
        name: "Drawstring Pouch",
        desc: "Cup pouch, bento bag, etc.",
      },
      tote_bag: { name: "Pro Tote Bag", desc: "Structured tote with gusset" },
      knapsack: { name: "Knapsack", desc: "Drawstring backpack" },
    },
  },
  fr: {
    moduleBadge: "MODULE 03: APPAREL CATEGORY SELECTOR",
    title: "Sélecteur de catégorie et d'article de patron",
    currentSelected: "Sélection actuelle :",
    activeLabel: "ACTIF",
    footerInfo:
      "La logique de calcul automatique et les normes de dimensions des patrons vectoriels SVG changent instantanément selon l'article sélectionné.",
    categories: {
      lesson_bag: { name: "Sac de cours", desc: "Cabastote d'école" },
      shoe_bag: { name: "Sac à chaussures", desc: "Pochette avec anneau en D" },
      drawstring: {
        name: "Pochette coulissante",
        desc: "Sac à gobelet, bento, etc.",
      },
      tote_bag: { name: "Cabas Pro", desc: "Sac structuré avec soufflet" },
      knapsack: { name: "Sac à dos", desc: "Sac à dos à cordons" },
    },
  },
  zh: {
    moduleBadge: "MODULE 03: APPAREL CATEGORY SELECTOR",
    title: "纸样款式与类别选择面板",
    currentSelected: "当前选中:",
    activeLabel: "已选择",
    footerInfo: "根据所选项目，自动计算逻辑和SVG矢量纸样尺寸标准将即时切换。",
    categories: {
      lesson_bag: { name: "课本包 / 学习包", desc: "幼儿园与学校托特包" },
      shoe_bag: { name: "鞋袋", desc: "带D字环的室内鞋袋" },
      drawstring: { name: "束口袋（各种）", desc: "漱口杯袋、便当袋等" },
      tote_bag: { name: "专业托特包", desc: "带底侧围的立体托特包" },
      knapsack: { name: "双肩背包", desc: "抽绳穿孔双肩包" },
    },
  },
} as const;

type LangKey = keyof typeof translations;

export default function CategorySelectorPanel() {
  const {
    activeCategory,
    setActiveCategory,
    userMode,
    unitSystem,
    currentLanguage,
  } = useUIStore();

  const langKey: LangKey = (
    currentLanguage in translations ? currentLanguage : "ja"
  ) as LangKey;
  const t = translations[langKey];

  const categoryItems = [
    { id: "lesson_bag", icon: "👜" },
    { id: "shoe_bag", icon: "👟" },
    { id: "drawstring", icon: "👝" },
    { id: "tote_bag", icon: "🛍️" },
    { id: "knapsack", icon: "🎒" },
  ] as const;

  const currentCatInfo =
    t.categories[activeCategory as keyof typeof t.categories];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
      {/* セクションヘッダー */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-3">
        <div>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 uppercase">
            {t.moduleBadge}
          </span>
          <h3 className="text-base font-extrabold text-gray-900 mt-1 flex items-center gap-2">
            <span>🏷️</span> {t.title}
          </h3>
        </div>
        <div className="text-xs text-gray-500">
          {t.currentSelected}{" "}
          <strong className="text-amber-700">
            {currentCatInfo ? currentCatInfo.name : activeCategory}
          </strong>
        </div>
      </div>

      {/* カテゴリグリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {categoryItems.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const translatedCat = t.categories[cat.id];
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                isSelected
                  ? "bg-amber-50/80 border-amber-300 shadow-sm text-amber-900 ring-1 ring-amber-300"
                  : "bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-xl">{cat.icon}</span>
                {isSelected && (
                  <span className="text-xs text-amber-700 font-bold">
                    {t.activeLabel}
                  </span>
                )}
              </div>
              <div>
                <div className="text-xs font-bold">{translatedCat.name}</div>
                <div className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                  {translatedCat.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ステータスインフォ */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 pt-2 border-t border-gray-100 gap-2">
        <div>⚡ {t.footerInfo}</div>
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-mono">
            Mode: {userMode}
          </span>
          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-mono uppercase">
            Unit: {unitSystem}
          </span>
        </div>
      </div>
    </div>
  );
}
