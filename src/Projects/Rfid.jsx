import { Link } from 'react-router-dom'

const Rfid = () => {
  const technologies = ['React', 'Node.js', 'RFID Hardware Integration', 'WebSockets', 'Tailwind CSS']
  const features = [
    'Real-time RFID sensor tag scanning and instant catalog auditing',
    'Live dashboard tracking shelf inventory and missing catalog items',
    'Secure administrator login portal with audit logs',
    'Instant barcode & RFID sync for legacy inventory collections',
    'Low-latency status notifications via WebSocket connections',
  ]

  return (
    <div className="w-full px-6 py-10 sm:px-10 md:px-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Case Study • Project 03
          </p>
          <h1 className="text-3xl font-extrabold italic tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Library Audit — RFID System
          </h1>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
            An RFID-powered library auditing system. Tap, track, and audit physical books in real time with a live dashboard, scan & sync capabilities, and administrator login portal.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-2xl ring-1 ring-gray-200">
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

        <section className="mt-12 grid gap-10 border-t border-slate-200 pt-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Project Overview</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              Manual library auditing takes hours and often leads to misplacement errors. This RFID auditing platform enables automated, contactless book scanning that verifies thousands of tagged items within minutes, flagging misplaced items and synchronizing with the central library database.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-900">Technologies Used</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
            <ul className="mt-4 space-y-3">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-base text-gray-600 sm:text-lg">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-4 border-t border-slate-200 pt-8">
          <Link
            to="/#featured-medlink"
            className="inline-flex rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            ← Back to Featured
          </Link>
          <Link
            to="/projects"
            className="inline-flex rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            All Projects
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Rfid
