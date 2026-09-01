// src/components/subviews/CompleteToolkitPanel.tsx
import { useState } from "react";
import { useUIStore } from "../../store/useUIStore";

export default function CompleteToolkitPanel() {
  const { unitSystem, currentLanguage } = useUIStore();
  const [fabricImageName, setFabricImageName] = useState<string | null>(null);
  const [selectedModelType, setSelectedModelType] = useState<
    "womens_model" | "doll_1_6" | "dog_small"
  >("womens_model");

  const isEn = currentLanguage === "en";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFabricImageName(e.target.files[0].name);
    }
  };

  const handleActionTrigger = (actionName: string) => {
    alert(
      isEn
        ? `[${actionName}] action executed! (In production, export or save handling runs)`
        : `[${actionName}] のアクションが実行されました！（実運用ではエクスポートや保存処理が走ります）`,
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 space-y-6">
      {/* セクションタイトル */}
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <span>🎨</span>{" "}
          {isEn
            ? "Real Fabric Upload & Dress-up / Output Toolkit"
            : "実物生地アップロード & 着せ替え・出力ツールキット"}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          {isEn
            ? "Upload actual fabric photos, select 3D/visual dress-up models, and export various CAD data / PDFs."
            : "お手元の布地写真の反映、3D/ビジュアル着せ替えモデルの選択、および各種CADデータ・PDFのエクスポートを行います。"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左側：実物生地アップロード & 着せ替えモデル選択 */}
        <div className="space-y-4">
          {/* 1. 実物生地アップロード */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/60">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>🧵</span>{" "}
              {isEn
                ? "Real Fabric Photo Upload (Texture Upload)"
                : "実物生地写真のアップロード (Texture Upload)"}
            </h4>
            <p className="text-[11px] text-gray-500 mb-3">
              {isEn
                ? "Upload photos of your fabric (patterned, checked, solid) to reflect realistic textures on patterns and 3D previews."
                : "お手持ちの布（柄物・チェック・無地）の写真をアップロードし、型紙や3Dプレビューにリアルなテクスチャとして反映させます。"}
            </p>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer px-4 py-2 bg-amber-700 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-amber-800 transition-all flex items-center gap-1.5">
                <span>📷</span> {isEn ? "Select Image" : "画像を選択する"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-gray-600 truncate max-w-[200px]">
                {fabricImageName
                  ? isEn
                    ? `Selected: ${fabricImageName}`
                    : `選択中: ${fabricImageName}`
                  : isEn
                    ? "No file selected"
                    : "ファイルが選択されていません"}
              </span>
            </div>
          </div>

          {/* 2. 着せ替えモデル選択 */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/60">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>👗</span>{" "}
              {isEn
                ? "Doll / Model Dress-up Preview Settings"
                : "ドール / モデル着せ替えプレビュー設定"}
            </h4>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <button
                onClick={() => setSelectedModelType("womens_model")}
                className={`p-2 rounded-lg text-xs font-bold border transition-all text-center ${
                  selectedModelType === "womens_model"
                    ? "bg-amber-700 text-white border-amber-700 shadow-sm"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {isEn ? "👤 Women's Torso" : "👤 レディーストルソー"}
              </button>
              <button
                onClick={() => setSelectedModelType("doll_1_6")}
                className={`p-2 rounded-lg text-xs font-bold border transition-all text-center ${
                  selectedModelType === "doll_1_6"
                    ? "bg-amber-700 text-white border-amber-700 shadow-sm"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {isEn ? "🧸 1/6 Doll Body" : "🧸 1/6 ドール体型"}
              </button>
              <button
                onClick={() => setSelectedModelType("dog_small")}
                className={`p-2 rounded-lg text-xs font-bold border transition-all text-center ${
                  selectedModelType === "dog_small"
                    ? "bg-amber-700 text-white border-amber-700 shadow-sm"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {isEn ? "🐕 Small Dog Mannequin" : "🐕 小型犬マネキン"}
              </button>
            </div>
          </div>
        </div>

        {/* 右側：ファイル保存・DXF・PDF出力コントロール */}
        <div className="bg-gradient-to-br from-amber-50/40 to-orange-50/20 p-4 rounded-xl border border-amber-200/80 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>💾</span>{" "}
              {isEn
                ? "Save, I/O & Export Controls"
                : "保存・入出力・エクスポートコントロール"}
            </h4>
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <button
                onClick={() =>
                  handleActionTrigger(
                    isEn ? "Save Project (JSON)" : "プロジェクト保存 (JSON)",
                  )
                }
                className="p-2.5 bg-white border border-amber-200 rounded-lg text-xs font-bold text-gray-800 hover:bg-amber-50/80 transition-all text-left shadow-sm flex items-center justify-between"
              >
                <span>💾 {isEn ? "Save Project" : "プロジェクト保存"}</span>
                <span className="text-[10px] text-gray-400">JSON</span>
              </button>
              <button
                onClick={() =>
                  handleActionTrigger(
                    isEn ? "DXF Export" : "DXF形式エクスポート",
                  )
                }
                className="p-2.5 bg-white border border-amber-200 rounded-lg text-xs font-bold text-gray-800 hover:bg-amber-50/80 transition-all text-left shadow-sm flex items-center justify-between"
              >
                <span>📐 {isEn ? "CAD Data Output" : "CADデータ出力"}</span>
                <span className="text-[10px] text-blue-600 font-semibold">
                  DXF
                </span>
              </button>
              <button
                onClick={() =>
                  handleActionTrigger(
                    isEn
                      ? "Auto Nesting (Fabric Efficiency Layout)"
                      : "自動ネスティング（生地効率化配置）",
                  )
                }
                className="p-2.5 bg-white border border-amber-200 rounded-lg text-xs font-bold text-gray-800 hover:bg-amber-50/80 transition-all text-left shadow-sm flex items-center justify-between"
              >
                <span>✂️ {isEn ? "Auto Nesting" : "自動ネスティング"}</span>
                <span className="text-[10px] text-amber-600 font-semibold">
                  Pro
                </span>
              </button>
              <button
                onClick={() =>
                  handleActionTrigger(
                    isEn ? "A4/A3 Pattern PDF Output" : "A4/A3 印刷用PDF出力",
                  )
                }
                className="p-2.5 bg-white border border-amber-200 rounded-lg text-xs font-bold text-gray-800 hover:bg-amber-50/80 transition-all text-left shadow-sm flex items-center justify-between"
              >
                <span>🖨️ {isEn ? "Pattern PDF Output" : "型紙PDF出力"}</span>
                <span className="text-[10px] text-gray-400">
                  {unitSystem.toUpperCase()}
                </span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-amber-900">
            <span className="font-semibold">
              {isEn
                ? "✨ All skeleton modules integrated successfully"
                : "✨ すべての骨組みモジュールが結合完了しました"}
            </span>
            <span className="bg-amber-700 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
              {isEn ? "100% Ready" : "100% 準備完了"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
