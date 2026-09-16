export type ReactionLevel = 1 | 2 | 3;

export type GasState = 'g' | 'l';

export type ParticleKind = 
  | 'H2' 
  | 'O2' 
  | 'H2O' 
  | 'Cl2' 
  | 'HCl' 
  | 'N2' 
  | 'NH3' 
  | 'NO' 
  | 'NO2' 
  | 'C2H4' 
  | 'C2H6' 
  | 'CO' 
  | 'CO2' 
  | 'SO2' 
  | 'SO3';

export interface ChemicalSpecies {
  name: string;
  formula: string;
  state: GasState;
  coefficient: number;
  color: string;
  accentColor: string;
  particleKind: ParticleKind;
}

export interface ReactionDefinition {
  id: string;
  name: string;
  level: ReactionLevel;
  reactant1: ChemicalSpecies;
  reactant2: ChemicalSpecies;
  product1: ChemicalSpecies;
  product2?: ChemicalSpecies;
  defaultVolume1: number; // in cm³
  defaultVolume2: number; // in cm³
  questionTarget?: 'total' | 'reactant1' | 'reactant2' | 'product1';
  hint: string;
}

export interface ActiveParticle {
  id: string;
  kind: ParticleKind;
  color: string;
  speciesRole: 'reactant1' | 'reactant2' | 'product1' | 'product2';
  // normalized coordinates 0..1 relative to the filled volume width and syringe height
  normX: number;
  normY: number;
  scale: number;
  isHighlight?: boolean;
}

export type SimStage = 
  | 'EMPTY' 
  | 'ADDED_GAS_1' 
  | 'READY_TO_PREDICT' 
  | 'REACTING' 
  | 'EVALUATED';

export interface PopStep {
  stepIndex: number;
  r1Consumed: number; // cm³
  r2Consumed: number; // cm³
  p1Produced: number; // cm³
  p2Produced?: number; // cm³
  deltaTotalGas: number; // cm³
  desc: string;
}

export interface ReactionOutcome {
  r1Final: number;
  r2Final: number;
  p1Final: number;
  p2Final: number;
  totalFinalGas: number;
  limitingSpecies: 'reactant1' | 'reactant2' | 'none';
  excessVolume: number;
  excessSpeciesName: string;
  popSteps: PopStep[];
}
