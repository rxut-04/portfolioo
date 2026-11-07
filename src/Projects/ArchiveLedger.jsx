import { Link } from 'react-router-dom'

const ArchiveLedger = () => {
  const technologies = [
    'Node.js & C++ Addons',
    'PostgreSQL & TimescaleDB',
    'Merkle Tree Integrity Trees',
    'SHA-256 Cryptographic Hashing',
    'Redis In-Memory Cache',
    'WebSockets',
    'Audit Trail Protocol',
    'Append-Only Storage Engine',
  ]

  const keyFeatures = [
    {
      title: 'Cryptographic Merkle Tree Hash Roots',
      desc: 'Groups transactional audit events into immutable batch blocks where every record is mathematically chained into a Merkle root, guaranteeing detection of any unauthorized back-edits or historical tampering.',
    },
    {
      title: 'Append-Only Write-Once Read-Many (WORM) Storage',
      desc: 'Enforces strict physical and schema-level immutability constraints. System write heads append new audit entries without UPDATE or DELETE permissions on ledger tables.',
    },
    {
      title: 'Sub-5-Millisecond Range Query Engine',
      desc: 'Custom composite B-Tree indexes and bloom filters allow instant retrieval across tens of millions of historical financial blocks with sub-5ms latency.',
    },
    {
      title: 'Real-Time Streaming Audit Ingestion & WebSocket Sync',
      desc: 'Handles sustained throughput of 20,000+ state mutations per second via streaming message buffers, broadcasting verified ledger heads to compliance clients over live WebSockets.',
    },
    {
      title: 'Zero-Knowledge Snapshot Export & Regulatory Compliance',
      desc: 'Provides automated cryptographically attested ledger export snapshots that can be independently audited by third-party regulators without exposing private payload fields.',
    },
  ]

  return (
    <div className="w-full min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-zinc-100">
      
      {/* ===== STICKY VIDEO CONTAINER AT THE TOP (40% VIEWPORT HEIGHT, 60% CONTENT) ===== */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-md py-2.5 sm:py-3 px-4 sm:px-8 md:px-12 transition-colors duration-200">
        <div className="mx-auto max-w-4xl flex flex-col justify-center">
          <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-xl ring-1 ring-zinc-200/50 dark:ring-zinc-800/50 flex items-center justify-center">
            <video
              src="/videos/archive-final.mp4"
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
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 shrink-0">
                Live Demo • Project 04
              </span>
              <span className="text-zinc-300 dark:text-zinc-700 hidden xs:inline">•</span>
              <p className="truncate text-xs text-zinc-600 dark:text-zinc-400 font-medium hidden xs:block">
                Archive Ledger Records — cryptographic Merkle trees and sub-5ms query performance
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
          <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
            Financial Auditing & Ledgers • Project 04
          </p>
          <h1 className="font-harmond mt-2 text-3xl sm:text-5xl md:text-6xl font-extrabold italic tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.1]">
            Archive Ledger — Immutable Historical Records
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            An enterprise-grade immutable record engine. It pairs append-only storage semantics with cryptographic Merkle proof validation, offering tamper-proof compliance logging with sub-5 millisecond query execution.
          </p>
        </div>

        {/* Problem & Solution */}
        <div className="mt-10 space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">The Problem</h2>
            <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Financial and compliance audit trails face critical vulnerabilities: accidental database mutations, insider manipulation, and query timeouts when searching through historical ledgers containing hundreds of millions of past transaction records.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">The Solution</h2>
            <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Archive Ledger structures all entries into cryptographically chained blocks verified with SHA-256 Merkle proofs. High-speed composite indexing allows auditors to pinpoint exact historical records in milliseconds while mathematically proving zero data tampering.
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
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition duration-200 hover:border-purple-300 dark:hover:border-purple-700"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950 text-xs font-bold text-purple-700 dark:text-purple-400">
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
              <p className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">&lt; 5ms</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Query Latency</p>
            </div>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 text-center">
              <p className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">100%</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Ledger Immutability</p>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 text-center">
              <p className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">0.02ms</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Proof Verification</p>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="mt-12 flex flex-wrap gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <Link
            to="/architecture"
            className="inline-flex rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
          >
            ← Back to Blueprint Map
          </Link>
          <Link
            to="/projects/feasto"
            className="inline-flex rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 shadow-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Next: Feasto Delivery →
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

export default ArchiveLedger
