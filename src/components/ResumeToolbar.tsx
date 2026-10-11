import React from 'react';
import {
  Printer,
  FileText,
  Sparkles,
  Sliders,
  Eye,
  Check,
  ChevronDown,
} from 'lucide-react';
import { TemplateStyle, PageLayoutMode } from '../types/resume';

interface ResumeToolbarProps {
  onPrint: () => void;
  onOpenATSExport: () => void;
  onOpenInterviewGuide: () => void;
  onOpenEditor: () => void;
  templateStyle: TemplateStyle;
  onTemplateChange: (style: TemplateStyle) => void;
  layoutMode: PageLayoutMode;
  onLayoutModeChange: (mode: PageLayoutMode) => void;
  highlightAiSkills: boolean;
  onToggleHighlight: () => void;
}

export const ResumeToolbar: React.FC<ResumeToolbarProps> = ({
  onPrint,
  onOpenATSExport,
  onOpenInterviewGuide,
  onOpenEditor,
  templateStyle,
  onTemplateChange,
  layoutMode,
  onLayoutModeChange,
  highlightAiSkills,
  onToggleHighlight,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-xs no-print">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Left Side: Brand & Quick Metrics */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              AI
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm leading-tight flex items-center gap-1.5">
                <span>Angular + GenAI Resume</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded-full border border-emerald-200">
                  ATS Verified
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                Vaibhav Jeughale · RAG · Fine-Tuning · Prompt Eng
              </div>
            </div>
          </div>

          {/* Mobile Edit & Interview buttons */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={onOpenEditor}
              className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs"
              title="Edit"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={onPrint}
              className="p-2 bg-indigo-600 text-white rounded-lg text-xs"
              title="Download PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Style and Layout toggles */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Layout Mode (1-Page vs 2-Page) */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => onLayoutModeChange('two-page')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                layoutMode === 'two-page'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2-Page Executive
            </button>
            <button
              onClick={() => onLayoutModeChange('one-page')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                layoutMode === 'one-page'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1-Page Compact
            </button>
          </div>

          {/* Template Style Selector */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => onTemplateChange('executive-ai')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                templateStyle === 'executive-ai'
                  ? 'bg-white text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Executive AI
            </button>
            <button
              onClick={() => onTemplateChange('ats-classic')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                templateStyle === 'ats-classic'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ATS Classic
            </button>
            <button
              onClick={() => onTemplateChange('modern-minimal')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                templateStyle === 'modern-minimal'
                  ? 'bg-white text-teal-800 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Minimalist
            </button>
          </div>

          {/* AI Keywords Highlight toggle */}
          <button
            onClick={onToggleHighlight}
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 transition-all ${
              highlightAiSkills
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Highlight GenAI keywords for easy visual review"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>AI Badges {highlightAiSkills ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Right Side: Primary Actions */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Interview Cheat Sheet Button */}
          <button
            onClick={onOpenInterviewGuide}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Review talking points for RAG, Fine-Tuning, Prompt Engineering"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Interview Cheat Sheet</span>
          </button>

          {/* Customize / Edit Button */}
          <button
            onClick={onOpenEditor}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-600" />
            <span>Customize</span>
          </button>

          {/* Copy Plain Text for ATS */}
          <button
            onClick={onOpenATSExport}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Export Plain Text for job portals"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span>Copy ATS Text</span>
          </button>

          {/* Direct Download PDF / Print */}
          <button
            onClick={onPrint}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            title="Save as pristine PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
