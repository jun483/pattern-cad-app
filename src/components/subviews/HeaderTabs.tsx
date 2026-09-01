// src/components/subviews/HeaderTabs.tsx
import { useUIStore } from "../../store/useUIStore";
import { useTranslation, type Language } from "../../i18n/dictionary";
import type { ModuleId } from "../../@types/ui";

interface TabItem {
  id: ModuleId;
  labelKey: keyof ReturnType<typeof useTranslation>;
  icon: string;
}

const TABS: TabItem[] = [
  { id: "mod-canvas-2d", labelKey: "tabCanvas2D", icon: "📐" },
  { id: "mod-viewer-3d", labelKey: "tabViewer3D", icon: "👗" },
  { id: "mod-nesting", labelKey: "tabNesting", icon: "📦" },
  { id: "mod-spec-sheet", labelKey: "tabSpecSheet", icon: "📝" },
  { id: "mod-dxf-exporter", labelKey: "tabDxfExporter", icon: "💾" },
  { id: "mod-pdf-generator", labelKey: "tabPdfGenerator", icon: "🖨️" },
];

export default function HeaderTabs() {
  const { activeModule, setActiveModule, currentLanguage } = useUIStore();
  const t = useTranslation(currentLanguage as Language);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2 overflow-x-auto">
        {TABS.map((tab) => {
          const isActive = activeModule === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveModule(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-amber-700 text-white shadow-md shadow-amber-700/20"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{t[tab.labelKey] as string}</span>
            </button>
          );
        })}
      </div>

      <div className="text-xs text-gray-400 font-medium pl-4 hidden xl:block">
        {t.brandFooter}
      </div>
    </header>
  );
}
