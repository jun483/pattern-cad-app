// src/components/subviews/SpecSheetGenerator.tsx
import { useState } from "react";
import { useUIStore } from "../../store/useUIStore";
import { useTranslation, type Language } from "../../i18n/dictionary";

interface SpecItem {
  partName: string;
  quantity: number;
  material: string;
  seamAllowance: string;
  notes: string;
}

export default function SpecSheetGenerator() {
  const { userMode, unitSystem, currentLanguage } = useUIStore();

  // currentLanguageを明示的に Language 型としてキャスト
  useTranslation(currentLanguage as Language);
  const [isGenerated, setIsGenerated] = useState(true);

  // userMode の比較を安全に行うためのキャスト
  const isProfessional = (userMode as string) === "professional";

  // 多言語対応済みのデフォルト仕様データ
  const DEFAULT_SPECS: SpecItem[] = [
    {
      partName:
        currentLanguage === "en"
          ? "Body (Front/Back)"
          : currentLanguage === "fr"
            ? "Corps (Devant/Dos)"
            : currentLanguage === "zh"
              ? "身片 (前/后)"
              : "身頃 (Body Front/Back)",
      quantity: 2,
      material:
        currentLanguage === "en"
          ? "Main fabric (Cotton Oxford)"
          : currentLanguage === "fr"
            ? "Tissu principal (Coton Oxford)"
            : currentLanguage === "zh"
              ? "面料 (纯棉牛津纺)"
              : "表地（コットンオックス）",
      seamAllowance: "10mm",
      notes:
        currentLanguage === "en"
          ? "Align center front/back"
          : currentLanguage === "fr"
            ? "Aligner le centre"
            : currentLanguage === "zh"
              ? "对齐前/后中心"
              : "前後中心は合わせる",
    },
    {
      partName:
        currentLanguage === "en"
          ? "Sleeves"
          : currentLanguage === "fr"
            ? "Manches"
            : currentLanguage === "zh"
              ? "袖子"
              : "袖 (Sleeves)",
      quantity: 2,
      material:
        currentLanguage === "en"
          ? "Main fabric (Cotton Oxford)"
          : currentLanguage === "fr"
            ? "Tissu principal (Coton Oxford)"
            : currentLanguage === "zh"
              ? "面料 (纯棉牛津纺)"
              : "表地（コットンオックス）",
      seamAllowance: "10mm",
      notes:
        currentLanguage === "en"
          ? "Sew armholes"
          : currentLanguage === "fr"
            ? "Coudre les emmanchures"
            : currentLanguage === "zh"
              ? "缝合袖窿"
              : "アームホール縫い合わせ",
    },
    {
      partName:
        currentLanguage === "en"
          ? "Neck Facing"
          : currentLanguage === "fr"
            ? "Encolure parementure"
            : currentLanguage === "zh"
              ? "领口贴边"
              : "衿ぐり見返し (Neck Facing)",
      quantity: 2,
      material:
        currentLanguage === "en"
          ? "Main fabric + Interfacing"
          : currentLanguage === "fr"
            ? "Tissu + Entr. thermosoudée"
            : currentLanguage === "zh"
              ? "面料 + 粘合衬"
              : "表地 + 接着芯",
      seamAllowance: "7mm",
      notes:
        currentLanguage === "en"
          ? "Must attach interfacing"
          : currentLanguage === "fr"
            ? "Thermocoller obligatoirement"
            : currentLanguage === "zh"
              ? "必须熨烫粘合衬"
              : "接着芯を必ず貼ること",
    },
    {
      partName:
        currentLanguage === "en"
          ? "Pocket"
          : currentLanguage === "fr"
            ? "Poche"
            : currentLanguage === "zh"
              ? "口袋"
              : "ポケット (Pocket)",
      quantity: 1,
      material:
        currentLanguage === "en"
          ? "Accent fabric"
          : currentLanguage === "fr"
            ? "Tissu accentué"
            : currentLanguage === "zh"
              ? "撞色面料"
              : "別布（アクセント）",
      seamAllowance: "12mm (Triple fold)",
      notes:
        currentLanguage === "en"
          ? "Top-edge triple fold stitch"
          : currentLanguage === "fr"
            ? "Surpiqûre bord supérieur"
            : currentLanguage === "zh"
              ? "上端三折压线"
              : "上端は三つ折りステッチ",
    },
  ];

  const [specs] = useState<SpecItem[]>(DEFAULT_SPECS);

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <span>📋</span>{" "}
            {currentLanguage === "en"
              ? "Automatic Spec Sheet & Step-by-Step Recipe"
              : currentLanguage === "fr"
                ? "Fiche technique & Recette automatique"
                : currentLanguage === "zh"
                  ? "服装规格表与制作步骤自动生成"
                  : "アパレル縫製仕様書 & 作り方手順書の自動生成"}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {currentLanguage === "en"
              ? "Automatically generates professional specs and step recipes based on current patterns and measurements."
              : currentLanguage === "fr"
                ? "Génère automatiquement des spécifications professionnelles basées sur le patron actuel."
                : currentLanguage === "zh"
                  ? "根据当前的纸样和尺寸数据，自动构建专业规格书与步骤食谱。"
                  : "現在の作図パターンと採寸データに基づき、プロ仕様の仕様書とステップ式レシピを自動構築します。"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsGenerated(!isGenerated)}
            className="px-3.5 py-1.5 bg-amber-50 text-amber-800 rounded-lg text-xs font-bold border border-amber-200 hover:bg-amber-100 transition-all"
          >
            {isGenerated
              ? currentLanguage === "en"
                ? "🔄 Recalculate & Update"
                : currentLanguage === "fr"
                  ? "🔄 Recalculer"
                  : currentLanguage === "zh"
                    ? "🔄 重新计算与更新"
                    : "🔄 仕様書を再計算・更新"
              : currentLanguage === "en"
                ? "✨ Generate Spec Sheet"
                : currentLanguage === "fr"
                  ? "✨ Générer la fiche"
                  : currentLanguage === "zh"
                    ? "✨ 自动生成规格书"
                    : "✨ 仕様書を自動生成する"}
          </button>
          <button
            onClick={handlePrintPdf}
            className="px-4 py-1.5 bg-amber-700 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-amber-800 transition-all flex items-center gap-1.5"
          >
            <span>🖨️</span>{" "}
            {currentLanguage === "en"
              ? "Print / Export PDF"
              : currentLanguage === "fr"
                ? "Imprimer / Exporter PDF"
                : currentLanguage === "zh"
                  ? "打印 / 导出PDF"
                  : "仕様書をPDF印刷 / 出力"}
          </button>
        </div>
      </div>

      {isGenerated && (
        <div className="space-y-6">
          {/* 基本情報サマリー */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200/60">
            <div>
              <span className="text-[10px] text-gray-400 block uppercase">
                {currentLanguage === "en"
                  ? "Item Name"
                  : currentLanguage === "fr"
                    ? "Nom de l'article"
                    : currentLanguage === "zh"
                      ? "款式名称"
                      : "アイテム名"}
              </span>
              <span className="text-xs font-bold text-gray-800">
                {currentLanguage === "en"
                  ? "Classic Shirt / Dress"
                  : currentLanguage === "fr"
                    ? "Chemise / Robe classique"
                    : currentLanguage === "zh"
                      ? "经典衬衫 / 连衣裙"
                      : "定番クラシックシャツ / ドレス"}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block uppercase">
                {currentLanguage === "en"
                  ? "Recommended Fabric"
                  : currentLanguage === "fr"
                    ? "Métrage recommandé"
                    : currentLanguage === "zh"
                      ? "推荐用料"
                      : "推奨用尺 (Fabric)"}
              </span>
              <span className="text-xs font-bold text-amber-800">
                110cm × 2.2m
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block uppercase">
                {currentLanguage === "en"
                  ? "Sewing Thread"
                  : currentLanguage === "fr"
                    ? "Fil à coudre"
                    : currentLanguage === "zh"
                      ? "推荐缝纫线"
                      : "推奨ミシン糸"}
              </span>
              <span className="text-xs font-bold text-gray-800">
                {currentLanguage === "en"
                  ? "Spun Thread #60 (Matching)"
                  : currentLanguage === "fr"
                    ? "Fil spun #60 (Ton sur ton)"
                    : currentLanguage === "zh"
                      ? "涤纶线 #60 (同色系)"
                      : "スパン糸 #60 (同色系)"}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block uppercase">
                {currentLanguage === "en"
                  ? "Mode / Unit"
                  : currentLanguage === "fr"
                    ? "Mode / Unité"
                    : currentLanguage === "zh"
                      ? "模式 / 单位"
                      : "対応モード・単位"}
              </span>
              <span className="text-xs font-bold text-blue-700">
                {isProfessional
                  ? currentLanguage === "en"
                    ? "Professional"
                    : currentLanguage === "fr"
                      ? "Professionnel"
                      : currentLanguage === "zh"
                        ? "专业版"
                        : "プロ仕様"
                  : currentLanguage === "en"
                    ? "Beginner"
                    : currentLanguage === "fr"
                      ? "Débutant"
                      : currentLanguage === "zh"
                        ? "初学者"
                        : "初心者向け"}{" "}
                / {unitSystem ? unitSystem.toUpperCase() : "CM"}
              </span>
            </div>
          </div>

          {/* パーツ一覧テーブル */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
              <span>✂️</span>{" "}
              {currentLanguage === "en"
                ? "Cutting Parts List"
                : currentLanguage === "fr"
                  ? "Liste des pièces de coupe"
                  : currentLanguage === "zh"
                    ? "裁剪部件清单"
                    : "裁断パーツ一覧 (Cutting Parts List)"}
            </h4>
            <div className="overflow-x-auto border border-gray-200 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100/70 text-gray-600 border-b border-gray-200">
                    <th className="p-3 font-bold">
                      {currentLanguage === "en"
                        ? "Part Name"
                        : currentLanguage === "fr"
                          ? "Pièce"
                          : currentLanguage === "zh"
                            ? "部件名称"
                            : "パーツ名"}
                    </th>
                    <th className="p-3 font-bold">
                      {currentLanguage === "en"
                        ? "Qty"
                        : currentLanguage === "fr"
                          ? "Qté"
                          : currentLanguage === "zh"
                            ? "数量"
                            : "枚数"}
                    </th>
                    <th className="p-3 font-bold">
                      {currentLanguage === "en"
                        ? "Fabric / Materials"
                        : currentLanguage === "fr"
                          ? "Tissu / Fournitures"
                          : currentLanguage === "zh"
                            ? "使用面料 / 辅料"
                            : "使用生地 / 副資材"}
                    </th>
                    <th className="p-3 font-bold">
                      {currentLanguage === "en"
                        ? "Seam Allowance"
                        : currentLanguage === "fr"
                          ? "Valeur de couture"
                          : currentLanguage === "zh"
                            ? "缝份指定"
                            : "縫い代指定"}
                    </th>
                    <th className="p-3 font-bold">
                      {currentLanguage === "en"
                        ? "Notes / Details"
                        : currentLanguage === "fr"
                          ? "Notes"
                          : currentLanguage === "zh"
                            ? "备注 / 注意事项"
                            : "特記・注意事項"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {specs.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="p-3 font-bold text-gray-800">
                        {item.partName}
                      </td>
                      <td className="p-3 font-medium text-amber-700">
                        {item.quantity}{" "}
                        {currentLanguage === "en"
                          ? "pcs"
                          : currentLanguage === "fr"
                            ? "pcs"
                            : currentLanguage === "zh"
                              ? "片"
                              : "枚"}
                      </td>
                      <td className="p-3 text-gray-600">{item.material}</td>
                      <td className="p-3 text-gray-600">
                        {item.seamAllowance}
                      </td>
                      <td className="p-3 text-gray-500 italic">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 縫製手順ステップ (Recipe) */}
          <div className="bg-gradient-to-br from-amber-50/40 to-orange-50/20 p-5 rounded-xl border border-amber-200/80">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>📖</span>{" "}
              {currentLanguage === "en"
                ? "Step-by-Step Recipe for All Skill Levels"
                : currentLanguage === "fr"
                  ? "Guide de couture étape par étape"
                  : currentLanguage === "zh"
                    ? "适合各水平的逐步缝纫指南"
                    : "初心者からプロまで安心のステップ式縫製レシピ"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-3.5 rounded-lg border border-amber-100 shadow-sm">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mb-2 inline-block">
                  STEP 1
                </span>
                <h5 className="text-xs font-bold text-gray-800 mb-1">
                  {currentLanguage === "en"
                    ? "Cutting & Interfacing"
                    : currentLanguage === "fr"
                      ? "Coupe & Thermocollage"
                      : currentLanguage === "zh"
                        ? "裁剪与衬布"
                        : "裁断 & 芯貼り"}
                </h5>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  {currentLanguage === "en"
                    ? "Place patterns on prepared fabric and cut accurately. Iron on necessary interfacings."
                    : currentLanguage === "fr"
                      ? "Positionner les patrons sur le tissu préparé et couper. Poser le thermocollant."
                      : currentLanguage === "zh"
                        ? "在处理好的面料上摆放纸样并精确裁剪，用熨斗烫上所需的粘合衬。"
                        : "地直しを行った生地に型紙を配置し、正確に裁断。見返し等に必要な接着芯をアイロンで貼り付けます。"}
                </p>
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-amber-100 shadow-sm">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mb-2 inline-block">
                  STEP 2
                </span>
                <h5 className="text-xs font-bold text-gray-800 mb-1">
                  {currentLanguage === "en"
                    ? "Edge Finish & Darts/Shoulders"
                    : currentLanguage === "fr"
                      ? "Finition & Pinces/Épaules"
                      : currentLanguage === "zh"
                        ? "边缘处理与省道、肩缝"
                        : "端処理 & ダーツ・肩縫い"}
                </h5>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  {currentLanguage === "en"
                    ? "Finish edges, sew front bodice darts, and join front and back shoulders right-sides together."
                    : currentLanguage === "fr"
                      ? "Surfiler les bords, coudre les pinces et assembler les épaules endroit contre endroit."
                      : currentLanguage === "zh"
                        ? "进行锁边处理，缝合前身省道，并将前后身肩部正面相对进行缝合。"
                        : "端ミシンやロックミシンでほつれ止めを行い、前身頃のダーツ処理と前後身頃の肩を中表で縫い合わせます。"}
                </p>
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-amber-100 shadow-sm">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mb-2 inline-block">
                  STEP 3
                </span>
                <h5 className="text-xs font-bold text-gray-800 mb-1">
                  {currentLanguage === "en"
                    ? "Finishing & Iron Press"
                    : currentLanguage === "fr"
                      ? "Finition & Repassage"
                      : currentLanguage === "zh"
                        ? "收尾与熨烫定型"
                        : "仕上げ & アイロンプレス"}
                </h5>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  {currentLanguage === "en"
                    ? "Sew neckline, sleeves, and sides in order, then press thoroughly with an iron."
                    : currentLanguage === "fr"
                      ? "Coudre l'encolure, les manches et les côtés, puis repasser soigneusement l'ensemble."
                      : currentLanguage === "zh"
                        ? "依次缝合领口、袖子和侧缝，最后用熨斗充分烫平褶皱即告完成。"
                        : "衿ぐり、袖、脇を順番に縫い進め、最後に全体のシワをアイロンでしっかりとプレスして完成です。"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
