import React, { useState } from 'react';
import { interviewTopics, InterviewTopic } from '../data/interviewGuideData';
import { X, BookOpen, CheckCircle, Copy, Terminal, Sparkles, Lightbulb } from 'lucide-react';

interface InterviewGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InterviewGuideModal: React.FC<InterviewGuideModalProps> = ({ isOpen, onClose }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(interviewTopics[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentTopic = interviewTopics.find((t) => t.id === selectedTopicId) || interviewTopics[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                GenAI Technical Interview Defense & Talking Points Guide
              </h2>
              <p className="text-xs text-slate-300">
                Master the exact architecture, numbers, and defense for your resume's RAG, Prompt Engineering, & Fine-Tuning highlights
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden min-h-[450px]">
          {/* Sidebar Navigation */}
          <div className="md:col-span-4 bg-slate-50 border-r border-slate-200 p-3 overflow-y-auto space-y-1.5">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-2 py-1">
              Interview Categories
            </div>
            {interviewTopics.map((topic) => {
              const active = topic.id === selectedTopicId;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full text-left p-3 rounded-lg text-xs font-medium transition-all flex flex-col gap-1 ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-200/60'
                  }`}
                >
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${
                      active ? 'text-indigo-200' : 'text-indigo-600'
                    }`}
                  >
                    {topic.category}
                  </span>
                  <span className="line-clamp-2 leading-snug">{topic.question}</span>
                </button>
              );
            })}

            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Golden Interview Rule</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Always state the business metric first (e.g., 68% API cost reduction or 180ms TTFT), then explain the engineering trade-offs!
              </p>
            </div>
          </div>

          {/* Main Details Panel */}
          <div className="md:col-span-8 p-6 overflow-y-auto space-y-5">
            {/* Category badge & question */}
            <div>
              <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                {currentTopic.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                {currentTopic.question}
              </h3>
            </div>

            {/* 30-Second Elevator Pitch */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  30-Second Punchy Answer (Elevator Pitch)
                </span>
                <button
                  onClick={() => handleCopy(currentTopic.conciseSummary, `summary-${currentTopic.id}`)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium"
                >
                  {copiedId === `summary-${currentTopic.id}` ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{currentTopic.conciseSummary}"
              </p>
            </div>

            {/* Technical Deep Dive */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                Technical Deep Dive (How to walk through the implementation)
              </h4>
              <ul className="space-y-2">
                {currentTopic.technicalDeepDive.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                    <span className="h-4 w-4 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Keywords & Jargon to drop */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                High-Impact Keywords To Mention Naturally
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentTopic.keyTermsToDrop.map((term, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-medium bg-slate-100 text-slate-800 border border-slate-300 px-2 py-0.5 rounded-md"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture or Code Snippet */}
            {currentTopic.codeOrArchitectureSnippet && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-slate-600" />
                    Architecture / Data Flow
                  </span>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-3.5 rounded-lg text-[11px] font-mono overflow-x-auto leading-relaxed border border-slate-800">
                  {currentTopic.codeOrArchitectureSnippet}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600">
          <span>Use this guide to confidently explain the GenAI accomplishments added to your resume.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors"
          >
            Got it, Back to Resume
          </button>
        </div>
      </div>
    </div>
  );
};
