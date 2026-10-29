import { Link } from 'react-router-dom'

const Banking = () => {
  const technologies = [
    'React',
    'Node.js',
    'PostgreSQL / SQL',
    'Tailwind CSS',
    'ACID Transactions',
    'Audit Ledger Stream',
  ]

  const keyFeatures = [
    {
      title: 'Atomic Transaction Processing',
      desc: 'Executes deposits, withdrawals, and intra-bank fund transfers with strict zero-overdraft enforcement and instant balance recalculation.',
    },
    {
      title: 'Live Audit Ledger Stream',
      desc: 'Maintains an unalterable, real-time audit stream logging every transaction, authorization attempt, and system event.',
    },
    {
      title: 'Automated Employee Bonus Engine',
      desc: 'Built-in computational agent that calculates bonuses, handles payroll adjustments, and automatically disperses payments upon manager approval.',
    },
    {
      title: 'Fast Demo Account Switcher',
      desc: 'Pre-seeded database switch panel allowing instant toggling between different employee and customer accounts for immediate testing.',
    },
    {
      title: 'Multi-Tenant Security Architecture',
      desc: 'Protects account numbers and employee credentials with role-based access control and encrypted session management.',
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
                src="/banking.mp4"
                poster="/images/banking-preview.png"
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
                Apex Core Banking Console in action — automating deposit routines, balance verification, and live ledger tracking.
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
                Fintech & Systems Engineering • Project 01
              </p>
              <h1 className="mt-2 text-3xl font-extrabold italic tracking-tight text-gray-900 sm:text-5xl">
                Apex — Core Banking Engine
              </h1>
              <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                An autonomous transaction engine and ledger system engineered for modern banking operations, high-integrity fund routing, and real-time ledger auditing.
              </p>
            </div>

            {/* Problem & Solution */}
            <div className="mt-10 space-y-6 border-t border-slate-200 pt-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">The Problem</h2>
                <p className="mt-2 text-base leading-relaxed text-gray-600">
                  Legacy banking platforms often rely on fragmented nightly batch reconciliations, leading to overdraft vulnerabilities, delayed fund settlements, and cumbersome manual record auditing that is prone to human error.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">The Solution</h2>
                <p className="mt-2 text-base leading-relaxed text-gray-600">
                  Apex works as an intelligent operations layer that interfaces directly with the central database schema. It processes every incoming deposit and withdrawal atomically, computes employee bonuses with precision, and guarantees an unalterable audit trail stream for every state change.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900">Key Features & Architecture</h2>
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

            {/* Database & Technical Stack */}
            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="text-xl font-bold text-gray-900">Database Schema & Architecture</h2>
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-900 p-4 text-xs font-mono text-emerald-400">
                <p className="text-slate-400">// Employees & Accounts Schema</p>
                <p className="mt-1">
                  employees (Emp_id, acc_no, emp_name, salary, age, balance)
                </p>
                <p className="mt-2 text-slate-400">// Transaction & Audit Log Schema</p>
                <p className="mt-1">
                  transactions (txn_id, sender_acc, receiver_acc, amount, type, status, timestamp)
                </p>
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

export default Banking
