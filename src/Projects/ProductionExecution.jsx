import { Link } from 'react-router-dom'

const ProductionExecution = () => {
  const technologies = [
    'Docker & Containerd',
    'Kubernetes (K8s)',
    'GitHub Actions CI/CD',
    'Prometheus Telemetry',
    'Grafana Dashboards',
    'Terraform IaC',
    'AWS ECS & CloudWatch',
    'Canary Deployment Gate',
  ]

  const keyFeatures = [
    {
      title: 'Automated Canary Routing & Progressive Traffic Gates',
      desc: 'Gradually shifts live ingress traffic from 5% to 100% across container replicas while monitoring real-time error rate budgets and p99 latency thresholds.',
    },
    {
      title: 'Instant Sub-3-Second Automated Rollback Safety',
      desc: 'If synthetic health probes or telemetry trip any anomaly alerts during rollout, the pipeline immediately reverts the ingress proxy to the stable previous build in under 2.4 seconds with zero dropped connections.',
    },
    {
      title: 'Streaming Telemetry & Metric Anomaly Detection',
      desc: 'High-frequency Prometheus scrapers push microservice metrics directly to Grafana with statistical outlier alerting on memory saturation, connection pool leaks, and HTTP 5xx spikes.',
    },
    {
      title: 'Hermetic Build Sandboxing & Multi-Stage Compilation',
      desc: 'Docker multi-stage builds isolate build tools from final dist images, minimizing container attack surfaces to less than 45MB while caching intermediate layer dependencies.',
    },
    {
      title: 'Immutable Infrastructure as Code (IaC) Provisioning',
      desc: 'All cloud VPCs, security groups, database read-replicas, and ingress TLS certificates are declaratively managed through Terraform state with strict cryptographic drift checking.',
    },
  ]

  return (
    <div className="w-full min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-zinc-100">
      
      {/* ===== STICKY VIDEO CONTAINER AT THE TOP (40% VIEWPORT HEIGHT, 60% CONTENT) ===== */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-md py-2.5 sm:py-3 px-4 sm:px-8 md:px-12 transition-colors duration-200">
        <div className="mx-auto max-w-4xl flex flex-col justify-center">
          <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-xl ring-1 ring-zinc-200/50 dark:ring-zinc-800/50 flex items-center justify-center">
            <video
              src="/videos/Success_clip1.mp4"
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
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 shrink-0">
                Live Demo • Project 03
              </span>
              <span className="text-zinc-300 dark:text-zinc-700 hidden xs:inline">•</span>
              <p className="truncate text-xs text-zinc-600 dark:text-zinc-400 font-medium hidden xs:block">
                Production Release Pipeline — zero-downtime execution and verified live telemetry
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
          <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Cloud Infrastructure & CI/CD • Project 03
          </p>
          <h1 className="font-harmond mt-2 text-3xl sm:text-5xl md:text-6xl font-extrabold italic tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.1]">
            Production Deployment & Zero-Downtime Release
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            A resilient deployment execution pipeline delivering 99.99% uptime. It couples automated canary routing, instant metric-triggered rollbacks, and full-fidelity observability to ensure every release completes without user disruption.
          </p>
        </div>

        {/* Problem & Solution */}
        <div className="mt-10 space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">The Problem</h2>
            <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              High-traffic web platforms face severe risk during release windows: untested database migrations, sudden latency degradation, and manual rollback delays that take 20+ minutes while customer-facing errors proliferate.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">The Solution</h2>
            <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              An automated, observable CI/CD pipeline built with progressive canary stages. If synthetic health probes or live p99 latencies deviate from baseline thresholds, the proxy instantly reroutes traffic back to the healthy target cluster within 2.4 seconds.
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
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition duration-200 hover:border-amber-300 dark:hover:border-amber-700"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950 text-xs font-bold text-amber-700 dark:text-amber-400">
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
              <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">99.99%</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Release Uptime</p>
            </div>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 text-center">
              <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">&lt; 2.4s</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Rollback Speed</p>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 text-center">
              <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">12x</p>
              <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Deploy Velocity</p>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="mt-12 flex flex-wrap gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <Link
            to="/different"
            className="inline-flex rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
          >
            ← Back to Case Studies
          </Link>
          <Link
            to="/projects/archive-ledger"
            className="inline-flex rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 shadow-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Next: Archive Ledger →
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

export default ProductionExecution
