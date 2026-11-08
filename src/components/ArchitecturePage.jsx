import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// SVGs for modern brand & system service integration icons
const ServiceIcons = {
  slack: (
    <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="none">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523c0-1.394 1.127-2.524 2.52-2.524h2.522v2.524c0 1.393-1.127 2.523-2.522 2.523z" fill="#E01E5A"/>
      <path d="M8.83 15.165a2.528 2.528 0 0 1 2.52-2.523 2.528 2.528 0 0 1 2.523 2.523v6.315A2.528 2.528 0 0 1 11.35 24a2.528 2.528 0 0 1-2.52-2.52v-6.315z" fill="#E01E5A"/>
      <path d="M8.83 5.045a2.528 2.528 0 0 1 2.52-2.522c1.393 0 2.523 1.128 2.523 2.522v2.522H8.83V5.045z" fill="#36C5F0"/>
      <path d="M8.83 8.832a2.528 2.528 0 0 1-2.52-2.523c0-1.393 1.127-2.522 2.52-2.522H15.15a2.528 2.528 0 0 1 2.522 2.522c0 1.394-1.128 2.523-2.522 2.523H8.83z" fill="#36C5F0"/>
      <path d="M18.958 8.832a2.528 2.528 0 0 1 2.522 2.523c0 1.393-1.128 2.523-2.522 2.523h-2.522V8.832h2.522z" fill="#2EB67D"/>
      <path d="M15.168 8.832a2.528 2.528 0 0 1-2.522 2.523 2.528 2.528 0 0 1-2.52-2.523V2.517A2.528 2.528 0 0 1 12.646 0c1.394 0 2.522 1.127 2.522 2.517v6.315z" fill="#2EB67D"/>
      <path d="M15.168 18.955a2.528 2.528 0 0 1-2.522 2.522c-1.394 0-2.52-1.127-2.52-2.522v-2.522h5.042v2.522z" fill="#ECB22E"/>
      <path d="M15.168 15.165a2.528 2.528 0 0 1 2.522 2.523 2.528 2.528 0 0 1-2.522 2.523H8.83a2.528 2.528 0 0 1-2.52-2.523c0-1.394 1.127-2.523 2.52-2.523h6.338z" fill="#ECB22E"/>
    </svg>
  ),
  gmail: (
    <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="none">
      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" fill="#EA4335" fillOpacity="0.1"/>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v.5l10 6.5 10-6.5V6c0-1.1-.9-2-2-2z" fill="#EA4335"/>
      <path d="M2 7v11c0 1.1.9 2 2 2h2v-9.5L2 7z" fill="#4285F4"/>
      <path d="M22 7l-4 3.5V20h2c1.1 0 2-.9 2-2V7z" fill="#34A853"/>
      <path d="M18 10.5L12 14.5l-6-4V20h12v-9.5z" fill="#FBBC05"/>
    </svg>
  ),
  meet: (
    <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="13" height="14" rx="2.5" fill="#00832D"/>
      <path d="M15 9.5l6-4v13l-6-4v-5z" fill="#00AC47"/>
      <circle cx="8.5" cy="12" r="3" fill="#ffffff" fillOpacity="0.9"/>
    </svg>
  ),
  google: (
    <svg className="size-6 shrink-0" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  ),
  dispatch: (
    <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#F43F5E" fillOpacity="0.15" stroke="#F43F5E" strokeWidth="2"/>
      <path d="M12 6v6l4 2" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2" fill="#F43F5E"/>
    </svg>
  ),
}

const CASE_STUDIES = [
  {
    id: 1,
    title: 'Messages Sent',
    shortTitle: 'Messages',
    caseTitle: 'Excalibur Blueprint Engine',
    subtitle: '-7 Messages',
    meta: '-7 Undocumented States • State Machine',
    value: '342',
    delta: '-4.6%',
    isNegative: true,
    progress: 31,
    progressColor: 'from-[#FB7185] to-[#FB923C]',
    route: '/projects/excalibur',
    icon: ServiceIcons.slack,
    tag: 'Case 01',
  },
  {
    id: 2,
    title: 'Emails Exchanged',
    shortTitle: 'Emails',
    caseTitle: 'Personal GPT Autonomous Assistant',
    subtitle: '+98 Emails',
    meta: '+98 Multi-Step Context Loops • Vector DB',
    value: '465',
    delta: '+12%',
    isNegative: false,
    progress: 95,
    progressColor: 'from-[#FB7185] via-[#FB923C] to-[#22C55E]',
    route: '/projects/personal-gpt',
    icon: ServiceIcons.gmail,
    tag: 'Case 02',
  },
  {
    id: 3,
    title: 'All Meetings',
    shortTitle: 'Meetings',
    caseTitle: 'Production Deployment & Execution',
    subtitle: '+12 Meetings',
    meta: '+12 Canary Release Probes • Zero Downtime',
    value: '147',
    delta: '+7%',
    isNegative: false,
    progress: 78,
    progressColor: 'from-[#FB923C] to-[#22C55E]',
    route: '/projects/production-execution',
    icon: ServiceIcons.meet,
    tag: 'Case 03',
  },
  {
    id: 4,
    title: 'Queries In Google',
    shortTitle: 'Google Queries',
    caseTitle: 'Immutable Archive & Ledger Records',
    subtitle: '-15 Queries',
    meta: '-15 Millisecond Query Latency • Merkle Roots',
    value: '973',
    delta: '-1.3%',
    isNegative: true,
    progress: 54,
    progressColor: 'from-[#FB7185] via-[#FB923C] to-[#84CC16]',
    route: '/projects/archive-ledger',
    icon: ServiceIcons.google,
    tag: 'Case 04',
  },
  {
    id: 5,
    title: 'Feasto Smart Delivery',
    shortTitle: 'Feasto Delivery',
    caseTitle: 'Feasto Smart Delivery Platform',
    subtitle: '+184 Orders Handled',
    meta: '-35% Dispatch Latency • Live Kitchen Telemetry',
    value: '2,840',
    delta: '+35.2%',
    isNegative: false,
    progress: 88,
    progressColor: 'from-[#F43F5E] via-[#FB923C] to-[#10B981]',
    route: '/projects/feasto',
    icon: ServiceIcons.dispatch,
    tag: 'Case 05',
  },
]

/**
 * Slatted Waveform Contour Chart matching the reference image exactly:
 * - High density vertical stripes (98 lines)
 * - Wave contour: tall hill at Wed -> valley -> amber hill at Thu -> valley -> tall green peak at Fry
 * - Extends flush to the bottom edge of the card
 */
function SlattedWaveformChart() {
  const lineCount = 96
  const width = 640
  const height = 210
  const baseY = 210

  // Calculate lines
  const lines = []
  for (let i = 0; i < lineCount; i++) {
    const t = i / (lineCount - 1)
    const x = 12 + t * (width - 24)

    // Smooth spline-like profile:
    // Left (Wed): elevated (height ~130)
    // Valley 1 (t ~ 0.28): dips down to height ~65 (<500)
    // Thu peak (t ~ 0.52): hill reaching height ~110 (≈1k)
    // Valley 2 (t ~ 0.72): dips down to height ~75 (<500)
    // Fry peak (t ~ 0.96): climbs to height ~185 (>2k)
    const hWed = Math.exp(-Math.pow((t - 0.04) / 0.16, 2)) * 85
    const hThu = Math.exp(-Math.pow((t - 0.52) / 0.15, 2)) * 65
    const hFry = Math.exp(-Math.pow((t - 0.98) / 0.20, 2)) * 140
    const baseline = 50 + 20 * Math.sin(t * Math.PI)

    const totalHeight = Math.max(50, Math.min(195, baseline + hWed + hThu + hFry))
    const topY = baseY - totalHeight

    // Color mapped to value legend:
    // <500 (height < 90): Pink/Coral (#FB7185)
    // ≈1k  (height 90-130): Warm Amber (#FB923C / #F59E0B)
    // >2k  (height > 130): Vibrant Green (#22C55E / #10B981)
    let stroke = '#22C55E'
    if (totalHeight < 90) {
      stroke = '#FB7185'
    } else if (totalHeight < 130) {
      stroke = '#FB923C'
    } else {
      stroke = '#22C55E'
    }

    lines.push({ x, topY, stroke })
  }

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-48 sm:h-60 md:h-72 object-cover block"
        preserveAspectRatio="none"
      >
        {/* Vertical Pinstripe Waveform Lines */}
        {lines.map((l, idx) => (
          <line
            key={idx}
            x1={l.x}
            y1={baseY}
            x2={l.x}
            y2={l.topY}
            stroke={l.stroke}
            strokeWidth="2.6"
            strokeLinecap="round"
            className="opacity-95"
          />
        ))}

        {/* Day Labels sitting inside the bottom stripes */}
        <text
          x="36"
          y={baseY - 32}
          className="text-lg sm:text-xl font-bold fill-zinc-950 dark:fill-white"
          style={{ fontFamily: 'inherit' }}
        >
          Wed
        </text>
        <text
          x="305"
          y={baseY - 32}
          className="text-lg sm:text-xl font-bold fill-zinc-950 dark:fill-white"
          style={{ fontFamily: 'inherit' }}
        >
          Thu
        </text>
        <text
          x="570"
          y={baseY - 32}
          className="text-lg sm:text-xl font-bold fill-zinc-950 dark:fill-white"
          style={{ fontFamily: 'inherit' }}
        >
          Fry
        </text>
      </svg>
    </div>
  )
}

export default function ArchitecturePage() {
  const navigate = useNavigate()
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <main className="w-full min-h-screen bg-[#F6F7F9] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10">
      <div className="mx-auto max-w-4xl">
        
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
            TOP SECTION: PERFORMANCE TRENDS CARD (EXACT TO REFERENCE)
            ======================================================== */}
        <div className="overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121214] p-6 sm:p-8 shadow-sm">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Performance Trends
            </h2>
            <span className="font-mono text-base sm:text-lg font-bold text-[#10B981]">
              85%
            </span>
          </div>

          {/* Number & Legend Row */}
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-4">
            <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
              2,683
            </span>

            {/* Legend Cluster */}
            <div className="flex items-center gap-4 font-mono text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#FB7185]" />
                <span>&lt;500</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#FB923C]" />
                <span>≈1k</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#22C55E]" />
                <span>&gt;2k</span>
              </div>
            </div>
          </div>

          {/* Slatted Waveform Chart Graphic (flush to bottom) */}
          <div className="mt-8 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8">
            <SlattedWaveformChart />
          </div>
        </div>

        {/* ========================================================
            BOTTOM SECTION: RECTANGULAR CARDS (3 IN ROW 1, 2 IN ROW 2)
            ======================================================== */}
        <div className="mt-5 sm:mt-6 grid grid-cols-6 gap-2.5 sm:gap-4 md:gap-5">
          {/* ROW 1: 3 CARDS (col-span-2 each) */}
          {CASE_STUDIES.slice(0, 3).map((study) => (
            <div
              key={study.id}
              onClick={() => navigate(study.route)}
              className="col-span-2 group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121214] p-2.5 sm:p-4 md:p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 cursor-pointer"
            >
              <div>
                {/* Top: Tag + Service Icon */}
                <div className="flex items-center justify-between gap-1 sm:gap-2">
                  <span className="font-mono text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 truncate">
                    {study.tag}
                  </span>
                  <div className="size-6 sm:size-8 shrink-0 flex items-center justify-center rounded-lg sm:rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-1 sm:p-1.5 shadow-2xs">
                    {study.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100 mt-1 sm:mt-1.5 truncate">
                  <span className="sm:hidden">{study.shortTitle || study.title}</span>
                  <span className="hidden sm:inline">{study.title}</span>
                </h3>

                {/* Metric Value + Delta Pill */}
                <div className="mt-2 sm:mt-3 flex flex-wrap items-baseline gap-1 sm:gap-1.5">
                  <span className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {study.value}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-1 sm:px-1.5 py-0.2 sm:py-0.5 text-[9px] sm:text-[11px] font-bold ${
                      study.isNegative
                        ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                    }`}
                  >
                    {study.delta}
                  </span>
                </div>

                {/* Subtitle count */}
                <p className="mt-0.5 text-[10px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">
                  {study.subtitle}
                </p>
              </div>

              {/* Bottom: Progress Bar + Percentage */}
              <div className="mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-2">
                <div className="relative h-1.5 sm:h-2 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${study.progressColor} transition-all duration-500`}
                    style={{ width: `${study.progress}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-700 dark:text-zinc-300 shrink-0">
                  {study.progress}%
                </span>
              </div>
            </div>
          ))}

          {/* ROW 2: 2 CARDS (col-span-3 each) */}
          {CASE_STUDIES.slice(3, 5).map((study) => (
            <div
              key={study.id}
              onClick={() => navigate(study.route)}
              className="col-span-3 group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121214] p-3 sm:p-5 md:p-6 shadow-xs transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 cursor-pointer"
            >
              <div>
                {/* Top: Tag + Service Icon */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 truncate">
                    {study.tag}
                  </span>
                  <div className="size-6 sm:size-8 shrink-0 flex items-center justify-center rounded-lg sm:rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-1 sm:p-1.5 shadow-2xs">
                    {study.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100 mt-1 sm:mt-1.5 truncate">
                  <span className="sm:hidden">{study.shortTitle || study.title}</span>
                  <span className="hidden sm:inline">{study.title}</span>
                </h3>

                {/* Metric Value + Delta Pill */}
                <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5 sm:gap-2">
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {study.value}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] sm:text-[11px] font-bold ${
                      study.isNegative
                        ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                    }`}
                  >
                    {study.delta}
                  </span>
                </div>

                {/* Subtitle count */}
                <p className="mt-0.5 text-[10px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">
                  {study.subtitle}
                </p>
              </div>

              {/* Bottom: Progress Bar + Percentage */}
              <div className="mt-3 sm:mt-4 flex items-center gap-2">
                <div className="relative h-1.5 sm:h-2 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${study.progressColor} transition-all duration-500`}
                    style={{ width: `${study.progress}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-700 dark:text-zinc-300 shrink-0">
                  {study.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
