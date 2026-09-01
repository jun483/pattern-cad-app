// src/components/subviews/Torso3DView.tsx
import { useUIStore } from "../../store/useUIStore";
import { useTranslation, type Language } from "../../i18n/dictionary";

export default function Torso3DView() {
  const { userMode, unitSystem, measurements, fabricStretch, currentLanguage } =
    useUIStore();
  const t = useTranslation(currentLanguage as Language);

  const torsoWidth = 180 + (measurements.bust - 88) * 1.8;
  const torsoDepth = 120 + (measurements.waist - 66) * 1.5;
  const torsoHeight = 240 + (measurements.backLength - 38) * 3;

  return (
    <div className="flex flex-col h-full bg-gray-900 p-6 overflow-y-auto space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-700">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>👕</span> {t.title3D}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {t.language}:{" "}
            <strong className="uppercase text-amber-400">
              {currentLanguage}
            </strong>{" "}
            | {t.desc3D}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 bg-amber-950/80 text-amber-300 font-semibold rounded-full border border-amber-800/60">
            {userMode === "beginner"
              ? `👤 ${t.beginnerVisualizer}`
              : `⚡ ${t.pro3DAnalysis}`}
          </span>
          <span className="text-xs px-3 py-1 bg-blue-950/80 text-blue-300 font-semibold rounded-full border border-blue-800/60 uppercase">
            {unitSystem}
          </span>
        </div>
      </div>

      <div className="flex-1 bg-gray-950 rounded-2xl shadow-inner border border-gray-800 flex flex-col items-center justify-center p-8 relative min-h-[480px]">
        <div className="absolute top-4 left-4 bg-gray-900/95 text-gray-200 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl text-xs space-y-1.5 z-20 border border-gray-700">
          <div className="font-bold border-b border-gray-800 pb-1 mb-1 text-amber-400 flex items-center gap-1.5">
            <span>🧊</span> {t.status3D}
          </div>
          <div className="flex justify-between gap-6">
            <span>{t.torsoWidth}:</span>{" "}
            <strong className="text-amber-300">
              {torsoWidth.toFixed(1)} mm
            </strong>
          </div>
          <div className="flex justify-between gap-6">
            <span>{t.torsoDepth}:</span>{" "}
            <strong className="text-amber-300">
              {torsoDepth.toFixed(1)} mm
            </strong>
          </div>
          <div className="flex justify-between gap-6">
            <span>{t.torsoHeight}:</span>{" "}
            <strong className="text-amber-300">
              {torsoHeight.toFixed(1)} mm
            </strong>
          </div>
          <div className="flex justify-between gap-6">
            <span>{t.hStretchLabel}:</span>{" "}
            <strong className="text-purple-300">
              {fabricStretch.hStretch}%
            </strong>
          </div>
          <div className="flex justify-between gap-6">
            <span>{t.vStretchLabel}:</span>{" "}
            <strong className="text-purple-300">
              {fabricStretch.vStretch}%
            </strong>
          </div>
        </div>

        <div className="absolute inset-4 flex items-center justify-center pointer-events-none">
          <svg
            className="w-full h-full max-w-xl max-h-[400px] text-amber-500/60 transition-all duration-300 drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            viewBox="0 0 400 350"
            fill="none"
          >
            <path
              d="M 160 50 C 160 30, 240 30, 240 50 C 250 80, 280 120, 270 160 C 260 200, 230 220, 230 260 C 230 300, 240 320, 240 320 H 160 C 160 320, 170 300, 170 260 C 170 220, 140 200, 130 160 C 120 120, 150 80, 160 50 Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="currentColor"
              fillOpacity="0.03"
            />
            <ellipse
              cx="200"
              cy="175"
              rx={torsoWidth / 3.2}
              ry={torsoDepth / 2.8}
              stroke="#38bdf8"
              strokeWidth="2.5"
              fill="#38bdf8"
              fillOpacity="0.08"
            />
            <path
              d={`M ${200 - torsoWidth / 3.5} 140 Q 200 ${135 - fabricStretch.vStretch * 0.2} ${200 + torsoWidth / 3.5} 140`}
              stroke="#f43f5e"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <path
              d={`M ${200 - torsoDepth / 3.2} 210 Q 200 ${205 - fabricStretch.hStretch * 0.2} ${200 + torsoDepth / 3.2} 210`}
              stroke="#10b981"
              strokeWidth="2"
            />
            <line
              x1="200"
              y1="40"
              x2="200"
              y2="330"
              stroke="#64748b"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          </svg>
        </div>

        <div className="z-10 text-center bg-gray-900/90 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg border border-gray-700 mt-44">
          <p className="text-xs font-bold text-gray-200 mb-0.5">
            {t.footer3DTitle}
          </p>
          <p className="text-[11px] text-gray-400">{t.footer3DDesc}</p>
        </div>
      </div>
    </div>
  );
}
