import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ScrollReadArticle,
  ScrollReadParagraph,
  computeWordOffsets,
} from './ui/scroll-read-text'
import { ShinyButton } from './ui/shiny-button'

const NAV_SECTIONS = [
  { id: 'chapter-1', label: '01. Architect Mindset' },
  { id: 'chapter-2', label: '02. Verification & Flow' },
  { id: 'chapter-3', label: '03. Thinking Differently' },
  { id: 'chapter-4', label: '04. Long-Term Reality' },
  { id: 'chapter-5', label: '05. The Age of AGI' },
  { id: 'case-studies-section', label: '06. Case Studies' },
]

const CASE_STUDIES = [
  {
    id: 'excalibur',
    label: 'Case Study 1: Excalibur',
    route: '/projects/excalibur',
    accent: '#38bdf8',
    softAccent: '#7dd3fc',
  },
  {
    id: 'personal-gpt',
    label: 'Case Study 2: Personal GPT',
    route: '/projects/personal-gpt',
    accent: '#a855f7',
    softAccent: '#c084fc',
  },
  {
    id: 'production',
    label: 'Case Study 3: Production Execution',
    route: '/projects/production-execution',
    accent: '#10b981',
    softAccent: '#34d399',
  },
  {
    id: 'archive',
    label: 'Case Study 4: Archive Ledger',
    route: '/projects/archive-ledger',
    accent: '#f59e0b',
    softAccent: '#fbbf24',
  },
  {
    id: 'feasto',
    label: 'Case Study 5: Feasto Delivery',
    route: '/projects/feasto',
    accent: '#f43f5e',
    softAccent: '#fb7185',
  },
]

const PARAGRAPHS = [
  // 0
  '“What makes me different is like thinking like an architect rather than just dead prompting to fix any feature, waiting every 5-10 minutes for the AI to finish its execution, and looping again with a new bug that never existed. This costs 5 hours of dead debugging.”',
  // 1
  'But when I think to solve a problem, the prompt goes like this: describing each and every scenario to the model, then waiting for its response to understand what is actually going on, and then I keep asking the AI what approach fits to solve this bug or to add a new feature, rather than just false hope.',
  // 2
  'After the model gets 100% ready to take action, I give it only one feature or bug to solve, then analyse the output with normal human intervention, and if everything goes right, I proceed to the next steps towards the goal.',
  // 3
  'And if at the first attempt it gives an unexpected output, then I stop and give an exentential prompt to rethink the feature/bug, also giving it the recent output and telling it to think that it was not what I wanted, but that it should be in my way, as I prompted.',
  // 4
  'Then, from this technique, sometimes it loops every engineer to go backwards (backtracking) and try again.',
  // 5
  'But here, I think differently!',
  // 6
  'Think of the old times when every engineer tracked the bug, and if it went to a dead end, then usually 7 out of 10 engineers debugged the problem by taking reference from “Stack Overflow” or “taking time to read the documentation”.',
  // 7
  'This gives every engineer the power to solve/track every problem, rather than debugging the same problem for 5 hours straight. This makes the feature hold value for the long term, rather than being temporary and crashing in production!',
  // 8
  '“We know that within 2.5 years the industry will need real developers back, rather than developers who blindly follow AI for project management and everyday tasks!”',
  // 9
  'We know that AI will get more powerful every day, but touching and moving with the speed of AI makes every developer a real developer in this modern era.',
  // 10
  'AGI will be ready soon, but every developer should know what is going on and what the plan of action should be, rather than depending on AI!!!',
]

const { totalWords, offsets } = computeWordOffsets(PARAGRAPHS)

export default function Different() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('chapter-1')

  // Smooth scroll using cinematic easeInOutQuart over 1000ms
  const scrollToSection = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (!targetElement) return

    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100
    const startPosition = window.scrollY
    const distance = targetPosition - startPosition
    const duration = 1000
    let startTime = null

    function easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)
      const easing = easeInOutQuart(percentage)

      window.scrollTo(0, startPosition + distance * easing)

      if (progress < duration) {
        window.requestAnimationFrame(step)
      } else {
        window.scrollTo(0, targetPosition)
      }
    }

    window.requestAnimationFrame(step)
  }

  // Scrollspy tracking active section based on 1/3 viewport height
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3
      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAV_SECTIONS[i].id)
        if (section) {
          const top = section.offsetTop
          if (scrollPos >= top - 20) {
            setActiveSection(NAV_SECTIONS[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ===== FIXED LEFT SCROLLSPY LINE NAVIGATION ===== */}
      <nav
        aria-label="Chapter scroll navigation"
        className="fixed top-1/2 -translate-y-1/2 left-3 xl:left-8 z-50 hidden lg:flex flex-col items-start gap-1 select-none pointer-events-auto"
      >
        <style>{`
          .scrollspy-nav-line {
            position: relative;
            display: flex;
            align-items: center;
            width: 40px;
            height: 24px;
            cursor: pointer;
            text-decoration: none;
          }
          .scrollspy-nav-line::before {
            content: '';
            display: block;
            height: 2px;
            width: 8px;
            border-radius: 2px;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .scrollspy-nav-line:hover::before {
            width: 14px;
          }
          .scrollspy-nav-line.active::before {
            width: 22px;
          }
          .scrollspy-nav-line::after {
            content: attr(data-title);
            position: absolute;
            left: 36px;
            top: 50%;
            transform: translateY(-50%) translateX(-6px);
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.02em;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            padding: 3px 8px;
            border-radius: 6px;
            backdrop-filter: blur(8px);
            transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .scrollspy-nav-line:hover::after {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        `}</style>
        {NAV_SECTIONS.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            onClick={(e) => scrollToSection(e, sec.id)}
            data-title={sec.label}
            className={`scrollspy-nav-line ${activeSection === sec.id ? 'active' : ''}
              before:bg-zinc-300 dark:before:bg-zinc-700
              hover:before:bg-zinc-600 dark:hover:before:bg-zinc-300
              [&.active]:before:bg-zinc-950 dark:[&.active]:before:bg-zinc-50
              after:bg-white/95 dark:after:bg-zinc-900/95
              after:text-zinc-800 dark:after:text-zinc-200
              after:border after:border-zinc-200 dark:after:border-zinc-800
              after:shadow-md dark:after:shadow-black/40`}
            aria-label={sec.label}
          />
        ))}
      </nav>

      <article className="relative mx-auto w-[92%] sm:w-[90%] max-w-4xl py-8 sm:py-14 md:py-20 transition-colors duration-300">
        
        {/* Top back navigation */}
        <div className="mb-8 sm:mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 py-1 font-mono text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <span aria-hidden="true">←</span> back to portfolio
          </Link>
        </div>

        {/* ===== ESSAY HEADER ===== */}
        <header className="mb-10 sm:mb-16 border-b border-zinc-200 pb-8 sm:pb-10 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Personal Philosophy // Engineering Reality
            </span>
          </div>

          <h1 className="font-harmond mt-4 sm:mt-5 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tight text-zinc-950 dark:text-zinc-50 break-words leading-[1.1]">
            What makes me different.
          </h1>
        </header>

        {/* ===== ESSAY BODY: STRICT SEQUENTIAL SCROLL-READING FLOW ===== */}
        <ScrollReadArticle
          totalWords={totalWords}
          offset={["start 85%", "end 85%"]}
          className="space-y-12 sm:space-y-16 text-base sm:text-lg md:text-xl leading-relaxed text-zinc-700 dark:text-zinc-300"
        >
          
          {/* Chapter 1: The Architect Mindset */}
          <section id="chapter-1" className="scroll-mt-[100px] space-y-8">
            {/* Paragraph 0 - Opening Lead */}
            <div className="rounded-xl sm:rounded-2xl border border-zinc-200/90 bg-zinc-50/70 p-5 sm:p-7 md:p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
              <ScrollReadParagraph
                text={PARAGRAPHS[0]}
                globalStartWord={offsets[0].start}
                totalArticleWords={totalWords}
                className="font-palast text-lg sm:text-2xl md:text-3xl italic text-zinc-900 dark:text-zinc-100 leading-snug"
                gradientPhrases={[
                  { phrase: 'architect', variant: 'cyan' },
                  { phrase: 'dead', variant: 'rose' },
                  { phrase: '5 hours of dead debugging', variant: 'violet' },
                ]}
              />
            </div>
          </section>

          {/* Chapter 2: Context & Human Verification */}
          <section id="chapter-2" className="scroll-mt-[100px] space-y-8 sm:space-y-11">
            {/* Paragraph 1 */}
            <ScrollReadParagraph
              text={PARAGRAPHS[1]}
              globalStartWord={offsets[1].start}
              totalArticleWords={totalWords}
              gradientPhrases={[{ phrase: 'false hope', variant: 'amber' }]}
            />

            {/* Paragraph 2 */}
            <ScrollReadParagraph
              text={PARAGRAPHS[2]}
              globalStartWord={offsets[2].start}
              totalArticleWords={totalWords}
              gradientPhrases={[
                { phrase: 'only one feature or bug', variant: 'emerald' },
                { phrase: 'normal human intervention', variant: 'cyan' },
              ]}
            />

            {/* Paragraph 3 */}
            <ScrollReadParagraph
              text={PARAGRAPHS[3]}
              globalStartWord={offsets[3].start}
              totalArticleWords={totalWords}
              gradientPhrases={[{ phrase: 'exentential prompt', variant: 'fuchsia' }]}
            />
          </section>

          {/* Chapter 3: Backtracking & Thinking Differently */}
          <section id="chapter-3" className="scroll-mt-[100px] space-y-8">
            {/* Paragraph 4 & 5 */}
            <div className="border-l-2 border-zinc-300 pl-4 sm:pl-5 dark:border-zinc-700 space-y-3">
              <ScrollReadParagraph
                text={PARAGRAPHS[4]}
                globalStartWord={offsets[4].start}
                totalArticleWords={totalWords}
                className="text-zinc-600 dark:text-zinc-400"
                gradientPhrases={[{ phrase: 'backtracking', variant: 'rose' }]}
              />
              <ScrollReadParagraph
                text={PARAGRAPHS[5]}
                globalStartWord={offsets[5].start}
                totalArticleWords={totalWords}
                className="font-harmond text-2xl sm:text-3xl font-black italic text-zinc-950 dark:text-zinc-100"
                gradientPhrases={[{ phrase: 'think differently!', variant: 'amber' }]}
              />
            </div>
          </section>

          {/* Chapter 4: Long-Term Value & Documentation */}
          <section id="chapter-4" className="scroll-mt-[100px] space-y-8 sm:space-y-11">
            {/* Paragraph 6 */}
            <ScrollReadParagraph
              text={PARAGRAPHS[6]}
              globalStartWord={offsets[6].start}
              totalArticleWords={totalWords}
              gradientPhrases={[
                { phrase: 'taking time to read the documentation', variant: 'violet' },
              ]}
            />

            {/* Paragraph 7 */}
            <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-sm">
              <ScrollReadParagraph
                text={PARAGRAPHS[7]}
                globalStartWord={offsets[7].start}
                totalArticleWords={totalWords}
                className="text-zinc-900 dark:text-zinc-100 font-medium text-base sm:text-lg leading-relaxed"
                gradientPhrases={[
                  { phrase: 'power to solve/track every problem', variant: 'emerald' },
                  { phrase: 'crashing in production!', variant: 'rose' },
                ]}
              />
            </div>
          </section>

          {/* Chapter 5: The Future with AI & AGI */}
          <section id="chapter-5" className="scroll-mt-[100px] space-y-8 sm:space-y-11">
            {/* Paragraph 8 */}
            <ScrollReadParagraph
              text={PARAGRAPHS[8]}
              globalStartWord={offsets[8].start}
              totalArticleWords={totalWords}
              className="font-palast text-lg sm:text-2xl italic text-zinc-900 dark:text-zinc-100"
              gradientPhrases={[{ phrase: 'real developers back', variant: 'cyan' }]}
            />

            {/* Paragraph 9 */}
            <ScrollReadParagraph
              text={PARAGRAPHS[9]}
              globalStartWord={offsets[9].start}
              totalArticleWords={totalWords}
              gradientPhrases={[
                { phrase: 'speed of AI', variant: 'amber' },
                { phrase: 'real developer', variant: 'emerald' },
              ]}
            />

            {/* Paragraph 10 - Final Punch */}
            <div className="border-t border-b border-zinc-200 py-5 sm:py-6 dark:border-zinc-800">
              <ScrollReadParagraph
                text={PARAGRAPHS[10]}
                globalStartWord={offsets[10].start}
                totalArticleWords={totalWords}
                className="font-mono text-xs sm:text-base font-semibold text-zinc-900 dark:text-zinc-100"
                gradientPhrases={[{ phrase: 'AGI will be ready soon', variant: 'fuchsia' }]}
              />
            </div>
          </section>
        </ScrollReadArticle>

      {/* ===== CASE STUDIES SHINY BUTTONS SECTION ===== */}
      <section id="case-studies-section" className="pt-10 sm:pt-16 pb-6 scroll-mt-[100px]">
        <div className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 bg-zinc-50/70 p-6 sm:p-10 dark:border-zinc-800 dark:bg-zinc-900/40 shadow-sm">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                System Blueprints // Live Case Studies
              </span>
            </div>
            <h2 className="font-harmond text-2xl sm:text-3xl md:text-4xl font-black italic text-zinc-950 dark:text-zinc-50 mt-2">
              Case Studies & System Implementations
            </h2>
            <p className="font-mono text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 max-w-xl">
              Tap any case study below to inspect its architecture, distributed runtime flow, and production execution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-start gap-4 sm:gap-5">
            {CASE_STUDIES.map((study) => (
              <ShinyButton
                key={study.id}
                label={study.label}
                onClick={() => navigate(study.route)}
                fillColor="#09090b"
                labelColor="#ffffff"
                accentColor={study.accent}
                accentSoftColor={study.softAccent}
                sweepDuration={7}
                easeDuration={1.2}
                cornerRadius={24}
                className="w-full sm:w-auto text-sm sm:text-base font-semibold tracking-wide py-3.5 px-6 sm:px-7 cursor-pointer hover:shadow-lg transition-transform"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== PART 2 SECTION & BUTTON ===== */}
      <div className="pt-2 sm:pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 rounded-xl sm:rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5 sm:p-7 md:p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div>
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Continue Reading
            </span>
            <h3 className="font-harmond text-2xl sm:text-3xl font-black italic text-zinc-950 dark:text-zinc-50 mt-1">
              Part 2: “Understanding the system”
            </h3>
          </div>

          <Link
            to="/understanding-the-system"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900 bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 hover:-translate-y-0.5 active:scale-95 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer w-full sm:w-auto text-center shrink-0"
          >
            <span>Part 2: “Understanding the system”</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* ===== FOOTER CTA ===== */}
      <footer className="mt-12 sm:mt-18 pt-8 sm:pt-10 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <span className="font-harmond text-2xl font-black italic text-zinc-950 dark:text-zinc-50">
            Om Raut
          </span>
          <p className="font-mono text-xs text-zinc-400 mt-1">
            Full-Stack Developer • Systems & Architecture
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900 bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-95 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer text-center"
          >
            <span>View My Work</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 active:scale-95 cursor-pointer text-center"
          >
            <span>Contact Me</span>
          </Link>
        </div>
      </footer>

    </article>
    </>
  )
}
