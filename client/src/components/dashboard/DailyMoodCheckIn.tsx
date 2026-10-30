'use client';

import React, { useState } from 'react';
import { moodOptions, availableContextTags } from '@/lib/mockData';
import { MoodOption, EnergyLevel, MoodCheckInRecord } from '@/types/dashboard';
import { IconRenderer } from '@/components/shared/IconRenderer';
import { Check, Lock, Sparkles, CheckCircle2, RotateCcw, Tag } from 'lucide-react';

interface DailyMoodCheckInProps {
  onCheckInCompleted: (record: MoodCheckInRecord) => void;
}

export const DailyMoodCheckIn: React.FC<DailyMoodCheckInProps> = ({ onCheckInCompleted }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOption>(moodOptions[3]); // Default: Calm & Focused
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyLevel>('MEDIUM');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Deep Work']);
  const [journalNote, setJournalNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSave = () => {
    setIsSubmitting(true);
    // Simulate swift local persistence
    setTimeout(() => {
      const record: MoodCheckInRecord = {
        id: `chk_${Date.now()}`,
        valence: selectedMood.valence,
        energy: selectedEnergy,
        stressLevel: selectedMood.valence <= -2 ? 7 : selectedMood.valence <= 0 ? 5 : 3,
        tags: selectedTags,
        note: journalNote,
        loggedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setIsSubmitting(false);
      setIsSaved(true);
      onCheckInCompleted(record);
    }, 450);
  };

  const handleReset = () => {
    setIsSaved(false);
  };

  return (
    <div className="rounded-2xl bg-white border border-[#E8E2D9] p-5 sm:p-6 shadow-xs relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] mb-5">
        <div>
          <h2 className="text-base font-semibold text-[#1B382B] tracking-tight flex items-center gap-2">
            <span>Daily Mood & Valence Check-In</span>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#EBF2ED] text-[#1B382B] border border-[#D5E4D8]">
              Step 1 of 2
            </span>
          </h2>
          <p className="text-xs text-[#66706B] mt-0.5">
            How is your affective energy and psychological state feeling right now?
          </p>
        </div>

        {isSaved && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-[#7D9D85] hover:text-[#1B382B] font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Update Check-In</span>
          </button>
        )}
      </div>

      {isSaved ? (
        /* Completed Confirmation View */
        <div className="py-6 px-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-center space-y-3 animate-in fade-in zoom-in-95">
          <div className="w-12 h-12 rounded-full bg-[#EBF2ED] text-[#1B382B] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-[#4B8063]" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#1B382B]">Check-In Successfully Logged</h3>
            <p className="text-xs text-[#66706B] mt-1 max-w-sm mx-auto">
              Your state ({selectedMood.label}, Valence {selectedMood.valence > 0 ? `+${selectedMood.valence}` : selectedMood.valence}) was securely recorded into your private personal vault.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#E8E2D9] text-[#1C2321] font-medium">
              Energy: {selectedEnergy}
            </span>
            {selectedTags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#EBF2ED] text-[#1B382B] font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* Active Check-In Form */
        <div className="space-y-5">
          {/* 5-State Circumplex Mood Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#1C2321] mb-2.5">
              Affective Valence & State:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
              {moodOptions.map((opt) => {
                const isSelected = selectedMood.valence === opt.valence;
                return (
                  <button
                    key={opt.valence}
                    type="button"
                    onClick={() => setSelectedMood(opt)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer relative ${
                      isSelected
                        ? 'ring-2 ring-[#1B382B] shadow-xs'
                        : 'border-[#E8E2D9] bg-[#FAF8F5] hover:bg-[#F3EFEA]'
                    }`}
                    style={{
                      borderColor: isSelected ? opt.color : undefined,
                      backgroundColor: isSelected ? opt.bgColor : undefined
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center mb-1.5 transition-transform"
                      style={{
                        backgroundColor: opt.bgColor,
                        color: opt.color
                      }}
                    >
                      <IconRenderer name={opt.icon} className="w-4 h-4" />
                    </div>
                    <span
                      className="text-xs font-semibold tracking-tight"
                      style={{ color: opt.color }}
                    >
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-[#8A9590] mt-0.5 font-mono">
                      {opt.valence > 0 ? `+${opt.valence}` : opt.valence}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Energy Level Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#1C2321] mb-2">
              Somatic Energy Level:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['LOW', 'MEDIUM', 'HIGH'] as EnergyLevel[]).map((level) => {
                const isSelected = selectedEnergy === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedEnergy(level)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B382B] text-white border-[#1B382B] shadow-xs'
                        : 'bg-[#FAF8F5] text-[#4A5550] border-[#E8E2D9] hover:bg-[#F3EFEA]'
                    }`}
                  >
                    {level.charAt(0) + level.slice(1).toLowerCase()} Energy
                  </button>
                );
              })}
            </div>
          </div>

          {/* Context Tags Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-[#1C2321] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#66706B]" />
                <span>Contextual Drivers (Select up to 5):</span>
              </label>
              <span className="text-[11px] text-[#8A9590]">{selectedTags.length}/5 selected</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {availableContextTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EBF2ED] text-[#1B382B] border border-[#B9DEC6] font-semibold'
                        : 'bg-[#FAF8F5] text-[#66706B] border border-[#E8E2D9] hover:bg-[#F3EFEA]'
                    }`}
                  >
                    {isSelected && <span className="mr-1 text-[#4B8063]">✓</span>}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Private Reflection Note */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#1C2321] flex items-center gap-1.5">
                <span>Private Journal Reflection (Optional)</span>
              </label>
              <span className="inline-flex items-center gap-1 text-[10px] text-[#8A9590]">
                <Lock className="w-3 h-3 text-[#B8863A]" /> Encrypted • Inaccessible to HR
              </span>
            </div>
            <textarea
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              placeholder="What thoughts or workplace context are occupying your mind today? (Strictly private)..."
              rows={2}
              className="w-full text-xs p-3 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] text-[#1C2321] placeholder-[#8A9590] focus:outline-hidden focus:ring-2 focus:ring-[#1B382B]/30 focus:border-[#1B382B] resize-none"
            />
          </div>

          {/* Save Action Button */}
          <div className="pt-1 flex items-center justify-between">
            <span className="text-[11px] text-[#8A9590]">
              Takes 15 seconds • Updates personal streak
            </span>
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#142C22] transition-all shadow-xs cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Recording...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 text-[#8EB89D]" />
                  <span>Save Check-In</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
