'use client';

import React, { useState } from 'react';
import { Activity, Wind, Sparkles, Check, Info } from 'lucide-react';

interface StressLevelTrackerProps {
  initialLevel?: number;
  onOpenReliefZone: () => void;
  onStressLogged?: (level: number) => void;
}

export const StressLevelTracker: React.FC<StressLevelTrackerProps> = ({
  initialLevel = 4,
  onOpenReliefZone,
  onStressLogged
}) => {
  const [stressLevel, setStressLevel] = useState<number>(initialLevel);
  const [isLogged, setIsLogged] = useState(false);

  // Determine tier metadata
  const getTierInfo = (level: number) => {
    if (level <= 3) {
      return {
        label: 'Low / Restorative',
        color: '#4B8063',
        bgColor: '#EDF5F0',
        borderColor: '#B9DEC6',
        desc: 'Nervous system is balanced. Ideal window for deep architectural or complex creative tasks.',
        recommendation: 'Maintain hydration and take short ergonomic vision breaks.'
      };
    }
    if (level <= 6) {
      return {
        label: 'Moderate / Standard Demand',
        color: '#B8863A',
        bgColor: '#FAF5EE',
        borderColor: '#E8DFC8',
        desc: 'Noticeable cognitive load from deadlines or meetings. Baseline enterprise workload.',
        recommendation: 'Incorporate a 3-minute conscious breathwork session before mid-day.'
      };
    }
    if (level <= 8) {
      return {
        label: 'Elevated / High Load',
        color: '#C86D51',
        bgColor: '#FAF0ED',
        borderColor: '#E8C5BC',
        desc: 'Cognitive fatigue and tension accumulating. Attention span may show mild fragmentation.',
        recommendation: 'Step away from the screen for 5 minutes. Try the 4-7-8 relaxing breath.'
      };
    }
    return {
      label: 'Critical / Overwhelmed',
      color: '#A83B2B',
      bgColor: '#FDF1F0',
      borderColor: '#F1BFB9',
      desc: 'High acute stress state. Continued high-intensity work risks cognitive depletion.',
      recommendation: 'Decompress immediately with guided breathing or speak with a peer/EAP counselor.'
    };
  };

  const tier = getTierInfo(stressLevel);

  const handleSaveStress = () => {
    setIsLogged(true);
    if (onStressLogged) {
      onStressLogged(stressLevel);
    }
    setTimeout(() => {
      setIsLogged(false);
    }, 2500);
  };

  return (
    <div className="rounded-2xl bg-white border border-[#E8E2D9] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9] mb-4">
          <div>
            <h2 className="text-base font-semibold text-[#1B382B] tracking-tight flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#7D9D85]" />
              <span>Self-Reported Stress Level</span>
            </h2>
            <p className="text-xs text-[#66706B] mt-0.5">
              1 (Completely Relaxed) to 10 (Severely Overwhelmed)
            </p>
          </div>

          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base border shadow-xs"
            style={{
              backgroundColor: tier.bgColor,
              borderColor: tier.borderColor,
              color: tier.color
            }}
          >
            {stressLevel}
          </div>
        </div>

        {/* Dynamic Tier Indicator */}
        <div
          className="p-3.5 rounded-xl border mb-5 transition-all duration-200"
          style={{
            backgroundColor: tier.bgColor,
            borderColor: tier.borderColor
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-xs tracking-tight" style={{ color: tier.color }}>
              Current State: {tier.label}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/70 text-[#1C2321] border border-black/5">
              Level {stressLevel}/10
            </span>
          </div>
          <p className="text-xs text-[#4A5550] leading-relaxed mt-1">{tier.desc}</p>
        </div>

        {/* Interactive Slider */}
        <div className="space-y-3 mb-5">
          <div className="flex justify-between text-[11px] font-medium text-[#66706B]">
            <span>1 • Relaxed</span>
            <span>5 • Moderate</span>
            <span>10 • Overwhelmed</span>
          </div>

          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={stressLevel}
            onChange={(e) => setStressLevel(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-[#E8E2D9] rounded-lg appearance-none cursor-pointer accent-[#1B382B]"
          />

          {/* Stepper Buttons for Quick Increment */}
          <div className="grid grid-cols-10 gap-1 pt-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setStressLevel(num)}
                className={`py-1 text-[11px] rounded-lg font-mono font-medium transition-all ${
                  stressLevel === num
                    ? 'bg-[#1B382B] text-white shadow-xs font-bold'
                    : 'bg-[#FAF8F5] text-[#66706B] hover:bg-[#F3EFEA]'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Action & Save */}
      <div className="pt-4 border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-start gap-2 max-w-sm">
          <Info className="w-3.5 h-3.5 text-[#B8863A] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#66706B] leading-tight">
            <span className="font-semibold text-[#1C2321]">Guidance: </span>
            {tier.recommendation}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onOpenReliefZone}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs font-medium text-[#1B382B] hover:bg-[#F3EFEA] transition-colors"
          >
            <Wind className="w-3.5 h-3.5 text-[#4B8063]" />
            <span>Relief Tools</span>
          </button>

          <button
            onClick={handleSaveStress}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#142C22] transition-colors shadow-xs"
          >
            {isLogged ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#8EB89D]" />
                <span>Saved</span>
              </>
            ) : (
              <span>Save Score</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
