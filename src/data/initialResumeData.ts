import { ResumeData } from '../types/resume';

export const initialResumeData: ResumeData = {
  contact: {
    name: 'VAIBHAV JEUGHALE',
    targetRole: 'Angular + Generative AI Engineer',
    phone: '+91 7218472483',
    email: 'vaibhavjs1997@gmail.com',
    location: 'India',
    linkedin: 'linkedin.com/in/vaibhav-jeughale-570389228',
    github: 'github.com/vaibhav-jeughale',
    portfolio: 'vaibhav-portfolio.dev',
  },
  professionalSummary:
    'Results-driven Software Engineer with 3.5+ years of experience specializing in Modern Angular (v12–v21) architectures and Generative AI application engineering. Proven track record of integrating LLMs into enterprise ecosystems by designing end-to-end RAG pipelines, authoring robust structured prompt engineering frameworks, and fine-tuning open-source local models (LLaMA-3, Mistral) with QLoRA for private on-premise deployments. Expert in modern Angular reactive paradigms—including Signals, Standalone Components, and RxJS—leveraged to deliver sub-second token-by-token streaming AI chat and copilot interfaces with zero layout shift.',
  technicalSkills: [
    {
      title: 'Generative AI & LLM Systems',
      skills: [
        'RAG Pipelines (LangChain, LlamaIndex)',
        'Vector Databases (pgvector, Pinecone, ChromaDB)',
        'Embedding Models (text-embedding-3, BGE, Cohere)',
        'Prompt Engineering (Few-Shot, Chain-of-Thought, JSON Schema/Zod)',
        'Local Model Fine-Tuning (LoRA, QLoRA, Hugging Face PEFT)',
        'Open-Source LLMs (LLaMA-3, Mistral, Gemma, DeepSeek)',
        'Model Serving & Quantization (vLLM, Ollama, GGUF/AWQ)',
        'Agentic Workflows & Tool Calling',
        'Guardrails & Hallucination Mitigation (NeMo Guardrails)',
      ],
    },
    {
      title: 'Modern Angular & Frontend Engineering',
      skills: [
        'Angular (v12–v21)',
        'Angular Signals (signal, computed, effect, linkedSignal)',
        'Standalone Components & APIs',
        'Built-in Control Flow (@if, @for, @switch, @defer)',
        'Zoneless Change Detection & esbuild',
        'State Management: NgRx Store, Effects, ComponentStore, RxJS',
        'Typed Reactive Forms (v14+)',
        'Angular Material, Tailwind CSS, Bootstrap, SCSS',
        'React.js, TypeScript (Strict), JavaScript (ES6+)',
      ],
    },
    {
      title: 'Real-Time AI Streaming & API Integration',
      skills: [
        'Server-Sent Events (SSE) & WebSockets for Token Streaming',
        'HttpClient, provideHttpClient(), RESTful APIs',
        'Markdown & Syntax Highlighting Parsers for LLM UI',
        'Optimistic Updates & AbortControllers (Request Cancellation)',
        'Semantic Caching (Redis) & Rate Limiting',
      ],
    },
    {
      title: 'Architecture, DevOps & Tools',
      skills: [
        'Python (FastAPI, PyTorch basics), Node.js, Next.js',
        'Docker & Containerized Model Serving',
        'CI/CD Pipelines (Git, Bitbucket, GitHub Actions)',
        'Angular Upgrade Schematics (v12 ➔ v21 migration, Ivy)',
        'SQL, PostgreSQL, Jira, Agile/Scrum, Code Reviews',
      ],
    },
  ],
  workExperience: [
    {
      id: 'smartconnectt',
      company: 'SmartConnectt Technologies',
      role: 'Software Developer | Frontend & Generative AI Engineer',
      duration: 'Dec 2024 – Present',
      location: 'Pune / Remote, India',
      highlights: [
        'Architected and integrated an enterprise-grade RAG (Retrieval-Augmented Generation) copilot into the Hub Admin portal (serving 15+ multi-tenant telecom and banking clients), enabling real-time compliance policy search and automated customer support triage.',
        'Engineered an asynchronous token streaming pipeline using Angular Signals (signal, computed) and Server-Sent Events (SSE), delivering responsive real-time LLM responses with zero layout shift and 180ms Time-to-First-Token (TTFT).',
        'Designed production-grade Prompt Engineering templates with strict structured JSON schema enforcement (Zod/Pydantic validation) and Few-Shot reasoning, reducing model output errors and format drift by 92%.',
        'Spearheaded the fine-tuning of local domain-specific LLMs (LLaMA-3 8B and Mistral 7B) using QLoRA/PEFT on internal support conversation datasets; deployed on-premise containerized inference via vLLM and Ollama, reducing external proprietary LLM API costs by 68% while preserving strict GDPR/banking compliance.',
        'Led Angular version upgrades from v12 to v21 across critical Hub Admin modules using ng update schematics, migrating legacy View Engine to Ivy, adopting Standalone Components and @if/@for control flow with zero production downtime.',
        'Implemented enterprise state management with NgRx and RxJS for complex administrative workflows, ensuring deterministic data flow, role-based UI security, and seamless multi-tenant authentication.',
        'Built and published reusable Angular Material component libraries powering LINK Service Assist, Poll modules, and interactive generative AI widget sidebars.',
      ],
    },
    {
      id: 'paptronics',
      company: 'Paptronics Pvt Ltd',
      role: 'Angular Developer',
      duration: 'Mar 2022 – Oct 2023',
      location: 'India',
      highlights: [
        'Developed high-performance responsive UI modules for education domain applications (Exams and Timetable generation) using Angular v13+, Bootstrap, and RESTful APIs.',
        'Prototyped early AI-assisted features for automated exam question generation and syllabus summarization via prompt engineering and structured JSON parsing.',
        'Participated in end-to-end Angular version migration from v12 to v13, deprecating legacy entryComponents and resolving View Engine compatibility hurdles.',
        'Implemented mobile-first layouts, integrated complex REST APIs with reactive error handling, and collaborated closely with backend teams to accelerate sprint deliveries.',
      ],
    },
  ],
  keyProjects: [
    {
      id: 'rag-hub-assistant',
      title: 'Enterprise RAG Assistant & Hub Admin Copilot',
      affiliation: 'SmartConnectt Technologies',
      technologies: ['Angular 20', 'Signals', 'LangChain', 'pgvector', 'FastAPI', 'vLLM', 'LLaMA-3'],
      description:
        'A full-stack enterprise knowledge retrieval copilot integrated directly into the centralized Hub Admin system for 15+ telecom & banking enterprise products.',
      bullets: [
        'Engineered a hybrid semantic search RAG pipeline utilizing pgvector and dense embeddings (text-embedding-3 / BGE-large) combined with BM25 keyword reranking for high-precision document retrieval.',
        'Constructed an Angular 20 Standalone Component chat client with real-time token streaming via RxJS and Signals, supporting markdown parsing, code syntax blocks, and interactive user citations.',
        'Implemented NeMo Guardrails and safety filters to prevent prompt injection and proprietary data leaks across multi-tenant banking accounts.',
      ],
    },
    {
      id: 'local-llm-finetuning',
      title: 'On-Premise Local LLM Fine-Tuning & Quantization Pipeline',
      affiliation: 'Enterprise Innovation / Open Source',
      technologies: ['Python', 'Hugging Face PEFT', 'QLoRA', 'vLLM', 'Ollama', 'Docker'],
      description:
        'Custom fine-tuning and inference deployment workflow designed to replace expensive third-party proprietary LLMs with lightweight private models.',
      bullets: [
        'Curated and sanitized a domain-specific dataset of 12,000+ support dialogues into conversational instruction format (Alpaca / ShareGPT schema).',
        'Fine-tuned LLaMA-3 8B and Mistral 7B using 4-bit QLoRA (rank r=16, alpha=32) using Hugging Face Transformers, achieving high domain ROUGE-L and BERTScore benchmarks.',
        'Quantized model weights to 4-bit AWQ and GGUF formats and containerized deployment with vLLM, achieving 45 tokens/sec inference throughput on single GPU nodes.',
      ],
    },
    {
      id: 'exam-genai-portal',
      title: 'AI-Powered Exam & Dynamic Timetable Synthesis',
      affiliation: 'Paptronics Pvt Ltd',
      technologies: ['Angular 15', 'RxJS', 'OpenAI API', 'Bootstrap', 'Node.js'],
      description:
        'Interactive educational platform featuring automated exam syllabus mapping, rubric generation, and schedule optimization.',
      bullets: [
        'Engineered dynamic prompt chains generating curriculum-aligned exam questionnaires across diverse difficulty tiers with automated grading criteria.',
        'Created responsive, accessible test-taking and administration interfaces with real-time reactive validation and timetable conflict detection.',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Engineering – ENTC',
      institution: 'Sant Gadge Baba Amravati University',
      year: '2019',
      score: 'CGPA: 7.2 / 10',
    },
  ],
  keyAchievements: [
    {
      id: 'ach-1',
      category: 'genai',
      text: 'Architected and deployed enterprise RAG pipeline and localized LLM inference, slashing third-party API token expenditures by 68% while upholding strict data sovereignty.',
    },
    {
      id: 'ach-2',
      category: 'genai',
      text: 'Designed low-latency token streaming UI in Angular with Signals and Server-Sent Events, achieving 180ms Time-to-First-Token and boosting user operational efficiency by 45%.',
    },
    {
      id: 'ach-3',
      category: 'angular',
      text: 'Spearheaded zero-downtime Angular version upgrades from v12 through v21 across multi-tenant Hub Admin modules, modernizing legacy architecture to Standalone Components and Signals.',
    },
    {
      id: 'ach-4',
      category: 'angular',
      text: 'Adopted modern Angular tooling (@defer, zoneless change detection, esbuild, NgRx), reducing application bundle sizes by 35% and accelerating build times by 40%.',
    },
    {
      id: 'ach-5',
      category: 'general',
      text: 'Authored robust structured prompt schemas and guardrail verification frameworks, reducing hallucinations and malformed API outputs by 92% across 15+ production tenants.',
    },
  ],
  certifications: [
    'DeepLearning.AI: Building Systems with the ChatGPT API & LangChain',
    'Angular Certified Architect: Modern State Management & Signals',
    'Hugging Face: Open-Source LLMs & PEFT Fine-Tuning with QLoRA',
  ],
};
