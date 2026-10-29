import { Link } from 'react-router-dom'

const Medlink = () => {
  const technologies = [
    'React',
    'Next.js',
    'Clinical Machine Learning',
    'Tailwind CSS',
    'Node.js',
    'WebSockets',
    'HIPAA-Compliant Protocols',
  ]

  const keyFeatures = [
    {
      title: 'AI-Assisted Diagnostic Risk Scoring',
      desc: 'Evaluates multi-marker patient lab data, vitals, and documented symptoms to flag high-risk anomalies and guide clinical triage.',
    },
    {
      title: 'Peer-to-Peer Specialist Consultation Hub',
      desc: 'Enables treating physicians to seamlessly request and receive verified second opinions from a network of over 500+ clinical specialists.',
    },
    {
      title: 'Clinical Decision Safeguards',
      desc: 'Automatic cross-referencing against clinical guidelines and medical literature to prevent adverse drug contraindications.',
    },
    {
      title: 'Encrypted Health Data Infrastructure',
      desc: 'End-to-end encrypted storage and role-restricted transmission meeting strict healthcare security and patient privacy regulations.',
    },
    {
      title: 'Optimized Bedside Physician Dashboard',
      desc: 'Ultra-clean, distraction-free interface built specifically for rapid review during hospital rounds and critical care shifts.',
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
                src="/medlink.mp4"
                poster="/images/medlink-preview.png"
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
                MedLink Clinical Decision Platform — second-opinion routing, risk scores, and patient synthesis in real time.
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
                Healthcare & Clinical AI • Project 02
              </p>
              <h1 className="mt-2 text-3xl font-extrabold italic tracking-tight text-gray-900 sm:text-5xl">
                MedLink — Safer Clinical Decisions
              </h1>
              <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                An AI-assisted diagnostic platform empowering medical doctors to assess risk, consult specialists for second opinions, and make safer, evidence-grounded clinical decisions.
              </p>
            </div>

            {/* Problem & Solution */}
            <div className="mt-10 space-y-6 border-t border-slate-200 pt-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">The Problem</h2>
                <p className="mt-2 text-base leading-relaxed text-gray-600">
                  Diagnostic ambiguity and information overload are leading causes of preventable clinical errors in acute care. Physicians routinely review hundreds of disorganized lab values under extreme time pressure with no direct access to subspecialty second opinions.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">The Solution</h2>
                <p className="mt-2 text-base leading-relaxed text-gray-600">
                  MedLink acts as an intelligent co-pilot for clinicians. It parses complex histories into structured timelines, flags critical anomalies, and connects doctors directly to verified peer specialists for asynchronous or real-time case consultations.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900">Key Features & Clinical Impact</h2>
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

            {/* Clinical Trust Metrics */}
            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="text-xl font-bold text-gray-900">Trust & Deployment Metrics</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <p className="text-3xl font-extrabold text-blue-700">500+</p>
                  <p className="mt-1 text-xs font-medium text-slate-600">Verified Clinical Specialists</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <p className="text-3xl font-extrabold text-blue-700">99.4%</p>
                  <p className="mt-1 text-xs font-medium text-slate-600">Consultation Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="mt-12 flex flex-wrap gap-4 border-t border-slate-200 pt-8">
              <Link
                to="/"
                className="inline-flex rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                ← Back to Home
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

export default Medlink
