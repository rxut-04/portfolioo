import { Link } from 'react-router-dom'

const Excalibur = () => {
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
      desc: 'Simulates async packet trajectories across API gateways, message queues, and caching layers to pinpoint bottlenecks before deployment.',
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
    <div className="w-full min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-zinc-100">
      
      {/* ===== STICKY VIDEO CONTAINER AT THE TOP (40% VIEWPORT HEIGHT, 60% CONTENT) ===== */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-md py-2.5 sm:py-3 px-4 sm:px-8 md:px-12 transition-colors duration-200">
        <div className="mx-auto max-w-4xl flex flex-col justify-center">
          <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-xl ring-1 ring-zinc-200/50 dark:ring-zinc-800/50 flex items-center justify-center">
            <video
              src="/videos/EXCALIBER-FINAL.mp4"
              poster="/images/banking-preview.png"
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
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 shrink-0">
                Live Demo • Project 01
              </span>
              <span className="text-zinc-300 dark:text-zinc-700 hidden xs:inline">•</span>
              <p className="truncate text-xs text-zinc-600 dark:text-zinc-400 font-medium hidden xs:block">
                Excalibur System Architecture — deterministic state graphs in real time
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
          <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Distributed Systems & Modeling • Project 01
          </p>
          <h1 className="font-harmond mt-2 text-3xl sm:text-5xl md:text-6xl font-extrabold italic tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.1]">
            Excalibur — System Architecture & Blueprint Flow
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            An interactive architectural modeling engine designed for distributed systems. It turns complex microservice boundaries, async message queues, and distributed state transitions into live, verifiable blueprints.
          </p>
        </div>

        {/* Problem & Solution (Same as Medlink) */}
        <div className="mt-10 space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">The Problem</h2>
            <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Modern distributed microservices routinely suffer from undocumented state transitions, fragile contract assumptions, and communication deadlocks. Engineers spend up to 5 hours dead-debugging problems that stem from outdated mental models and fragmented service diagrams that do not match production code.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">The Solution</h2>
            <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Excalibur acts as a deterministic architecture co-pilot. It parses service schemas into live visual state machines, verifies interface contracts in real time, and renders executable blueprints that remain strictly synchronized with production code.
            </p>
          </div>
        </div>

        {/* Key Features & Architectural Impact (Same numbered cards as Medlink) */}
        <div className="mt-10 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h2 className="font-harmond text-2xl sm:text-3xl font-bold italic text-zinc-950 dark:text-zinc-50">
            Key Features & Architectural Impact
          </h2>
          <div className="mt-6 space-y-4">
            {keyFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition duration-200 hover:border-blue-300 dark:hover:border-blue-700"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-xs font-bold text-blue-700 dark:text-blue-400">
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

        {/* Trust & Deployment Metrics (Same as Medlink) */}
        <div className="mt-10 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h2 className="font-harmond text-xl font-bold italic text-zinc-950 dark:text-zinc-50">
            Trust & Deployment Metrics
          </h2>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 text-center">
              <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">100%</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">State Determinism</p>
            </div>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 text-center">
              <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">&lt; 5ms</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Render Latency</p>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 text-center">
              <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">4.2x</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Review Efficiency</p>
            </div>
          </div>
        </div>

        {/* Navigation buttons (Same as Medlink) */}
        <div className="mt-12 flex flex-wrap gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <Link
            to="/architecture"
            className="inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            ← Back to Blueprint Map
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

export default Excalibur
