import { ActiveParticle, ParticleKind } from '../types';

/**
 * Generates well-dispersed, static particle positions inside the active syringe chamber.
 * Stratified jitter guarantees natural visual scattering without heavy overlaps.
 */
export function generateParticles(
  count: number,
  kind: ParticleKind,
  speciesRole: 'reactant1' | 'reactant2' | 'product1' | 'product2',
  color: string,
  existingParticles: ActiveParticle[] = []
): ActiveParticle[] {
  const result: ActiveParticle[] = [...existingParticles];

  // We place particles with nice spacing
  for (let i = 0; i < count; i++) {
    let bestX = 0.5;
    let bestY = 0.5;
    let maxMinDist = -1;

    // Sample candidate spots to find a well-spaced location
    for (let attempt = 0; attempt < 25; attempt++) {
      const candX = 0.08 + Math.random() * 0.84; // keep away from edges
      const candY = 0.15 + Math.random() * 0.70; // keep inside cylinder height

      let minDist = 999;
      for (const p of result) {
        // compute distance in normalized chamber space (aspect ratio weighted)
        const dx = (p.normX - candX) * 2.2;
        const dy = p.normY - candY;
        const dist = Math.hypot(dx, dy);
        if (dist < minDist) minDist = dist;
      }

      if (minDist > maxMinDist) {
        maxMinDist = minDist;
        bestX = candX;
        bestY = candY;
      }
    }

    result.push({
      id: `${speciesRole}-${kind}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      kind,
      color,
      speciesRole,
      normX: bestX,
      normY: bestY,
      scale: 0.9 + Math.random() * 0.2,
      isHighlight: false,
    });
  }

  return result;
}

/**
 * Transforms reactants into products during a pop step
 */
export function executePopOnParticles(
  currentParticles: ActiveParticle[],
  r1Kind: ParticleKind,
  r1CountToRemove: number,
  r2Kind: ParticleKind,
  r2CountToRemove: number,
  prodKind: ParticleKind,
  prodCountToAdd: number,
  prodColor: string,
  isProductGas: boolean,
  prod2Kind?: ParticleKind,
  prod2CountToAdd?: number,
  prod2Color?: string,
  isProduct2Gas?: boolean
): { updatedParticles: ActiveParticle[]; poppedCount: number } {
  let r1Removed = 0;
  let r2Removed = 0;

  const remaining: ActiveParticle[] = [];
  const removedSpots: { normX: number; normY: number }[] = [];

  for (const p of currentParticles) {
    if (p.kind === r1Kind && r1Removed < r1CountToRemove) {
      r1Removed++;
      removedSpots.push({ normX: p.normX, normY: p.normY });
    } else if (p.kind === r2Kind && r2Removed < r2CountToRemove) {
      r2Removed++;
      removedSpots.push({ normX: p.normX, normY: p.normY });
    } else {
      remaining.push(p);
    }
  }

  // If product 1 is gaseous, spawn product 1 particles near reaction zones
  if (isProductGas && prodCountToAdd > 0) {
    for (let i = 0; i < prodCountToAdd; i++) {
      const spot = removedSpots[i % Math.max(1, removedSpots.length)] || {
        normX: 0.1 + Math.random() * 0.8,
        normY: 0.2 + Math.random() * 0.6,
      };

      remaining.push({
        id: `prod1-${prodKind}-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
        kind: prodKind,
        color: prodColor,
        speciesRole: 'product1',
        normX: Math.max(0.06, Math.min(0.92, spot.normX + (Math.random() * 0.1 - 0.05))),
        normY: Math.max(0.12, Math.min(0.85, spot.normY + (Math.random() * 0.1 - 0.05))),
        scale: 1.0,
        isHighlight: true, // briefly highlighted when created
      });
    }
  }

  // If product 2 is gaseous, spawn product 2 particles
  if (prod2Kind && isProduct2Gas && prod2CountToAdd && prod2CountToAdd > 0) {
    for (let i = 0; i < prod2CountToAdd; i++) {
      const spot = removedSpots[(i + (prodCountToAdd || 0)) % Math.max(1, removedSpots.length)] || {
        normX: 0.15 + Math.random() * 0.7,
        normY: 0.2 + Math.random() * 0.6,
      };

      remaining.push({
        id: `prod2-${prod2Kind}-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
        kind: prod2Kind,
        color: prod2Color || '#38bdf8',
        speciesRole: 'product2',
        normX: Math.max(0.06, Math.min(0.92, spot.normX + (Math.random() * 0.1 - 0.05))),
        normY: Math.max(0.12, Math.min(0.85, spot.normY + (Math.random() * 0.1 - 0.05))),
        scale: 1.0,
        isHighlight: true,
      });
    }
  }

  return {
    updatedParticles: remaining,
    poppedCount: r1Removed + r2Removed,
  };
}
