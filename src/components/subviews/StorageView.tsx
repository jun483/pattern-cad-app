// src/components/subviews/StorageView.tsx
import React, { useState } from "react";
import { useUIStore } from "../../store/useUIStore";

export const StorageView: React.FC = () => {
  const measurements = useUIStore((state) => state.measurements);
  const userMode = useUIStore((state) => state.userMode);
  const sewingMachineType = useUIStore((state) => state.sewingMachineType);
  const locale = useUIStore((state) => state.locale);

  const [message, setMessage] = useState<string | null>(null);

  const labels: Record<string, any> = {
    ja: {
      tag: "ODAWARA SEWING — SUBVIEW: DATA STORAGE & IO",
      title: "設計データ・仕様書の保存と入出力",
      subtitle:
        "小田原ミシン公式セッションマネージャー — 設定のエクスポート・インポート・バックアップ",
      exportCard: "📤 設定のエクスポート (JSON保存)",
      exportDesc:
        "現在の採寸データ（詳細CADパラメータ含む）、仕様書設定をJSONファイルとしてデバイスに保存します。",
      exportBtn: "設計データをダウンロード",
      importCard: "📥 設定のインポート (ファイル読み込み)",
      importDesc:
        "以前に保存したJSONファイルを選択して、当時の設計・採寸状態を瞬時に復元します。",
      importPlaceholder: "ファイルを選択...",
      storageCard: "💾 ブラウザストレージ管理",
      storageDesc:
        "ローカルストレージに自動保存されたセッションデータの確認や、キャッシュのクリアを行います。",
      saveLocalBtn: "現在の状態を保存",
      clearLocalBtn: "ローカルデータをリセット",
      successExport: "【小田原ミシン】設計データのエクスポートが完了しました。",
      successSave: "【小田原ミシン】ローカルストレージに状態を保存しました。",
      successClear: "【小田原ミシン】ローカルデータをリセットしました。",
    },
    en: {
      tag: "ODAWARA SEWING — SUBVIEW: DATA STORAGE & IO",
      title: "Data Storage & IO Management",
      subtitle:
        "Odawara Sewing Machine Session Manager — Export, Import, and Backup configurations",
      exportCard: "📤 Export Configuration (JSON)",
      exportDesc:
        "Save your current measurements, pro CAD parameters, and spec settings as a JSON file.",
      exportBtn: "Download Design Data",
      importCard: "📥 Import Configuration",
      importDesc:
        "Select a previously saved JSON file to instantly restore your design state.",
      importPlaceholder: "Choose file...",
      storageCard: "💾 Browser Storage Management",
      storageDesc:
        "Manage auto-saved session data in your browser's local storage.",
      saveLocalBtn: "Save Current State",
      clearLocalBtn: "Clear Local Data",
      successExport: "[Odawara Sewing] Design data exported successfully.",
      successSave: "[Odawara Sewing] State saved to local storage.",
      successClear: "[Odawara Sewing] Local data cleared.",
    },
  };

  const tText = labels[locale] || labels.en;

  const handleExport = () => {
    const sessionData = {
      version: "2.0",
      store: "Odawara Sewing Machine (小田原ミシン - Professional)",
      timestamp: new Date().toISOString(),
      measurements,
      userMode,
      sewingMachineType,
    };

    const blob = new Blob([JSON.stringify(sessionData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `odawara-sewing-pro-design-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setMessage(tText.successExport);
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSaveLocal = () => {
    const sessionData = { measurements, userMode, sewingMachineType };
    localStorage.setItem(
      "odawara_sewing_pro_session",
      JSON.stringify(sessionData),
    );
    setMessage(tText.successSave);
    setTimeout(() => setMessage(null), 4000);
  };

  const handleClearLocal = () => {
    localStorage.removeItem("odawara_sewing_pro_session");
    setMessage(tText.successClear);
    setTimeout(() => setMessage(null), 4000);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.measurements) {
          useUIStore.getState().setMeasurements(json.measurements);
          if (json.sewingMachineType)
            useUIStore.getState().setSewingMachineType(json.sewingMachineType);
          alert(
            locale === "ja"
              ? "【小田原ミシン】設計ファイルのインポート・適用に成功しました！"
              : "[Odawara Sewing] Design file imported and applied successfully!",
          );
        }
      } catch (err) {
        alert(
          locale === "ja"
            ? "ファイルの形式が正しくありません。"
            : "Invalid JSON format.",
        );
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-[#111827] rounded-xl p-6 shadow-2xl border border-amber-500/20 flex flex-col gap-6 text-slate-200 min-h-[500px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-700/60 pb-4 gap-2">
        <div>
          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded uppercase tracking-wider">
            {tText.tag}
          </span>
          <h2 className="text-base font-bold text-slate-100 mt-1.5 flex items-center gap-2">
            <span>💾 {tText.title}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#1f2937] text-amber-400 border border-slate-700">
              JSON / LocalStorage Sync
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">{tText.subtitle}</p>
        </div>
      </div>

      {message && (
        <div className="bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs px-4 py-3 rounded-lg flex items-center gap-2 shadow-lg animate-pulse">
          <span>✨</span>
          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#1f2937]/70 border border-slate-700/60 rounded-xl p-5 flex flex-col justify-between shadow-lg">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-amber-400 border-b border-slate-700 pb-2">
              {tText.exportCard}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {tText.exportDesc}
            </p>
          </div>
          <button
            onClick={handleExport}
            className="mt-5 w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-2.5 px-4 rounded-lg shadow-md transition-all text-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <span>📤 {tText.exportBtn}</span>
          </button>
        </div>

        <div className="bg-[#1f2937]/70 border border-slate-700/60 rounded-xl p-5 flex flex-col justify-between shadow-lg">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-amber-400 border-b border-slate-700 pb-2">
              {tText.importCard}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {tText.importDesc}
            </p>
          </div>
          <div className="mt-5">
            <label className="w-full bg-[#111827] hover:bg-slate-800 text-slate-200 border border-slate-600 font-semibold py-2.5 px-4 rounded-lg transition-all text-xs flex items-center justify-center gap-2 cursor-pointer">
              <span>📥 {tText.importPlaceholder}</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="bg-[#1f2937]/70 border border-slate-700/60 rounded-xl p-5 flex flex-col justify-between shadow-lg">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-amber-400 border-b border-slate-700 pb-2">
              {tText.storageCard}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {tText.storageDesc}
            </p>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <button
              onClick={handleSaveLocal}
              className="w-full bg-[#374151] hover:bg-slate-600 text-white font-semibold py-2 px-3 rounded-lg transition-all text-xs cursor-pointer"
            >
              💾 {tText.saveLocalBtn}
            </button>
            <button
              onClick={handleClearLocal}
              className="w-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-semibold py-1.5 px-3 rounded-lg transition-all text-xs cursor-pointer"
            >
              🗑️ {tText.clearLocalBtn}
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-4 mt-2 text-[11px] text-slate-500 flex justify-between items-center">
        <div className="text-amber-400/90 font-semibold">
          小田原ミシン — 小田原市栄町 (Since 1935)
        </div>
        <div>Secure Pro JSON & Local Storage Engine</div>
      </div>
    </div>
  );
};
export default StorageView;
