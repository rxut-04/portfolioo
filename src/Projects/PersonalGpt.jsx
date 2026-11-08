import { Link } from 'react-router-dom'

const PersonalGpt = () => {
  const technologies = [
    'Next.js 14',
    'TypeScript',
    'LangChain / LangGraph',
    'Vector Database',
    'OpenAI / Anthropic APIs',
    'Redis Pub/Sub',
    'Streaming API',
    'Sandboxed Code Runtime',
    'AST Parser',
  ]

  const keyFeatures = [
    {
      title: 'Context-Aware Reasoning & Recursive Execution Loops',
      desc: 'Employs multi-pass cognitive reflection loops where the model self-critiques intermediate tool outputs and backtracks if validation checks fail before delivering code or executing system operations.',
    },
    {
      title: 'Sandboxed Terminal & Secure Tool Orchestration',
      desc: 'Executes filesystem commands, shell scripts, and package installations inside an isolated container boundary with deterministic permission checkpoints and output stream truncation protection.',
    },
    {
      title: 'Hierarchical Memory & Semantic Vector Indexing',
      desc: 'Maintains long-term episodic conversation history, codebase structural facts, and user preferences using hybrid dense-sparse vector indexing backed by low-latency Redis embeddings.',
    },
    {
      title: 'Dynamic Abstract Syntax Tree (AST) Codebase Traversal',
      desc: 'Parses complex JavaScript/TypeScript and Python codebases into live AST dependency graphs, enabling the agent to pinpoint exact symbols, call sites, and import graphs without hitting context window bloat.',
    },
    {
      title: 'Multi-Model Arbitration & Token Efficiency Optimizer',
      desc: 'Dynamically routes high-order architectural planning to heavyweight reasoning models while delegating repetitive linting, formatting, and file queries to sub-second lightweight models, slashing latency by 68%.',
    },
  ]

  return (
    <div className="w-full min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-zinc-100">
      
      {/* ===== STICKY VIDEO CONTAINER AT THE TOP (40% VIEWPORT HEIGHT, 60% CONTENT) ===== */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-md py-2.5 sm:py-3 px-4 sm:px-8 md:px-12 transition-colors duration-200">
        <div className="mx-auto max-w-4xl flex flex-col justify-center">
          <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-xl ring-1 ring-zinc-200/50 dark:ring-zinc-800/50 flex items-center justify-center">
            <video
              src="/videos/Personal-GPT.mp4"
              poster="/images/medlink-preview.png"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full aspect-video object-cover max-h-[30vh] sm:max-h-[32vh]"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="mt-2 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/60 px-3 py-1.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 shrink-0">
                Live Demo • Project 02
              </span>
              <span className="text-zinc-300 dark:text-zinc-700 hidden xs:inline">•</span>
              <p className="truncate text-xs text-zinc-600 dark:text-zinc-400 font-medium hidden xs:block">
                Personal GPT Autonomous Assistant — context-driven reasoning loops and sandboxed execution
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== REST OF THE DATA AFTER IT (SCROLLS UNDER THE STICKY VIDEO) ===== */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8 md:px-12 pt-8 sm:pt-10 pb-24">
        
        {/* Quick Tech Summary Pills under video */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 px-3 py-1 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 shadow-2xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Header Info */}
        <div className="mt-8">
          <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            Autonomous Agentic AI • Project 02
          </p>
          <h1 className="font-harmond mt-2 text-3xl sm:text-5xl md:text-6xl font-extrabold italic tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.1]">
            Personal GPT — Autonomous Assistant & Context Loop
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            A stateful agentic system engineered to eliminate hallucination loops and context loss. It integrates verified tool orchestration, memory persistence, and reflective cognitive checkpoints that operate directly within the developer’s codebase.
          </p>
        </div>

        {/* Problem & Solution (Same minimalist rhythm as Medlink) */}
        <div className="mt-10 space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">The Problem</h2>
            <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Traditional LLM prompting relies on fragile single-turn prompt chains that lose context across sessions, hallucinate invalid file paths, and fail when encountering complex multi-file refactoring tasks. Developers spend hours babysitting prompts and cleaning up broken intermediate code commits.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">The Solution</h2>
            <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Personal GPT implements an autonomous agent architecture with self-correcting validation loops. Before writing code, it builds an AST symbol index, runs terminal commands in sandboxed isolation, and validates syntax and unit test results before asking for human sign-off.
            </p>
          </div>
        </div>

        {/* Key Features & Architectural Impact */}
        <div className="mt-10 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h2 className="font-harmond text-2xl sm:text-3xl font-bold italic text-zinc-950 dark:text-zinc-50">
            Key Features & Architectural Impact
          </h2>
          <div className="mt-6 space-y-4">
            {keyFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition duration-200 hover:border-emerald-300 dark:hover:border-emerald-700"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    {idx + 1}
                  </span>
                  <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">{feature.title}</h3>
                </div>
                <p className="mt-2 pl-9 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Deployment Metrics */}
        <div className="mt-10 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h2 className="font-harmond text-xl font-bold italic text-zinc-950 dark:text-zinc-50">
            Trust & Deployment Metrics
          </h2>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 text-center">
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">4.2x</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Reasoning Speedup</p>
            </div>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 text-center">
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">99.4%</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Tool Precision</p>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 text-center">
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">100%</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Context Recall</p>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="mt-12 flex flex-wrap gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <Link
            to="/different"
            className="inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            ← Back to Case Studies
          </Link>
          <Link
            to="/projects/production-execution"
            className="inline-flex rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 shadow-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Next: Production Release →
          </Link>
          <Link
            to="/different"
            className="inline-flex rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 shadow-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            What Makes Me Different
          </Link>
          <Link
            to="/projects"
            className="inline-flex rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 shadow-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            View All Projects
          </Link>
        </div>

      </div>
    </div>
  )
}

export default PersonalGpt
