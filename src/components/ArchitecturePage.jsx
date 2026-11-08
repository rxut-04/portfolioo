import { Link, useNavigate } from 'react-router-dom'
import { LineGraph } from './ui/line-graph-statistics'

const CASE_STUDIES = [
  {
    id: 1,
    tag: 'Case Study 1',
    title: 'Excalibur',
    description: 'Hardware-accelerated state machine engine and distributed canvas modeler for real-time systems architecture.',
    route: '/projects/excalibur',
  },
  {
    id: 2,
    tag: 'Case Study 2',
    title: 'Personal GPT',
    description: 'Autonomous AI assistant architecture with multi-step cognitive reasoning loops and sandboxed execution runtime.',
    route: '/projects/personal-gpt',
  },
  {
    id: 3,
    tag: 'Case Study 3',
    title: 'Production Execution',
    description: 'Zero-downtime canary deployment pipeline with real-time error budget monitoring and sub-3-second rollbacks.',
    route: '/projects/production-execution',
  },
  {
    id: 4,
    tag: 'Case Study 4',
    title: 'Archive Ledger',
    description: 'Cryptographically verifiable, append-only audit ledger built on Merkle tree root hashing and SHA-256 integrity trees.',
    route: '/projects/archive-ledger',
  },
  {
    id: 5,
    tag: 'Case Study 5',
    title: 'Feasto Delivery',
    description: 'High-frequency real-time dispatch platform with spatial clustering, live courier routing, and kitchen prep telemetry.',
    route: '/projects/feasto',
  },
]

export default function ArchitecturePage() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-[#F6F7F9] dark:bg-[#09090b] font-light text-zinc-900 dark:text-zinc-100 transition-colors duration-300 py-6 sm:py-10 md:py-14 px-4 sm:px-6 md:px-10">
      <div className="mx-auto max-w-5xl">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/different"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            ← Back to What Makes Me Different
          </Link>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Systems & Telemetry Blueprint
          </span>
        </div>

        {/* ========================================================
            TOP SECTION: PURE GRAPH ELEMENT ONLY
            ======================================================== */}
        <div className="rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121214] p-2 sm:p-5 md:p-6 shadow-xs overflow-hidden">
          <LineGraph />
        </div>

        {/* ========================================================
            BOTTOM SECTION: CLEAN CASE STUDY CARDS (3 IN ROW 1, 2 IN ROW 2)
            ======================================================== */}
        <div className="mt-5 sm:mt-8 grid grid-cols-6 gap-2 sm:gap-4 md:gap-5">
          {/* ROW 1: 3 CARDS (col-span-2 each) */}
          {CASE_STUDIES.slice(0, 3).map((study) => (
            <div
              key={study.id}
              onClick={() => navigate(study.route)}
              className="col-span-2 group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121214] p-2.5 sm:p-4 md:p-6 shadow-xs transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 cursor-pointer"
            >
              <div>
                <span className="font-mono text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block whitespace-nowrap">
                  {study.tag}
                </span>

                <h3 className="text-xs sm:text-base md:text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mt-1 sm:mt-1.5 truncate">
                  {study.title}
                </h3>

                <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {study.description}
                </p>
              </div>

              <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                <span className="font-mono text-[9px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5 sm:gap-1">
                  <span>Explore</span>
                  <span className="hidden sm:inline">Case Study</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}

          {/* ROW 2: 2 CARDS (col-span-3 each) */}
          {CASE_STUDIES.slice(3, 5).map((study) => (
            <div
              key={study.id}
              onClick={() => navigate(study.route)}
              className="col-span-3 group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121214] p-3 sm:p-5 md:p-6 shadow-xs transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 cursor-pointer"
            >
              <div>
                <span className="font-mono text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block whitespace-nowrap">
                  {study.tag}
                </span>

                <h3 className="text-sm sm:text-lg md:text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mt-1 sm:mt-1.5 truncate">
                  {study.title}
                </h3>

                <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {study.description}
                </p>
              </div>

              <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                <span className="font-mono text-[9px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5 sm:gap-1">
                  <span>Explore</span>
                  <span className="hidden sm:inline">Case Study</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
