import React from 'react';
import { ReactionDefinition, SimStage, ReactionOutcome } from '../types';
import { MoleculeGraphic } from './MoleculeGraphic';
import { 
  ArrowRight, 
  FlaskConical, 
  Sparkles, 
  RotateCcw, 
  HelpCircle,
  Trophy,
  Target
} from 'lucide-react';

interface ReactionControlsProps {
  reaction: ReactionDefinition;
  stage: SimStage;
  currentPopIndex: number;
  totalPops: number;
  outcome: ReactionOutcome;
  predictionValue: number;
  targetValue: number;
  targetDescription: string;
  targetColor: string;
  onAddGas1: () => void;
  onAddGas2: () => void;
  onInitiateReaction: () => void;
  onNextReaction: () => void;
  onResetMixture: () => void;
  onOpenHelp: () => void;
}

export const ReactionControls: React.FC<ReactionControlsProps> = ({
  reaction,
  stage,
  currentPopIndex,
  totalPops,
  outcome,
  predictionValue,
  targetValue,
  targetDescription,
  targetColor,
  onAddGas1,
  onAddGas2,
  onInitiateReaction,
  onNextReaction,
  onResetMixture,
  onOpenHelp,
}) => {
  const r1 = reaction.reactant1;
  const r2 = reaction.reactant2;
  const p1 = reaction.product1;
  const p2 = reaction.product2;

  // Evaluate accuracy against target value
  const isAccurate = Math.abs(predictionValue - targetValue) <= 2;
  const delta = Math.abs(predictionValue - targetValue);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 md:p-6 select-none flex flex-col gap-4">
      {/* Chemical Equation Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex flex-wrap items-center justify-center gap-2 text-base md:text-lg font-bold">
          {/* Reactant 1 Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <span className="text-sky-700 font-extrabold">{r1.coefficient > 1 ? r1.coefficient : ''}</span>
            <span className="text-slate-900">{r1.formula}</span>
            <span className="text-xs font-semibold text-slate-400">({r1.state})</span>
            <MoleculeGraphic kind={r1.particleKind} size={20} />
          </div>

          <span className="text-slate-400 font-black">+</span>

          {/* Reactant 2 Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <span className="text-rose-700 font-extrabold">{r2.coefficient > 1 ? r2.coefficient : ''}</span>
            <span className="text-slate-900">{r2.formula}</span>
            <span className="text-xs font-semibold text-slate-400">({r2.state})</span>
            <MoleculeGraphic kind={r2.particleKind} size={20} />
          </div>

          <ArrowRight className="w-5 h-5 text-slate-400 mx-1" />

          {/* Product 1 Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border shadow-2xs ${
              p1.state === 'l'
                ? 'bg-blue-50/80 border-blue-200 text-blue-900'
                : 'bg-indigo-50/80 border-indigo-200 text-indigo-900'
            }`}
          >
            <span className="font-extrabold">{p1.coefficient > 1 ? p1.coefficient : ''}</span>
            <span>{p1.formula}</span>
            <span
              className={`text-xs font-bold px-1 rounded ${
                p1.state === 'l' ? 'bg-blue-200 text-blue-800' : 'text-indigo-400'
              }`}
            >
              ({p1.state})
            </span>
            <MoleculeGraphic kind={p1.particleKind} size={20} />
          </div>

          {/* Optional Product 2 (e.g. in Methane Reforming) */}
          {p2 && (
            <>
              <span className="text-slate-400 font-black">+</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                <span className="text-sky-700 font-extrabold">{p2.coefficient > 1 ? p2.coefficient : ''}</span>
                <span>{p2.formula}</span>
                <span className="text-xs font-semibold text-slate-400">({p2.state})</span>
                <MoleculeGraphic kind={p2.particleKind} size={20} />
              </div>
            </>
          )}
        </div>

        {/* Quick Hint / Guide button */}
        <button
          onClick={onOpenHelp}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 bg-slate-50 hover:bg-sky-50 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Avogadro's Rule Guide</span>
        </button>
      </div>

      {/* Dynamic Action Area matching user's requested step sequence */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 pt-1">
        {/* Step Instructions / Status */}
        <div className="flex-1">
          {stage === 'EMPTY' && (
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 text-xs font-extrabold flex items-center justify-center">
                1
              </span>
              <p className="text-sm">
                Begin by injecting <strong className="text-sky-700">{reaction.defaultVolume1} cm³</strong> of{' '}
                <strong className="text-slate-900">{r1.name} ({r1.formula})</strong> into the syringe.
              </p>
            </div>
          )}

          {stage === 'ADDED_GAS_1' && (
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs font-extrabold flex items-center justify-center">
                2
              </span>
              <p className="text-sm">
                Now add <strong className="text-rose-700">{reaction.defaultVolume2} cm³</strong> of{' '}
                <strong className="text-slate-900">{r2.name} ({r2.formula})</strong> into the mixture.
              </p>
            </div>
          )}

          {stage === 'READY_TO_PREDICT' && (
            <div className="flex items-center gap-2.5 text-slate-900 font-medium">
              <span 
                className="w-6 h-6 rounded-full text-white text-xs font-black flex items-center justify-center shrink-0 shadow-xs"
                style={{ backgroundColor: targetColor }}
              >
                3
              </span>
              <p className="text-sm leading-snug">
                <span 
                  className="font-black px-2 py-0.5 rounded text-[11px] mr-1.5 uppercase tracking-wide inline-block border"
                  style={{ 
                    backgroundColor: `${targetColor}18`, 
                    borderColor: `${targetColor}50`,
                    color: targetColor === '#facc15' ? '#a16207' : targetColor 
                  }}
                >
                  Challenge
                </span>
                {targetDescription}. Drag the matching slider above, then click <strong>React!</strong>
              </p>
            </div>
          )}

          {stage === 'REACTING' && (
            <div className="flex items-center gap-2 text-indigo-900 font-semibold animate-pulse">
              <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
              <p className="text-sm">
                Reaction in progress! Pop {currentPopIndex} of {totalPops}...
              </p>
            </div>
          )}

          {stage === 'EVALUATED' && (
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                {isAccurate ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                    Spot On! (+100 pts)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                    Off by {delta} cm³
                  </span>
                )}
                <span className="text-xs text-slate-500">
                  Predicted: <strong className="font-mono-num">{predictionValue} cm³</strong> • Actual Target:{' '}
                  <strong className="text-emerald-700 font-mono-num">{targetValue} cm³</strong>
                  {reaction.questionTarget && reaction.questionTarget !== 'total' && (
                    <span className="ml-1 text-slate-400">
                      (Total Gas in Syringe: {outcome.totalFinalGas} cm³)
                    </span>
                  )}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-normal mt-0.5 leading-relaxed">
                {reaction.hint}
                {outcome.limitingSpecies !== 'none' && (
                  <span className="block mt-1 text-indigo-700 font-medium">
                    ⚠️ {outcome.excessVolume} cm³ of {outcome.excessSpeciesName} remained in excess because{' '}
                    {outcome.limitingSpecies === 'reactant1' ? r1.formula : r2.formula} was the limiting reagent.
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {stage === 'EMPTY' && (
            <button
              onClick={onAddGas1}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-700 active:scale-95 shadow-md shadow-sky-600/20 transition-all cursor-pointer text-sm"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Add {reaction.defaultVolume1} cm³ {r1.formula}</span>
            </button>
          )}

          {stage === 'ADDED_GAS_1' && (
            <button
              onClick={onAddGas2}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 shadow-md shadow-rose-600/20 transition-all cursor-pointer text-sm"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Add {reaction.defaultVolume2} cm³ {r2.formula}</span>
            </button>
          )}

          {stage === 'READY_TO_PREDICT' && (
            <button
              onClick={onInitiateReaction}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer text-sm"
              style={{
                backgroundColor: targetColor === '#facc15' ? '#ca8a04' : targetColor,
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Lock Prediction & React!</span>
            </button>
          )}

          {stage === 'EVALUATED' && (
            <div className="flex items-center gap-2">
              <button
                onClick={onResetMixture}
                title="Replay this reaction"
                className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={onNextReaction}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-md shadow-emerald-600/20 transition-all cursor-pointer text-sm"
              >
                <span>Next Reaction Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
