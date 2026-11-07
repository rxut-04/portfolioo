import { Link } from 'react-router-dom'
import {
  ScrollReadArticle,
  ScrollReadParagraph,
  computeWordOffsets,
} from './ui/scroll-read-text'
import { SqueezeCarousel, Arrow } from './ui/carousel-squeeze'

const mark = (text) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1 font-mono text-[11px] sm:text-xs font-semibold tracking-wide text-white backdrop-blur-md border border-white/15 shadow-sm">
    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
    {text}
  </span>
)

const PROJECT_SLIDES = [
  {
    id: 'excalibur',
    title: 'System Architecture & Blueprint Flow',
    description:
      'Interactive architectural modeling of distributed components, data routing boundaries, and system states.',
    action: 'Watch Architecture',
    href: '/architecture',
    overlay: mark('Architecture Blueprint'),
    video: '/videos/EXCALIBER-FINAL.mp4',
  },
  {
    id: 'personal-gpt',
    title: 'Autonomous Personal GPT System',
    description:
      'Context-driven autonomous assistant with real-time reasoning loops, stateful tool orchestration, and memory persistence.',
    action: 'Watch Agent',
    href: '/architecture',
    overlay: mark('Personal GPT'),
    video: '/videos/Personal-GPT.mp4',
  },
  {
    id: 'success-clip',
    title: 'Production Deployment & Execution',
    description:
      'Real-time execution of zero-downtime production deployment, verified telemetry, and end-to-end task completion.',
    action: 'Watch Execution',
    href: '/architecture',
    overlay: mark('Production Flow'),
    video: '/videos/Success_clip1.mp4',
  },
  {
    id: 'archive',
    title: 'Immutable Archive & Ledger Records',
    description:
      'High-integrity archiving pipeline with persistent audit logging, deterministic state indexing, and rapid query retrieval.',
    action: 'Watch Archive',
    href: '/architecture',
    overlay: mark('Archive Ledger'),
    video: '/videos/archive-final.mp4',
  },
  {
    id: 'feasto',
    title: 'Feasto Smart Delivery Platform',
    description:
      'Real-time food delivery dispatch system with intelligent order routing, live kitchen telemetry, and automated courier tracking.',
    action: 'Watch Feasto',
    href: '/architecture',
    overlay: mark('Food Delivery Flow'),
    video: '/videos/FEASTO-FINAL.mp4',
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
  return (
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
        className="space-y-8 sm:space-y-11 text-base sm:text-lg md:text-xl leading-relaxed text-zinc-700 dark:text-zinc-300"
      >
        
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
      </ScrollReadArticle>

      {/* ===== INTERACTIVE SYSTEM & PROJECT SHOWCASE SLIDESHOW (IN BETWEEN) ===== */}
      <section id="carousel-section" className="pt-8 sm:pt-14 pb-4">
        <SqueezeCarousel
          slides={PROJECT_SLIDES}
          height="clamp(240px, 38cqi, 380px)"
          radius={10}
          gap={14}
          slatWidth={10}
          slatGap={8}
          className="w-full"
          header={({ prev, next, open, count }) => (
            <div className="mb-5 sm:mb-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                  <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    Live Architectures // Systems in Motion
                  </span>
                </div>
                <h1 className="font-harmond text-2xl sm:text-3xl md:text-4xl font-black italic text-zinc-950 dark:text-zinc-50 mt-1.5">
                  Production blueprints in action.
                </h1>
                <p className="font-mono text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
                  Swipe or tap through real systems: core financial ledgers, hospital orchestration flows, and edge IoT controllers.
                </p>
              </div>

              {/* Controllers placed on the right-hand side of the H1 */}
              <div className="flex items-center gap-3 shrink-0 self-start sm:self-end pb-1">
                <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400 tabular-nums">
                  {String(open + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-1.5">
                  <Arrow back label="Previous slide" onClick={prev} />
                  <Arrow label="Next slide" onClick={next} />
                </div>
              </div>
            </div>
          )}
        />
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
  )
}
