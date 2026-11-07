import { Link } from 'react-router-dom'

export default function Excalibur() {
  const technologies = [
    'React',
    'TypeScript',
    'HTML5 Canvas API',
    'WebSockets',
    'State Machine Engine',
    'Tailwind CSS',
    'Node.js',
    'Distributed Systems Modeling',
  ]

  const keyFeatures = [
    {
      title: 'Deterministic State Machine Graphing',
      desc: 'Transforms distributed microservice topologies and event schemas into live, deterministic state graphs with formal mathematical boundary verification.',
    },
    {
      title: 'Real-Time Network & Message Flow Simulation',
      desc: 'Simulates async packet trajectories across API gateways, Kafka/RabbitMQ message brokers, and caching layers to pinpoint bottlenecks before deployment.',
    },
    {
      title: 'Automated Interface & Schema Contract Probing',
      desc: 'Dynamically cross-references OpenAPI, GraphQL, and Protocol Buffer definitions against live runtime endpoints to detect breaking contract changes.',
    },
    {
      title: 'Zero-Latency Hardware Canvas Engine',
      desc: 'Custom WebGL and 2D canvas pipeline rendering over 1,000+ interactive nodes and dynamic spline edges at locked 60/120fps with zero frame drops.',
    },
    {
      title: 'Bidirectional Code-to-Blueprint Sync',
      desc: 'Bi-directional compiler generating production-ready TypeScript state machine definitions directly from visual canvas nodes and reverse-syncing from code.',
    },
  ]

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-zinc-100">
      
      {/* ===== TOP HEADER & BREADCRUMBS ===== */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 pb-4 sm:pb-6">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
          <Link
            to="/architecture"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span aria-hidden="true">←</span> Blueprint Map
          </Link>
          <span>/</span>
          <Link
            to="/different"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            What Makes Me Different
          </Link>
          <span>/</span>
          <span className="text-zinc-400 dark:text-zinc-500 font-medium">Case Study 01</span>
        </div>

        <div className="mt-4">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Distributed Systems & Modeling • Case Study 01
          </span>
          <h1 className="font-harmond mt-2 text-3xl sm:text-5xl md:text-6xl font-black italic tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.1]">
            Excalibur — System Architecture & Blueprint Flow
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            An interactive architectural modeling engine designed for distributed systems. It turns complex microservice boundaries, async message queues, and distributed state transitions into live, verifiable blueprints.
          </p>
        </div>
      </div>

      {/* ===== STICKY VIDEO CONTAINER (CONTENT SCROLLS SMOOTHLY UNDER IT) ===== */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-md py-3 sm:py-4 px-4 sm:px-6 md:px-8 transition-colors duration-200">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-2xl ring-1 ring-zinc-200/50 dark:ring-zinc-800/50">
            <video
              src="/videos/EXCALIBER-FINAL.mp4"
              poster="/images/banking-preview.png"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="aspect-video w-full object-cover max-h-[38vh] sm:max-h-[48vh] md:max-h-[54vh]"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Compact Sticky Telemetry Strip */}
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Live Interactive Telemetry • Excalibur Architecture Canvas
              </span>
            </div>

            <div className="hidden sm:flex flex-wrap items-center gap-1.5">
              {['Deterministic Graphs', 'State Machines', 'WebSocket Sync'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-0.5 font-mono text-[10px] font-medium text-zinc-600 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== CASE STUDY CONTENT (SCROLLS UP AND UNDER THE STICKY VIDEO) ===== */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 pb-24 space-y-12 sm:space-y-16">

        {/* Tech Stack Pills Section */}
        <div>
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
            Core Technologies & Protocols
          </h2>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 px-3.5 py-1.5 text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200 shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* The Problem & The Solution (Side by side like MedLink) */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 sm:pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="rounded-2xl border border-rose-200/70 dark:border-rose-950/60 bg-rose-50/40 dark:bg-rose-950/10 p-6 sm:p-7">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-rose-500" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  The Problem
                </h3>
              </div>
              <h4 className="font-harmond text-2xl font-bold italic text-zinc-950 dark:text-zinc-50 mt-2">
                Architectural Drift & Hidden Side Effects
              </h4>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Modern distributed microservices routinely suffer from undocumented state transitions, fragile contract assumptions, and communication deadlocks. Engineers spend up to 5 hours dead-debugging problems that stem from outdated mental models and fragmented service diagrams that do not match production code.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200/70 dark:border-emerald-950/60 bg-emerald-50/40 dark:bg-emerald-950/10 p-6 sm:p-7">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  The Architecture Solution
                </h3>
              </div>
              <h4 className="font-harmond text-2xl font-bold italic text-zinc-950 dark:text-zinc-50 mt-2">
                Executable Blueprints & State Machine Proofs
              </h4>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Excalibur provides a hardware-accelerated canvas that automatically maps distributed services into mathematical state machines. It verifies interface contracts in real time, traces packet routes through message brokers, and guarantees that the architectural model is completely synchronized with executable code.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features & Architectural Impact (Numbered Cards like MedLink) */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 sm:pt-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Capabilities // Blueprint Mechanics
            </span>
            <h2 className="font-harmond text-2xl sm:text-4xl font-black italic text-zinc-950 dark:text-zinc-50 mt-1">
              Key Features & Architectural Impact
            </h2>
          </div>

          <div className="mt-6 sm:mt-8 space-y-4">
            {keyFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 sm:p-6 shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/80 font-mono text-xs font-bold text-blue-700 dark:text-blue-400">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-harmond text-lg sm:text-xl font-bold italic text-zinc-950 dark:text-zinc-50">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-3 pl-10 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Verification & Deployment Metrics (Grid cards like MedLink) */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 sm:pt-10">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Telemetry & Impact
          </span>
          <h2 className="font-harmond text-2xl sm:text-4xl font-black italic text-zinc-950 dark:text-zinc-50 mt-1">
            Verified Deployment Metrics
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 p-6 text-center">
              <p className="font-mono text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                100%
              </p>
              <p className="mt-1 font-mono text-xs font-medium text-zinc-600 dark:text-zinc-400">
                State Invariant Determinism
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 p-6 text-center">
              <p className="font-mono text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                &lt; 5ms
              </p>
              <p className="mt-1 font-mono text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Canvas Graph Render Latency
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 p-6 text-center">
              <p className="font-mono text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                4.2x
              </p>
              <p className="mt-1 font-mono text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Faster Architectural Reviews
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Buttons (like MedLink) */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 sm:pt-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/architecture"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Blueprint Map</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/different"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition active:scale-95"
            >
              <span>What Makes Me Different</span>
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition active:scale-95"
            >
              <span>View All Projects</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  )
}
