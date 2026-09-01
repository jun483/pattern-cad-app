// src/components/subviews/View3DView.tsx
import { useEffect, useRef, useState } from "react";
import { useUIStore } from "../../store/useUIStore";

export default function View3DView() {
  const store = useUIStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bust = store.measurements?.bust ?? 88;
  const waist = store.measurements?.waist ?? 68;
  const backLength = store.measurements?.backLength ?? 38;
  const activeCategory = store.activeCategory;
  const hStretch = store.fabricStretch?.hStretch ?? 0;
  const vStretch = store.fabricStretch?.vStretch ?? 0;

  const [wireframeMode, setWireframeMode] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1.0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 背景グラデーション
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, "#090d16");
      bgGrad.addColorStop(1, "#1e293b");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2 + 15);

      // 3D回転を模したスケーリング・座標計算
      const rotCos = Math.cos(angle);
      const scaleFactor = 1.0 + Math.sin(angle * 0.5) * 0.02;

      // ヌード寸法およびストレッチ率による変形
      const stretchH = 1 + hStretch / 100;
      const stretchV = 1 + vStretch / 100;

      const radiusX = (70 + (bust - 88) * 0.9) * scaleFactor * (1 / stretchH);
      const radiusY =
        (130 + (backLength - 38) * 0.8) * scaleFactor * (1 / stretchV);
      const waistX = (55 + (waist - 68) * 0.7) * scaleFactor;
      const waistY = radiusY * 0.5; // ← 未定義だったwaistYを正しく定義

      // 影の描画
      ctx.beginPath();
      ctx.ellipse(0, 155, radiusX * 0.85, 18, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      // トルソーボディ（ベースレイヤー）
      ctx.beginPath();
      ctx.moveTo(-radiusX, -radiusY * 0.6);
      ctx.bezierCurveTo(
        -radiusX * 1.1,
        -radiusY * 0.2,
        -waistX,
        waistY * 0.2,
        -waistX * 0.9,
        waistY,
      );
      ctx.lineTo(waistX * 0.9, waistY);
      ctx.bezierCurveTo(
        waistX,
        waistY * 0.2,
        radiusX * 1.1,
        -radiusY * 0.2,
        radiusX,
        -radiusY * 0.6,
      );
      ctx.closePath();

      const bodyGrad = ctx.createRadialGradient(
        -20,
        -40,
        10,
        0,
        0,
        radiusX * 1.8,
      );
      bodyGrad.addColorStop(0, "#38bdf8");
      bodyGrad.addColorStop(0.5, "#0284c7");
      bodyGrad.addColorStop(1, "#0369a1");
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      ctx.lineWidth = wireframeMode ? 2 : 3;
      ctx.strokeStyle = wireframeMode ? "#f59e0b" : "#7dd3fc";
      ctx.stroke();

      // トルソーの首と肩のライン
      ctx.beginPath();
      ctx.arc(0, -radiusY * 0.85, 22, 0, Math.PI * 2);
      ctx.fillStyle = "#0284c7";
      ctx.fill();
      ctx.stroke();

      // 肩のガイドライン
      ctx.beginPath();
      ctx.moveTo(-radiusX * 1.25, -radiusY * 0.6);
      ctx.lineTo(radiusX * 1.25, -radiusY * 0.6);
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // ファブリック（布）のドレープ表現
      if (!wireframeMode) {
        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          radiusX * 0.95 * Math.abs(rotCos),
          radiusY * 0.85,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = "rgba(244, 63, 94, 0.25)";
        ctx.fill();
        ctx.strokeStyle = "#fda4af";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 回転軸のセンター線
      ctx.beginPath();
      ctx.moveTo(0, -radiusY);
      ctx.lineTo(0, waistY);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.stroke();

      ctx.restore();

      angle += 0.015 * rotationSpeed;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    bust,
    waist,
    backLength,
    activeCategory,
    hStretch,
    vStretch,
    wireframeMode,
    rotationSpeed,
  ]);

  return (
    <div className="flex-1 flex flex-col items-center justify-start bg-slate-900 text-white p-6 space-y-4">
      <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-800/80 px-6 py-4 rounded-2xl border border-slate-700 backdrop-blur">
        <div>
          <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
            <span>👗</span> 3Dトルソー着せ替えシミュレーション
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            実物生地ストレッチ補正およびリアルタイム立体トルソーレンダリング
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`text-xs px-3 py-1.5 rounded-lg font-bold transition border ${
              wireframeMode
                ? "bg-amber-500 text-slate-950 border-amber-400"
                : "bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600"
            }`}
          >
            🔲 ワイヤーフレーム: {wireframeMode ? "ON" : "OFF"}
          </button>
          <select
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
            className="text-xs px-2.5 py-1.5 bg-slate-700 text-slate-200 border border-slate-600 rounded-lg focus:outline-none cursor-pointer"
          >
            <option value={0}>回転停止</option>
            <option value={0.5}>低速回転</option>
            <option value={1.0}>標準回転</option>
            <option value={2.0}>高速回転</option>
          </select>
        </div>
      </div>

      <div className="relative w-full max-w-4xl bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl p-4 flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={800}
          height={460}
          className="w-full h-[460px] rounded-xl bg-slate-950 shadow-inner object-contain"
        />

        <div className="w-full flex flex-wrap justify-around items-center mt-4 px-4 py-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
          <div>
            アイテム:{" "}
            <strong className="text-amber-400 uppercase">
              {activeCategory}
            </strong>
          </div>
          <div>
            ヌードバスト: <strong className="text-sky-400">{bust} cm</strong>
          </div>
          <div>
            ヌードウエスト: <strong className="text-sky-400">{waist} cm</strong>
          </div>
          <div>
            ストレッチ補正(H/V):{" "}
            <strong className="text-emerald-400">
              {hStretch}% / {vStretch}%
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
