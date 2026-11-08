import { useState, useEffect } from 'react'

export default function ExcaliburInteractiveStudio() {
  const [activeTab, setActiveTab] = useState('video') // 'video' | 'topology' | 'telemetry'
  const [activeNode, setActiveNode] = useState('verifier')
  const [isSimulating, setIsSimulating] = useState(false)
  const [packetProgress, setPacketProgress] = useState(0)
  const [telemetryLogs, setTelemetryLogs] = useState([
    { id: 1, time: '14:22:01.042', tag: 'INIT', msg: 'AST schema parser initialized: 1,420 nodes mapped' },
    { id: 2, time: '14:22:01.118', tag: 'VERIFY', msg: 'Formal contract boundary check: 0 deadlock states' },
    { id: 3, time: '14:22:01.205', tag: 'CANVAS', msg: 'Hardware WebGL surface locked at 120 FPS' },
  ])

  const NODES = [
    {
      id: 'ast',
      title: 'CLIENT_AST',
      role: 'AST Schema Input',
      status: 'HEALTHY',
      latency: '1.2ms',
      metric: '50k LOC/s',
      x: 12,
      y: 50,
      detail: 'Parses raw TypeScript / OpenAPI definitions into typed Abstract Syntax Trees without runtime overhead.',
    },
    {
      id: 'broker',
      title: 'STATE_BROKER',
      role: 'Transition Queue',
      status: 'STREAMING',
      latency: '0.8ms',
      metric: '18,400 msg/s',
      x: 35,
      y: 28,
      detail: 'Queues and sequences asynchronous state events with strict total ordering and idempotent guarantees.',
    },
    {
      id: 'verifier',
      title: 'CONTRACT_PROVER',
      role: 'Formal Verifier',
      status: 'VERIFIED',
      latency: '2.4ms',
      metric: '100% Deterministic',
      x: 62,
      y: 50,
      detail: 'Formal mathematical checker analyzing state space transitions to prevent communication deadlocks.',
    },
    {
      id: 'engine',
      title: 'CANVAS_ENGINE',
      role: 'WebGL Visualizer',
      status: 'ACTIVE',
      latency: '3.1ms',
      metric: '120 FPS locked',
      x: 88,
      y: 28,
      detail: 'Hardware-accelerated 2D canvas pipeline rendering 1,000+ interactive nodes with dynamic splines.',
    },
    {
      id: 'compiler',
      title: 'TS_COMPILER',
      role: 'Bidirectional Sync',
      status: 'SYNCED',
      latency: '1.9ms',
      metric: 'Zero Drifts',
      x: 88,
      y: 72,
      detail: 'Bidirectional code generator ensuring UI visual state machines match production code repositories.',
    },
  ]

  // Flow simulation handler
  const triggerSimulation = () => {
    if (isSimulating) return
    setIsSimulating(true)
    setPacketProgress(0)

    const now = new Date().toTimeString().split(' ')[0] + '.' + String(Date.now() % 1000).padStart(3, '0')
    setTelemetryLogs((prev) => [
      { id: Date.now(), time: now, tag: 'INJECT', msg: 'Packet stream injected at [CLIENT_AST] -> propagating...' },
      ...prev.slice(0, 4),
    ])

    let progress = 0
    const interval = setInterval(() => {
      progress += 4
      if (progress >= 100) {
        clearInterval(interval)
        setIsSimulating(false)
        setPacketProgress(100)
        const finishTime = new Date().toTimeString().split(' ')[0] + '.' + String(Date.now() % 1000).padStart(3, '0')
        setTelemetryLogs((prev) => [
          { id: Date.now() + 1, time: finishTime, tag: 'RESOLVED', msg: 'State verification complete: 0 contract violations (RTT 8.3ms)' },
          ...prev.slice(0, 4),
        ])
      } else {
        setPacketProgress(progress)
      }
    }, 25)
  }

  const selectedNodeData = NODES.find((n) => n.id === activeNode) || NODES[2]

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] shadow-xl">
      {/* Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-900/60 px-3 sm:px-4 py-2">
        {/* Brutalist Monospaced Tab Selectors */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`font-mono text-xs px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeTab === 'video'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            01 // SIMULATION
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('topology')}
            className={`font-mono text-xs px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeTab === 'topology'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            02 // TOPOLOGY
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('telemetry')}
            className={`font-mono text-xs px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeTab === 'telemetry'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            03 // TELEMETRY
          </button>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>ENGINE: LOCKED</span>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span>RTT: 1.4ms</span>
        </div>
      </div>

      {/* ===== TAB 1: VIDEO SIMULATION ===== */}
      {activeTab === 'video' && (
        <div className="relative bg-zinc-950 flex items-center justify-center">
          <video
            src="/videos/EXCALIBER-FINAL.mp4"
            poster="/images/banking-preview.png"
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full aspect-video object-cover max-h-[30vh] sm:max-h-[34vh]"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* ===== TAB 2: INTERACTIVE ARCHITECTURE TOPOLOGY ===== */}
      {activeTab === 'topology' && (
        <div className="flex flex-col bg-zinc-950 text-zinc-100">
          {/* Top action controls */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 px-3.5 py-2 font-mono text-xs bg-zinc-900/40">
            <div className="flex items-center gap-2 text-zinc-400">
              <span>SYSTEM: EXCALIBER_FLOW_V2</span>
              <span>•</span>
              <span className="text-zinc-500">CLICK NODE TO INSPECT</span>
            </div>
            <button
              type="button"
              onClick={triggerSimulation}
              disabled={isSimulating}
              className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-700 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <span className={`size-1.5 rounded-full ${isSimulating ? 'bg-blue-400 animate-ping' : 'bg-emerald-400'}`} />
              <span>{isSimulating ? 'TRANSMITTING...' : 'INJECT PACKET [PING]'}</span>
            </button>
          </div>

          {/* SVG Canvas Topology Graph */}
          <div className="relative h-56 sm:h-64 w-full select-none overflow-hidden bg-[#09090b]">
            {/* Minimalist dot grid */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#52525b 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />

            {/* Connecting Wire Lines */}
            <svg className="absolute inset-0 size-full pointer-events-none">
              <defs>
                <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Path 1: AST -> Broker */}
              <line x1="12%" y1="50%" x2="35%" y2="28%" stroke="#27272a" strokeWidth="2" strokeDasharray="3 3" />
              {/* Path 2: Broker -> Verifier */}
              <line x1="35%" y1="28%" x2="62%" y2="50%" stroke="#27272a" strokeWidth="2" strokeDasharray="3 3" />
              {/* Path 3: Verifier -> Engine */}
              <line x1="62%" y1="50%" x2="88%" y2="28%" stroke="#27272a" strokeWidth="2" strokeDasharray="3 3" />
              {/* Path 4: Verifier -> Compiler */}
              <line x1="62%" y1="50%" x2="88%" y2="72%" stroke="#27272a" strokeWidth="2" strokeDasharray="3 3" />

              {/* Animated active packet travel beam when simulating */}
              {isSimulating && (
                <circle
                  cx={`${12 + packetProgress * 0.76}%`}
                  cy={`${packetProgress < 30 ? 50 - packetProgress * 0.73 : packetProgress < 65 ? 28 + (packetProgress - 30) * 0.62 : 50}%`}
                  r="4"
                  fill="#38bdf8"
                  className="filter drop-shadow-[0_0_8px_#38bdf8]"
                />
              )}
            </svg>

            {/* Interactive Nodes */}
            {NODES.map((node) => {
              const isSelected = activeNode === node.id
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className={`absolute z-10 flex flex-col items-center justify-center rounded-lg border px-2.5 py-1.5 transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'border-blue-400 bg-zinc-900 shadow-[0_0_15px_rgba(56,189,248,0.25)] ring-1 ring-blue-400'
                      : 'border-zinc-800 bg-[#0c0c0e] hover:border-zinc-600 hover:bg-zinc-900/80'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`size-1.5 rounded-full ${isSelected ? 'bg-blue-400' : 'bg-emerald-400'}`} />
                    <span className="font-mono text-[11px] font-bold tracking-tight text-zinc-100">
                      {node.title}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-500 mt-0.5">{node.role}</span>
                </div>
              )
            })}
          </div>

          {/* Node Inspector Drawer */}
          <div className="border-t border-zinc-800 bg-zinc-950 p-3 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-900 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">INSPECTING:</span>
                <span className="font-bold text-blue-400">[{selectedNodeData.title}]</span>
                <span className="rounded bg-zinc-800 px-1.5 py-0.2 text-[10px] text-zinc-300">
                  {selectedNodeData.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
                <span>LATENCY: <strong className="text-zinc-200">{selectedNodeData.latency}</strong></span>
                <span>METRIC: <strong className="text-zinc-200">{selectedNodeData.metric}</strong></span>
              </div>
            </div>
            <p className="mt-2 text-zinc-400 text-[11px] leading-relaxed">
              {selectedNodeData.detail}
            </p>
          </div>
        </div>
      )}

      {/* ===== TAB 3: BENCHMARKS & TELEMETRY LEDGER ===== */}
      {activeTab === 'telemetry' && (
        <div className="bg-[#09090b] text-zinc-100 p-4 font-mono">
          {/* High-density brutalist metric grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="rounded border border-zinc-800 bg-zinc-900/50 p-2.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">AST Parse Rate</span>
              <span className="text-lg font-bold text-zinc-100 mt-0.5 block">54,200</span>
              <span className="text-[10px] text-emerald-400">LOC / second</span>
            </div>
            <div className="rounded border border-zinc-800 bg-zinc-900/50 p-2.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">WebGL Render</span>
              <span className="text-lg font-bold text-zinc-100 mt-0.5 block">120 FPS</span>
              <span className="text-[10px] text-emerald-400">0 frame drops</span>
            </div>
            <div className="rounded border border-zinc-800 bg-zinc-900/50 p-2.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Contract Validity</span>
              <span className="text-lg font-bold text-zinc-100 mt-0.5 block">100.0%</span>
              <span className="text-[10px] text-emerald-400">0 deadlocks detected</span>
            </div>
            <div className="rounded border border-zinc-800 bg-zinc-900/50 p-2.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Memory Footprint</span>
              <span className="text-lg font-bold text-zinc-100 mt-0.5 block">18.4 MB</span>
              <span className="text-[10px] text-zinc-400">Flat GC profile</span>
            </div>
          </div>

          {/* Live Structured Event Stream */}
          <div className="mt-3 rounded border border-zinc-800/80 bg-zinc-950 p-2.5 text-[11px]">
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-1.5 mb-2 text-zinc-500 text-[10px] uppercase">
              <span>Verified Telemetry Stream</span>
              <span>STATE: SYNCHRONIZED</span>
            </div>
            <div className="space-y-1">
              {telemetryLogs.map((log) => (
                <div key={log.id} className="flex items-baseline gap-2 font-mono text-zinc-300">
                  <span className="text-zinc-600 shrink-0 text-[10px]">{log.time}</span>
                  <span className="rounded bg-zinc-900 px-1 py-0.2 text-[9px] text-blue-400 font-bold shrink-0">
                    {log.tag}
                  </span>
                  <span className="truncate text-zinc-400">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-bar footer */}
      <div className="rounded-b-xl border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/60 px-3 py-1.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 shrink-0">
            Studio Engine • Project 01
          </span>
          <span className="text-zinc-300 dark:text-zinc-700 hidden xs:inline">•</span>
          <p className="truncate text-xs text-zinc-600 dark:text-zinc-400 font-medium hidden xs:block">
            {activeTab === 'video'
              ? 'Excalibur System Architecture — deterministic state graphs in real time'
              : activeTab === 'topology'
              ? 'Interactive Graph — inspect nodes & inject state transitions'
              : 'Deterministic Telemetry — zero runtime drift benchmarks'}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Live</span>
        </div>
      </div>
    </div>
  )
}
