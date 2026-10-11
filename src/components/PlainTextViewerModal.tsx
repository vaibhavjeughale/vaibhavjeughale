import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import { X, Copy, CheckCircle, FileText } from 'lucide-react';

interface PlainTextViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
}

export const PlainTextViewerModal: React.FC<PlainTextViewerModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate ATS-friendly plain text formatted string
  const generatePlainText = () => {
    let text = `${data.contact.name.toUpperCase()}\n`;
    text += `${data.contact.targetRole}\n`;
    text += `${data.contact.phone} | ${data.contact.email} | ${data.contact.location}\n`;
    text += `LinkedIn: ${data.contact.linkedin} | GitHub: ${data.contact.github}\n\n`;

    text += `===========================================================\n`;
    text += `PROFESSIONAL SUMMARY\n`;
    text += `===========================================================\n`;
    text += `${data.professionalSummary}\n\n`;

    text += `===========================================================\n`;
    text += `TECHNICAL SKILLS\n`;
    text += `===========================================================\n`;
    data.technicalSkills.forEach((cat) => {
      text += `* ${cat.title}: ${cat.skills.join(', ')}\n`;
    });
    text += `\n`;

    text += `===========================================================\n`;
    text += `WORK EXPERIENCE\n`;
    text += `===========================================================\n`;
    data.workExperience.forEach((job) => {
      text += `${job.role} | ${job.company} (${job.duration})\n`;
      if (job.location) text += `Location: ${job.location}\n`;
      job.highlights.forEach((h) => {
        text += `  • ${h}\n`;
      });
      text += `\n`;
    });

    text += `===========================================================\n`;
    text += `KEY PROJECTS\n`;
    text += `===========================================================\n`;
    data.keyProjects.forEach((proj) => {
      text += `${proj.title} | ${proj.affiliation}\n`;
      text += `Technologies: ${proj.technologies.join(', ')}\n`;
      text += `Description: ${proj.description}\n`;
      proj.bullets.forEach((b) => {
        text += `  • ${b}\n`;
      });
      text += `\n`;
    });

    text += `===========================================================\n`;
    text += `EDUCATION\n`;
    text += `===========================================================\n`;
    data.education.forEach((edu) => {
      text += `${edu.degree} | ${edu.institution} (${edu.year}) - ${edu.score}\n`;
    });
    text += `\n`;

    text += `===========================================================\n`;
    text += `KEY ACHIEVEMENTS & IMPACT\n`;
    text += `===========================================================\n`;
    data.keyAchievements.forEach((ach) => {
      text += `  • ${ach.text}\n`;
    });
    text += `\n`;

    if (data.certifications && data.certifications.length > 0) {
      text += `===========================================================\n`;
      text += `CERTIFICATIONS\n`;
      text += `===========================================================\n`;
      data.certifications.forEach((c) => {
        text += `  • ${c}\n`;
      });
    }

    return text;
  };

  const plainTextContent = generatePlainText();

  const handleCopy = () => {
    navigator.clipboard.writeText(plainTextContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">ATS Plain Text / Markdown Export</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 flex justify-between items-center">
          <span>
            Ideal for pasting into application portals (Workday, Taleo, Greenhouse, Lever) without losing formatting.
          </span>
          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center gap-1.5 shadow-sm transition-all"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 text-white" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Plain Text</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 bg-white">
          <pre className="font-mono text-xs text-slate-800 bg-slate-100 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-200 selection:bg-indigo-200">
            {plainTextContent}
          </pre>
        </div>

        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-medium hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
