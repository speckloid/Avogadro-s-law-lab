import React from 'react';
import { ParticleKind } from '../types';

interface MoleculeGraphicProps {
  kind: ParticleKind;
  size?: number; // base diameter in px
  isHighlighted?: boolean;
  className?: string;
}

/**
 * Renders PhET-inspired cartoon atoms with 3D radial specular highlights,
 * gradient sphere shading, and distinct chemical colors.
 */
export const MoleculeGraphic: React.FC<MoleculeGraphicProps> = ({
  kind,
  size = 32,
  isHighlighted = false,
  className = '',
}) => {
  // Helper to render a shaded glossy atom sphere
  const renderAtom = (
    cx: number,
    cy: number,
    r: number,
    baseColor: string,
    highlightColor: string = '#ffffff',
    shadowColor: string = '#1e293b'
  ) => {
    const gradId = `grad-${baseColor.replace('#', '')}-${Math.round(cx)}-${Math.round(cy)}`;
    return (
      <g key={`${cx}-${cy}`}>
        <defs>
          <radialGradient id={gradId} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor={highlightColor} stopOpacity="0.9" />
            <stop offset="35%" stopColor={baseColor} />
            <stop offset="85%" stopColor={baseColor} />
            <stop offset="100%" stopColor={shadowColor} stopOpacity="0.8" />
          </radialGradient>
        </defs>
        {/* Soft back shadow */}
        <circle cx={cx + 1} cy={cy + 1.5} r={r} fill="rgba(0,0,0,0.15)" />
        {/* Base shaded sphere */}
        <circle cx={cx} cy={cy} r={r} fill={`url(#${gradId})`} stroke="rgba(0,0,0,0.25)" strokeWidth="0.75" />
        {/* Crisp specular gloss highlight reflection */}
        <ellipse
          cx={cx - r * 0.32}
          cy={cy - r * 0.32}
          rx={r * 0.35}
          ry={r * 0.22}
          transform={`rotate(-30 ${cx - r * 0.32} ${cy - r * 0.32})`}
          fill="#ffffff"
          opacity="0.85"
        />
        <circle
          cx={cx - r * 0.15}
          cy={cy - r * 0.45}
          r={r * 0.1}
          fill="#ffffff"
          opacity="0.7"
        />
      </g>
    );
  };

  // Pre-defined color palettes for atoms
  const H_COLOR = '#f1f5f9'; // white / light gray (Hydrogen)
  const H_SHADOW = '#94a3b8';
  const O_COLOR = '#ef4444'; // Red (Oxygen)
  const O_SHADOW = '#991b1b';
  const CL_COLOR = '#22c55e'; // Green (Chlorine)
  const CL_SHADOW = '#15803d';
  const N_COLOR = '#3b82f6'; // Blue (Nitrogen)
  const N_SHADOW = '#1d4ed8';
  const C_COLOR = '#475569'; // Slate dark gray (Carbon)
  const C_SHADOW = '#0f172a';
  const S_COLOR = '#eab308'; // Yellow (Sulfur)
  const S_SHADOW = '#854d0e';

  let content: React.ReactNode = null;
  const s = size;
  const mid = s / 2;

  switch (kind) {
    case 'H2': {
      // Two small white spheres bonded horizontally
      const r = s * 0.26;
      content = (
        <>
          {renderAtom(mid - r * 0.7, mid, r, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid + r * 0.7, mid, r, H_COLOR, '#ffffff', H_SHADOW)}
        </>
      );
      break;
    }
    case 'O2': {
      // Two medium red spheres bonded horizontally
      const r = s * 0.3;
      content = (
        <>
          {renderAtom(mid - r * 0.7, mid, r, O_COLOR, '#fca5a5', O_SHADOW)}
          {renderAtom(mid + r * 0.7, mid, r, O_COLOR, '#fca5a5', O_SHADOW)}
        </>
      );
      break;
    }
    case 'H2O': {
      // Bent molecule: 1 central red Oxygen + 2 white Hydrogens at ~105 deg
      const rO = s * 0.31;
      const rH = s * 0.22;
      content = (
        <>
          {renderAtom(mid - rO * 0.85, mid + rO * 0.55, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid + rO * 0.85, mid + rO * 0.55, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid, mid - rO * 0.2, rO, O_COLOR, '#fca5a5', O_SHADOW)}
        </>
      );
      break;
    }
    case 'Cl2': {
      // Two green spheres bonded
      const r = s * 0.32;
      content = (
        <>
          {renderAtom(mid - r * 0.7, mid, r, CL_COLOR, '#86efac', CL_SHADOW)}
          {renderAtom(mid + r * 0.7, mid, r, CL_COLOR, '#86efac', CL_SHADOW)}
        </>
      );
      break;
    }
    case 'HCl': {
      // 1 white Hydrogen + 1 larger green Chlorine
      const rCl = s * 0.32;
      const rH = s * 0.22;
      content = (
        <>
          {renderAtom(mid - rCl * 0.65, mid, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid + rCl * 0.45, mid, rCl, CL_COLOR, '#86efac', CL_SHADOW)}
        </>
      );
      break;
    }
    case 'N2': {
      // Two royal blue spheres
      const r = s * 0.3;
      content = (
        <>
          {renderAtom(mid - r * 0.7, mid, r, N_COLOR, '#93c5fd', N_SHADOW)}
          {renderAtom(mid + r * 0.7, mid, r, N_COLOR, '#93c5fd', N_SHADOW)}
        </>
      );
      break;
    }
    case 'NH3': {
      // Trigonal pyramid: 1 central blue Nitrogen + 3 white Hydrogens
      const rN = s * 0.3;
      const rH = s * 0.19;
      content = (
        <>
          {renderAtom(mid - rN * 0.9, mid + rN * 0.6, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid, mid + rN * 0.8, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid + rN * 0.9, mid + rN * 0.6, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid, mid - rN * 0.25, rN, N_COLOR, '#93c5fd', N_SHADOW)}
        </>
      );
      break;
    }
    case 'NO': {
      // 1 blue N + 1 red O
      const r = s * 0.3;
      content = (
        <>
          {renderAtom(mid - r * 0.65, mid, r, N_COLOR, '#93c5fd', N_SHADOW)}
          {renderAtom(mid + r * 0.65, mid, r, O_COLOR, '#fca5a5', O_SHADOW)}
        </>
      );
      break;
    }
    case 'NO2': {
      // Bent: 1 central N (blue) + 2 O (red)
      const rN = s * 0.28;
      const rO = s * 0.28;
      content = (
        <>
          {renderAtom(mid - rN * 0.85, mid + rN * 0.5, rO, O_COLOR, '#fca5a5', O_SHADOW)}
          {renderAtom(mid + rN * 0.85, mid + rN * 0.5, rO, O_COLOR, '#fca5a5', O_SHADOW)}
          {renderAtom(mid, mid - rN * 0.3, rN, N_COLOR, '#93c5fd', N_SHADOW)}
        </>
      );
      break;
    }
    case 'CH4': {
      // Methane: 1 central Carbon (slate) + 4 Hydrogens (white)
      const rC = s * 0.3;
      const rH = s * 0.18;
      content = (
        <>
          {/* 3 surrounding/rear Hydrogens */}
          {renderAtom(mid, mid - rC * 0.95, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid - rC * 0.85, mid + rC * 0.6, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid + rC * 0.85, mid + rC * 0.6, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {/* Central Carbon */}
          {renderAtom(mid, mid, rC, C_COLOR, '#cbd5e1', C_SHADOW)}
          {/* Front Hydrogen */}
          {renderAtom(mid, mid + rC * 0.35, rH * 1.05, H_COLOR, '#ffffff', H_SHADOW)}
        </>
      );
      break;
    }
    case 'C2H4': {
      // Ethene: 2 Carbon (slate) + 4 Hydrogen (white)
      const rC = s * 0.26;
      const rH = s * 0.16;
      content = (
        <>
          {renderAtom(mid - rC * 1.4, mid - rC * 0.8, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid - rC * 1.4, mid + rC * 0.8, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid + rC * 1.4, mid - rC * 0.8, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid + rC * 1.4, mid + rC * 0.8, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid - rC * 0.65, mid, rC, C_COLOR, '#cbd5e1', C_SHADOW)}
          {renderAtom(mid + rC * 0.65, mid, rC, C_COLOR, '#cbd5e1', C_SHADOW)}
        </>
      );
      break;
    }
    case 'C2H6': {
      // Ethane
      const rC = s * 0.26;
      const rH = s * 0.16;
      content = (
        <>
          {renderAtom(mid - rC * 1.4, mid - rC * 0.7, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid - rC * 1.4, mid + rC * 0.7, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid + rC * 1.4, mid - rC * 0.7, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid + rC * 1.4, mid + rC * 0.7, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid, mid - rC * 1.0, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid, mid + rC * 1.0, rH, H_COLOR, '#ffffff', H_SHADOW)}
          {renderAtom(mid - rC * 0.6, mid, rC, C_COLOR, '#cbd5e1', C_SHADOW)}
          {renderAtom(mid + rC * 0.6, mid, rC, C_COLOR, '#cbd5e1', C_SHADOW)}
        </>
      );
      break;
    }
    case 'CO': {
      const r = s * 0.28;
      content = (
        <>
          {renderAtom(mid - r * 0.65, mid, r, C_COLOR, '#cbd5e1', C_SHADOW)}
          {renderAtom(mid + r * 0.65, mid, r, O_COLOR, '#fca5a5', O_SHADOW)}
        </>
      );
      break;
    }
    case 'CO2': {
      // Linear O=C=O
      const rC = s * 0.26;
      const rO = s * 0.27;
      content = (
        <>
          {renderAtom(mid - rC * 1.1, mid, rO, O_COLOR, '#fca5a5', O_SHADOW)}
          {renderAtom(mid, mid, rC, C_COLOR, '#cbd5e1', C_SHADOW)}
          {renderAtom(mid + rC * 1.1, mid, rO, O_COLOR, '#fca5a5', O_SHADOW)}
        </>
      );
      break;
    }
    case 'SO2': {
      const rS = s * 0.3;
      const rO = s * 0.26;
      content = (
        <>
          {renderAtom(mid - rS * 0.9, mid + rS * 0.5, rO, O_COLOR, '#fca5a5', O_SHADOW)}
          {renderAtom(mid + rS * 0.9, mid + rS * 0.5, rO, O_COLOR, '#fca5a5', O_SHADOW)}
          {renderAtom(mid, mid - rS * 0.3, rS, S_COLOR, '#fef08a', S_SHADOW)}
        </>
      );
      break;
    }
    case 'SO3': {
      const rS = s * 0.3;
      const rO = s * 0.24;
      content = (
        <>
          {renderAtom(mid, mid - rS * 0.9, rO, O_COLOR, '#fca5a5', O_SHADOW)}
          {renderAtom(mid - rS * 0.85, mid + rS * 0.6, rO, O_COLOR, '#fca5a5', O_SHADOW)}
          {renderAtom(mid + rS * 0.85, mid + rS * 0.6, rO, O_COLOR, '#fca5a5', O_SHADOW)}
          {renderAtom(mid, mid, rS, S_COLOR, '#fef08a', S_SHADOW)}
        </>
      );
      break;
    }
    default: {
      const r = s * 0.28;
      content = renderAtom(mid, mid, r, '#64748b', '#f8fafc', '#334155');
    }
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-300 ${
        isHighlighted ? 'scale-125 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-pulse' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {content}
      </svg>
    </div>
  );
};
