'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';

interface BreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
  technique?: 'BOX' | '478';
}

type Phase = 'INHALE' | 'HOLD_IN' | 'EXHALE' | 'HOLD_OUT';

export const BreathingModal: React.FC<BreathingModalProps> = ({
  isOpen,
  onClose,
  technique = 'BOX'
}) => {
  const isBox = technique === 'BOX';

  // Box: 4-4-4-4, 4-7-8: 4-7-8
  const phaseDurations = isBox
    ? { INHALE: 4, HOLD_IN: 4, EXHALE: 4, HOLD_OUT: 4 }
    : { INHALE: 4, HOLD_IN: 7, EXHALE: 8, HOLD_OUT: 0 };

  const [phase, setPhase] = useState<Phase>('INHALE');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(phaseDurations.INHALE);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Phase transition state machine
  useEffect(() => {
    if (!isOpen || !isRunning) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Advance phase
          if (phase === 'INHALE') {
            setPhase('HOLD_IN');
            return phaseDurations.HOLD_IN;
          } else if (phase === 'HOLD_IN') {
            setPhase('EXHALE');
            return phaseDurations.EXHALE;
          } else if (phase === 'EXHALE') {
            if (isBox) {
              setPhase('HOLD_OUT');
              return phaseDurations.HOLD_OUT;
            } else {
              setPhase('INHALE');
              setCompletedCycles((c) => c + 1);
              return phaseDurations.INHALE;
            }
          } else {
            // HOLD_OUT -> INHALE (cycle completed)
            setPhase('INHALE');
            setCompletedCycles((c) => c + 1);
            return phaseDurations.INHALE;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isRunning, phase, isBox, phaseDurations]);

  if (!isOpen) return null;

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'INHALE':
        return 'Inhale deeply through your nose...';
      case 'HOLD_IN':
        return 'Hold gently. Savor the stillness...';
      case 'EXHALE':
        return 'Exhale slowly through your mouth...';
      case 'HOLD_OUT':
        return 'Empty and grounded. Wait for the breath...';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'INHALE':
        return '#4B8063';
      case 'HOLD_IN':
        return '#B8863A';
      case 'EXHALE':
        return '#7D9D85';
      case 'HOLD_OUT':
        return '#1B382B';
    }
  };

  // Determine circle scale based on phase
  const getCircleScale = () => {
    if (phase === 'INHALE') return 1.35;
    if (phase === 'HOLD_IN') return 1.35;
    if (phase === 'EXHALE') return 0.85;
    return 0.85;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#FAF8F5] border border-[#E8E2D9] shadow-2xl p-6 sm:p-8 flex flex-col items-center overflow-hidden">
        {/* Background aura */}
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#EBF2ED] to-transparent pointer-events-none" />

        {/* Modal Header */}
        <div className="w-full flex items-center justify-between z-10 pb-4 mb-4 border-b border-[#E8E2D9]">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7D9D85]">
              {isBox ? 'Square Breathwork' : 'Parasympathetic Reset'}
            </span>
            <h2 className="text-base sm:text-lg font-semibold text-[#1B382B] tracking-tight">
              {isBox ? 'Box Breathing (4-4-4-4)' : '4-7-8 Relaxing Breath'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              aria-label={soundEnabled ? 'Mute audio cues' : 'Enable audio cues'}
              className="w-8 h-8 rounded-full border border-[#E8E2D9] bg-white flex items-center justify-center text-[#66706B] hover:text-[#1B382B]"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              aria-label="Close breathing session"
              className="w-8 h-8 rounded-full border border-[#E8E2D9] bg-white flex items-center justify-center text-[#66706B] hover:text-[#1C2321]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Breathing Canvas Animation */}
        <div className="my-8 relative flex items-center justify-center w-64 h-64">
          {/* Target Boundary Outer Ring */}
          <div className="absolute w-56 h-56 rounded-full border border-dashed border-[#7D9D85]/40" />

          {/* Expanding Pulsing SVG Circle */}
          <motion.div
            animate={{
              scale: getCircleScale()
            }}
            transition={{
              duration:
                phase === 'INHALE'
                  ? phaseDurations.INHALE
                  : phase === 'EXHALE'
                  ? phaseDurations.EXHALE
                  : 0.4,
              ease: 'easeInOut'
            }}
            className="w-36 h-36 rounded-full flex items-center justify-center shadow-lg transition-colors"
            style={{
              backgroundColor: getPhaseColor()
            }}
          >
            <div className="text-center text-white">
              <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight block">
                {secondsRemaining}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider opacity-90">
                Seconds
              </span>
            </div>
          </motion.div>
        </div>

        {/* Phase Instruction Text */}
        <div className="text-center z-10 mb-6 space-y-1">
          <span
            className="text-xs font-bold uppercase tracking-wider block"
            style={{ color: getPhaseColor() }}
          >
            {phase.replace('_', ' ')}
          </span>
          <p className="text-sm font-medium text-[#1C2321]">{getPhaseInstruction()}</p>
          <span className="text-xs text-[#8A9590] block">
            Cycles Completed: <strong className="text-[#1B382B]">{completedCycles}</strong>
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B382B] text-white text-xs sm:text-sm font-semibold hover:bg-[#142C22] transition-colors shadow-xs cursor-pointer"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Resume
              </>
            )}
          </button>

          <button
            onClick={() => {
              setPhase('INHALE');
              setSecondsRemaining(phaseDurations.INHALE);
              setCompletedCycles(0);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-[#E8E2D9] text-[#66706B] hover:text-[#1B382B] text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#E8E2D9] text-[#1B382B] text-xs font-semibold hover:bg-[#F3EFEA] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
