import React from 'react';
import { ChemicalSpecies, SimStage } from '../types';
import { MoleculeGraphic } from './MoleculeGraphic';
import { BarChart3 } from 'lucide-react';

interface VolumeBarChartProps {
  reactant1: ChemicalSpecies;
  reactant2: ChemicalSpecies;
  product1: ChemicalSpecies;
  product2?: ChemicalSpecies;
  vol1: number;
  vol2: number;
  volP1: number;
  volP2?: number;
  totalGas: number;
  stage: SimStage;
  highlightedTarget?: 'total' | 'leftover_r1' | 'leftover_r2' | 'product1' | 'product2';
}

export const VolumeBarChart: React.FC<VolumeBarChartProps> = ({
  reactant1,
  reactant2,
  product1,
  product2,
  vol1,
  vol2,
  volP1,
  volP2 = 0,
  totalGas,
  highlightedTarget,
}) => {
  const yTicks = [100, 80, 60, 40, 20, 0];

  const bars = [
    {
      id: 'r1',
      targetKey: 'leftover_r1',
      label: reactant1.formula,
      sublabel: `(${reactant1.state})`,
      name: reactant1.name,
      volume: vol1,
      color: reactant1.color,
      accentColor: reactant1.accentColor,
      kind: reactant1.particleKind,
      isProduct: false,
    },
    {
      id: 'r2',
      targetKey: 'leftover_r2',
      label: reactant2.formula,
      sublabel: `(${reactant2.state})`,
      name: reactant2.name,
      volume: vol2,
      color: reactant2.color,
      accentColor: reactant2.accentColor,
      kind: reactant2.particleKind,
      isProduct: false,
    },
    {
      id: 'p1',
      targetKey: 'product1',
      label: product1.formula,
      sublabel: `(${product1.state})`,
      name: product1.name,
      volume: volP1,
      color: product1.color,
      accentColor: product1.accentColor,
      kind: product1.particleKind,
      isProduct: true,
      isLiquid: product1.state === 'l',
    },
    ...(product2
      ? [
          {
            id: 'p2',
            targetKey: 'product2',
            label: product2.formula,
            sublabel: `(${product2.state})`,
            name: product2.name,
            volume: volP2,
            color: product2.color,
            accentColor: product2.accentColor,
            kind: product2.particleKind,
            isProduct: true,
            isLiquid: product2.state === 'l',
          },
        ]
      : []),
    {
      id: 'total',
      targetKey: 'total',
      label: 'Total Gas',
      sublabel: '(gases)',
      name: 'Total Volume',
      volume: totalGas,
      color: '#10b981', // emerald-500
      accentColor: '#047857',
      kind: null,
      isTotal: true,
    },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 md:p-6 overflow-hidden select-none">
      {/* Chart Header */}
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Gas Volume Balance
          </span>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Scale: 0 – 100 cm³
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="relative flex-1 min-h-[220px] flex items-end pl-8 pr-2 pb-12 pt-6">
        {/* Horizontal Grid Lines and Y-Axis Ticks */}
        <div className="absolute inset-x-8 top-6 bottom-12 pointer-events-none flex flex-col justify-between">
          {yTicks.map((tick) => (
            <div key={`ytick-${tick}`} className="relative w-full flex items-center">
              <span className="absolute -left-8 text-[10px] font-bold text-slate-400 font-mono-num w-6 text-right">
                {tick}
              </span>
              <div
                className={`w-full border-b ${
                  tick === 0 ? 'border-slate-300' : 'border-slate-100'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Vertical Bars Container */}
        <div className="relative z-10 w-full h-full flex items-end justify-around gap-2 md:gap-3">
          {bars.map((b) => {
            const heightPercent = Math.min(100, Math.max(0, b.volume));
            const isTargeted = highlightedTarget === b.targetKey;

            return (
              <div
                key={b.id}
                className="relative flex-1 flex flex-col items-center h-full justify-end group"
              >
                {/* Floating Volume Value Label & Target Marker */}
                <div
                  className="absolute transition-all duration-500 ease-out z-20 flex flex-col items-center"
                  style={{ bottom: `calc(${heightPercent}% + 4px)` }}
                >
                  {isTargeted && (
                    <span 
                      className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full mb-0.5 shadow-2xs whitespace-nowrap animate-bounce"
                      style={{
                        backgroundColor: `${b.accentColor}`,
                        color: '#ffffff',
                      }}
                    >
                      Target
                    </span>
                  )}
                  <span
                    className={`px-1.5 py-0.5 rounded text-[11px] font-extrabold font-mono-num shadow-xs transition-transform group-hover:scale-110 ${
                      isTargeted
                        ? 'ring-2 text-white'
                        : b.isTotal
                        ? 'bg-emerald-600 text-white shadow-emerald-200'
                        : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                    style={isTargeted ? { backgroundColor: b.accentColor, borderColor: b.accentColor } : undefined}
                  >
                    {b.volume}
                    <span className="text-[9px] font-normal ml-0.5">cm³</span>
                  </span>
                </div>

                {/* The Animated Bar */}
                <div
                  className={`w-full max-w-[48px] rounded-t-lg transition-all duration-500 ease-out relative overflow-hidden ${
                    isTargeted ? 'ring-2 ring-offset-1' : b.isTotal ? 'ring-2 ring-emerald-400/40' : ''
                  }`}
                  style={{
                    height: `${heightPercent}%`,
                    minHeight: b.volume > 0 ? '6px' : '0px',
                    backgroundColor: b.color,
                    // @ts-expect-error Tailwind ring color override
                    '--tw-ring-color': isTargeted ? b.accentColor : undefined,
                  }}
                >
                  {/* Glossy vertical specular highlight sheen */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-black/15 pointer-events-none" />
                  {/* Subtle top cap reflection */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-white/40" />

                  {/* Liquid water indicator inside bar if condensed */}
                  {b.isLiquid && b.volume === 0 && (
                    <div className="absolute bottom-1 inset-x-0 text-center text-[9px] text-blue-600 font-bold">
                      Liquid
                    </div>
                  )}
                </div>

                {/* Bottom Axis Label & Molecule Icon */}
                <div className="absolute -bottom-11 flex flex-col items-center text-center">
                  <div className="flex items-center gap-0.5">
                    <span
                      className={`text-xs font-black tracking-tight ${
                        b.isTotal ? 'text-emerald-700' : 'text-slate-800'
                      }`}
                    >
                      {b.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {b.sublabel}
                    </span>
                  </div>

                  {/* Mini molecule thumbnail */}
                  {b.kind && (
                    <div className="mt-0.5 opacity-85 group-hover:opacity-100 transition-opacity">
                      <MoleculeGraphic kind={b.kind} size={18} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
