import React, { useState, useEffect } from 'react';
import { initialResumeData } from './data/initialResumeData';
import { ResumeData, TemplateStyle, PageLayoutMode, FocusMode } from './types/resume';
import { ResumeDocument } from './components/ResumeDocument';
import { ResumeToolbar } from './components/ResumeToolbar';
import { InterviewGuideModal } from './components/InterviewGuideModal';
import { PlainTextViewerModal } from './components/PlainTextViewerModal';
import { ResumeEditorDrawer } from './components/ResumeEditorDrawer';
import {
  Sparkles,
  Printer,
  FileCheck2,
  BrainCircuit,
  SlidersHorizontal,
  Info,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Code2,
} from 'lucide-react';

export default function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [templateStyle, setTemplateStyle] = useState<TemplateStyle>('executive-ai');
  const [layoutMode, setLayoutMode] = useState<PageLayoutMode>('two-page');
  const [highlightAiSkills, setHighlightAiSkills] = useState<boolean>(true);
  const [focusMode, setFocusMode] = useState<FocusMode>('balanced');

  const [isInterviewGuideOpen, setIsInterviewGuideOpen] = useState<boolean>(false);
  const [isATSExportOpen, setIsATSExportOpen] = useState<boolean>(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [showPrintTip, setShowPrintTip] = useState<boolean>(false);

  // Focus mode presets handler
  const handleFocusModeChange = (mode: FocusMode) => {
    setFocusMode(mode);

    if (mode === 'heavy-genai') {
      setResumeData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          targetRole: 'Generative AI & LLM Systems Engineer | Angular Specialist',
        },
        professionalSummary:
          'Generative AI Systems Engineer with 3.5+ years of enterprise software background building production RAG pipelines, fine-tuning local open-source LLMs (LLaMA-3, Mistral) via QLoRA, and designing structured prompt engineering frameworks. Deep expertise in orchestrating on-premise model inference via vLLM and Ollama (cutting API spend by 68%), coupled with advanced Modern Angular (v12–v21) expertise using Signals and RxJS to deliver zero-latency token streaming interfaces for 15+ multi-tenant enterprise clients.',
      }));
    } else if (mode === 'frontend-focused') {
      setResumeData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          targetRole: 'Senior Frontend & AI Applications Engineer (Angular v17–v21)',
        },
        professionalSummary:
          'Senior Frontend Engineer with 3.5+ years of experience leading modern Angular architectures (v12–v21, Signals, Standalone Components, NgRx) and integrating cutting-edge Generative AI copilots into enterprise platforms. Specializes in real-time token streaming UX, Server-Sent Events (SSE), reactive state management, and conversational AI UI design with zero layout shift, alongside end-to-end RAG and prompt engineering integration.',
      }));
    } else {
      // Balanced
      setResumeData(initialResumeData);
    }
  };

  const handlePrint = () => {
    setShowPrintTip(true);
    // Give user a moment to see the dialog or print directly
    window.print();
  };

  const handleReset = () => {
    setResumeData(initialResumeData);
    setFocusMode('balanced');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Top Application Toolbar */}
      <ResumeToolbar
        onPrint={handlePrint}
        onOpenATSExport={() => setIsATSExportOpen(true)}
        onOpenInterviewGuide={() => setIsInterviewGuideOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
        templateStyle={templateStyle}
        onTemplateChange={setTemplateStyle}
        layoutMode={layoutMode}
        onLayoutModeChange={setLayoutMode}
        highlightAiSkills={highlightAiSkills}
        onToggleHighlight={() => setHighlightAiSkills((prev) => !prev)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Banner with GenAI Transformation Summary */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl p-5 shadow-md border border-slate-800 no-print">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg border border-indigo-500/30">
                  <BrainCircuit className="w-5 h-5" />
                </span>
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  Resume Transformed: Angular + Generative AI Engineer
                </h1>
                <span className="hidden sm:inline-block text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  High-Call Rate ATS Optimized
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                Seamlessly infused your 3.5+ years Angular foundation with high-demand Generative AI capabilities:
                <strong className="text-white"> RAG Pipelines</strong> (pgvector, LangChain),
                <strong className="text-white"> Prompt Engineering</strong> (Few-Shot, JSON Schema/Zod), and
                <strong className="text-white"> Fine-Tuning Local Models</strong> (LLaMA-3, Mistral, QLoRA, vLLM).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto shrink-0">
              <button
                onClick={() => setIsInterviewGuideOpen(true)}
                className="flex-1 md:flex-none px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interview Defense Guide</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 md:flex-none px-3.5 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Printer className="w-3.5 h-3.5 text-slate-700" />
                <span>Download / Print PDF</span>
              </button>
            </div>
          </div>

          {/* Quick Technical Highlights Pills */}
          <div className="mt-4 pt-3.5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></div>
              <div>
                <span className="font-semibold text-white">RAG Pipelines:</span> pgvector, LangChain, hybrid search, 180ms TTFT
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0"></div>
              <div>
                <span className="font-semibold text-white">Prompt Engineering:</span> Structured Zod schemas, CoT, NeMo Guardrails
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></div>
              <div>
                <span className="font-semibold text-white">Local Fine-Tuning:</span> QLoRA, LLaMA-3, vLLM/Ollama (68% cost reduction)
              </div>
            </div>
          </div>
        </div>

        {/* PDF Download Helper / Tips Notice (Dismissible) */}
        {showPrintTip && (
          <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-xl p-3.5 flex items-start justify-between gap-3 text-xs no-print">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">PDF Export Tip:</span> In the Print Dialog, choose Destination: <strong>"Save as PDF"</strong>. Under More Settings, set Margins to <strong>"Default" or "None"</strong> and check <strong>"Background graphics"</strong> for the crispest vector document output.
              </div>
            </div>
            <button
              onClick={() => setShowPrintTip(false)}
              className="text-blue-500 hover:text-blue-800 text-xs font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Resume Preview Workspace */}
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 text-xs text-slate-500 px-1 no-print">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>
                Document Format: <strong>{layoutMode === 'two-page' ? '2-Page Executive Document' : '1-Page High-Density'}</strong> · Theme: <strong>{templateStyle}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditorOpen(true)}
                className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Customize Details
              </button>
            </div>
          </div>

          {/* Actual Printable Document Container */}
          <ResumeDocument
            data={resumeData}
            templateStyle={templateStyle}
            layoutMode={layoutMode}
            highlightAiSkills={highlightAiSkills}
          />
        </div>

        {/* Bottom Floating Quick Actions on Mobile / Tablet */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 lg:hidden flex items-center gap-2 bg-slate-900/90 text-white backdrop-blur-md px-4 py-2.5 rounded-full shadow-xl border border-slate-700 text-xs no-print">
          <button
            onClick={() => setIsInterviewGuideOpen(true)}
            className="flex items-center gap-1 text-amber-300 font-semibold hover:text-amber-200 px-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Interview Guide
          </button>
          <div className="h-4 w-px bg-slate-700"></div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1 font-bold text-white hover:text-indigo-200 px-2"
          >
            <Printer className="w-3.5 h-3.5" />
            Save PDF
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-xs text-slate-500 border-t border-slate-200 bg-white no-print">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Built for <strong>Vaibhav Jeughale</strong> · Angular + Generative AI Engineer
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsInterviewGuideOpen(true)}
              className="text-indigo-600 hover:underline font-medium"
            >
              Interview Prep
            </button>
            <span>·</span>
            <button
              onClick={() => setIsATSExportOpen(true)}
              className="text-indigo-600 hover:underline font-medium"
            >
              ATS Plain Text
            </button>
            <span>·</span>
            <button
              onClick={handlePrint}
              className="text-indigo-600 hover:underline font-medium"
            >
              Print / Save PDF
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <InterviewGuideModal
        isOpen={isInterviewGuideOpen}
        onClose={() => setIsInterviewGuideOpen(false)}
      />

      <PlainTextViewerModal
        isOpen={isATSExportOpen}
        onClose={() => setIsATSExportOpen(false)}
        data={resumeData}
      />

      <ResumeEditorDrawer
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        data={resumeData}
        onChange={setResumeData}
        onReset={handleReset}
        focusMode={focusMode}
        onFocusModeChange={handleFocusModeChange}
      />
    </div>
  );
}
