import { ReactionDefinition, ReactionOutcome, PopStep } from '../types';

export const STARTER_REACTION: ReactionDefinition = {
  id: 'starter-h2-o2-steam',
  name: 'Combustion of Hydrogen (Steam)',
  level: 1,
  reactant1: {
    name: 'Hydrogen',
    formula: 'H₂',
    state: 'g',
    coefficient: 2,
    color: '#38bdf8', // sky-400
    accentColor: '#0284c7',
    particleKind: 'H2',
  },
  reactant2: {
    name: 'Oxygen',
    formula: 'O₂',
    state: 'g',
    coefficient: 1,
    color: '#f87171', // red-400
    accentColor: '#dc2626',
    particleKind: 'O2',
  },
  product1: {
    name: 'Water (Steam)',
    formula: 'H₂O',
    state: 'g',
    coefficient: 2,
    color: '#818cf8', // indigo-400
    accentColor: '#4f46e5',
    particleKind: 'H2O',
  },
  defaultVolume1: 40,
  defaultVolume2: 20,
  questionTarget: 'total',
  hint: 'Notice the ratio: 2 volumes of H₂ react with 1 volume of O₂ to produce 2 volumes of steam. 40 cm³ + 20 cm³ → 40 cm³ of steam.',
};

export const REACTION_DATABASE: ReactionDefinition[] = [
  STARTER_REACTION,
  {
    id: 'h2-o2-liquid',
    name: 'Combustion of Hydrogen (Room Temp / Liquid Water)',
    level: 1,
    reactant1: {
      name: 'Hydrogen',
      formula: 'H₂',
      state: 'g',
      coefficient: 2,
      color: '#38bdf8',
      accentColor: '#0284c7',
      particleKind: 'H2',
    },
    reactant2: {
      name: 'Oxygen',
      formula: 'O₂',
      state: 'g',
      coefficient: 1,
      color: '#f87171',
      accentColor: '#dc2626',
      particleKind: 'O2',
    },
    product1: {
      name: 'Water (Liquid)',
      formula: 'H₂O',
      state: 'l',
      coefficient: 2,
      color: '#60a5fa',
      accentColor: '#2563eb',
      particleKind: 'H2O',
    },
    defaultVolume1: 40,
    defaultVolume2: 20,
    questionTarget: 'total',
    hint: 'State symbol alert: H₂O(l) is liquid at room temperature! Liquid water takes negligible gas volume (0 cm³), causing a dramatic contraction to 0 cm³.',
  },
  {
    id: 'h2-cl2-hcl',
    name: 'Synthesis of Hydrogen Chloride',
    level: 1,
    reactant1: {
      name: 'Hydrogen',
      formula: 'H₂',
      state: 'g',
      coefficient: 1,
      color: '#38bdf8',
      accentColor: '#0284c7',
      particleKind: 'H2',
    },
    reactant2: {
      name: 'Chlorine',
      formula: 'Cl₂',
      state: 'g',
      coefficient: 1,
      color: '#4ade80', // green-400
      accentColor: '#16a34a',
      particleKind: 'Cl2',
    },
    product1: {
      name: 'Hydrogen Chloride',
      formula: 'HCl',
      state: 'g',
      coefficient: 2,
      color: '#2dd4bf', // teal-400
      accentColor: '#0d9488',
      particleKind: 'HCl',
    },
    defaultVolume1: 30,
    defaultVolume2: 30,
    questionTarget: 'total',
    hint: '1 volume of H₂ + 1 volume of Cl₂ yields 2 volumes of HCl. Total gas volume does not change!',
  },
  {
    id: 'ethene-hydrogenation',
    name: 'Hydrogenation of Ethene',
    level: 1,
    reactant1: {
      name: 'Ethene',
      formula: 'C₂H₄',
      state: 'g',
      coefficient: 1,
      color: '#fbbf24', // amber-400
      accentColor: '#d97706',
      particleKind: 'C2H4',
    },
    reactant2: {
      name: 'Hydrogen',
      formula: 'H₂',
      state: 'g',
      coefficient: 1,
      color: '#38bdf8',
      accentColor: '#0284c7',
      particleKind: 'H2',
    },
    product1: {
      name: 'Ethane',
      formula: 'C₂H₆',
      state: 'g',
      coefficient: 1,
      color: '#f59e0b',
      accentColor: '#b45309',
      particleKind: 'C2H6',
    },
    defaultVolume1: 30,
    defaultVolume2: 30,
    questionTarget: 'total',
    hint: '1 volume of C₂H₄ + 1 volume of H₂ combine into 1 volume of C₂H₆. Volume halves from 60 cm³ to 30 cm³.',
  },
  {
    id: 'co-combustion',
    name: 'Combustion of Carbon Monoxide',
    level: 1,
    reactant1: {
      name: 'Carbon Monoxide',
      formula: 'CO',
      state: 'g',
      coefficient: 2,
      color: '#94a3b8',
      accentColor: '#475569',
      particleKind: 'CO',
    },
    reactant2: {
      name: 'Oxygen',
      formula: 'O₂',
      state: 'g',
      coefficient: 1,
      color: '#f87171',
      accentColor: '#dc2626',
      particleKind: 'O2',
    },
    product1: {
      name: 'Carbon Dioxide',
      formula: 'CO₂',
      state: 'g',
      coefficient: 2,
      color: '#a855f7', // purple-500
      accentColor: '#7e22ce',
      particleKind: 'CO2',
    },
    defaultVolume1: 40,
    defaultVolume2: 20,
    questionTarget: 'total',
    hint: '2 volumes of CO react with 1 volume of O₂ to form 2 volumes of CO₂.',
  },

  // Level 2: Odd Stoichiometries
  {
    id: 'no-oxidation',
    name: 'Oxidation of Nitric Oxide',
    level: 2,
    reactant1: {
      name: 'Nitric Oxide',
      formula: 'NO',
      state: 'g',
      coefficient: 2,
      color: '#60a5fa',
      accentColor: '#1d4ed8',
      particleKind: 'NO',
    },
    reactant2: {
      name: 'Oxygen',
      formula: 'O₂',
      state: 'g',
      coefficient: 1,
      color: '#f87171',
      accentColor: '#dc2626',
      particleKind: 'O2',
    },
    product1: {
      name: 'Nitrogen Dioxide',
      formula: 'NO₂',
      state: 'g',
      coefficient: 2,
      color: '#c2410c', // brown/orange
      accentColor: '#9a3412',
      particleKind: 'NO2',
    },
    defaultVolume1: 40,
    defaultVolume2: 20,
    questionTarget: 'total',
    hint: '2 volumes of NO + 1 volume of O₂ produce 2 volumes of brown NO₂ gas.',
  },
  {
    id: 'haber-process',
    name: 'Haber Process (Ammonia Synthesis)',
    level: 2,
    reactant1: {
      name: 'Nitrogen',
      formula: 'N₂',
      state: 'g',
      coefficient: 1,
      color: '#3b82f6',
      accentColor: '#1e40af',
      particleKind: 'N2',
    },
    reactant2: {
      name: 'Hydrogen',
      formula: 'H₂',
      state: 'g',
      coefficient: 3,
      color: '#38bdf8',
      accentColor: '#0284c7',
      particleKind: 'H2',
    },
    product1: {
      name: 'Ammonia',
      formula: 'NH₃',
      state: 'g',
      coefficient: 2,
      color: '#06b6d4', // cyan-500
      accentColor: '#0891b2',
      particleKind: 'NH3',
    },
    defaultVolume1: 20,
    defaultVolume2: 60,
    questionTarget: 'total',
    hint: '1 volume of N₂ requires 3 volumes of H₂ to make 2 volumes of NH₃. 4 total volumes contract down to 2 volumes!',
  },
  {
    id: 'so2-oxidation',
    name: 'Oxidation of Sulfur Dioxide',
    level: 2,
    reactant1: {
      name: 'Sulfur Dioxide',
      formula: 'SO₂',
      state: 'g',
      coefficient: 2,
      color: '#facc15', // yellow
      accentColor: '#ca8a04',
      particleKind: 'SO2',
    },
    reactant2: {
      name: 'Oxygen',
      formula: 'O₂',
      state: 'g',
      coefficient: 1,
      color: '#f87171',
      accentColor: '#dc2626',
      particleKind: 'O2',
    },
    product1: {
      name: 'Sulfur Trioxide',
      formula: 'SO₃',
      state: 'g',
      coefficient: 2,
      color: '#eab308',
      accentColor: '#a16207',
      particleKind: 'SO3',
    },
    defaultVolume1: 40,
    defaultVolume2: 20,
    questionTarget: 'total',
    hint: '2 volumes of SO₂ + 1 volume of O₂ → 2 volumes of SO₃ gas.',
  },

  // Level 3: Limiting Reagents & Excess Mixtures
  {
    id: 'limiting-h2-excess',
    name: 'Combustion of Hydrogen (Hydrogen in Excess)',
    level: 3,
    reactant1: {
      name: 'Hydrogen',
      formula: 'H₂',
      state: 'g',
      coefficient: 2,
      color: '#38bdf8',
      accentColor: '#0284c7',
      particleKind: 'H2',
    },
    reactant2: {
      name: 'Oxygen',
      formula: 'O₂',
      state: 'g',
      coefficient: 1,
      color: '#f87171',
      accentColor: '#dc2626',
      particleKind: 'O2',
    },
    product1: {
      name: 'Water (Steam)',
      formula: 'H₂O',
      state: 'g',
      coefficient: 2,
      color: '#818cf8',
      accentColor: '#4f46e5',
      particleKind: 'H2O',
    },
    defaultVolume1: 50,
    defaultVolume2: 20,
    questionTarget: 'total',
    hint: '20 cm³ of O₂ only needs 40 cm³ of H₂. 10 cm³ of H₂ will remain unreacted in excess! Final gas = 40 cm³ steam + 10 cm³ excess H₂.',
  },
  {
    id: 'limiting-o2-excess',
    name: 'Combustion of Hydrogen (Oxygen in Excess)',
    level: 3,
    reactant1: {
      name: 'Hydrogen',
      formula: 'H₂',
      state: 'g',
      coefficient: 2,
      color: '#38bdf8',
      accentColor: '#0284c7',
      particleKind: 'H2',
    },
    reactant2: {
      name: 'Oxygen',
      formula: 'O₂',
      state: 'g',
      coefficient: 1,
      color: '#f87171',
      accentColor: '#dc2626',
      particleKind: 'O2',
    },
    product1: {
      name: 'Water (Steam)',
      formula: 'H₂O',
      state: 'g',
      coefficient: 2,
      color: '#818cf8',
      accentColor: '#4f46e5',
      particleKind: 'H2O',
    },
    defaultVolume1: 20,
    defaultVolume2: 30,
    questionTarget: 'total',
    hint: '20 cm³ of H₂ only requires 10 cm³ of O₂. 20 cm³ of O₂ will be left over in excess! Total final gas = 20 cm³ steam + 20 cm³ excess O₂ = 40 cm³.',
  },
  {
    id: 'limiting-hcl-excess',
    name: 'Synthesis of HCl (Hydrogen in Excess)',
    level: 3,
    reactant1: {
      name: 'Hydrogen',
      formula: 'H₂',
      state: 'g',
      coefficient: 1,
      color: '#38bdf8',
      accentColor: '#0284c7',
      particleKind: 'H2',
    },
    reactant2: {
      name: 'Chlorine',
      formula: 'Cl₂',
      state: 'g',
      coefficient: 1,
      color: '#4ade80',
      accentColor: '#16a34a',
      particleKind: 'Cl2',
    },
    product1: {
      name: 'Hydrogen Chloride',
      formula: 'HCl',
      state: 'g',
      coefficient: 2,
      color: '#2dd4bf',
      accentColor: '#0d9488',
      particleKind: 'HCl',
    },
    defaultVolume1: 40,
    defaultVolume2: 20,
    questionTarget: 'total',
    hint: 'Ratio is 1:1. 20 cm³ of Cl₂ consumes 20 cm³ of H₂ to produce 40 cm³ HCl. 20 cm³ of H₂ is in excess! Total gas = 40 cm³ HCl + 20 cm³ H₂ = 60 cm³.',
  },
  {
    id: 'limiting-haber-n2-excess',
    name: 'Haber Process (Nitrogen in Excess)',
    level: 3,
    reactant1: {
      name: 'Nitrogen',
      formula: 'N₂',
      state: 'g',
      coefficient: 1,
      color: '#3b82f6',
      accentColor: '#1e40af',
      particleKind: 'N2',
    },
    reactant2: {
      name: 'Hydrogen',
      formula: 'H₂',
      state: 'g',
      coefficient: 3,
      color: '#38bdf8',
      accentColor: '#0284c7',
      particleKind: 'H2',
    },
    product1: {
      name: 'Ammonia',
      formula: 'NH₃',
      state: 'g',
      coefficient: 2,
      color: '#06b6d4',
      accentColor: '#0891b2',
      particleKind: 'NH3',
    },
    defaultVolume1: 30,
    defaultVolume2: 60,
    questionTarget: 'total',
    hint: '3 volumes of H₂ need 1 volume of N₂. 60 cm³ of H₂ consumes 20 cm³ of N₂ to form 40 cm³ NH₃. 10 cm³ of N₂ remains in excess! Total gas = 50 cm³.',
  },
  {
    id: 'limiting-no-excess',
    name: 'Nitric Oxide Oxidation (NO in Excess)',
    level: 3,
    reactant1: {
      name: 'Nitric Oxide',
      formula: 'NO',
      state: 'g',
      coefficient: 2,
      color: '#60a5fa',
      accentColor: '#1d4ed8',
      particleKind: 'NO',
    },
    reactant2: {
      name: 'Oxygen',
      formula: 'O₂',
      state: 'g',
      coefficient: 1,
      color: '#f87171',
      accentColor: '#dc2626',
      particleKind: 'O2',
    },
    product1: {
      name: 'Nitrogen Dioxide',
      formula: 'NO₂',
      state: 'g',
      coefficient: 2,
      color: '#c2410c',
      accentColor: '#9a3412',
      particleKind: 'NO2',
    },
    defaultVolume1: 50,
    defaultVolume2: 20,
    questionTarget: 'total',
    hint: '20 cm³ of O₂ reacts with 40 cm³ of NO to yield 40 cm³ of NO₂. 10 cm³ of NO is unreacted excess. Total = 40 + 10 = 50 cm³.',
  },
];

/**
 * Calculates stoichiometry and step-by-step pop sequence
 */
export function calculateReactionOutcome(
  reaction: ReactionDefinition,
  vol1: number,
  vol2: number
): ReactionOutcome {
  const c1 = reaction.reactant1.coefficient;
  const c2 = reaction.reactant2.coefficient;
  const cp1 = reaction.product1.coefficient;
  const isP1Gas = reaction.product1.state === 'g';

  // How many times can the reaction run? (Each run = 10 cm³ / scale unit)
  // Max reactions based on reactant 1:
  const maxRuns1 = vol1 / (c1 * 10);
  const maxRuns2 = vol2 / (c2 * 10);
  const runs = Math.min(maxRuns1, maxRuns2);

  const runsInt = Math.floor(runs * 10) / 10; // keep exact

  const r1Reacted = runsInt * c1 * 10;
  const r2Reacted = runsInt * c2 * 10;
  const p1Produced = runsInt * cp1 * 10;

  const r1Final = Math.max(0, Math.round((vol1 - r1Reacted) * 10) / 10);
  const r2Final = Math.max(0, Math.round((vol2 - r2Reacted) * 10) / 10);
  const p1Final = Math.round(p1Produced * 10) / 10;
  const p2Final = 0;

  // Gas total
  const totalFinalGas = (isP1Gas ? p1Final : 0) + r1Final + r2Final;

  let limitingSpecies: 'reactant1' | 'reactant2' | 'none' = 'none';
  let excessVolume = 0;
  let excessSpeciesName = '';

  if (r1Final > 0 && r2Final === 0) {
    limitingSpecies = 'reactant2';
    excessVolume = r1Final;
    excessSpeciesName = reaction.reactant1.name;
  } else if (r2Final > 0 && r1Final === 0) {
    limitingSpecies = 'reactant1';
    excessVolume = r2Final;
    excessSpeciesName = reaction.reactant2.name;
  }

  // Generate pop steps (1 to 4 steps for nice animation pacing)
  const popSteps: PopStep[] = [];
  const numSteps = Math.max(1, Math.min(4, Math.round(runsInt * 2)));
  const stepFraction = 1 / numSteps;

  for (let i = 0; i < numSteps; i++) {
    const r1C = (r1Reacted * stepFraction);
    const r2C = (r2Reacted * stepFraction);
    const p1P = (p1Produced * stepFraction);
    const gasChange = (isP1Gas ? p1P : 0) - (r1C + r2C);

    popSteps.push({
      stepIndex: i + 1,
      r1Consumed: Math.round(r1C * 10) / 10,
      r2Consumed: Math.round(r2C * 10) / 10,
      p1Produced: Math.round(p1P * 10) / 10,
      deltaTotalGas: Math.round(gasChange * 10) / 10,
      desc: `POP #${i + 1}: ${Math.round(r1C)} cm³ ${reaction.reactant1.formula} + ${Math.round(r2C)} cm³ ${reaction.reactant2.formula} → ${Math.round(p1P)} cm³ ${reaction.product1.formula}${!isP1Gas ? ' (liquid drops out!)' : ''}`,
    });
  }

  return {
    r1Final,
    r2Final,
    p1Final,
    p2Final,
    totalFinalGas: Math.round(totalFinalGas * 10) / 10,
    limitingSpecies,
    excessVolume: Math.round(excessVolume * 10) / 10,
    excessSpeciesName,
    popSteps,
  };
}
