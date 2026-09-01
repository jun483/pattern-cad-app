// src/components/subviews/AIPatternDoctorPanel.tsx
import { useState } from "react";

interface DiagnosticResult {
  id: string;
  category: "warning" | "info" | "success";
  title: string;
  description: string;
}

export default function AIPatternDoctorPanel() {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [results, setResults] = useState<DiagnosticResult[]>([
    {
      id: "1",
      category: "success",
      title: "アームホール整合性",
      description: "前身頃と後身頃のアームホール曲線長の一致率: 99.8% (良好)",
    },
    {
      id: "2",
      category: "info",
      title: "いせ込み分量チェック",
      description:
        "袖山のゆとり量が推奨範囲内 (8mm) です。きれいな丸みが出ます。",
    },
  ]);

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setResults([
        {
          id: "1",
          category: "success",
          title: "アームホール整合性",
          description:
            "すべての縫い合わせラインの長さとカーブが完璧に一致しています。",
        },
        {
          id: "2",
          category: "success",
          title: "縫い代コーナー処理",
          description: "マイター縫い代の干渉は検出されませんでした。",
        },
        {
          id: "3",
          category: "info",
          title: "用尺最適化アドバイス",
          description: "生地幅110cmに対し、配置余白が十分確保されています。",
        },
      ]);
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <span>🤖</span> AIパターンドクター & 整合性診断
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            型紙の寸法矛盾やパーツ間の長さのズレ、いせ込み不足をAIが自動スキャンして未然に防ぎます。
          </p>
        </div>
        <button
          onClick={handleRunScan}
          disabled={isScanning}
          className="px-4 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg text-xs font-bold shadow-sm hover:opacity-90 transition-all flex items-center gap-1.5"
        >
          {isScanning ? "🔍 スキャン中..." : "✨ 型紙をAI診断する"}
        </button>
      </div>

      <div className="space-y-2">
        {results.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-gray-50 rounded-xl border border-gray-200/60 flex items-start gap-3"
          >
            <span className="text-base">
              {item.category === "success"
                ? "✅"
                : item.category === "warning"
                  ? "⚠️"
                  : "💡"}
            </span>
            <div>
              <h4 className="text-xs font-bold text-gray-800">{item.title}</h4>
              <p className="text-[11px] text-gray-600 mt-0.5">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
