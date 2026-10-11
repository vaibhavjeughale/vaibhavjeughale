export interface InterviewTopic {
  id: string;
  category: 'RAG Pipelines' | 'Prompt Engineering' | 'Local Model Fine-Tuning' | 'Angular AI Streaming';
  question: string;
  conciseSummary: string;
  technicalDeepDive: string[];
  keyTermsToDrop: string[];
  codeOrArchitectureSnippet?: string;
}

export const interviewTopics: InterviewTopic[] = [
  {
    id: 'rag-architecture',
    category: 'RAG Pipelines',
    question: 'How did you build the RAG pipeline and integrate it into the Angular enterprise app?',
    conciseSummary:
      'We implemented a hybrid retrieval RAG pipeline where user queries are converted into dense vector embeddings, searched against pgvector/Pinecone with hybrid BM25 lexical reranking, and injected into a strict system prompt for grounded response generation.',
    technicalDeepDive: [
      'Document Chunking: Used recursive character chunking with chunk size 512 tokens and 50-token overlap to maintain semantic continuity across section boundaries.',
      'Embeddings: Utilized text-embedding-3-small / BGE-large to generate 1536-dimensional embeddings stored in pgvector with HNSW (Hierarchical Navigable Small World) indexing for sub-15ms vector similarity queries.',
      'Hybrid Search & Reranking: Combined Cosine Similarity with BM25 full-text search via Reciprocal Rank Fusion (RRF) to retrieve both contextual semantics and exact technical identifiers.',
      'Citation & Grounding: The LLM prompt instructed the model to output source chunk IDs, which the Angular frontend rendered as clickable interactive badge citations linking to the source policy.',
    ],
    keyTermsToDrop: [
      'HNSW Indexing',
      'Reciprocal Rank Fusion (RRF)',
      'Chunk Size & Overlap (512/50 tokens)',
      'Cosine Similarity & pgvector',
      'Context Window Optimization',
    ],
    codeOrArchitectureSnippet: `// High-Level RAG Architecture Flow:
// [Angular 20 Client] (Signals + SSE)
//       │  HTTP POST /api/chat (stream: true)
//       ▼
// [FastAPI / Node Backend]
//       ├── 1. Generate Query Embedding (text-embedding-3)
//       ├── 2. Vector Search (pgvector HNSW Cosine Distance, Top-K=5)
//       ├── 3. Rerank with Cross-Encoder / BM25
//       ├── 4. Construct Prompt with Grounded Context
//       ├── 5. Stream LLM Response via Server-Sent Events (SSE)
//       ▼
// [Angular Signals Signal Store updates token-by-token]`,
  },
  {
    id: 'prompt-engineering',
    category: 'Prompt Engineering',
    question: 'How did you approach Prompt Engineering to ensure zero hallucination and strict structured output?',
    conciseSummary:
      'We avoided ambiguous free-form prompts by implementing strict System Prompts with role personas, few-shot in-context exemplars, JSON Schema / Zod structured output enforcement, and NeMo Guardrails for banking compliance.',
    technicalDeepDive: [
      'Structured Outputs: Enforced response schemas via OpenAI JSON Mode / Structured Outputs backed by Zod schemas in TypeScript and Pydantic in Python.',
      'Few-Shot Prompting: Provided 3–4 high-quality positive and negative edge-case examples directly inside the system prompt to guide tone, edge-case rejection, and formatting.',
      'Chain-of-Thought (CoT): Instructed the model to generate a hidden `<reasoning>` trace prior to outputting the final user response, drastically cutting logical leaps and errors.',
      'Hallucination Mitigation: Included strict fallback clauses: "If the provided context does not contain the answer, explicitly return \'I do not have sufficient information in the verified documentation to answer this question\'."',
      'Guardrails: Set up NeMo Guardrails to block prompt injections ("jailbreaks") and filter out sensitive PII (credit card numbers, PAN numbers).',
    ],
    keyTermsToDrop: [
      'Few-Shot In-Context Learning',
      'JSON Schema / Zod Enforcement',
      'Chain-of-Thought (CoT)',
      'NeMo Guardrails & Jailbreak Prevention',
      'System Prompt Delimiters (### Context, ### Rules)',
    ],
  },
  {
    id: 'fine-tuning-local-models',
    category: 'Local Model Fine-Tuning',
    question: 'Why did you fine-tune local models instead of using commercial APIs, and how did you do it?',
    conciseSummary:
      'Enterprise banking and telecom clients required strict data privacy (no customer data sent to external cloud APIs) and cost efficiency. We fine-tuned LLaMA-3 8B and Mistral 7B using QLoRA, quantized them to 4-bit, and served them on-premise using vLLM.',
    technicalDeepDive: [
      'Dataset Preparation: Collected and sanitized 12,000+ domain support conversations, converted them into ShareGPT/Alpaca instruction format, and validated token lengths.',
      'QLoRA Technique: Used 4-bit NormalFloat (NF4) quantization via BitsAndBytes. Kept base model frozen and trained low-rank adapters (LoRA rank r=16, alpha=32, target modules: q_proj, k_proj, v_proj, o_proj).',
      'Training Infrastructure: Fine-tuned on an NVIDIA A10G/A100 GPU using Hugging Face SFTTrainer (PEFT + TRL) with cosine learning rate schedule (2e-4) over 3 epochs.',
      'Quantization & Serving: Merged adapter weights, converted model to AWQ/GGUF format, and deployed containerized model endpoints using vLLM with PagedAttention, achieving 45+ tokens/second.',
      'ROI Impact: Reduced commercial API token costs by 68% while completely eliminating third-party data transmission risks.',
    ],
    keyTermsToDrop: [
      'QLoRA (4-bit NF4 Quantization)',
      'LoRA Rank (r=16, alpha=32)',
      'Hugging Face PEFT & SFTTrainer',
      'vLLM with PagedAttention',
      'GGUF / AWQ Quantization',
      'Data Privacy & On-Premise Compliance',
    ],
  },
  {
    id: 'angular-streaming-signals',
    category: 'Angular AI Streaming',
    question: 'How did you handle real-time streaming LLM responses in modern Angular (v17–v21)?',
    conciseSummary:
      'We replaced traditional polling or single REST responses with Server-Sent Events (SSE) read via Fetch API ReadableStream, feeding directly into an Angular Signal (`signal()`) and `computed()` properties to drive an ultra-smooth, zero-lag streaming UI.',
    technicalDeepDive: [
      'Angular Signals Reactivity: Created an `aiResponse = signal("")` and `isStreaming = signal(false)`. Each incoming SSE chunk appends to the signal, cleanly notifying only the markdown renderer without triggering costly full component tree re-checks.',
      'Zoneless & High Performance: With Angular 18+ zoneless change detection and esbuild, streaming updates at 30-50 tokens/second run at a smooth 60fps without Zone.js overhead.',
      'Markdown & Code Block Streaming: Utilized an incremental markdown parser with syntax highlighting that does not re-render the entire message history on every token, avoiding scroll jumping and layout thrashing.',
      'AbortController for Cancel Generation: Implemented immediate stream cancellation when the user clicks "Stop Generating" or navigates away, closing both the network socket and backend inference job.',
    ],
    keyTermsToDrop: [
      'Angular Signals (signal, computed, effect)',
      'Server-Sent Events (SSE) & ReadableStream',
      'AbortController (Cancel Generation)',
      'Zoneless Change Detection & OnPush',
      'Incremental Markdown Parsing',
    ],
  },
];
