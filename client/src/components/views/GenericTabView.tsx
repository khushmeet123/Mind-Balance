'use client';

import React, { useState } from 'react';
import { NavItemId } from '@/types/dashboard';
import { mockUser, initialGoals } from '@/lib/mockData';
import {
  HeartPulse,
  Activity,
  Calendar,
  Target,
  Bell,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Droplet,
  Eye,
  Wind,
  Plus,
  Trash2,
  Sliders,
  ExternalLink
} from 'lucide-react';

interface GenericTabViewProps {
  tabId: NavItemId;
  onOpenReliefZone: () => void;
}

export const GenericTabView: React.FC<GenericTabViewProps> = ({ tabId, onOpenReliefZone }) => {
  // Physical Tab State
  const [deskStretchesDone, setDeskStretchesDone] = useState(2);
  const [postureAlertsCount, setPostureAlertsCount] = useState(4);

  // Activities Tab State
  const [events, setEvents] = useState([
    {
      id: 'ev1',
      title: 'Navigating Imposter Syndrome in Tech',
      date: 'Thursday, Oct 29 • 3:00 PM EST',
      speaker: 'Dr. Elena Vance, Organizational Psychologist',
      category: 'WEBINAR',
      isRsvpd: true
    },
    {
      id: 'ev2',
      title: 'Restorative Seated Yoga & Spinal Decompression',
      date: 'Monday, Nov 2 • 12:30 PM EST',
      speaker: 'Marcus Ray, Ergonomics & Movement Coach',
      category: 'WORKSHOP',
      isRsvpd: false
    },
    {
      id: 'ev3',
      title: 'Async Communication Boundaries & Deep Work',
      date: 'Wednesday, Nov 4 • 2:00 PM EST',
      speaker: 'People Operations Panel',
      category: 'ROUNDTABLE',
      isRsvpd: false
    }
  ]);

  const toggleRsvp = (id: string) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, isRsvpd: !ev.isRsvpd } : ev))
    );
  };

  // Settings Tab State
  const [reducedMotion, setReducedMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [dataPurged, setDataPurged] = useState(false);

  // Render content based on tabId
  if (tabId === 'physical') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="rounded-2xl bg-white border border-[#E8E2D9] p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] mb-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7D9D85]">
                Musculoskeletal Health
              </span>
              <h2 className="text-xl font-semibold text-[#1B382B] tracking-tight">
                Physical Wellness & Desk Ergonomics
              </h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EBF2ED] text-[#1B382B]">
              4 Breaks Recorded Today
            </span>
          </div>

          <p className="text-xs text-[#66706B] leading-relaxed mb-6">
            Sedentary posture and continuous screen glare contribute to sub-clinical tension headaches, cervical spine strain, and ocular dryness.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 20-20-20 Eye Strain Rest */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-[#7D9D85]" />
                  <h3 className="text-sm font-semibold text-[#1C2321]">20-20-20 Ocular Rest Rule</h3>
                </div>
                <p className="text-xs text-[#66706B] leading-relaxed mb-3">
                  Every 20 minutes, gaze at an object at least 20 feet away for 20 seconds to relax ciliary eye muscles.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1B382B]">
                  <span>Today: {postureAlertsCount} / 6 breaks</span>
                </div>
              </div>
              <button
                onClick={() => setPostureAlertsCount((c) => Math.min(6, c + 1))}
                className="mt-4 w-full py-2 rounded-lg bg-white border border-[#E8E2D9] text-xs font-semibold text-[#1B382B] hover:bg-[#EBF2ED] transition-colors"
              >
                Log 20-Second Eye Break
              </button>
            </div>

            {/* Seated Desk Stretches */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-[#B8863A]" />
                  <h3 className="text-sm font-semibold text-[#1C2321]">Seated Desk Stretches</h3>
                </div>
                <p className="text-xs text-[#66706B] leading-relaxed mb-3">
                  1. Lateral neck stretch (30s) • 2. Seated spinal twist (30s) • 3. Wrist flexor pull (30s).
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1B382B]">
                  <span>Today: {deskStretchesDone} / 3 sets</span>
                </div>
              </div>
              <button
                onClick={() => setDeskStretchesDone((c) => Math.min(3, c + 1))}
                className="mt-4 w-full py-2 rounded-lg bg-white border border-[#E8E2D9] text-xs font-semibold text-[#1B382B] hover:bg-[#EBF2ED] transition-colors"
              >
                Complete Desk Stretch Set
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tabId === 'activities') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="rounded-2xl bg-white border border-[#E8E2D9] p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] mb-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7D9D85]">
                Collective Well-Being
              </span>
              <h2 className="text-xl font-semibold text-[#1B382B] tracking-tight">
                Wellness Workshops & Community Webinars
              </h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EBF2ED] text-[#1B382B]">
              Voluntary Attendance
            </span>
          </div>

          <p className="text-xs text-[#66706B] leading-relaxed mb-6">
            Attend live interactive webinars, mindfulness workshops, and asynchronous ergonomic sessions hosted by certified professionals.
          </p>

          <div className="space-y-3.5">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#B8863A] border border-[#E8DFC8]">
                      {ev.category}
                    </span>
                    <span className="text-xs text-[#8A9590]">{ev.date}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#1C2321]">{ev.title}</h3>
                  <p className="text-xs text-[#66706B] mt-0.5">Speaker: {ev.speaker}</p>
                </div>

                <button
                  onClick={() => toggleRsvp(ev.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    ev.isRsvpd
                      ? 'bg-[#EBF2ED] text-[#1B382B] border border-[#B9DEC6]'
                      : 'bg-[#1B382B] text-white hover:bg-[#142C22]'
                  }`}
                >
                  {ev.isRsvpd ? '✓ RSVP Confirmed' : 'Register / RSVP'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (tabId === 'settings') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="rounded-2xl bg-white border border-[#E8E2D9] p-6 shadow-xs space-y-6">
          <div className="pb-4 border-b border-[#E8E2D9]">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7D9D85]">
              Configuration & Sovereignty
            </span>
            <h2 className="text-xl font-semibold text-[#1B382B] tracking-tight">
              Privacy, Accessibility & Personal Settings
            </h2>
          </div>

          {/* Preferences Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]">
              <div>
                <span className="text-xs font-semibold text-[#1C2321] block">
                  Auditory Breath Cues & Ambient Audio
                </span>
                <span className="text-[11px] text-[#66706B]">
                  Play gentle acoustic phase chimes during breathwork exercises.
                </span>
              </div>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={() => setSoundEnabled(!soundEnabled)}
                className="w-4 h-4 accent-[#1B382B] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]">
              <div>
                <span className="text-xs font-semibold text-[#1C2321] block">
                  Prefers Reduced Motion (WCAG AA)
                </span>
                <span className="text-[11px] text-[#66706B]">
                  Disable smooth expansion transitions for vestibular sensitivity.
                </span>
              </div>
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={() => setReducedMotion(!reducedMotion)}
                className="w-4 h-4 accent-[#1B382B] cursor-pointer"
              />
            </div>
          </div>

          {/* Data Sovereignty & Right to Erasure */}
          <div className="pt-4 border-t border-[#E8E2D9] space-y-3">
            <h3 className="text-sm font-semibold text-[#A83B2B] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Employee Data Sovereignty
            </h3>
            <p className="text-xs text-[#66706B] leading-relaxed">
              In accordance with ethical employee privacy standards, you have the right to permanently purge all your historical mood entries, assessments, and AI conversation history at any time without deleting your company profile.
            </p>

            {dataPurged ? (
              <div className="p-3 rounded-xl bg-[#EDF5F0] border border-[#B9DEC6] text-xs font-semibold text-[#4B8063]">
                ✓ All personal telemetry has been purged from your local workspace.
              </div>
            ) : (
              <button
                onClick={() => setDataPurged(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E8C5BC] text-[#C86D51] text-xs font-semibold hover:bg-[#FAF0ED] transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Purge Personal Well-being History
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default fallback for wellbeing, goals, notifications
  return (
    <div className="rounded-2xl bg-white border border-[#E8E2D9] p-6 shadow-xs max-w-4xl mx-auto space-y-4">
      <div className="pb-3 border-b border-[#E8E2D9]">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7D9D85]">
          MindBalance Module
        </span>
        <h2 className="text-xl font-semibold text-[#1B382B] tracking-tight capitalize">
          {tabId.replace('_', ' ')}
        </h2>
      </div>
      <p className="text-xs text-[#66706B] leading-relaxed">
        This section is actively configured within the MindBalance ecosystem. You can return to the primary dashboard or explore the Mind Relief Zone.
      </p>
      <div className="pt-2">
        <button
          onClick={onOpenReliefZone}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#142C22] transition-colors"
        >
          <Wind className="w-3.5 h-3.5 text-[#8EB89D]" />
          <span>Launch Mind Relief Zone</span>
        </button>
      </div>
    </div>
  );
};
