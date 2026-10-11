import React, { useState } from 'react';
import { ResumeData, FocusMode } from '../types/resume';
import { X, RotateCcw, Plus, Trash2, Sliders, Check } from 'lucide-react';

interface ResumeEditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
  onReset: () => void;
  focusMode: FocusMode;
  onFocusModeChange: (mode: FocusMode) => void;
}

export const ResumeEditorDrawer: React.FC<ResumeEditorDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onChange,
  onReset,
  focusMode,
  onFocusModeChange,
}) => {
  const [activeTab, setActiveTab] = useState<'contact' | 'summary' | 'work' | 'skills' | 'achievements'>('contact');
  const [newSkillText, setNewSkillText] = useState('');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState(0);

  if (!isOpen) return null;

  const handleContactChange = (field: keyof typeof data.contact, value: string) => {
    onChange({
      ...data,
      contact: {
        ...data.contact,
        [field]: value,
      },
    });
  };

  const handleSummaryChange = (val: string) => {
    onChange({
      ...data,
      professionalSummary: val,
    });
  };

  const handleWorkHighlightChange = (jobIdx: number, highlightIdx: number, val: string) => {
    const updatedWork = [...data.workExperience];
    updatedWork[jobIdx].highlights[highlightIdx] = val;
    onChange({
      ...data,
      workExperience: updatedWork,
    });
  };

  const handleAddWorkHighlight = (jobIdx: number) => {
    const updatedWork = [...data.workExperience];
    updatedWork[jobIdx].highlights.push('Engineered new high-performance module integrating LLM capabilities and Angular.');
    onChange({
      ...data,
      workExperience: updatedWork,
    });
  };

  const handleRemoveWorkHighlight = (jobIdx: number, highlightIdx: number) => {
    const updatedWork = [...data.workExperience];
    updatedWork[jobIdx].highlights.splice(highlightIdx, 1);
    onChange({
      ...data,
      workExperience: updatedWork,
    });
  };

  const handleAddSkill = () => {
    if (!newSkillText.trim()) return;
    const updatedSkills = [...data.technicalSkills];
    updatedSkills[selectedSkillCategory].skills.push(newSkillText.trim());
    onChange({
      ...data,
      technicalSkills: updatedSkills,
    });
    setNewSkillText('');
  };

  const handleRemoveSkill = (catIdx: number, skillIdx: number) => {
    const updatedSkills = [...data.technicalSkills];
    updatedSkills[catIdx].skills.splice(skillIdx, 1);
    onChange({
      ...data,
      technicalSkills: updatedSkills,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs no-print">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-sm font-bold">Resume Customizer & Live Editor</h2>
              <p className="text-[11px] text-slate-300">Tweak details to target specific job descriptions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded flex items-center gap-1 transition-colors"
              title="Reset to default enhanced values"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preset Emphasis Selector */}
        <div className="bg-indigo-50/80 p-3.5 border-b border-indigo-100">
          <label className="text-[11px] font-bold text-indigo-950 uppercase tracking-wider block mb-1.5">
            Role Positioning Preset
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onFocusModeChange('heavy-genai')}
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                focusMode === 'heavy-genai'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-indigo-100/60 border border-indigo-200'
              }`}
            >
              Heavy GenAI Focus
            </button>
            <button
              onClick={() => onFocusModeChange('balanced')}
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                focusMode === 'balanced'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-indigo-100/60 border border-indigo-200'
              }`}
            >
              Balanced (Angular + AI)
            </button>
            <button
              onClick={() => onFocusModeChange('frontend-focused')}
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                focusMode === 'frontend-focused'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-indigo-100/60 border border-indigo-200'
              }`}
            >
              Frontend Lead Focus
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-2 pt-2 gap-1 overflow-x-auto text-xs font-medium">
          {[
            { id: 'contact', label: 'Contact' },
            { id: 'summary', label: 'Summary' },
            { id: 'skills', label: 'Skills' },
            { id: 'work', label: 'Experience' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 border-b-2 font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-700 font-semibold bg-white rounded-t-md'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'contact' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={data.contact.name}
                  onChange={(e) => handleContactChange('name', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Target Professional Role</label>
                <input
                  type="text"
                  value={data.contact.targetRole}
                  onChange={(e) => handleContactChange('targetRole', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Angular + Generative AI Engineer"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    value={data.contact.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={data.contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={data.contact.linkedin}
                  onChange={(e) => handleContactChange('linkedin', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">GitHub / Portfolio</label>
                <input
                  type="text"
                  value={data.contact.github}
                  onChange={(e) => handleContactChange('github', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700 block">
                Executive Professional Summary
              </label>
              <textarea
                rows={8}
                value={data.professionalSummary}
                onChange={(e) => handleSummaryChange(e.target.value)}
                className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed text-slate-800"
              />
              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
                Tip: Keep the opening punchy, mentioning 3.5+ years of experience, Angular (v12-v21), RAG pipelines, and local LLM fine-tuning.
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">Add Skill to Category</label>
                <div className="flex gap-2">
                  <select
                    value={selectedSkillCategory}
                    onChange={(e) => setSelectedSkillCategory(Number(e.target.value))}
                    className="text-xs border border-slate-300 rounded-lg px-2 py-1.5 bg-white outline-none"
                  >
                    {data.technicalSkills.map((cat, idx) => (
                      <option key={idx} value={idx}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={newSkillText}
                    onChange={(e) => setNewSkillText(e.target.value)}
                    placeholder="e.g. DeepSeek, Semantic Cache"
                    className="flex-1 text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 outline-none"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>
              </div>

              {data.technicalSkills.map((cat, cIdx) => (
                <div key={cIdx} className="border border-slate-200 rounded-lg p-3">
                  <div className="text-xs font-bold text-slate-800 mb-2">{cat.title}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-200"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => handleRemoveSkill(cIdx, sIdx)}
                          className="text-slate-400 hover:text-red-500 ml-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'work' && (
            <div className="space-y-5">
              {data.workExperience.map((job, jIdx) => (
                <div key={job.id} className="border border-slate-200 rounded-lg p-3 space-y-2.5">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{job.company}</div>
                      <div className="text-[11px] text-slate-500">{job.role} · {job.duration}</div>
                    </div>
                    <button
                      onClick={() => handleAddWorkHighlight(jIdx)}
                      className="text-[11px] text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold"
                    >
                      <Plus className="w-3 h-3" /> Add Bullet
                    </button>
                  </div>

                  <div className="space-y-2">
                    {job.highlights.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-1.5">
                        <span className="text-slate-400 text-xs mt-1">•</span>
                        <textarea
                          rows={2}
                          value={bullet}
                          onChange={(e) => handleWorkHighlightChange(jIdx, bIdx, e.target.value)}
                          className="flex-1 text-xs border border-slate-300 rounded p-1.5 outline-none leading-relaxed"
                        />
                        <button
                          onClick={() => handleRemoveWorkHighlight(jIdx, bIdx)}
                          className="p-1 text-slate-400 hover:text-red-500"
                          title="Remove Bullet"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            Done Customizing
          </button>
        </div>
      </div>
    </div>
  );
};
