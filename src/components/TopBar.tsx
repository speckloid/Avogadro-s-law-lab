import React from 'react';
import { ReactionLevel } from '../types';
import { 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Trophy, 
  Flame, 
  Atom,
  RotateCcw
} from 'lucide-react';

interface TopBarProps {
  currentLevel: ReactionLevel;
  onSelectLevel: (lvl: ReactionLevel) => void;
  score: number;
  attempts: number;
  correctCount: number;
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenHelp: () => void;
  onResetScore: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentLevel,
  onSelectLevel,
  score,
  attempts,
  correctCount,
  isMuted,
  onToggleSound,
  onOpenHelp,
  onResetScore,
}) => {
  const levels: { level: ReactionLevel; label: string; short: string }[] = [
    { level: 1, label: 'Level 1: Simple Ratios', short: 'Level 1' },
    { level: 2, label: 'Level 2: Odd Ratios', short: 'Level 2' },
    { level: 3, label: 'Level 3: Limiting & Excess', short: 'Level 3' },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200/90 shadow-2xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <Atom className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                Avogadro’s Gas Syringe Lab
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Gaseous Stoichiometry & Limiting Reagent Simulator
            </p>
          </div>
        </div>

        {/* Center: Level Tabs */}
        <div className="flex items-center p-1 bg-slate-100/90 rounded-2xl border border-slate-200">
          {levels.map((lvl) => {
            const isActive = currentLevel === lvl.level;
            return (
              <button
                key={lvl.level}
                onClick={() => onSelectLevel(lvl.level)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-sky-800 shadow-xs ring-1 ring-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <span className="hidden sm:inline">{lvl.label}</span>
                <span className="sm:hidden">{lvl.short}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Score, Sound & Help Controls */}
        <div className="flex items-center gap-3">
          {/* Score tracker */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-1 text-amber-600 font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-mono-num">{score}</span>
              <span className="text-[10px] text-slate-400 font-normal">pts</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="text-slate-600 font-medium">
              <span className="text-emerald-600 font-bold font-mono-num">{correctCount}</span>
              <span className="text-slate-400 font-mono-num">/{attempts}</span>
            </div>
            {attempts > 0 && (
              <button
                onClick={onResetScore}
                title="Reset Score"
                className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 cursor-pointer ml-0.5"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-sky-600" />}
          </button>

          {/* Help modal button */}
          <button
            onClick={onOpenHelp}
            title="Open Theory & Guide"
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-indigo-600" />
          </button>
        </div>
      </div>
    </header>
  );
};
