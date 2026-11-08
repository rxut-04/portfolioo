import { Link } from 'react-router-dom'

const Feasto = () => {
  const technologies = [
    'React 18',
    'Node.js & Express',
    'Socket.io Real-Time Protocol',
    'Google Maps & Mapbox GL',
    'Redis Pub/Sub',
    'PostGIS Geospatial DB',
    'Dynamic Dispatch Algorithms',
    'Tailwind CSS',
  ]

  const keyFeatures = [
    {
      title: 'Geospatial Courier Allocation & Cluster Dispatching',
      desc: 'Dynamically clusters nearby orders using KD-Tree spatial indexing and matches them with active couriers based on real-time traffic conditions, cutting idle courier time by 35%.',
    },
    {
      title: 'Live Kitchen Telemetry & Milestone Synchronization',
      desc: 'Synchronizes kitchen prep milestones (Order Placed, Prep Started, Cooking, Quality Passed, Bagged) with courier arrival timing so warm meals are handed off within 45 seconds of packing.',
    },
    {
      title: 'High-Frequency Real-Time Map Tracking (60fps)',
      desc: 'Pushes smooth courier GPS location updates over WebSockets with client-side dead reckoning interpolation, providing customers with fluid, jitter-free vehicle animations.',
    },
    {
      title: 'Predictive ETA Engine with Machine Learning Adjustments',
      desc: 'Factors historical restaurant prep durations, weather data, and real-time city traffic bottlenecks to provide dynamic ETAs accurate to within ±90 seconds.',
    },
    {
      title: 'Resilient Disconnection Recovery & State Hydration',
      desc: 'Maintains active delivery state machines in Redis; mobile couriers and customers immediately rehydrate exact order status and route histories upon reconnecting through mobile dead zones.',
    },
  ]

  return (
    <div className="w-full min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-zinc-100">
      
      {/* ===== STICKY VIDEO CONTAINER AT THE TOP (40% VIEWPORT HEIGHT, 60% CONTENT) ===== */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-md py-2.5 sm:py-3 px-4 sm:px-8 md:px-12 transition-colors duration-200">
        <div className="mx-auto max-w-4xl flex flex-col justify-center">
          <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-xl ring-1 ring-zinc-200/50 dark:ring-zinc-800/50 flex items-center justify-center">
            <video
              src="/videos/FEASTO-FINAL.mp4"
              poster="/images/food.png"
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
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 shrink-0">
                Live Demo • Project 05
              </span>
              <span className="text-zinc-300 dark:text-zinc-700 hidden xs:inline">•</span>
              <p className="truncate text-xs text-zinc-600 dark:text-zinc-400 font-medium hidden xs:block">
                Feasto Smart Delivery — geospatial routing, kitchen telemetry & live dispatch
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
          <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400">
            Logistics & Real-Time Telemetry • Project 05
          </p>
          <h1 className="font-harmond mt-2 text-3xl sm:text-5xl md:text-6xl font-extrabold italic tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.1]">
            Feasto — Smart Delivery & Geospatial Dispatch
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            A real-time logistics and food delivery platform. It unifies order management, live kitchen prep telemetry, and geospatial courier routing algorithms to achieve ultra-fast delivery turnaround times.
          </p>
        </div>

        {/* Problem & Solution */}
        <div className="mt-10 space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">The Problem</h2>
            <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              On-demand food delivery networks suffer from uncoordinated driver dispatch: couriers arrive either 15 minutes before the food is ready (causing congestion) or 15 minutes late (resulting in cold deliveries and dissatisfied customers).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">The Solution</h2>
            <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Feasto coordinates dynamic geospatial dispatching with real-time kitchen station telemetry. Couriers are routed so that arrival perfectly synchronizes with final food boxing, slashing dwell time to under 45 seconds and speeding up deliveries by 35%.
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
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition duration-200 hover:border-rose-300 dark:hover:border-rose-700"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950 text-xs font-bold text-rose-700 dark:text-rose-400">
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
              <p className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">-35%</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Dispatch Latency</p>
            </div>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 text-center">
              <p className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">98.6%</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">ETA Accuracy</p>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 text-center">
              <p className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">2.8x</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Fleet Throughput</p>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="mt-12 flex flex-wrap gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <Link
            to="/different"
            className="inline-flex rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2"
          >
            ← Back to Case Studies
          </Link>
          <Link
            to="/projects/excalibur"
            className="inline-flex rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 shadow-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Next: Excalibur Blueprint →
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

export default Feasto
