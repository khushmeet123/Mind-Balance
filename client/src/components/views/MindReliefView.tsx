'use client';

import React, { useState, useEffect } from 'react';
import { BreathingModal } from '@/components/dashboard/BreathingModal';
import { Wind, Headphones, Play, Pause, RotateCcw, BrainCircuit, Sparkles, Volume2, Clock, CheckCircle2 } from 'lucide-react';

export const MindReliefView: React.FC = () => {
  const [activeTechnique, setActiveTechnique] = useState<'BOX' | '478' | null>(null);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Pomodoro Timer State
  const [pomoSeconds, setPomoSeconds] = useState(25 * 60);
  const [isPomoRunning, setIsPomoRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPomoRunning && pomoSeconds > 0) {
      interval = setInterval(() => {
        setPomoSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPomoRunning, pomoSeconds]);

  // Memory Matrix Game State (4x4 = 8 pairs)
  const symbols = ['🌱', '💧', '☀️', '🌸', '🌊', '🌿', '🍃', '🕊️'];
  const [cards, setCards] = useState<string[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const initGame = () => {
    const deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (idx: number) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(idx) || matchedIndices.includes(idx)) {
      return;
    }

    const nextFlipped = [...flippedIndices, idx];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = nextFlipped;
      if (cards[first] === cards[second]) {
        const nextMatched = [...matchedIndices, first, second];
        setMatchedIndices(nextMatched);
        setFlippedIndices([]);
        if (nextMatched.length === cards.length) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  // Web Audio Synth for Ambient Rain
  const toggleSoundscape = (name: string) => {
    if (activeSound === name) {
      if (audioCtx) audioCtx.close();
      setAudioCtx(null);
      setActiveSound(null);
    } else {
      try {
        if (audioCtx) audioCtx.close();
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
          b6 = white * 0.115926;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(name === 'Rain' ? 600 : 420, ctx.currentTime);

        source.connect(filter);
        filter.connect(ctx.destination);
        source.start();

        setAudioCtx(ctx);
        setActiveSound(name);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const formatPomo = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="rounded-2xl bg-white border border-[#E8E2D9] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EBF2ED] text-[#1B382B] mb-2">
            <Wind className="w-3.5 h-3.5" /> Mind Relief Zone
          </div>
          <h2 className="text-xl font-semibold text-[#1B382B] tracking-tight">
            Restorative Somatic & Cognitive Tools
          </h2>
          <p className="text-xs text-[#66706B] mt-1 max-w-xl leading-relaxed">
            Short, purposeful micro-interventions for acute workplace stress and attention reset.
          </p>
        </div>
      </div>

      {/* Grid: 2 Breathwork Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Box Breathing */}
        <div className="p-6 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7D9D85]">
                Autonomic Stabilization
              </span>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-[#EBF2ED] text-[#1B382B]">
                3 min session
              </span>
            </div>
            <h3 className="text-base font-semibold text-[#1C2321] mb-1">Box Breathing (4-4-4-4)</h3>
            <p className="text-xs text-[#66706B] leading-relaxed mb-4">
              Equal-ratio square breath used by emergency workers and surgeons to neutralize acute adrenaline spikes and steady heart rate variability.
            </p>
          </div>
          <button
            onClick={() => setActiveTechnique('BOX')}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#142C22] transition-colors shadow-xs"
          >
            <Play className="w-4 h-4 text-[#8EB89D]" />
            <span>Start Box Breathing Exercise</span>
          </button>
        </div>

        {/* 4-7-8 Breath */}
        <div className="p-6 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7D9D85]">
                Parasympathetic Activation
              </span>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-[#EBF2ED] text-[#1B382B]">
                4 min session
              </span>
            </div>
            <h3 className="text-base font-semibold text-[#1C2321] mb-1">4-7-8 Relaxing Breath</h3>
            <p className="text-xs text-[#66706B] leading-relaxed mb-4">
              Lengthened exhalation engages the vagus nerve, signaling biological safety to your cardiovascular system and clearing mental overwhelm.
            </p>
          </div>
          <button
            onClick={() => setActiveTechnique('478')}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#142C22] transition-colors shadow-xs"
          >
            <Play className="w-4 h-4 text-[#8EB89D]" />
            <span>Start 4-7-8 Relaxation</span>
          </button>
        </div>
      </div>

      {/* Grid: Ambient Soundscapes + Pomodoro + Memory Matrix Game */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Ambient Audio Synthesizer */}
        <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Headphones className="w-4 h-4 text-[#7D9D85]" />
              <h3 className="text-sm font-semibold text-[#1C2321]">Ambient Soundscapes</h3>
            </div>
            <p className="text-xs text-[#66706B] mb-4">
              Real-time procedural natural frequencies to mask chatter and cognitive overload.
            </p>

            <div className="space-y-2">
              {[
                { name: 'Rain', label: 'Rain on Canopy', sub: 'Pink noise spectrum' },
                { name: 'Forest', label: 'Deep Forest Brook', sub: 'Soft water flow' }
              ].map((s) => {
                const isActive = activeSound === s.name;
                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => toggleSoundscape(s.name)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                      isActive
                        ? 'bg-[#EBF2ED] border-[#B9DEC6] text-[#1B382B]'
                        : 'bg-[#FAF8F5] border-[#E8E2D9] text-[#4A5550] hover:bg-[#F3EFEA]'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold block">{s.label}</span>
                      <span className="text-[10px] text-[#8A9590]">{s.sub}</span>
                    </div>
                    <span className="p-1.5 rounded-lg bg-white border border-[#E8E2D9]">
                      {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <span className="text-[10px] text-[#8A9590] mt-3 block">
            Generated directly in browser via Web Audio API
          </span>
        </div>

        {/* 25-Min Restorative Pomodoro Focus Timer */}
        <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs flex flex-col justify-between items-center text-center">
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7D9D85]" />
                <h3 className="text-sm font-semibold text-[#1C2321]">Focus & Pause Interval</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#B8863A]">
                25m / 5m
              </span>
            </div>
            <p className="text-xs text-[#66706B] mb-4">
              25 minutes of mono-tasking followed by an obligatory 5-minute restorative pause.
            </p>

            <div className="py-4 my-2 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] w-full">
              <span className="text-3xl font-bold font-mono text-[#1B382B] tracking-tight">
                {formatPomo(pomoSeconds)}
              </span>
              <span className="text-[10px] text-[#8A9590] block mt-1 font-medium">
                {isPomoRunning ? 'Focus sprint in progress' : 'Ready to start focus sprint'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full pt-2">
            <button
              onClick={() => setIsPomoRunning(!isPomoRunning)}
              className="flex-1 py-2 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#142C22] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              {isPomoRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPomoRunning ? 'Pause' : 'Start Sprint'}</span>
            </button>
            <button
              onClick={() => {
                setIsPomoRunning(false);
                setPomoSeconds(25 * 60);
              }}
              className="p-2 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-[#66706B] hover:text-[#1C2321]"
              title="Reset timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cognitive Reset: Memory Matrix Game */}
        <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-[#7D9D85]" />
                <h3 className="text-sm font-semibold text-[#1C2321]">Memory Matrix Reset</h3>
              </div>
              <span className="text-[10px] font-mono text-[#8A9590]">Moves: {moves}</span>
            </div>
            <p className="text-xs text-[#66706B] mb-3">
              Match 8 natural pairs in under 90 seconds to reset working memory.
            </p>

            {/* 4x4 Grid */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {cards.map((sym, idx) => {
                const isFlipped = flippedIndices.includes(idx) || matchedIndices.includes(idx);
                const isMatched = matchedIndices.includes(idx);

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCardClick(idx)}
                    className={`h-11 rounded-xl text-base flex items-center justify-center font-bold transition-all border cursor-pointer ${
                      isFlipped
                        ? isMatched
                          ? 'bg-[#EBF2ED] border-[#B9DEC6] text-[#1B382B]'
                          : 'bg-[#FAF5EE] border-[#E8DFC8]'
                        : 'bg-[#FAF8F5] border-[#E8E2D9] hover:bg-[#F3EFEA]'
                    }`}
                  >
                    {isFlipped ? sym : '•'}
                  </button>
                );
              })}
            </div>

            {gameWon && (
              <div className="p-2 text-center rounded-lg bg-[#EDF5F0] border border-[#B9DEC6] text-xs font-semibold text-[#4B8063] mb-2 animate-in fade-in">
                ✨ Memory Reset Complete! Great job.
              </div>
            )}
          </div>

          <button
            onClick={initGame}
            className="w-full py-1.5 rounded-lg border border-[#E8E2D9] bg-[#FAF8F5] text-[11px] font-semibold text-[#66706B] hover:text-[#1B382B] transition-colors"
          >
            Restart Matrix
          </button>
        </div>
      </div>

      <BreathingModal
        isOpen={activeTechnique !== null}
        technique={activeTechnique || 'BOX'}
        onClose={() => setActiveTechnique(null)}
      />
    </div>
  );
};
