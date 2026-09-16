import React from 'react';
import { X, BookOpen, Lightbulb, CheckCircle, Scale, Droplet } from 'lucide-react';
import { MoleculeGraphic } from './MoleculeGraphic';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Avogadro’s Law & Gas Stoichiometry
              </h2>
              <p className="text-xs text-slate-500">
                Concepts for 16–18 Chemistry Learners
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600 leading-relaxed">
          {/* Card 1: Avogadro's Principle */}
          <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 flex gap-3.5">
            <div className="p-2 bg-sky-100 rounded-xl text-sky-700 shrink-0 h-fit">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-sky-950 mb-1">
                Avogadro's Hypothesis (V ∝ n)
              </h3>
              <p className="text-xs text-sky-900">
                At constant temperature and pressure, <strong>equal volumes of gases contain equal numbers of molecules</strong>.
                This means coefficients in a balanced equation represent not just mole ratios, but <strong>direct volume ratios</strong>!
              </p>
              <div className="mt-2 text-xs bg-white/80 p-2 rounded-lg border border-sky-200 text-sky-950 font-mono-num">
                2 H₂(g) + 1 O₂(g) → 2 H₂O(g)
                <br />
                <span className="text-sky-700 font-bold">2 volumes + 1 volume → 2 volumes</span> (40 cm³ + 20 cm³ = 40 cm³)
              </div>
            </div>
          </div>

          {/* Card 2: State Symbols & Liquid Water */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 flex gap-3.5">
            <div className="p-2 bg-amber-100 rounded-xl text-amber-700 shrink-0 h-fit">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-950 mb-1">
                Notice the State Symbols: (g) vs (l)
              </h3>
              <p className="text-xs text-amber-900">
                Gases expand to fill large volumes (~24,000 cm³/mol at RTP), but liquids are densely packed (~18 cm³/mol for liquid water).
                When water is produced as a liquid <strong>H₂O(l)</strong> at room temperature, its gas volume is effectively <strong>0 cm³</strong>, leading to dramatic syringe contraction!
              </p>
            </div>
          </div>

          {/* Card 3: Limiting Reagent & Leftovers */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex gap-3.5">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-700 shrink-0 h-fit">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-indigo-950 mb-1">
                Limiting Reagents and Excess Volumes
              </h3>
              <p className="text-xs text-indigo-900">
                In non-stoichiometric mixtures, the reaction stops when the <strong>limiting reagent</strong> runs out.
                The final volume is:
              </p>
              <div className="mt-2 text-xs font-bold text-indigo-950 bg-white/80 px-2.5 py-1.5 rounded-lg border border-indigo-200">
                Total Final Gas = Volume of Gaseous Products + Unreacted Excess Reagents
              </div>
            </div>
          </div>

          {/* Molecule Legend */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Visual Cartoon Molecule Legend
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                <MoleculeGraphic kind="H2" size={24} />
                <span className="text-xs font-bold text-slate-700">H₂ (Hydrogen)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                <MoleculeGraphic kind="O2" size={24} />
                <span className="text-xs font-bold text-slate-700">O₂ (Oxygen)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                <MoleculeGraphic kind="H2O" size={24} />
                <span className="text-xs font-bold text-slate-700">H₂O (Water)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                <MoleculeGraphic kind="NH3" size={24} />
                <span className="text-xs font-bold text-slate-700">NH₃ (Ammonia)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                <MoleculeGraphic kind="Cl2" size={24} />
                <span className="text-xs font-bold text-slate-700">Cl₂ (Chlorine)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                <MoleculeGraphic kind="NO2" size={24} />
                <span className="text-xs font-bold text-slate-700">NO₂ (Nitrogen Dioxide)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                <MoleculeGraphic kind="CO2" size={24} />
                <span className="text-xs font-bold text-slate-700">CO₂ (Carbon Dioxide)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                <MoleculeGraphic kind="C2H4" size={24} />
                <span className="text-xs font-bold text-slate-700">C₂H₄ (Ethene)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer"
          >
            Got It, Back to Lab!
          </button>
        </div>
      </div>
    </div>
  );
};
