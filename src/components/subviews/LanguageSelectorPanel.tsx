// src/components/subviews/LanguageSelectorPanel.tsx

import React from "react";
import type { Language } from "../../i18n/dictionary";

export interface UIState {
  language?: Language;
  setLanguage: (lang: Language) => void;
}

interface LanguageSelectorPanelProps {
  uiState: UIState;
}

export const LanguageSelectorPanel: React.FC<LanguageSelectorPanelProps> = ({
  uiState,
}) => {
  const language = uiState?.language ?? "ja"; // ← 未定義なら安全に "ja" をフォールバック
  const setLanguage = uiState?.setLanguage ?? (() => {});

  const languages: { code: Language; label: string; nativeLabel: string }[] = [
    { code: "ja", label: "Japanese", nativeLabel: "日本語" },
    { code: "en", label: "English", nativeLabel: "English" },
    { code: "fr", label: "French", nativeLabel: "Français" },
    { code: "es", label: "Spanish", nativeLabel: "Español" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span>🌐</span>
          <span>Panneau Multilingue & Localisation</span>
        </h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 font-medium">
          Sélectionné: {language.toUpperCase()}
        </span>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Changez la langue de l'interface pour le calcul et la génération de
        patrons.
      </p>

      <div className="grid grid-cols-2 gap-2">
        {languages.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex flex-col items-start p-3 rounded-lg border transition-all text-left ${
                isSelected
                  ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 shadow-sm"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300"
              }`}
            >
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {lang.code}
              </span>
              <span className="text-sm font-semibold mt-0.5">
                {lang.nativeLabel}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {lang.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
        <span>
          L'affichage et les spécifications sont synchronisés en temps réel.
        </span>
        <span className="font-mono text-emerald-600 dark:text-emerald-400">
          ● Active
        </span>
      </div>
    </div>
  );
};

export default LanguageSelectorPanel;
