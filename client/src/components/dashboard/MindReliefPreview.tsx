'use client';

import React, { useState } from 'react';
import { reliefActivities } from '@/lib/mockData';
import { ReliefActivity } from '@/types/dashboard';
import { IconRenderer } from '@/components/shared/IconRenderer';
import { BreathingModal } from '@/components/dashboard/BreathingModal';
import { Wind, Play, Pause, ArrowRight, Volume2, Sparkles, BrainCircuit } from 'lucide-react';

interface MindReliefPreviewProps {
  onOpenReliefTab?: () => void;
}

export const MindReliefPreview: React.FC<MindReliefPreviewProps> = ({ onOpenReliefTab }) => {
  const [activeBreathing, setActiveBreathing] = useState<'BOX' | '478' | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [noiseNode, setNoiseNode] = useState<AudioNode | null>(null);

  // Web Audio Pink Noise / Rain generator for immediate client-side sound demonstration
  const toggleAmbientSound = () => {
    if (isPlayingAudio) {
      if (audioContext) {
        audioContext.close();
      }
      setAudioContext(null);
      setNoiseNode(null);
      setIsPlayingAudio(false);
    } else {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        // Pink noise generator (soothing ambient rain/waves frequency)
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;
        whiteNoise.loop = true;

        // Lowpass filter for warm rain effect
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.35, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();

        setAudioContext(ctx);
        setNoiseNode(whiteNoise);
        setIsPlayingAudio(true);
      } catch (e) {
        console.warn('Web Audio could not be initialized:', e);
      }
    }
  };

  const handleLaunchActivity = (act: ReliefActivity) => {
    if (act.id === 'box_breathing') {
      setActiveBreathing('BOX');
    } else if (act.id === 'four_seven_eight') {
      setActiveBreathing('478');
    } else if (act.id === 'ambient_rain') {
      toggleAmbientSound();
    } else if (onOpenReliefTab) {
      onOpenReliefTab();
    }
  };

  return (
    <>
      <div className="rounded-2xl bg-white border border-[#E8E2D9] p-5 sm:p-6 shadow-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] mb-5">
          <div>
            <h2 className="text-base font-semibold text-[#1B382B] tracking-tight flex items-center gap-2">
              <Wind className="w-4 h-4 text-[#7D9D85]" />
              <span>Mind Relief Zone — Micro-Interventions</span>
            </h2>
            <p className="text-xs text-[#66706B] mt-0.5">
              Rapid evidence-based tools designed to regulate physiological stress in under 4 minutes
            </p>
          </div>

          {onOpenReliefTab && (
            <button
              onClick={onOpenReliefTab}
              className="text-xs font-semibold text-[#1B382B] hover:text-[#142C22] inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reliefActivities.map((act) => {
            const isAudioCard = act.id === 'ambient_rain';

            return (
              <div
                key={act.id}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex flex-col justify-between hover:border-[#1B382B]/30 hover:shadow-xs transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#E8E2D9] flex items-center justify-center text-[#1B382B] shadow-2xs group-hover:scale-105 transition-transform">
                      <IconRenderer name={act.iconName} className="w-4 h-4 text-[#4B8063]" />
                    </div>

                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EBF2ED] text-[#1B382B] border border-[#D5E4D8]">
                      {act.duration}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7D9D85] block mb-1">
                    {act.badge}
                  </span>

                  <h3 className="text-xs sm:text-sm font-semibold text-[#1C2321] group-hover:text-[#1B382B] transition-colors">
                    {act.title}
                  </h3>

                  <p className="text-[11px] text-[#66706B] mt-1.5 leading-relaxed line-clamp-2">
                    {act.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#E8E2D9]/70 flex items-center justify-between">
                  <span className="text-[10px] text-[#8A9590] font-mono">{act.subtitle}</span>

                  <button
                    type="button"
                    onClick={() => handleLaunchActivity(act)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1B382B] text-white text-xs font-medium hover:bg-[#142C22] transition-colors shadow-2xs cursor-pointer"
                  >
                    {isAudioCard ? (
                      isPlayingAudio ? (
                        <>
                          <Pause className="w-3.5 h-3.5 text-[#FFD0C2]" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#8EB89D]" />
                          <span>Listen</span>
                        </>
                      )
                    ) : (
                      <>
                        <Play className="w-3 h-3 text-[#8EB89D]" />
                        <span>Start</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Breathwork Modal */}
      <BreathingModal
        isOpen={activeBreathing !== null}
        technique={activeBreathing || 'BOX'}
        onClose={() => setActiveBreathing(null)}
      />
    </>
  );
};
