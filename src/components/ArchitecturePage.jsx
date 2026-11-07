import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CASE_STUDIES = [
  {
    id: 1,
    tag: 'Case Study 01',
    category: 'Distributed Systems & Modeling',
    title: 'Excalibur Blueprint Engine',
    subtitle: 'System Architecture & Blueprint Flow',
    desc: 'Interactive architectural modeling of distributed components, data routing boundaries, and system states into deterministic blueprints.',
    video: '/videos/EXCALIBER-FINAL.mp4',
    problem: 'Multi-service pipelines suffer from architectural drift and undocumented state transitions during team scale.',
    solution: 'Live visual canvas generating deterministic component graphs, dependency hierarchies, and verified interface contracts.',
    tech: ['React', 'TypeScript', 'Canvas Engine', 'WebSockets', 'State Machine'],
    metrics: { label: 'State Determinism', val: '100%' },
    color: 'from-blue-500 to-indigo-600',
    accentBorder: 'border-blue-500/40 dark:border-blue-500/50',
    accentGlow: 'shadow-blue-500/10 dark:shadow-blue-500/20',
  },
  {
    id: 2,
    tag: 'Case Study 02',
    category: 'Autonomous Agentic AI',
    title: 'Personal GPT Autonomous Assistant',
    subtitle: 'Context-Driven Reasoning Loop',
    desc: 'Context-driven autonomous assistant featuring recursive reasoning loops, verified tool execution, and persistent memory.',
    video: '/videos/Personal-GPT.mp4',
    problem: 'Fragile prompt chains hallucinate, lose long-term memory, and fail on complex multi-step developer operations.',
    solution: 'Self-correcting cognitive loops with runtime validation checkpoints, sandboxed code execution, and persistent vector stores.',
    tech: ['Next.js', 'LangChain', 'Vector DB', 'Streaming API', 'Redis'],
    metrics: { label: 'Reasoning Efficiency', val: '4.2x' },
    color: 'from-emerald-500 to-teal-600',
    accentBorder: 'border-emerald-500/40 dark:border-emerald-500/50',
    accentGlow: 'shadow-emerald-500/10 dark:shadow-emerald-500/20',
  },
  {
    id: 3,
    tag: 'Case Study 03',
    category: 'Cloud Infrastructure & CI/CD',
    title: 'Production Deployment & Execution',
    subtitle: 'Zero-Downtime Release Pipeline',
    desc: 'Real-time execution of zero-downtime production deployment, verified telemetry, canary routing, and end-to-end task completion.',
    video: '/videos/Success_clip1.mp4',
    problem: 'Manual deployments cause unexpected downtime, rollback delays, and unmonitored production configuration drift.',
    solution: 'Automated CI/CD telemetry pipeline with automated health probing, automated canary gates, and instant rollback safety.',
    tech: ['Docker', 'Kubernetes', 'GitHub Actions', 'Prometheus', 'Grafana'],
    metrics: { label: 'Uptime Reliability', val: '99.99%' },
    color: 'from-amber-500 to-orange-600',
    accentBorder: 'border-amber-500/40 dark:border-amber-500/50',
    accentGlow: 'shadow-amber-500/10 dark:shadow-amber-500/20',
  },
  {
    id: 4,
    tag: 'Case Study 04',
    category: 'Financial Auditing & Ledgers',
    title: 'Immutable Archive & Ledger Records',
    subtitle: 'High-Integrity Historical Ledger',
    desc: 'High-integrity archiving pipeline with persistent audit logging, deterministic state indexing, and rapid query retrieval.',
    video: '/videos/archive-final.mp4',
    problem: 'High-throughput financial ledgers face audit tampering risks and sluggish query degradation on millions of historical blocks.',
    solution: 'Cryptographically signed append-only transaction ledger with Merkle tree proofs and sub-millisecond retrieval caching.',
    tech: ['Node.js', 'Merkle Proofs', 'PostgreSQL', 'SHA-256', 'WebSockets'],
    metrics: { label: 'Query Latency', val: '< 5ms' },
    color: 'from-purple-500 to-violet-600',
    accentBorder: 'border-purple-500/40 dark:border-purple-500/50',
    accentGlow: 'shadow-purple-500/10 dark:shadow-purple-500/20',
  },
  {
    id: 5,
    tag: 'Case Study 05',
    category: 'Logistics & Real-Time Telemetry',
    title: 'Feasto Smart Delivery Platform',
    subtitle: 'Real-Time Dispatch & Telemetry',
    desc: 'Real-time food delivery dispatch system with intelligent order routing, live kitchen telemetry, and automated courier tracking.',
    video: '/videos/FEASTO-FINAL.mp4',
    problem: 'Unoptimized courier allocation and dispatch latency cause food cooling and customer churn during peak order windows.',
    solution: 'Real-time geospatial dispatch engine coordinating order batching, preparation milestones, and live turn-by-turn routing.',
    tech: ['React', 'Node.js', 'GeoSpatial Index', 'Socket.io', 'Google Maps'],
    metrics: { label: 'Dispatch Latency', val: '-35%' },
    color: 'from-rose-500 to-pink-600',
    accentBorder: 'border-rose-500/40 dark:border-rose-500/50',
    accentGlow: 'shadow-rose-500/10 dark:shadow-rose-500/20',
  },
]

export default function ArchitecturePage() {
  const navigate = useNavigate()
  const [activeStudy, setActiveStudy] = useState(1)
  const containerRef = useRef(null)
  const btnRefs = useRef([])
  const cardRefs = useRef([])
  const [arrows, setArrows] = useState([])

  const STUDY_ROUTES = {
    1: '/projects/excalibur',
    2: '/projects/personal-gpt',
    3: '/projects/production-execution',
    4: '/projects/archive-ledger',
    5: '/projects/feasto',
  }

  const handleStudySelect = (id) => {
    setActiveStudy(id)
    if (STUDY_ROUTES[id]) {
      navigate(STUDY_ROUTES[id])
    }
  }

  // Calculate connector arrow paths between center buttons and content cards
  useEffect(() => {
    const updateArrows = () => {
      if (!containerRef.current) return
      const containerRect = containerRef.current.getBoundingClientRect()

      const newArrows = CASE_STUDIES.map((_, i) => {
        const btn = btnRefs.current[i]
        const card = cardRefs.current[i]
        if (!btn || !card) return null

        const bRect = btn.getBoundingClientRect()
        const cRect = card.getBoundingClientRect()

        // Start point at button edge
        const startX = bRect.left + bRect.width / 2 - containerRect.left
        const startY = bRect.top + bRect.height / 2 - containerRect.top

        // Target point at card edge
        let endX = cRect.left + cRect.width / 2 - containerRect.left
        let endY = cRect.top + cRect.height / 2 - containerRect.top

        if (i === 0) {
          endX = cRect.right - containerRect.left - 20
          endY = cRect.bottom - containerRect.top
        } else if (i === 1) {
          endX = cRect.left + cRect.width / 2 - containerRect.left
          endY = cRect.bottom - containerRect.top
        } else if (i === 2) {
          endX = cRect.left - containerRect.left + 20
          endY = cRect.bottom - containerRect.top
        } else if (i === 3) {
          endX = cRect.right - containerRect.left - 20
          endY = cRect.top - containerRect.top
        } else if (i === 4) {
          endX = cRect.left + cRect.width / 2 - containerRect.left
          endY = cRect.top - containerRect.top
        }

        // Curved control points for natural hand-drawn flow
        const dx = endX - startX
        const dy = endY - startY
        const cpX = startX + dx * 0.25 - (dy * 0.15)
        const cpY = startY + dy * 0.65

        const path = `M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`
        return { path, startX, startY, endX, endY }
      })

      setArrows(newArrows)
    }

    updateArrows()
    window.addEventListener('resize', updateArrows)
    const timer = setTimeout(updateArrows, 200)
    return () => {
      window.removeEventListener('resize', updateArrows)
      clearTimeout(timer)
    }
  }, [activeStudy])

  return (
    <main className="relative min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-zinc-100 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-12">
      {/* Top Header & Breadcrumb */}
      <header className="mx-auto max-w-7xl mb-8 sm:mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-800">
          <div>
            <Link
              to="/different"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              <span aria-hidden="true">←</span> Back to What Makes Me Different
            </Link>
            <div className="flex items-center gap-2 mt-3">
              <span className="size-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Architectural Blueprint Map // 5 Systems
              </span>
            </div>
            <h1 className="font-harmond text-3xl sm:text-4xl md:text-5xl font-black italic text-zinc-950 dark:text-zinc-50 mt-1">
              Systems Architecture & Case Studies
            </h1>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition active:scale-95 shadow-xs"
          >
            <span>View All Projects</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>

      {/* ===== INTERACTIVE MAP CANVAS (MATCHING USER DIAGRAM) ===== */}
      <section className="mx-auto max-w-7xl">
        <div
          ref={containerRef}
          className="relative min-h-[960px] lg:min-h-[1100px] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-gradient-to-b from-zinc-50/70 via-white to-zinc-50/70 dark:from-zinc-950/70 dark:via-zinc-900/30 dark:to-zinc-950/70 p-4 sm:p-6 lg:p-8 shadow-sm overflow-hidden"
        >
          {/* Subtle grid background for architectural blueprint feel */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* SVG Arrow Connectors Layer (Visible on Desktop/Laptop) */}
          <svg className="pointer-events-none absolute inset-0 size-full hidden lg:block z-10">
            <defs>
              <marker
                id="arrowhead-active"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <polygon points="0 1, 8 4, 0 7" fill="#3b82f6" />
              </marker>
              <marker
                id="arrowhead-idle"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <polygon points="0 1, 8 4, 0 7" fill="currentColor" className="text-zinc-300 dark:text-zinc-700" />
              </marker>
            </defs>

            {arrows.map((arr, i) => {
              if (!arr) return null
              const isActive = activeStudy === i + 1
              return (
                <g key={i}>
                  <path
                    d={arr.path}
                    fill="none"
                    stroke={isActive ? '#3b82f6' : 'currentColor'}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    strokeDasharray={isActive ? 'none' : '5 4'}
                    markerEnd={isActive ? 'url(#arrowhead-active)' : 'url(#arrowhead-idle)'}
                    className={
                      isActive
                        ? 'transition-all duration-300'
                        : 'text-zinc-300 dark:text-zinc-700/80 transition-all duration-300'
                    }
                  />
                </g>
              )
            })}
          </svg>

          {/* ===== 3-TIER SPATIAL BLUEPRINT LAYOUT (EXACTLY MATCHING USER DRAWING) ===== */}
          <div className="relative z-20 flex flex-col gap-8 lg:gap-12">
            
            {/* TIER 1 (TOP): Case Studies 1, 2, 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: Top-Left */}
              <div
                ref={(el) => (cardRefs.current[0] = el)}
                className={`transition-all duration-300 ${
                  activeStudy === 1 ? 'scale-[1.02] z-30' : 'opacity-85 hover:opacity-100'
                }`}
              >
                <CaseStudyCard study={CASE_STUDIES[0]} isActive={activeStudy === 1} onSelect={() => setActiveStudy(1)} />
              </div>

              {/* Card 2: Top-Center */}
              <div
                ref={(el) => (cardRefs.current[1] = el)}
                className={`transition-all duration-300 ${
                  activeStudy === 2 ? 'scale-[1.02] z-30' : 'opacity-85 hover:opacity-100'
                }`}
              >
                <CaseStudyCard study={CASE_STUDIES[1]} isActive={activeStudy === 2} onSelect={() => setActiveStudy(2)} />
              </div>

              {/* Card 3: Top-Right */}
              <div
                ref={(el) => (cardRefs.current[2] = el)}
                className={`transition-all duration-300 ${
                  activeStudy === 3 ? 'scale-[1.02] z-30' : 'opacity-85 hover:opacity-100'
                }`}
              >
                <CaseStudyCard study={CASE_STUDIES[2]} isActive={activeStudy === 3} onSelect={() => setActiveStudy(3)} />
              </div>
            </div>

            {/* TIER 2 (CENTER): 5 Hub Buttons matching drawing (Row 1: 3 pills, Row 2: 2 pills) */}
            <div className="flex flex-col items-center justify-center gap-3 py-4 lg:py-6">
              <div className="text-center mb-1">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
                  • Blueprint Control Hub •
                </span>
              </div>

              {/* Row 1: 3 buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[0, 1, 2].map((idx) => {
                  const study = CASE_STUDIES[idx]
                  const isSelected = activeStudy === study.id
                  return (
                    <button
                      key={study.id}
                      ref={(el) => (btnRefs.current[idx] = el)}
                      type="button"
                      onClick={() => handleStudySelect(study.id)}
                      className={`group relative inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                          : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-500 hover:scale-[1.02]'
                      }`}
                    >
                      <span
                        className={`size-2 rounded-full ${
                          isSelected ? 'bg-white animate-pulse' : 'bg-zinc-400 dark:bg-zinc-600'
                        }`}
                      />
                      <span>case study {study.id}</span>
                    </button>
                  )
                })}
              </div>

              {/* Row 2: 2 buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[3, 4].map((idx) => {
                  const study = CASE_STUDIES[idx]
                  const isSelected = activeStudy === study.id
                  return (
                    <button
                      key={study.id}
                      ref={(el) => (btnRefs.current[idx] = el)}
                      type="button"
                      onClick={() => handleStudySelect(study.id)}
                      className={`group relative inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                          : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-500 hover:scale-[1.02]'
                      }`}
                    >
                      <span
                        className={`size-2 rounded-full ${
                          isSelected ? 'bg-white animate-pulse' : 'bg-zinc-400 dark:bg-zinc-600'
                        }`}
                      />
                      <span>case study {study.id}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* TIER 3 (BOTTOM): Case Studies 4 & 5 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 4: Bottom-Left (Col 1) */}
              <div
                ref={(el) => (cardRefs.current[3] = el)}
                className={`lg:col-span-1 transition-all duration-300 ${
                  activeStudy === 4 ? 'scale-[1.02] z-30' : 'opacity-85 hover:opacity-100'
                }`}
              >
                <CaseStudyCard study={CASE_STUDIES[3]} isActive={activeStudy === 4} onSelect={() => handleStudySelect(4)} />
              </div>

              {/* Card 5: Bottom-Right (Col 2 & 3, Wide Rectangle matching diagram) */}
              <div
                ref={(el) => (cardRefs.current[4] = el)}
                className={`lg:col-span-2 transition-all duration-300 ${
                  activeStudy === 5 ? 'scale-[1.02] z-30' : 'opacity-85 hover:opacity-100'
                }`}
              >
                <CaseStudyCard study={CASE_STUDIES[4]} isActive={activeStudy === 5} onSelect={() => handleStudySelect(5)} isWide />
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}

function CaseStudyCard({ study, isActive, onSelect, isWide = false }) {
  return (
    <div
      onClick={onSelect}
      className={`group relative flex flex-col justify-between rounded-2xl border bg-white dark:bg-zinc-900 p-5 transition-all duration-200 cursor-pointer shadow-sm ${
        isActive
          ? 'border-blue-500 ring-2 ring-blue-500/20 dark:ring-blue-500/30 shadow-md'
          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {study.tag}
          </span>
          <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
            {study.category.split(' ')[0]}
          </span>
        </div>

        <h3 className="font-harmond text-lg sm:text-xl font-bold italic text-zinc-950 dark:text-zinc-50 leading-snug">
          {study.title}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
          {study.desc}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
        <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          Metric: <span className="font-semibold text-zinc-700 dark:text-zinc-200">{study.metrics.val}</span>
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-xs group-hover:bg-blue-700 transition">
          Open Case Study <span aria-hidden="true">→</span>
        </span>
      </div>
    </div>
  )
}
