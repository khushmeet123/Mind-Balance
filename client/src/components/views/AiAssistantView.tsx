'use client';

import React, { useState } from 'react';
import { Bot, Send, Sparkles, ShieldCheck, AlertCircle, PhoneCall, Trash2, Heart, Lock, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'USER' | 'ASSISTANT';
  text: string;
  timestamp: string;
  isCrisis?: boolean;
}

export const AiAssistantView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ASSISTANT',
      text: 'Hello, Khush. I am your MindBalance reflection companion. I am here to help you decompress from sprint demands, untangle stressful work thoughts, and practice mindful perspective-taking. How can I support your headspace today?',
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [reframeThought, setReframeThought] = useState('');
  const [reframeResult, setReframeResult] = useState<{
    distortion: string;
    balancedPerspective: string;
    actionStep: string;
  } | null>(null);

  // Crisis detection lexicon
  const crisisKeywords = ['kill myself', 'end it all', 'suicide', 'die', 'hurt myself', 'self-harm', 'no point living'];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const lower = inputText.toLowerCase();
    const hasCrisisSignal = crisisKeywords.some((word) => lower.includes(word));

    if (hasCrisisSignal) {
      setShowCrisisModal(true);
      setInputText('');
      return;
    }

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'USER',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Supportive non-clinical AI response simulation
    setTimeout(() => {
      let reply = 'I hear you. High workloads and deadlines can place a heavy cognitive demand on us. Let us take one conscious breath together. What is one small step you can take today, or what can be postponed without serious harm?';
      if (lower.includes('deadline') || lower.includes('busy') || lower.includes('stress')) {
        reply = 'Sprint deadlines often trigger an acute fight-or-flight cognitive reaction. Remember that productivity requires rest periods. Would you like to try a 3-minute box breathing session or break this challenge down into smaller tasks?';
      } else if (lower.includes('presentation') || lower.includes('meeting')) {
        reply = 'Pre-meeting anxiety is very common. Try grounding yourself: feel your feet resting firmly on the floor and gently lengthen your exhalation. You are well-prepared, and perfection is not required.';
      }

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'ASSISTANT',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleReframe = () => {
    if (!reframeThought.trim()) return;
    setReframeResult({
      distortion: 'Catastrophizing & All-or-Nothing Framing',
      balancedPerspective:
        'A single delayed delivery or imperfect code review does not define your technical capability or job security. Complex engineering involves iterations and trade-offs.',
      actionStep: 'Communicate the dependency transparently with your team lead and take a 10-minute restorative walk.'
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-2xl bg-white border border-[#E8E2D9] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EBF2ED] text-[#1B382B] mb-2">
            <Bot className="w-3.5 h-3.5" /> Supportive AI Wellness Companion
          </div>
          <h2 className="text-xl font-semibold text-[#1B382B] tracking-tight">
            Empathetic Workplace Reflection
          </h2>
          <p className="text-xs text-[#66706B] mt-1 max-w-xl leading-relaxed">
            Non-clinical reflective companion using Cognitive Behavioral Therapy (CBT) deconstruction techniques.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMessages([messages[0]])}
            className="inline-flex items-center gap-1 text-xs text-[#8A9590] hover:text-[#C86D51] transition-colors p-2 rounded-lg border border-[#E8E2D9] bg-[#FAF8F5]"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Window Column (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs flex flex-col h-[520px]">
          {/* Messages Feed */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ASSISTANT' && (
                  <div className="w-8 h-8 rounded-xl bg-[#1B382B] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Bot className="w-4 h-4 text-[#8EB89D]" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'USER'
                      ? 'bg-[#1B382B] text-white rounded-tr-xs'
                      : 'bg-[#FAF8F5] text-[#1C2321] border border-[#E8E2D9] rounded-tl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`text-[10px] mt-1.5 block font-mono ${
                      m.sender === 'USER' ? 'text-white/60 text-right' : 'text-[#8A9590]'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-[#E8E2D9] bg-[#FAF8F5]/50 rounded-b-2xl">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Share a workplace stressor or thought you'd like to reflect on..."
                className="flex-1 text-xs sm:text-sm p-3 rounded-xl border border-[#E8E2D9] bg-white text-[#1C2321] placeholder-[#8A9590] focus:outline-hidden focus:ring-2 focus:ring-[#1B382B]/30"
              />
              <button
                onClick={handleSendMessage}
                className="w-10 h-10 rounded-xl bg-[#1B382B] text-white flex items-center justify-center hover:bg-[#142C22] transition-colors shadow-xs shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#8EB89D]" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 text-[10px] text-[#8A9590]">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#B8863A]" /> Confidential & Ephemeral
              </span>
              <span>Non-clinical guidance only</span>
            </div>
          </div>
        </div>

        {/* CBT Cognitive Reframer Pocket (1 col) */}
        <div className="rounded-2xl bg-white border border-[#E8E2D9] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#B8863A]" />
              <h3 className="text-xs sm:text-sm font-semibold text-[#1B382B]">
                Cognitive Thought Reframer
              </h3>
            </div>
            <p className="text-[11px] text-[#66706B] leading-relaxed mb-3">
              Type a stressful or catastrophic thought. The assistant deconstructs the cognitive distortion.
            </p>

            <textarea
              value={reframeThought}
              onChange={(e) => setReframeThought(e.target.value)}
              placeholder="e.g., If this deploy fails, everyone will think I am incompetent..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] text-[#1C2321] placeholder-[#8A9590] focus:outline-hidden focus:ring-2 focus:ring-[#1B382B]/30 resize-none mb-2"
            />

            <button
              onClick={handleReframe}
              className="w-full py-2 px-3 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#142C22] transition-colors shadow-xs"
            >
              Reframe Thought
            </button>
          </div>

          {reframeResult && (
            <div className="p-3.5 rounded-xl bg-[#EDF5F0] border border-[#B9DEC6] space-y-2 animate-in fade-in">
              <span className="text-[10px] font-bold text-[#4B8063] uppercase tracking-wider block">
                Pattern: {reframeResult.distortion}
              </span>
              <p className="text-xs text-[#1C2321] leading-relaxed">
                <strong>Balanced View: </strong>
                {reframeResult.balancedPerspective}
              </p>
              <p className="text-xs text-[#4A5550]">
                <strong>Micro-Action: </strong>
                {reframeResult.actionStep}
              </p>
            </div>
          )}

          <div className="text-[10px] text-[#8A9590] pt-2 border-t border-[#E8E2D9]">
            Based on Cognitive Behavioral Therapy (CBT) reflection principles.
          </div>
        </div>
      </div>

      {/* Emergency Crisis Lifeline Intercept Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white border border-[#E8E2D9] shadow-2xl p-6 sm:p-7 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF0ED] text-[#C86D51] flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6 text-[#A83B2B]" />
            </div>

            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-[#A83B2B] uppercase tracking-wider">
                Immediate Supportive Resources
              </span>
              <h3 className="text-lg font-bold text-[#1C2321]">You Are Not Alone</h3>
              <p className="text-xs text-[#66706B] leading-relaxed">
                We detected acute distress. MindBalance is an educational workplace tool and cannot replace licensed crisis counseling. Please connect with immediate professional care right now:
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#1B382B] block">
                    988 Suicide & Crisis Lifeline
                  </span>
                  <span className="text-[11px] text-[#66706B]">Free, confidential, 24/7 support</span>
                </div>
                <a
                  href="tel:988"
                  className="px-3 py-1.5 rounded-lg bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#142C22]"
                >
                  Call 988
                </a>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#1B382B] block">Crisis Text Line</span>
                  <span className="text-[11px] text-[#66706B]">Text HOME to 741741</span>
                </div>
                <a
                  href="sms:741741"
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#E8E2D9] text-[#1B382B] text-xs font-semibold"
                >
                  Text Now
                </a>
              </div>
            </div>

            <button
              onClick={() => setShowCrisisModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#FAF8F5] text-xs font-semibold text-[#66706B] hover:text-[#1C2321] transition-colors border border-[#E8E2D9]"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
