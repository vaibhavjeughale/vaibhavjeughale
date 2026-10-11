export interface ContactInfo {
  name: string;
  targetRole: string;
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface WorkExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location?: string;
  highlights: string[];
  isGenAiHeavy?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  affiliation: string;
  technologies: string[];
  description: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  score: string;
}

export interface AchievementItem {
  id: string;
  text: string;
  category: 'genai' | 'angular' | 'general';
}

export interface ResumeData {
  contact: ContactInfo;
  professionalSummary: string;
  technicalSkills: SkillCategory[];
  workExperience: WorkExperienceItem[];
  keyProjects: ProjectItem[];
  education: EducationItem[];
  keyAchievements: AchievementItem[];
  certifications?: string[];
}

export type TemplateStyle = 'executive-ai' | 'ats-classic' | 'modern-minimal';
export type PageLayoutMode = 'two-page' | 'one-page';
export type FocusMode = 'balanced' | 'heavy-genai' | 'frontend-focused';
