import React from 'react';
import { ResumeData, TemplateStyle, PageLayoutMode } from '../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface ResumeDocumentProps {
  data: ResumeData;
  templateStyle: TemplateStyle;
  layoutMode: PageLayoutMode;
  highlightAiSkills: boolean;
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({
  data,
  templateStyle,
  layoutMode,
  highlightAiSkills,
}) => {
  // Keyword highlighters for visual preview (rendered cleanly)
  const formatTextWithHighlights = (text: string) => {
    if (!highlightAiSkills) return text;

    const keywords = [
      'RAG',
      'Retrieval-Augmented Generation',
      'LLM',
      'LLMs',
      'Prompt Engineering',
      'Few-Shot',
      'Signals',
      'Angular Signals',
      'vLLM',
      'Ollama',
      'Fine-Tuning',
      'fine-tuning',
      'QLoRA',
      'LoRA',
      'LLaMA-3',
      'Mistral',
      'pgvector',
      'LangChain',
      'LlamaIndex',
      'Server-Sent Events',
      'SSE',
      'NeMo Guardrails',
      'Zod',
      'Pydantic',
    ];

    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const isMatch = keywords.some((k) => k.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <span
            key={index}
            className="font-semibold text-indigo-900 bg-indigo-50/70 px-0.5 rounded"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Header styles depending on template
  const headerTheme = {
    'ats-classic': {
      title: 'text-2xl font-bold tracking-tight text-black text-center uppercase',
      subtitle: 'text-sm font-semibold tracking-wide text-gray-800 text-center mt-0.5',
      contactRow: 'flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-gray-700 mt-2 border-b border-gray-300 pb-2.5',
      sectionTitle: 'text-xs font-bold uppercase tracking-wider text-black border-b border-gray-800 pb-0.5 mb-2 mt-3.5',
      primaryText: 'text-gray-900 text-[11px] leading-relaxed',
    },
    'executive-ai': {
      title: 'text-2xl font-bold tracking-tight text-slate-900 text-center uppercase',
      subtitle: 'text-sm font-semibold tracking-wide text-indigo-700 text-center mt-0.5',
      contactRow: 'flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2 border-b border-slate-200 pb-2.5',
      sectionTitle: 'text-xs font-bold uppercase tracking-wider text-slate-800 border-b-2 border-indigo-600 pb-0.5 mb-2 mt-3.5 flex items-center justify-between',
      primaryText: 'text-slate-800 text-[11px] leading-relaxed',
    },
    'modern-minimal': {
      title: 'text-2xl font-bold tracking-tight text-gray-900 text-left',
      subtitle: 'text-sm font-semibold tracking-wide text-teal-700 text-left mt-0.5',
      contactRow: 'flex flex-wrap justify-start items-center gap-x-3 gap-y-1 text-xs text-gray-600 mt-2 border-b border-gray-200 pb-2.5',
      sectionTitle: 'text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-2 mt-3.5',
      primaryText: 'text-gray-800 text-[11px] leading-relaxed',
    },
  }[templateStyle];

  return (
    <div className="resume-paper-container w-full max-w-[850px] mx-auto bg-white shadow-xl rounded-sm text-slate-900 print:shadow-none print:max-w-none print:w-full print:rounded-none">
      {/* ================= PAGE 1 ================= */}
      <div className="resume-page p-8 sm:p-10 print:p-0 min-h-[1100px] flex flex-col justify-between print:min-h-0">
        <div>
          {/* Header Section */}
          <header className="mb-2">
            <h1 className={headerTheme.title}>{data.contact.name}</h1>
            <p className={headerTheme.subtitle}>{data.contact.targetRole}</p>

            <div className={headerTheme.contactRow}>
              {data.contact.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400 no-print" />
                  <span>{data.contact.phone}</span>
                </span>
              )}
              {data.contact.phone && data.contact.email && <span className="text-slate-300">|</span>}
              {data.contact.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400 no-print" />
                  <a href={`mailto:${data.contact.email}`} className="hover:underline">
                    {data.contact.email}
                  </a>
                </span>
              )}
              {data.contact.location && <span className="text-slate-300">|</span>}
              {data.contact.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400 no-print" />
                  <span>{data.contact.location}</span>
                </span>
              )}
              {data.contact.linkedin && <span className="text-slate-300">|</span>}
              {data.contact.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3 text-slate-400 no-print" />
                  <a
                    href={`https://${data.contact.linkedin.replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {data.contact.linkedin.replace(/^https?:\/\//, '')}
                  </a>
                </span>
              )}
              {data.contact.github && <span className="text-slate-300">|</span>}
              {data.contact.github && (
                <span className="flex items-center gap-1">
                  <Github className="w-3 h-3 text-slate-400 no-print" />
                  <a
                    href={`https://${data.contact.github.replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {data.contact.github.replace(/^https?:\/\//, '')}
                  </a>
                </span>
              )}
              {data.contact.portfolio && <span className="text-slate-300">|</span>}
              {data.contact.portfolio && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-slate-400 no-print" />
                  <a
                    href={`https://${data.contact.portfolio.replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {data.contact.portfolio.replace(/^https?:\/\//, '')}
                  </a>
                </span>
              )}
            </div>
          </header>

          {/* Professional Summary */}
          <section className="avoid-break">
            <h2 className={headerTheme.sectionTitle}>Professional Summary</h2>
            <p className={headerTheme.primaryText}>
              {formatTextWithHighlights(data.professionalSummary)}
            </p>
          </section>

          {/* Technical Skills */}
          <section className="avoid-break">
            <h2 className={headerTheme.sectionTitle}>Technical Skills</h2>
            <div className="space-y-1.5 text-[11px] leading-relaxed">
              {data.technicalSkills.map((category, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                  <span className="font-bold text-slate-900 sm:w-48 shrink-0">
                    {category.title}:
                  </span>
                  <span className="text-slate-700">
                    {category.skills.map((skill, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <span>{formatTextWithHighlights(skill)}</span>
                        {sIdx < category.skills.length - 1 && <span className="mx-1 text-slate-400">·</span>}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Work Experience */}
          <section>
            <h2 className={headerTheme.sectionTitle}>Work Experience</h2>
            <div className="space-y-3.5">
              {data.workExperience.map((job) => (
                <div key={job.id} className="avoid-break">
                  <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                    <div>
                      <span className="font-bold text-slate-900 text-[12px]">{job.role}</span>
                      <span className="text-slate-400 mx-1.5">|</span>
                      <span className="font-semibold text-slate-800 text-[11.5px]">{job.company}</span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500">{job.duration}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-[10.5px] text-slate-700 leading-relaxed">
                    {job.highlights.map((point, pIdx) => (
                      <li key={pIdx}>
                        {formatTextWithHighlights(point)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* If 1-page layout, render remaining sections compacted right here */}
          {layoutMode === 'one-page' && (
            <>
              {/* Key Projects (Compact) */}
              <section className="avoid-break mt-3">
                <h2 className={headerTheme.sectionTitle}>Key Projects</h2>
                <div className="space-y-2.5">
                  {data.keyProjects.slice(0, 2).map((proj) => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="font-bold text-[11.5px] text-slate-900">
                          {proj.title}{' '}
                          <span className="font-normal text-slate-500">| {proj.affiliation}</span>
                        </span>
                        <span className="text-[10px] text-indigo-700 font-medium">
                          {proj.technologies.slice(0, 4).join(', ')}
                        </span>
                      </div>
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10.5px] text-slate-700 leading-tight">
                        {proj.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{formatTextWithHighlights(b)}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education & Achievements in Compact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 avoid-break">
                <div>
                  <h2 className={headerTheme.sectionTitle}>Education</h2>
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="text-[10.5px]">
                      <div className="font-bold text-slate-900">{edu.degree}</div>
                      <div className="text-slate-600">{edu.institution} | {edu.year}</div>
                      <div className="text-slate-500 font-medium">{edu.score}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <h2 className={headerTheme.sectionTitle}>Key Achievements</h2>
                  <ul className="list-disc list-outside ml-4 text-[10px] text-slate-700 space-y-0.5 leading-tight">
                    {data.keyAchievements.slice(0, 3).map((ach) => (
                      <li key={ach.id}>{formatTextWithHighlights(ach.text)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        {layoutMode === 'two-page' && (
          <div className="no-print pt-6 pb-2 text-center border-t border-dashed border-slate-200 text-xs text-slate-400">
            — End of Page 1 / Page 2 starts below —
          </div>
        )}
      </div>

      {/* ================= PAGE 2 (If Two-Page Mode) ================= */}
      {layoutMode === 'two-page' && (
        <div className="resume-page p-8 sm:p-10 print:p-0 min-h-[1100px] flex flex-col justify-between border-t border-slate-200 print:border-t-0 print:min-h-0">
          <div>
            {/* Page 2 Header Bar for visual continuity */}
            <div className="flex justify-between items-baseline border-b border-slate-300 pb-1.5 mb-3">
              <div>
                <span className="font-bold text-slate-900 text-xs tracking-wider uppercase">
                  {data.contact.name}
                </span>
                <span className="text-slate-400 mx-2">·</span>
                <span className="text-xs text-slate-600 font-medium">{data.contact.targetRole}</span>
              </div>
              <span className="text-[11px] text-slate-400">Page 2</span>
            </div>

            {/* Key Projects Section */}
            <section className="avoid-break">
              <h2 className={headerTheme.sectionTitle}>Key Technical Projects</h2>
              <div className="space-y-3.5">
                {data.keyProjects.map((proj) => (
                  <div key={proj.id} className="avoid-break">
                    <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                      <div>
                        <span className="font-bold text-slate-900 text-[12px]">{proj.title}</span>
                        <span className="text-slate-400 mx-1.5">|</span>
                        <span className="text-[11px] font-semibold text-slate-700">{proj.affiliation}</span>
                      </div>
                    </div>
                    <div className="mb-1 text-[10px] font-medium text-indigo-700 flex flex-wrap gap-1">
                      <span className="text-slate-500 font-semibold">Tech Stack:</span>
                      {proj.technologies.join(' · ')}
                    </div>
                    <p className="text-[10.5px] text-slate-600 mb-1 italic">
                      {proj.description}
                    </p>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-[10.5px] text-slate-700 leading-relaxed">
                      {proj.bullets.map((point, pIdx) => (
                        <li key={pIdx}>
                          {formatTextWithHighlights(point)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section className="avoid-break mt-4">
              <h2 className={headerTheme.sectionTitle}>Education</h2>
              <div className="space-y-1.5">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-baseline text-[11px]">
                    <div>
                      <span className="font-bold text-slate-900">{edu.degree}</span>
                      <span className="text-slate-400 mx-1.5">|</span>
                      <span className="text-slate-700">{edu.institution}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500">{edu.year}</span>
                      <span className="text-slate-400 mx-1.5">|</span>
                      <span className="font-semibold text-slate-800">{edu.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Achievements Section */}
            <section className="avoid-break mt-4">
              <h2 className={headerTheme.sectionTitle}>Key Achievements & Impact</h2>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-[10.5px] text-slate-700 leading-relaxed">
                {data.keyAchievements.map((ach) => (
                  <li key={ach.id}>
                    {formatTextWithHighlights(ach.text)}
                  </li>
                ))}
              </ul>
            </section>

            {/* Certifications Section */}
            {data.certifications && data.certifications.length > 0 && (
              <section className="avoid-break mt-4">
                <h2 className={headerTheme.sectionTitle}>Specialized Certifications</h2>
                <ul className="list-disc list-outside ml-4 space-y-1 text-[10.5px] text-slate-700 leading-relaxed">
                  {data.certifications.map((cert, cIdx) => (
                    <li key={cIdx} className="font-medium text-slate-800">
                      {cert}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="no-print pt-6 pb-2 text-center border-t border-dashed border-slate-200 text-xs text-slate-400">
            — End of Resume Document —
          </div>
        </div>
      )}
    </div>
  );
};
