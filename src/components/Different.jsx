import { useState } from 'react'
import { Link } from 'react-router-dom'

const breakdownCards = [
  {
    id: 'examguard',
    title: 'ExamGuard',
    subtitle: 'Computer Vision • Anti-Cheating Proctoring',
    aiAttempt: 'Suggested standard facial bounding-box heuristics and naive head-pose orientation thresholds, claiming it would accurately flag cheating out-of-the-box.',
    theProblem: 'In real testing environments, it created a flood of false positives. Variations in ambient lighting, wide-angle webcam distortion, natural posture adjustments, and students glancing down at scrap paper triggered erroneous violation alerts.',
    myFix: 'Engineered a temporal confirmation window requiring sustained gaze anomalies over consecutive frames, added adaptive illumination normalization to eliminate lighting spikes, and incorporated 3D vector gaze geometry to distinguish paper-glancing from deliberate screen evasion.',
  },
  {
    id: 'phantomshield',
    title: 'PhantomShield',
    subtitle: 'Cybersecurity • Intelligent Phishing Detection',
    aiAttempt: 'Proposed a basic supervised text classifier trained on legacy static email corpora, relying heavily on obvious keyword frequency and URL string length.',
    theProblem: 'Modern attack vectors completely bypassed it: Punycode homograph spoofing (subtle unicode homoglyphs), legitimate URL shorteners/redirect chains, and clean spear-phishing templates engineered without traditional spam keywords.',
    myFix: 'Architected a multi-layered verification engine: live DNS MX record probing, SSL certificate registration age telemetry, DOM structural similarity hashing, and lexical entropy scoring across redirected URL chains.',
  },
  {
    id: 'hardware',
    title: 'Hardware & IoT',
    subtitle: 'Embedded Systems • Physical Computing',
    aiAttempt: 'Generated textbook GPIO pinout wiring and standard SPI/I2C communication scripts with zero latency tolerance or bus contention considerations.',
    theProblem: 'Physical reality objected: jumper wire resistance caused subtle voltage drops, shared I2C bus traffic suffered race conditions, and thermal throttling degraded sensor clock sync during continuous runtime.',
    myFix: 'Probed the lines with a logic analyzer, added external pull-up resistors to stabilize bus voltage, implemented hardware interrupt debouncing, and wrote fault-tolerant exponential backoff retry routines in the firmware.',
  },
]

const unplugConcepts = [
  {
    id: 'stack',
    title: 'How a stack works and why it’s LIFO',
    summary: 'Memory mechanics, call frames, and execution flow without abstractions.',
    explanation:
      'A stack is fundamentally a contiguous block of linear memory governed by a single CPU register: the Stack Pointer (SP). When a function is invoked, the processor pushes a stack frame containing return addresses, function arguments, and local primitives. Because operations only happen at the top of this pointer, allocations and deallocations are instantaneous O(1) arithmetic operations—just incrementing or decrementing the pointer without heap fragmentation. LIFO (Last-In, First-Out) is non-negotiable because execution is nested: inner function calls must complete and unwind their state before the calling function can resume. If recursion lacks a terminating base case, the stack pointer marches past its reserved boundary into protected memory, triggering a hardware page fault: Stack Overflow.',
  },
  {
    id: 'auth',
    title: 'How authentication actually protects a request',
    summary: 'Cryptographic signatures, stateless verification, and token safety.',
    explanation:
      'Authentication does not hide your payload—it mathematically guarantees that it has not been tampered with. In a stateless JWT system, the identity provider serializes the header and claims into base64, then calculates a digital signature using a private cryptographic key (e.g. RS256). When your browser sends this token in a subsequent request, the resource server doesn’t query a database; it simply recalculates the hash over the incoming header and payload using the public key and checks if it matches the signature. If a malicious client modifies a single character of their user ID or role, the cryptographic math fails instantly. Protecting the token from XSS requires storing it in an HttpOnly, Secure, SameSite=Strict cookie rather than local storage.',
  },
  {
    id: 'pipeline',
    title: 'How my detection pipeline turns a camera frame into a decision',
    summary: 'Pixel matrices, vector math, and rolling confidence windows.',
    explanation:
      'A video frame arriving from a webcam is raw sensor data: a 3D matrix of Height × Width × 3 uint8 pixel values. First, we downsample and normalize color intensities to eliminate ambient light interference. Next, the frame passes through a landmark regression neural network to identify facial keypoints as 3D coordinate vectors. Rather than naively triggering on a single frame, we calculate geometric ratios (such as Eye Aspect Ratio for blink detection and Rodrigues rotation vectors for head pose). These scalar metrics feed into a rolling temporal queue over a 1.5-second sliding window. An anomaly flag is only emitted when statistical deviations exceed a calibrated confidence threshold persistently, completely discarding sporadic sensor noise and accidental micro-movements.',
  },
]

const aiSteps = [
  {
    step: '01',
    name: 'Decide',
    tag: 'Human Only',
    tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    description: 'I choose what to build, evaluate real-world trade-offs, define constraints, and architect the foundational system contracts.',
  },
  {
    step: '02',
    name: 'Prompt',
    tag: 'Collaboration',
    tagColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    description: 'I decompose complex problems into isolated modules and write precise, unambiguous technical specifications for the model.',
  },
  {
    step: '03',
    name: 'Generate',
    tag: 'AI Acceleration',
    tagColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    description: 'The model rapidly outputs repetitive boilerplate, syntax scaffolds, and preliminary algorithmic drafts in seconds.',
  },
  {
    step: '04',
    name: 'Review',
    tag: 'Human Only',
    tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    description: 'I inspect, benchmark, and stress-test every single line. If I cannot explain its mechanical behavior from memory, it never enters production.',
  },
  {
    step: '05',
    name: 'Own',
    tag: 'Human Only',
    tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    description: 'When the software crashes or edge cases break under pressure, accountability is 100% mine. I take full responsibility for the outcome.',
  },
]

const whatAiCantBe = [
  {
    title: 'Taste',
    description: 'AI produces the statistical average of existing internet code. I decide what feels crisp, intentional, and memorable.',
  },
  {
    title: 'Accountability',
    description: 'When an edge case fails in front of technical judges, clients, or users, someone has to answer. I do.',
  },
  {
    title: 'Context',
    description: 'I understand the user’s real environment, the deadline urgency, and the human stakes. A prompt never captures all of that.',
  },
  {
    title: 'The Physical World',
    description: 'Sensors drift, wires loosen, and cameras lie. Hardware and production networks only respond to hands-on empirical debugging.',
  },
  {
    title: 'Human Connection',
    description: 'I can articulate deep technical tradeoffs to senior engineers and explain the core value to non-technical stakeholders with clarity.',
  },
  {
    title: 'Deciding What’s Worth Building',
    description: 'AI can generate thousands of lines of code for anything. Choosing what truly matters and solves a real problem is solely a human job.',
  },
]

const Different = () => {
  // State for the AI vs Om toggle switch
  const [isOmMode, setIsOmMode] = useState(true)

  // State for Section 2: Unplug test active concept tab
  const [activeConcept, setActiveConcept] = useState('stack')

  return (
    <div className="relative mx-auto w-[92%] max-w-6xl py-12 sm:py-16 md:py-24">
      {/* Back button */}
      <div className="mb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white"
        >
          <span aria-hidden="true">←</span> Back to Portfolio
        </Link>
      </div>

      {/* ===== HERO / MANIFESTO HEADLINE ===== */}
      <header className="mb-16 md:mb-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
          <span>✦ Engineering Philosophy</span>
        </div>

        <h1 className="font-harmond mt-6 text-4xl font-black italic tracking-tight text-gray-900 transition-colors duration-300 dark:text-zinc-100 sm:text-6xl md:text-7xl lg:text-8xl">
          What makes me different.
        </h1>

        <p className="font-palast mt-6 max-w-3xl text-2xl font-semibold italic text-slate-700 dark:text-zinc-300 sm:text-3xl md:text-4xl">
          “Anyone can use AI. Not everyone can think without it.”
        </p>
      </header>

      {/* ===== INTERACTIVE TOGGLE: AI ONLY vs AI + OM ===== */}
      <section className="mb-20 rounded-3xl border border-slate-200 bg-slate-50/70 p-6 transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-10 md:p-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
              Interactive Perspective Switcher
            </span>
            <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
              Flip the switch. Same tools, different person.
            </p>
          </div>

          {/* Toggle pill button */}
          <div className="flex items-center rounded-full border border-slate-300 bg-white p-1 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <button
              type="button"
              onClick={() => setIsOmMode(false)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm cursor-pointer ${
                !isOmMode
                  ? 'bg-slate-900 text-white shadow dark:bg-zinc-100 dark:text-zinc-950'
                  : 'text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              🤖 AI Only State
            </button>
            <button
              type="button"
              onClick={() => setIsOmMode(true)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm cursor-pointer ${
                isOmMode
                  ? 'bg-blue-600 text-white shadow dark:bg-blue-600'
                  : 'text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              ⚡ AI + Om State
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="mt-8 transition-all duration-300">
          {!isOmMode ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-6 dark:border-zinc-700 dark:bg-zinc-950/60 sm:p-8">
              <span className="inline-block rounded-md bg-slate-200/80 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
                Generic • Flat Template
              </span>
              <p className="mt-4 font-mono text-lg text-slate-600 dark:text-zinc-400 sm:text-xl">
                “Passionate developer with strong problem-solving skills. Proficient in modern technologies. Eager to learn and contribute.”
              </p>
              <p className="mt-4 text-xs italic text-slate-400 dark:text-zinc-500">
                Notice the difference: safe, generic buzzwords that anyone can prompt in two seconds without building anything real.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-blue-500/30 bg-blue-50/50 p-6 shadow-md dark:border-blue-500/20 dark:bg-blue-950/20 sm:p-8">
              <span className="inline-block rounded-md bg-blue-600/10 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                Warm • Specific • Production Tested
              </span>
              <p className="font-palast mt-4 text-xl font-medium italic text-slate-900 dark:text-zinc-100 sm:text-2xl md:text-3xl leading-relaxed">
                “I’m Om. I build things that have to work in the real world: exam proctoring that catches cheating, phishing detection that stops real attacks, and hardware that doesn’t forgive mistakes. AI helps me move fast. I decide where to go.”
              </p>
              <p className="mt-4 text-xs font-semibold text-blue-700 dark:text-blue-400">
                ✦ Rooted in production trade-offs, edge-case debugging, and architectural accountability.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== SECTION 1: WHERE AI BROKE, I FIXED IT ===== */}
      <section className="mb-24">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Section 01
          </span>
          <h2 className="font-harmond mt-2 text-3xl font-black italic tracking-tight text-gray-900 dark:text-zinc-100 sm:text-5xl">
            Where AI broke, I fixed it.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-zinc-400 sm:text-lg">
            AI gives answers. It doesn’t give accountability. Here are moments where the output looked right and wasn’t.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {breakdownCards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8"
            >
              <div>
                <span className="text-xs font-semibold text-slate-400 dark:text-zinc-500">
                  {card.subtitle}
                </span>
                <h3 className="font-harmond mt-2 text-2xl font-black italic text-gray-900 dark:text-zinc-100">
                  {card.title}
                </h3>

                <div className="mt-6 space-y-4 text-sm leading-relaxed">
                  <div>
                    <span className="font-bold text-red-600 dark:text-red-400">AI’s Attempt:</span>
                    <p className="mt-1 text-slate-600 dark:text-zinc-400">{card.aiAttempt}</p>
                  </div>

                  <div>
                    <span className="font-bold text-amber-600 dark:text-amber-400">The Problem:</span>
                    <p className="mt-1 text-slate-600 dark:text-zinc-400">{card.theProblem}</p>
                  </div>

                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 dark:bg-emerald-500/10">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">My Fix:</span>
                    <p className="mt-1 text-slate-700 dark:text-zinc-300">{card.myFix}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-100/70 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
          <p className="font-palast text-lg font-semibold italic text-slate-800 dark:text-zinc-200 sm:text-xl">
            “The pattern is always the same: AI suggests, reality objects, I solve.”
          </p>
        </div>
      </section>

      {/* ===== SECTION 2: THE UNPLUG TEST ===== */}
      <section className="mb-24 rounded-3xl border border-slate-200 bg-slate-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-10 md:p-12">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Section 02
          </span>
          <h2 className="font-harmond mt-2 text-3xl font-black italic tracking-tight text-gray-900 dark:text-zinc-100 sm:text-5xl">
            The Unplug Test.
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-zinc-400 sm:text-lg">
            No autocomplete. No prompts. Just me explaining how it works from first principles.
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Pick a concept and I’ll explain it from scratch:
          </p>
        </div>

        {/* Concept Option Selectors */}
        <div className="flex flex-wrap gap-3">
          {unplugConcepts.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveConcept(item.id)}
              className={`rounded-xl px-5 py-3 text-sm font-semibold transition-all cursor-pointer ${
                activeConcept === item.id
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Selected Concept Deep Dive Explanation */}
        {(() => {
          const selected = unplugConcepts.find((c) => c.id === activeConcept) || unplugConcepts[0]
          return (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/80 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                First-Principles Breakdown • {selected.title}
              </span>
              <p className="mt-2 text-sm italic text-slate-500 dark:text-zinc-400">
                {selected.summary}
              </p>
              <div className="mt-4 border-t border-slate-200 pt-4 dark:border-zinc-800">
                <p className="text-base leading-relaxed text-slate-800 dark:text-zinc-200 sm:text-lg">
                  {selected.explanation}
                </p>
              </div>
            </div>
          )
        })()}

        <p className="mt-6 text-sm font-semibold text-slate-600 dark:text-zinc-400">
          ✦ <span className="font-palast italic text-slate-900 dark:text-zinc-200">If I can explain it without AI, I can debug it when AI is wrong.</span>
        </p>
      </section>

      {/* ===== SECTION 3: HOW I ACTUALLY USE AI ===== */}
      <section className="mb-24">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Section 03
          </span>
          <h2 className="font-harmond mt-2 text-3xl font-black italic tracking-tight text-gray-900 dark:text-zinc-100 sm:text-5xl">
            How I actually use AI.
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-zinc-400 sm:text-lg">
            AI is my power tool, not my brain.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {aiSteps.map((step) => (
            <div
              key={step.step}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <div>
                <span className="font-harmond text-3xl font-black italic text-slate-300 dark:text-zinc-700">
                  {step.step}
                </span>
                <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-zinc-100">
                  {step.name}
                </h3>
                <span className={`mt-2 inline-block rounded-md border px-2 py-0.5 text-xs font-semibold ${step.tagColor}`}>
                  {step.tag}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
          <p className="font-palast text-base font-semibold italic text-slate-700 dark:text-zinc-300 sm:text-lg">
            “Three of these five steps can’t be delegated. Those are the ones that matter.”
          </p>
        </div>
      </section>

      {/* ===== SECTION 4: WHAT AI CAN'T BE ===== */}
      <section className="mb-24">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Section 04
          </span>
          <h2 className="font-harmond mt-2 text-3xl font-black italic tracking-tight text-gray-900 dark:text-zinc-100 sm:text-5xl">
            What AI can’t be.
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-zinc-400 sm:text-lg">
            The core human attributes that software models cannot replicate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whatAiCantBe.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8"
            >
              <h3 className="font-harmond text-2xl font-black italic text-gray-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CLOSING CTA BANNER ===== */}
      <section className="rounded-3xl border border-slate-300 bg-gradient-to-br from-slate-900 to-slate-950 p-8 text-center text-white shadow-2xl dark:border-zinc-800 sm:p-14 md:p-16">
        <h2 className="font-harmond text-3xl font-black italic tracking-tight text-white sm:text-5xl md:text-6xl">
          “The future isn’t human vs. AI.”
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl">
          It’s people who can drive AI vs. people who can only ride along. I’m building to be the first kind.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 active:scale-95 sm:text-lg"
          >
            Let’s build something together
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Different
