import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ActiveParticle, SimStage } from '../types';
import { MoleculeGraphic } from './MoleculeGraphic';
import { Target, CheckCircle2, AlertCircle } from 'lucide-react';

interface GasSyringeProps {
  currentVolume: number; // 0 to 100 cm³
  stage: SimStage;
  particles: ActiveParticle[];
  predictionValue: number;
  onPredictionChange: (val: number) => void;
  showPredictionTarget: boolean;
  actualFinalVolume?: number;
  hasLiquidCondensed?: boolean;
}

export const GasSyringe: React.FC<GasSyringeProps> = ({
  currentVolume,
  stage,
  particles,
  predictionValue,
  onPredictionChange,
  showPredictionTarget,
  actualFinalVolume,
  hasLiquidCondensed = false,
}) => {
  const scaleRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // SVG coordinate dimensions
  const totalWidth = 640;
  const height = 240;
  const barrelStartX = 80;  // 0 cm³ mark
  const barrelEndX = 540;    // 100 cm³ mark
  const barrelWidth = barrelEndX - barrelStartX; // 460px
  const barrelTopY = 45;
  const barrelBottomY = 175;
  const barrelHeight = barrelBottomY - barrelTopY; // 130px

  // Plunger position: 0 cm³ is at barrelStartX, 100 cm³ is at barrelEndX
  const plungerX = barrelStartX + (Math.max(0, Math.min(100, currentVolume)) / 100) * barrelWidth;

  // Dragging handler for the prediction arrow
  const handlePointerDown = (e: React.PointerEvent) => {
    if (stage !== 'READY_TO_PREDICT') return;
    setIsDragging(true);
    updatePredictionFromEvent(e);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const updatePredictionFromEvent = useCallback((e: React.PointerEvent | PointerEvent) => {
    if (!scaleRef.current) return;
    const rect = scaleRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const relativeX = clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, relativeX / rect.width));
    // Snap to nearest 5 cm³ (or 1 cm³ if fine)
    const rawVal = fraction * 100;
    const snapped = Math.round(rawVal / 5) * 5;
    onPredictionChange(snapped);
  }, [onPredictionChange]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || stage !== 'READY_TO_PREDICT') return;
    updatePredictionFromEvent(e);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {
        // safe
      }
    }
  };

  // Listen to window pointer up if drag releases outside
  useEffect(() => {
    const handleGlobalUp = () => setIsDragging(false);
    window.addEventListener('pointerup', handleGlobalUp);
    return () => window.removeEventListener('pointerup', handleGlobalUp);
  }, []);

  // Tick marks: 0, 10, 20... 100
  const ticks = Array.from({ length: 11 }, (_, i) => i * 10);
  const minorTicks = Array.from({ length: 10 }, (_, i) => i * 10 + 5);

  return (
    <div className="relative w-full flex flex-col items-center select-none bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 md:p-6 overflow-hidden">
      {/* Header status strip */}
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Gas Syringe Chamber (100 cm³)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Syringe Volume:</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold bg-sky-100 text-sky-800 font-mono-num">
            {currentVolume} cm³
          </span>
        </div>
      </div>

      {/* Main SVG Graphic of Calibrated Syringe */}
      <div className="relative w-full max-w-2xl aspect-[640/250] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${totalWidth} ${height}`}
          className="w-full h-full overflow-visible drop-shadow-sm"
        >
          <defs>
            {/* Glass Syringe Gradients */}
            <linearGradient id="glassGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="12%" stopColor="#e0f2fe" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="88%" stopColor="#bae6fd" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.75" />
            </linearGradient>

            <linearGradient id="plungerRodGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="40%" stopColor="#e2e8f0" />
              <stop offset="70%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            <linearGradient id="rubberHeadGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="30%" stopColor="#1e293b" />
              <stop offset="70%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            <linearGradient id="nozzleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="50%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </linearGradient>

            <filter id="glassReflect" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* Left Nozzle / Tip */}
          <path
            d={`M 25,${barrelTopY + 45} L ${barrelStartX},${barrelTopY + 35} L ${barrelStartX},${barrelBottomY - 35} L 25,${barrelBottomY - 45} Z`}
            fill="url(#nozzleGrad)"
            stroke="#0284c7"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Tip Cap */}
          <rect
            x="15"
            y={barrelTopY + 47}
            width="12"
            height={barrelHeight - 94}
            rx="2"
            fill="#0369a1"
          />

          {/* Active Gas Chamber Background (subtle tint when gas present) */}
          {currentVolume > 0 && (
            <rect
              x={barrelStartX}
              y={barrelTopY}
              width={plungerX - barrelStartX}
              height={barrelHeight}
              fill="rgba(240, 249, 255, 0.45)"
              className="transition-all duration-500 ease-out"
            />
          )}

          {/* Liquid condensation droplets if water condensed */}
          {hasLiquidCondensed && (
            <g className="animate-pulse">
              <ellipse cx={barrelStartX + 30} cy={barrelBottomY - 4} rx="16" ry="4" fill="#38bdf8" opacity="0.85" />
              <ellipse cx={barrelStartX + 65} cy={barrelBottomY - 3} rx="12" ry="3.5" fill="#38bdf8" opacity="0.85" />
              <ellipse cx={barrelStartX + 95} cy={barrelBottomY - 4} rx="14" ry="4" fill="#38bdf8" opacity="0.85" />
              <circle cx={barrelStartX + 42} cy={barrelBottomY - 10} r="3" fill="#0284c7" opacity="0.7" />
              <circle cx={barrelStartX + 80} cy={barrelBottomY - 8} r="2.5" fill="#0284c7" opacity="0.7" />
              <text
                x={barrelStartX + 20}
                y={barrelBottomY - 16}
                fill="#0369a1"
                fontSize="10"
                fontWeight="700"
              >
                💧 Liquid H₂O droplets (0 cm³ gas)
              </text>
            </g>
          )}

          {/* Glass Cylinder Outlines */}
          <rect
            x={barrelStartX}
            y={barrelTopY}
            width={barrelWidth}
            height={barrelHeight}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            rx="4"
          />

          {/* Top and Bottom Glass Flanges on open right end */}
          <path
            d={`M ${barrelEndX},${barrelTopY - 14} L ${barrelEndX + 12},${barrelTopY - 14} L ${barrelEndX + 12},${barrelTopY} L ${barrelEndX},${barrelTopY} Z`}
            fill="#cbd5e1"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          <path
            d={`M ${barrelEndX},${barrelBottomY} L ${barrelEndX + 12},${barrelBottomY} L ${barrelEndX + 12},${barrelBottomY + 14} L ${barrelEndX},${barrelBottomY + 14} Z`}
            fill="#cbd5e1"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />

          {/* Graduation Ticks and Scale Numbers */}
          <g>
            {/* Minor ticks (5 cm³) */}
            {minorTicks.map((vol) => {
              const x = barrelStartX + (vol / 100) * barrelWidth;
              return (
                <line
                  key={`minor-${vol}`}
                  x1={x}
                  y1={barrelTopY + 1}
                  x2={x}
                  y2={barrelTopY + 9}
                  stroke="#64748b"
                  strokeWidth="1.2"
                />
              );
            })}

            {/* Major ticks (10 cm³) */}
            {ticks.map((vol) => {
              const x = barrelStartX + (vol / 100) * barrelWidth;
              return (
                <g key={`major-${vol}`}>
                  {/* Top tick mark */}
                  <line
                    x1={x}
                    y1={barrelTopY + 1}
                    x2={x}
                    y2={barrelTopY + 16}
                    stroke="#1e293b"
                    strokeWidth="1.8"
                  />
                  {/* Bottom tick mark */}
                  <line
                    x1={x}
                    y1={barrelBottomY - 12}
                    x2={x}
                    y2={barrelBottomY - 1}
                    stroke="#475569"
                    strokeWidth="1.4"
                  />
                  {/* Number Label */}
                  <text
                    x={x}
                    y={barrelTopY + 30}
                    textAnchor="middle"
                    fill="#334155"
                    fontSize="11"
                    fontWeight="700"
                    className="font-mono-num select-none pointer-events-none"
                  >
                    {vol}
                  </text>
                </g>
              );
            })}
            <text
              x={barrelEndX + 2}
              y={barrelTopY + 30}
              fill="#64748b"
              fontSize="10"
              fontWeight="600"
            >
              cm³
            </text>
          </g>

          {/* SLIDING PLUNGER ASSEMBLY */}
          <g className="transition-all duration-500 ease-out" style={{ transform: `translateX(0px)` }}>
            {/* Rubber Piston Head */}
            <rect
              x={plungerX}
              y={barrelTopY + 2}
              width="20"
              height={barrelHeight - 4}
              rx="3"
              fill="url(#rubberHeadGrad)"
              stroke="#0f172a"
              strokeWidth="1"
            />
            {/* Rubber Ring Ridges */}
            <line
              x1={plungerX + 6}
              y1={barrelTopY + 4}
              x2={plungerX + 6}
              y2={barrelBottomY - 4}
              stroke="#334155"
              strokeWidth="1.5"
            />
            <line
              x1={plungerX + 14}
              y1={barrelTopY + 4}
              x2={plungerX + 14}
              y2={barrelBottomY - 4}
              stroke="#334155"
              strokeWidth="1.5"
            />

            {/* Plunger Shaft / Rod extending to right */}
            <rect
              x={plungerX + 20}
              y={barrelTopY + (barrelHeight / 2) - 15}
              width={barrelEndX - barrelStartX + 30}
              height="30"
              fill="url(#plungerRodGrad)"
              stroke="#64748b"
              strokeWidth="1.2"
              rx="2"
            />
            {/* Cross-rib details on shaft */}
            <line
              x1={plungerX + 20}
              y1={barrelTopY + (barrelHeight / 2)}
              x2={plungerX + 20 + (barrelEndX - barrelStartX + 30)}
              y2={barrelTopY + (barrelHeight / 2)}
              stroke="#94a3b8"
              strokeWidth="2"
            />

            {/* Push Handle / Grip */}
            <rect
              x={plungerX + 20 + (barrelEndX - barrelStartX + 30)}
              y={barrelTopY - 8}
              width="14"
              height={barrelHeight + 16}
              rx="4"
              fill="#475569"
              stroke="#1e293b"
              strokeWidth="1.5"
            />
          </g>

          {/* Glass Front Specular Sheen Overlay */}
          <rect
            x={barrelStartX}
            y={barrelTopY}
            width={barrelWidth}
            height={barrelHeight}
            fill="url(#glassGradient)"
            pointerEvents="none"
            rx="4"
          />

          {/* Actual Result Indicator (Shown when evaluated) */}
          {stage === 'EVALUATED' && actualFinalVolume !== undefined && (
            <g>
              {(() => {
                const actualX = barrelStartX + (actualFinalVolume / 100) * barrelWidth;
                return (
                  <g className="animate-bounce">
                    <line
                      x1={actualX}
                      y1={barrelTopY}
                      x2={actualX}
                      y2={barrelBottomY}
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />
                    <polygon
                      points={`${actualX},${barrelBottomY + 2} ${actualX - 7},${barrelBottomY + 12} ${actualX + 7},${barrelBottomY + 12}`}
                      fill="#10b981"
                    />
                    <text
                      x={actualX}
                      y={barrelBottomY + 24}
                      textAnchor="middle"
                      fill="#059669"
                      fontSize="11"
                      fontWeight="800"
                      className="font-mono-num"
                    >
                      Actual: {actualFinalVolume} cm³
                    </text>
                  </g>
                );
              })()}
            </g>
          )}
        </svg>

        {/* PARTICLES OVERLAY (Static, random scattering within current filled chamber) */}
        <div
          className="absolute pointer-events-none transition-all duration-500 ease-out"
          style={{
            left: `${(barrelStartX / totalWidth) * 100}%`,
            top: `${(barrelTopY / height) * 100}%`,
            width: `${((plungerX - barrelStartX) / totalWidth) * 100}%`,
            height: `${(barrelHeight / height) * 100}%`,
          }}
        >
          {particles.map((p) => {
            const leftPercent = p.normX * 100;
            const topPercent = p.normY * 100;

            return (
              <div
                key={p.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                }}
              >
                <MoleculeGraphic
                  kind={p.kind}
                  size={32 * p.scale}
                  isHighlighted={p.isHighlight}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* DRAGGABLE PREDICTION ARROW & SCALE TRACK */}
      {showPredictionTarget && (
        <div className="w-full max-w-2xl mt-4 pt-3 border-t border-slate-100 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-1.5 px-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Target className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Challenge: Drag the arrow to predict the final syringe gas volume!</span>
            </div>
            <span className="text-sm font-bold text-amber-600 bg-amber-100/80 px-3 py-0.5 rounded-full font-mono-num border border-amber-300">
              Target: {predictionValue} cm³
            </span>
          </div>

          {/* Interactive Slider Track directly aligned with the 0..100 cm³ barrel width */}
          <div className="relative w-full h-12 flex items-center">
            {/* The scale container matching barrelStartX to barrelEndX */}
            <div
              ref={scaleRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className={`relative h-6 bg-slate-100 hover:bg-slate-200/80 rounded-full border border-slate-300 cursor-pointer transition-colors ${
                stage === 'READY_TO_PREDICT' ? 'ring-2 ring-amber-400/50' : 'opacity-80'
              }`}
              style={{
                marginLeft: `${(barrelStartX / totalWidth) * 100}%`,
                width: `${(barrelWidth / totalWidth) * 100}%`,
              }}
            >
              {/* Tick marks on prediction track */}
              {ticks.map((val) => (
                <div
                  key={`track-tick-${val}`}
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-300 pointer-events-none"
                  style={{ left: `${val}%` }}
                />
              ))}

              {/* Draggable Arrow Marker */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-transform ${
                  isDragging ? 'scale-115' : 'hover:scale-105'
                }`}
                style={{
                  left: `${predictionValue}%`,
                  touchAction: 'none',
                }}
              >
                <div className="flex flex-col items-center cursor-grab active:cursor-grabbing group">
                  {/* Upward pointer arrow */}
                  <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[12px] border-b-amber-500 group-hover:border-b-amber-600 drop-shadow-sm" />
                  <div className="w-8 h-8 rounded-full bg-amber-500 group-hover:bg-amber-600 border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-extrabold font-mono-num">
                    {predictionValue}
                  </div>
                </div>
              </div>

              {/* Evaluated Actual Comparison Badge */}
              {stage === 'EVALUATED' && actualFinalVolume !== undefined && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-10"
                  style={{ left: `${actualFinalVolume}%` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-white shadow-md flex items-center justify-center text-white">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-300 font-mono-num whitespace-nowrap mt-0.5">
                      {actualFinalVolume} cm³
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            Click or drag along the bar to select your expected final volume (0 to 100 cm³).
          </p>
        </div>
      )}
    </div>
  );
};
