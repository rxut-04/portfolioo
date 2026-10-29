import { Link } from 'react-router-dom'

const Rfid = () => {
  const technologies = [
    'React',
    'Node.js',
    'RFID Hardware Sensor Protocol',
    'Tailwind CSS',
    'WebSockets',
    'Inventory Catalog Database',
  ]

  const keyFeatures = [
    {
      title: 'Contactless Bulk RFID Scanning',
      desc: 'Scans hundreds of tagged physical volumes wirelessly per minute without requiring manual line-of-sight barcode alignment.',
    },
    {
      title: 'Real-Time Catalog Synchronization',
      desc: 'Directly reconciles live shelf scans against central catalog records to update item availability and locate misplaced books.',
    },
    {
      title: 'Misplaced Item Anomaly Detection',
      desc: 'Automatically detects books placed on the incorrect shelf or wrong category section, alerting staff with precise shelf indices.',
    },
    {
      title: 'Administrator Audit & Security Portal',
      desc: 'Role-protected administrative console with full check-in/check-out auditing, loss prevention metrics, and inventory health reports.',
    },
    {
      title: 'Legacy Barcode & RFID Bridge',
      desc: 'Seamless dual-mode onboarding system allowing libraries to incrementally migrate legacy barcode books to active RFID tracking tags.',
    },
  ]

  return (
    <div className="w-full px-6 py-10 sm:px-10 md:px-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">

          {/* Left Column: Video Container (Sticky on Desktop) */}
          <div className="w-full lg:sticky lg:top-24 lg:w-1/2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-2xl ring-1 ring-slate-200">
              <video
                src="/rfid.mp4"
                poster="/images/food.png"
                autoPlay
                loop
                muted
                playsInline
                controls
                className="aspect-video w-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Live Interactive Demo
              </p>
              <p className="mt-1 text-sm text-slate-700">
                Library Audit RFID System — contactless shelf scanning, real-time sync, and administrator inventory dashboard.
              </p>
            </div>

            {/* Quick Tech Summary Pills under video */}
            <div className="mt-4 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Full Detailed Content */}
          <div className="w-full lg:w-1/2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                IoT & Library Automation • Project 03
              </p>
              <h1 className="mt-2 text-3xl font-extrabold italic tracking-tight text-gray-900 sm:text-5xl">
                Library Audit — RFID System
              </h1>
              <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                An end-to-end RFID-powered library audit and tracking system designed for rapid inventory audits, misplaced book detection, and real-time catalog synchronization.
              </p>
            </div>

            {/* Problem & Solution */}
            <div className="mt-10 space-y-6 border-t border-slate-200 pt-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">The Problem</h2>
                <p className="mt-2 text-base leading-relaxed text-gray-600">
                  Manual inventory stocktaking in libraries requires individually handling thousands of books, opening covers, and scanning barcodes with hand-held laser scanners. This process takes weeks, consumes substantial staff hours, and fails to identify misplaced books effectively.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">The Solution</h2>
                <p className="mt-2 text-base leading-relaxed text-gray-600">
                  This system integrates high-frequency RFID tag readers with a real-time React and Node.js management console. Staff can sweep a shelf reader across an entire aisle in seconds; the system wirelessly reads all tags in parallel, compares them to database records, and immediately highlights any discrepancy.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900">Key Features & Hardware Integration</h2>
              <div className="mt-6 space-y-4">
                {keyFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition duration-200 hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                        {idx + 1}
                      </span>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="mt-2 pl-9 text-sm leading-relaxed text-gray-600">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Workflow Steps */}
            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="text-xl font-bold text-gray-900">Audit Workflow in 3 Steps</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Step 1</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">Sweep Shelf</p>
                  <p className="mt-1 text-xs text-slate-600">Wireless reader scans shelf RFID tags in bulk.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Step 2</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">Live Sync</p>
                  <p className="mt-1 text-xs text-slate-600">WebSockets match scans against catalog database.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Step 3</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">Flag Anomalies</p>
                  <p className="mt-1 text-xs text-slate-600">Misplaced or missing volumes highlighted instantly.</p>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="mt-12 flex flex-wrap gap-4 border-t border-slate-200 pt-8">
              <Link
                to="/#featured-medlink"
                className="inline-flex rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                ← Back to Featured
              </Link>
              <Link
                to="/projects"
                className="inline-flex rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                View All Projects
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Rfid
