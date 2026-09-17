import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ReactionDefinition, 
  ReactionLevel, 
  SimStage, 
  ActiveParticle, 
  ReactionOutcome 
} from './types';
import { 
  STARTER_REACTION, 
  REACTION_DATABASE, 
  calculateReactionOutcome 
} from './data/reactions';
import { generateParticles, executePopOnParticles } from './utils/particleGenerator';
import { sound } from './utils/audio';

import { TopBar } from './components/TopBar';
import { GasSyringe } from './components/GasSyringe';
import { VolumeBarChart } from './components/VolumeBarChart';
import { ReactionControls } from './components/ReactionControls';
import { HelpModal } from './components/HelpModal';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState<ReactionLevel>(1);
  const [currentReaction, setCurrentReaction] = useState<ReactionDefinition>(STARTER_REACTION);
  const [stage, setStage] = useState<SimStage>('EMPTY');

  // Volumes tracked in cm³
  const [vol1, setVol1] = useState<number>(0);
  const [vol2, setVol2] = useState<number>(0);
  const [volP1, setVolP1] = useState<number>(0);
  const [volP2, setVolP2] = useState<number>(0);
  const [currentSyringeVolume, setCurrentSyringeVolume] = useState<number>(0);

  // Particles inside the gas syringe
  const [particles, setParticles] = useState<ActiveParticle[]>([]);

  // Prediction & Challenge
  const [predictionValue, setPredictionValue] = useState<number>(60);
  const [outcome, setOutcome] = useState<ReactionOutcome>(() =>
    calculateReactionOutcome(STARTER_REACTION, STARTER_REACTION.defaultVolume1, STARTER_REACTION.defaultVolume2)
  );

  // Reaction Animation State
  const [currentPopIndex, setCurrentPopIndex] = useState<number>(0);
  const popTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Score & Audio
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Track questions history to avoid repeats
  const seenReactionsRef = useRef<Set<string>>(new Set([STARTER_REACTION.id]));

  // Recalculate outcome whenever reaction or default volumes change
  useEffect(() => {
    const res = calculateReactionOutcome(
      currentReaction,
      currentReaction.defaultVolume1,
      currentReaction.defaultVolume2
    );
    setOutcome(res);
  }, [currentReaction]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (popTimerRef.current) clearTimeout(popTimerRef.current);
    };
  }, []);

  // Compute challenge metadata (Target Title, Prompt, Expected Value, Slider Accent Color)
  const targetInfo = (() => {
    const targetType = currentReaction.questionTarget || 'total';
    switch (targetType) {
      case 'leftover_r1':
        return {
          type: 'leftover_r1' as const,
          title: `Excess ${currentReaction.reactant1.formula}`,
          prompt: currentReaction.targetCustomPrompt || `Predict unreacted excess ${currentReaction.reactant1.formula} leftover`,
          value: outcome.r1Final,
          color: currentReaction.reactant1.accentColor || currentReaction.reactant1.color,
          defaultGuess: currentReaction.defaultVolume1,
        };
      case 'leftover_r2':
        return {
          type: 'leftover_r2' as const,
          title: `Excess ${currentReaction.reactant2.formula}`,
          prompt: currentReaction.targetCustomPrompt || `Predict unreacted excess ${currentReaction.reactant2.formula} leftover`,
          value: outcome.r2Final,
          color: currentReaction.reactant2.accentColor || currentReaction.reactant2.color,
          defaultGuess: currentReaction.defaultVolume2,
        };
      case 'product1':
        return {
          type: 'product1' as const,
          title: `${currentReaction.product1.formula} Produced`,
          prompt: currentReaction.targetCustomPrompt || `Predict volume of ${currentReaction.product1.formula} gas produced`,
          value: outcome.p1Final,
          color: currentReaction.product1.accentColor || currentReaction.product1.color,
          defaultGuess: 0,
        };
      case 'total':
      default:
        return {
          type: 'total' as const,
          title: 'Final Total Gas',
          prompt: currentReaction.targetCustomPrompt || 'Predict final total syringe gas volume',
          value: outcome.totalFinalGas,
          color: '#10b981', // emerald
          defaultGuess: currentReaction.defaultVolume1 + currentReaction.defaultVolume2,
        };
    }
  })();

  // Audio mute sync
  const handleToggleSound = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    sound.isMuted = nextMute;
    if (!nextMute) sound.playClick();
  };

  // Level selector
  const handleSelectLevel = (lvl: ReactionLevel) => {
    if (lvl === currentLevel && stage === 'EMPTY') return;
    sound.playClick();
    setCurrentLevel(lvl);

    // Pick a reaction for this level
    const candidates = REACTION_DATABASE.filter((r) => r.level === lvl);
    let nextR: ReactionDefinition;

    if (lvl === 1 && seenReactionsRef.current.size === 1 && seenReactionsRef.current.has(STARTER_REACTION.id)) {
      nextR = STARTER_REACTION;
    } else {
      const unused = candidates.filter((r) => !seenReactionsRef.current.has(r.id));
      nextR = unused.length > 0 
        ? unused[Math.floor(Math.random() * unused.length)] 
        : candidates[Math.floor(Math.random() * candidates.length)];
      seenReactionsRef.current.add(nextR.id);
    }

    loadReaction(nextR);
  };

  const loadReaction = (reaction: ReactionDefinition) => {
    if (popTimerRef.current) clearTimeout(popTimerRef.current);
    setCurrentReaction(reaction);
    setStage('EMPTY');
    setVol1(0);
    setVol2(0);
    setVolP1(0);
    setVolP2(0);
    setCurrentSyringeVolume(0);
    setParticles([]);
    setCurrentPopIndex(0);

    // Default slider to current/initial volume (e.g. 60 cm³), NOT the solution
    const initialSum = reaction.defaultVolume1 + reaction.defaultVolume2;
    const targetType = reaction.questionTarget || 'total';
    if (targetType === 'leftover_r1') {
      setPredictionValue(reaction.defaultVolume1);
    } else if (targetType === 'leftover_r2') {
      setPredictionValue(reaction.defaultVolume2);
    } else if (targetType === 'product1') {
      setPredictionValue(0);
    } else {
      setPredictionValue(initialSum);
    }
  };

  // Step 1: Add Gas 1
  const handleAddGas1 = () => {
    sound.playGasWhoosh();
    const v1 = currentReaction.defaultVolume1;
    setVol1(v1);
    setCurrentSyringeVolume(v1);

    const particleCount = Math.max(1, Math.round(v1 / 10));
    const newParticles = generateParticles(
      particleCount,
      currentReaction.reactant1.particleKind,
      'reactant1',
      currentReaction.reactant1.color,
      []
    );
    setParticles(newParticles);
    setStage('ADDED_GAS_1');
  };

  // Step 2: Add Gas 2
  const handleAddGas2 = () => {
    sound.playGasWhoosh();
    const v2 = currentReaction.defaultVolume2;
    const totalV = vol1 + v2;
    setVol2(v2);
    setCurrentSyringeVolume(totalV);

    const particleCount = Math.max(1, Math.round(v2 / 10));
    const newParticles = generateParticles(
      particleCount,
      currentReaction.reactant2.particleKind,
      'reactant2',
      currentReaction.reactant2.color,
      particles
    );
    setParticles(newParticles);
    setStage('READY_TO_PREDICT');

    // Default position for the slider: current volume of the syringe (e.g. 40 + 20 = 60 cm³)
    const targetType = currentReaction.questionTarget || 'total';
    if (targetType === 'leftover_r1') {
      setPredictionValue(vol1);
    } else if (targetType === 'leftover_r2') {
      setPredictionValue(v2);
    } else if (targetType === 'product1') {
      setPredictionValue(0);
    } else {
      setPredictionValue(totalV); // EXACTLY current volume of the syringe!
    }
  };

  // Step 3: Initiate Reaction ("The Pops")
  const handleInitiateReaction = () => {
    sound.playClick();
    setStage('REACTING');
    setCurrentPopIndex(0);

    const steps = outcome.popSteps;
    if (steps.length === 0) {
      finishReaction();
      return;
    }

    let stepIdx = 0;
    let curVol1 = vol1;
    let curVol2 = vol2;
    let curVolP1 = 0;
    let curVolP2 = 0;
    let curSyringeV = currentSyringeVolume;
    let curParticles = [...particles];

    const isProdGas = currentReaction.product1.state === 'g';
    const isProd2Gas = currentReaction.product2 ? currentReaction.product2.state === 'g' : false;

    const runNextPop = () => {
      if (stepIdx >= steps.length) {
        finishReaction();
        return;
      }

      const step = steps[stepIdx];
      setCurrentPopIndex(stepIdx + 1);

      // 1. Play pop sound
      sound.playPop(1.0 + stepIdx * 0.12);

      // 2. Adjust numerical volumes
      curVol1 = Math.max(0, Math.round((curVol1 - step.r1Consumed) * 10) / 10);
      curVol2 = Math.max(0, Math.round((curVol2 - step.r2Consumed) * 10) / 10);
      curVolP1 = Math.round((curVolP1 + step.p1Produced) * 10) / 10;
      curVolP2 = Math.round((curVolP2 + (step.p2Produced || 0)) * 10) / 10;
      curSyringeV = (isProdGas ? curVolP1 : 0) + (isProd2Gas ? curVolP2 : 0) + curVol1 + curVol2;

      setVol1(curVol1);
      setVol2(curVol2);
      setVolP1(curVolP1);
      setVolP2(curVolP2);
      setCurrentSyringeVolume(Math.round(curSyringeV * 10) / 10);

      // 3. Transform particle graphics
      const r1ToRemove = Math.max(1, Math.round(step.r1Consumed / 10));
      const r2ToRemove = Math.max(1, Math.round(step.r2Consumed / 10));
      const prodToAdd = isProdGas ? Math.max(1, Math.round(step.p1Produced / 10)) : 0;
      const prod2ToAdd = (currentReaction.product2 && isProd2Gas && step.p2Produced)
        ? Math.max(1, Math.round(step.p2Produced / 10))
        : 0;

      const popResult = executePopOnParticles(
        curParticles,
        currentReaction.reactant1.particleKind,
        r1ToRemove,
        currentReaction.reactant2.particleKind,
        r2ToRemove,
        currentReaction.product1.particleKind,
        prodToAdd,
        currentReaction.product1.color,
        isProdGas,
        currentReaction.product2?.particleKind,
        prod2ToAdd,
        currentReaction.product2?.color,
        isProd2Gas
      );
      curParticles = popResult.updatedParticles;
      setParticles([...curParticles]);

      stepIdx++;
      popTimerRef.current = setTimeout(runNextPop, 850);
    };

    popTimerRef.current = setTimeout(runNextPop, 300);
  };

  // Evaluation when all pops settle
  const finishReaction = () => {
    setStage('EVALUATED');
    setAttempts((prev) => prev + 1);

    const actual = targetInfo.value;
    const isAccurate = Math.abs(predictionValue - actual) <= 2;

    if (isAccurate) {
      sound.playCelebration();
      setScore((prev) => prev + 100);
      setCorrectCount((prev) => prev + 1);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.65 },
          colors: ['#0284c7', '#38bdf8', '#10b981', '#f59e0b', '#818cf8'],
        });
      } catch {
        // safe
      }
    }
  };

  // Step 4: Next Challenge
  const handleNextReaction = () => {
    sound.playClick();
    const candidates = REACTION_DATABASE.filter((r) => r.level === currentLevel);
    const unused = candidates.filter((r) => !seenReactionsRef.current.has(r.id));
    const nextR = unused.length > 0
      ? unused[Math.floor(Math.random() * unused.length)]
      : candidates[Math.floor(Math.random() * candidates.length)];

    seenReactionsRef.current.add(nextR.id);
    loadReaction(nextR);
  };

  // Reset current mixture to replay
  const handleResetMixture = () => {
    sound.playClick();
    loadReaction(currentReaction);
  };

  // Reset entire score
  const handleResetScore = () => {
    setScore(0);
    setAttempts(0);
    setCorrectCount(0);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
        {/* Top Navigation & Level Bar */}
        <TopBar
          currentLevel={currentLevel}
          onSelectLevel={handleSelectLevel}
          score={score}
          attempts={attempts}
          correctCount={correctCount}
          isMuted={isMuted}
          onToggleSound={handleToggleSound}
          onOpenHelp={() => setIsHelpOpen(true)}
          onResetScore={handleResetScore}
        />

        {/* Main Lab Canvas Layout */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-5 justify-between">
          {/* Top Simulation Split View: Syringe on Left, Bar Chart on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
            {/* Left 7/12 cols: The 100 cm³ Gas Syringe & Chamber */}
            <div className="lg:col-span-7 flex flex-col">
              <GasSyringe
                currentVolume={currentSyringeVolume}
                stage={stage}
                particles={particles}
                predictionValue={predictionValue}
                onPredictionChange={setPredictionValue}
                showPredictionTarget={stage === 'READY_TO_PREDICT' || stage === 'EVALUATED'}
                actualFinalVolume={targetInfo.value}
                targetPrompt={targetInfo.prompt}
                targetColor={targetInfo.color}
                targetTitle={targetInfo.title}
                hasLiquidCondensed={currentReaction.product1.state === 'l' && stage === 'EVALUATED'}
              />
            </div>

            {/* Right 5/12 cols: Dynamic Volume Bar Chart */}
            <div className="lg:col-span-5 flex flex-col">
              <VolumeBarChart
                reactant1={currentReaction.reactant1}
                reactant2={currentReaction.reactant2}
                product1={currentReaction.product1}
                product2={currentReaction.product2}
                vol1={vol1}
                vol2={vol2}
                volP1={volP1}
                volP2={volP2}
                totalGas={currentSyringeVolume}
                stage={stage}
                highlightedTarget={targetInfo.type}
              />
            </div>
          </div>

          {/* Bottom Panel: Balanced Equation & Step-by-Step Action Controls */}
          <ReactionControls
            reaction={currentReaction}
            stage={stage}
            currentPopIndex={currentPopIndex}
            totalPops={outcome.popSteps.length}
            outcome={outcome}
            predictionValue={predictionValue}
            targetValue={targetInfo.value}
            targetDescription={targetInfo.prompt}
            targetColor={targetInfo.color}
            onAddGas1={handleAddGas1}
            onAddGas2={handleAddGas2}
            onInitiateReaction={handleInitiateReaction}
            onNextReaction={handleNextReaction}
            onResetMixture={handleResetMixture}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        </main>

        {/* Help & Theory Modal */}
        <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      </div>
    </ErrorBoundary>
  );
}
