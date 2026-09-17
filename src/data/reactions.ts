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
    hint: 'State symbol alert: H₂O(l) is liquid at room temperature! Liquid water takes negligible gas volume (0 cm³), causing a dramatic contraction from 60 cm³ down to 0 cm³.',
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
    hint: '1 volume of H₂ + 1 volume of Cl₂ yields 2 volumes of HCl. Total gas volume does not change (60 cm³ → 60 cm³)!',
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
    hint: '2 volumes of CO react with 1 volume of O₂ to form 2 volumes of CO₂ (60 cm³ → 40 cm³).',
  },

  // Level 2: Odd Stoichiometries & Volume Expansion Reactions
  {
    id: 'steam-methane-reforming',
    name: 'Steam Methane Reforming (Volume Expansion)',
    level: 2,
    reactant1: {
      name: 'Methane',
      formula: 'CH₄',
      state: 'g',
      coefficient: 1,
      color: '#10b981', // emerald-500
      accentColor: '#047857',
      particleKind: 'CH4',
    },
    reactant2: {
      name: 'Steam',
      formula: 'H₂O',
      state: 'g',
      coefficient: 1,
      color: '#818cf8',
      accentColor: '#4f46e5',
      particleKind: 'H2O',
    },
    product1: {
      name: 'Carbon Monoxide',
      formula: 'CO',
      state: 'g',
      coefficient: 1,
      color: '#94a3b8',
      accentColor: '#475569',
      particleKind: 'CO',
    },
    product2: {
      name: 'Hydrogen',
      formula: 'H₂',
      state: 'g',
      coefficient: 3,
      color: '#38bdf8',
      accentColor: '#0284c7',
      particleKind: 'H2',
    },
    defaultVolume1: 20,
    defaultVolume2: 20,
    questionTarget: 'total',
    hint: 'Gas Volume Expansion! 1 vol CH₄ + 1 vol H₂O(g) [2 volumes total] expands into 1 vol CO + 3 vol H₂ [4 volumes total]. Syringe expands from 40 cm³ to 80 cm³!',
  },
  {
    id: 'dry-reforming-co2',
    name: 'Dry CO₂ Reforming of Methane (Volume Expansion)',
    level: 2,
    reactant1: {
      name: 'Methane',
      formula: 'CH₄',
      state: 'g',
      coefficient: 1,
      color: '#10b981',
      accentColor: '#047857',
      particleKind: 'CH4',
    },
    reactant2: {
      name: 'Carbon Dioxide',
      formula: 'CO₂',
      state: 'g',
      coefficient: 1,
      color: '#a855f7',
      accentColor: '#7e22ce',
      particleKind: 'CO2',
    },
    product1: {
      name: 'Carbon Monoxide',
      formula: 'CO',
      state: 'g',
      coefficient: 2,
      color: '#94a3b8',
      accentColor: '#475569',
      particleKind: 'CO',
    },
    product2: {
      name: 'Hydrogen',
      formula: 'H₂',
      state: 'g',
      coefficient: 2,
      color: '#38bdf8',
      accentColor: '#0284c7',
      particleKind: 'H2',
    },
    defaultVolume1: 20,
    defaultVolume2: 20,
    questionTarget: 'total',
    hint: 'Expansion! 1 volume of CH₄ + 1 volume of CO₂ (40 cm³) yields 2 volumes of CO + 2 volumes of H₂ (80 cm³ total).',
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
    hint: '1 volume of N₂ requires 3 volumes of H₂ to make 2 volumes of NH₃. 80 cm³ initial contracts down to 40 cm³!',
  },
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
    hint: '2 volumes of NO + 1 volume of O₂ produce 2 volumes of brown NO₂ gas (60 cm³ → 40 cm³).',
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
    hint: '2 volumes of SO₂ + 1 volume of O₂ → 2 volumes of SO₃ gas (60 cm³ → 40 cm³).',
  },

  // Level 3: Limiting Reagents & Specific Component Challenges
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
    questionTarget: 'leftover_r1',
    targetCustomPrompt: 'Predict unreacted excess H₂ gas leftover',
    hint: '20 cm³ of O₂ only needs 40 cm³ of H₂. Since 50 cm³ of H₂ was added, 50 - 40 = 10 cm³ of H₂ remains unreacted in excess!',
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
    questionTarget: 'leftover_r2',
    targetCustomPrompt: 'Predict unreacted excess O₂ gas leftover',
    hint: '20 cm³ of H₂ only requires 10 cm³ of O₂. Since 30 cm³ of O₂ was added, 30 - 10 = 20 cm³ of O₂ remains unreacted in excess!',
  },
  {
    id: 'limiting-haber-nh3-made',
    name: 'Haber Process (Product Volume Challenge)',
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
    questionTarget: 'product1',
    targetCustomPrompt: 'Predict volume of NH₃ gas produced',
    hint: 'H₂ is limiting! 60 cm³ of H₂ consumes 20 cm³ of N₂ to form exactly 40 cm³ of NH₃ (leaving 10 cm³ N₂ in excess).',
  },
  {
    id: 'limiting-hcl-excess',
    name: 'Synthesis of HCl (Leftover H₂ Challenge)',
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
    questionTarget: 'leftover_r1',
    targetCustomPrompt: 'Predict unreacted excess H₂ gas leftover',
    hint: 'Reaction ratio is 1:1. 20 cm³ of Cl₂ consumes 20 cm³ of H₂. Therefore, 40 - 20 = 20 cm³ of H₂ remains unreacted in excess!',
  },
  {
    id: 'limiting-co-combustion-co2-made',
    name: 'Combustion of CO (Product CO₂ Challenge)',
    level: 3,
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
      color: '#a855f7',
      accentColor: '#7e22ce',
      particleKind: 'CO2',
    },
    defaultVolume1: 40,
    defaultVolume2: 30,
    questionTarget: 'product1',
    targetCustomPrompt: 'Predict volume of CO₂ gas produced',
    hint: '2 vol CO reacts with 1 vol O₂ to yield 2 vol CO₂. 40 cm³ CO is limiting (needs 20 cm³ O₂), yielding exactly 40 cm³ of CO₂ (with 10 cm³ O₂ leftover).',
  },
  {
    id: 'limiting-no-excess-total',
    name: 'Nitric Oxide Oxidation (Total Volume Challenge)',
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
    targetCustomPrompt: 'Predict final TOTAL gas volume (products + excess)',
    hint: '20 cm³ of O₂ reacts with 40 cm³ of NO to yield 40 cm³ of NO₂. 10 cm³ of NO is unreacted excess. Total final gas = 40 + 10 = 50 cm³.',
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
  const cp2 = reaction.product2 ? reaction.product2.coefficient : 0;
  const isP1Gas = reaction.product1.state === 'g';
  const isP2Gas = reaction.product2 ? reaction.product2.state === 'g' : false;

  // Max reactions based on reactants
  const maxRuns1 = vol1 / (c1 * 10);
  const maxRuns2 = vol2 / (c2 * 10);
  const runs = Math.min(maxRuns1, maxRuns2);

  const runsInt = Math.floor(runs * 10) / 10; // keep exact

  const r1Reacted = runsInt * c1 * 10;
  const r2Reacted = runsInt * c2 * 10;
  const p1Produced = runsInt * cp1 * 10;
  const p2Produced = reaction.product2 ? runsInt * cp2 * 10 : 0;

  const r1Final = Math.max(0, Math.round((vol1 - r1Reacted) * 10) / 10);
  const r2Final = Math.max(0, Math.round((vol2 - r2Reacted) * 10) / 10);
  const p1Final = Math.round(p1Produced * 10) / 10;
  const p2Final = Math.round(p2Produced * 10) / 10;

  // Gas total
  const totalFinalGas = (isP1Gas ? p1Final : 0) + (isP2Gas ? p2Final : 0) + r1Final + r2Final;

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
    const p2P = reaction.product2 ? (p2Produced * stepFraction) : 0;
    const gasChange = (isP1Gas ? p1P : 0) + (isP2Gas ? p2P : 0) - (r1C + r2C);

    const productsText = reaction.product2 
      ? `${Math.round(p1P)} cm³ ${reaction.product1.formula} + ${Math.round(p2P)} cm³ ${reaction.product2.formula}`
      : `${Math.round(p1P)} cm³ ${reaction.product1.formula}${!isP1Gas ? ' (liquid drops out!)' : ''}`;

    popSteps.push({
      stepIndex: i + 1,
      r1Consumed: Math.round(r1C * 10) / 10,
      r2Consumed: Math.round(r2C * 10) / 10,
      p1Produced: Math.round(p1P * 10) / 10,
      p2Produced: Math.round(p2P * 10) / 10,
      deltaTotalGas: Math.round(gasChange * 10) / 10,
      desc: `POP #${i + 1}: ${Math.round(r1C)} cm³ ${reaction.reactant1.formula} + ${Math.round(r2C)} cm³ ${reaction.reactant2.formula} → ${productsText}`,
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
