'use client';

import React, { useState } from 'react';
import { ClipboardCheck, Sparkles, CheckCircle2, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

interface StressAssessmentViewProps {
  onOpenReliefZone: () => void;
}

export const StressAssessmentView: React.FC<StressAssessmentViewProps> = ({ onOpenReliefZone }) => {
  // PSS-4 standard questions (0: Never, 1: Almost Never, 2: Sometimes, 3: Fairly Often, 4: Very Often)
  const questions = [
    {
      id: 1,
      text: 'In the last month, how often have you felt that you were unable to control the important things in your life?',
      reversed: false
    },
    {
      id: 2,
      text: 'In the last month, how often have you felt confident about your ability to handle your personal problems?',
      reversed: true
    },
    {
      id: 3,
      text: 'In the last month, how often have you felt that things were going your way?',
      reversed: true
    },
    {
      id: 4,
      text: 'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?',
      reversed: false
    }
  ];

  const scaleLabels = ['Never (0)', 'Almost Never (1)', 'Sometimes (2)', 'Fairly Often (3)', 'Very Often (4)'];

  const [answers, setAnswers] = useState<Record<number, number>>({
    1: 2,
    2: 2,
    3: 3,
    4: 1
  });

  const [isCalculated, setIsCalculated] = useState(false);

  const handleSelect = (qId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: score }));
    setIsCalculated(false);
  };

  // Calculate standard PSS-4 score: inverting positive items Q2 and Q3
  const calculateScore = () => {
    let total = 0;
    questions.forEach((q) => {
      const val = answers[q.id] ?? 2;
      total += q.reversed ? 4 - val : val;
    });
    return total;
  };

  const rawScore = calculateScore();
  const normalizedScore = Math.round((rawScore / 16) * 100);

  const getBandInfo = (score: number) => {
    if (score <= 5) {
      return {
        band: 'Low Perceived Stress',
        color: '#4B8063',
        bgColor: '#EDF5F0',
        borderColor: '#B9DEC6',
        desc: 'Your self-assessment indicates low, well-managed everyday stress. Cognitive coping reserves are healthy.',
        guidance: 'Continue your restorative habits and balance focused sprints with brief ergonomic pauses.'
      };
    }
    if (score <= 10) {
      return {
        band: 'Moderate Perceived Stress',
        color: '#B8863A',
        bgColor: '#FAF5EE',
        borderColor: '#E8DFC8',
        desc: 'Your answers indicate moderate stress typical of high-demand enterprise environments. Some fatigue accumulation.',
        guidance: 'Consider scheduling two 3-minute breathwork pauses during your workday and setting clear work boundaries.'
      };
    }
    return {
      band: 'Elevated Perceived Stress',
      color: '#C86D51',
      bgColor: '#FAF0ED',
      borderColor: '#E8C5BC',
      desc: 'Your answers reflect high perceived strain and reduced sense of control over demanding obligations.',
      guidance: 'Take an immediate micro-break. Prioritize restorative sleep, and explore confidential company EAP resources.'
    };
  };

  const band = getBandInfo(rawScore);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-[#E8E2D9] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D9]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EBF2ED] text-[#1B382B] mb-2">
              <ClipboardCheck className="w-3.5 h-3.5" /> Standardized Self-Report Protocol
            </div>
            <h2 className="text-xl font-semibold text-[#1B382B] tracking-tight">
              Perceived Stress Scale (PSS-4) Check-In
            </h2>
            <p className="text-xs text-[#66706B] mt-1 max-w-2xl leading-relaxed">
              The PSS-4 is a globally validated instrument assessing the degree to which life and workplace situations are appraised as unpredictable, uncontrollable, and overloading.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-right shrink-0">
            <span className="text-[10px] text-[#8A9590] uppercase tracking-wider font-semibold block">
              Confidentiality
            </span>
            <span className="text-xs font-semibold text-[#1B382B] flex items-center gap-1 justify-end mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4B8063]" /> Strictly Private
            </span>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6 pt-5">
          {questions.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]">
              <div className="flex items-start gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#1B382B] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#1C2321]">{q.text}</p>
              </div>

              {/* Likert Scale Radio Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 pl-7">
                {[0, 1, 2, 3, 4].map((score) => {
                  const isSelected = answers[q.id] === score;
                  return (
                    <button
                      key={score}
                      type="button"
                      onClick={() => handleSelect(q.id, score)}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1B382B] text-white border-[#1B382B] shadow-xs'
                          : 'bg-white text-[#4A5550] border-[#E8E2D9] hover:bg-[#F3EFEA]'
                      }`}
                    >
                      {scaleLabels[score]}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Scoring Action & Result */}
        <div className="pt-6 mt-6 border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#66706B]">
            All 4 questions completed • Scores automatically invert positive appraisals
          </div>

          <button
            onClick={() => setIsCalculated(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1B382B] text-white text-xs sm:text-sm font-semibold hover:bg-[#142C22] transition-colors shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-[#8EB89D]" />
            <span>Calculate Score & Guidance</span>
          </button>
        </div>
      </div>

      {/* Result Card (Renders upon calculate or active) */}
      {isCalculated && (
        <div
          className="rounded-2xl border p-6 shadow-sm transition-all animate-in fade-in zoom-in-95"
          style={{
            backgroundColor: band.bgColor,
            borderColor: band.borderColor
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: band.color }}>
                Validated Assessment Result
              </span>
              <h3 className="text-lg font-bold tracking-tight mt-0.5" style={{ color: band.color }}>
                {band.band}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-[#8A9590] uppercase tracking-wider font-semibold block">
                  Raw Score
                </span>
                <span className="text-xl font-bold font-mono" style={{ color: band.color }}>
                  {rawScore} / 16
                </span>
              </div>
              <div className="text-right pl-3 border-l border-black/10">
                <span className="text-[10px] text-[#8A9590] uppercase tracking-wider font-semibold block">
                  Normalized Index
                </span>
                <span className="text-xl font-bold font-mono text-[#1B382B]">
                  {normalizedScore}%
                </span>
              </div>
            </div>
          </div>

          <div className="py-4 space-y-2">
            <p className="text-xs sm:text-sm text-[#1C2321] leading-relaxed">{band.desc}</p>
            <p className="text-xs text-[#4A5550] leading-relaxed">
              <strong>Personalized Recommendation: </strong>
              {band.guidance}
            </p>
          </div>

          <div className="pt-3 border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] text-[#66706B] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4B8063]" />
              Non-Clinical Disclaimer: Self-report educational tool. Does not diagnose clinical anxiety.
            </span>

            <button
              onClick={onOpenReliefZone}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#142C22] transition-colors"
            >
              <span>Practice Suggested Relief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
