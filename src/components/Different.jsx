import { Link } from 'react-router-dom'
import { ScrollReadText } from './ui/scroll-read-text'

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

      {/* ===== ESSAY BODY: EXACT WORD-BY-WORD CONTENT WITH SCROLL-READ ANIMATION ===== */}
      <div className="space-y-8 sm:space-y-11 text-base sm:text-lg md:text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        
        {/* Paragraph 1 - Opening Lead */}
        <div className="rounded-xl sm:rounded-2xl border border-zinc-200/90 bg-zinc-50/70 p-5 sm:p-7 md:p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
          <ScrollReadText
            text='“What makes me different is like thinking like an architect rather than just dead prompting to fix any feature, waiting every 5-10 minutes for the AI to finish its execution, and looping again with a new bug that never existed. This costs 5 hours of dead debugging.”'
            className="font-palast text-lg sm:text-2xl md:text-3xl italic text-zinc-900 dark:text-zinc-100 leading-snug"
            gradientPhrases={['architect', '5 hours of dead debugging']}
          />
        </div>

        {/* Paragraph 2 */}
        <ScrollReadText
          text="But when I think to solve a problem, the prompt goes like this: describing each and every scenario to the model, then waiting for its response to understand what is actually going on, and then I keep asking the AI what approach fits to solve this bug or to add a new feature, rather than just false hope."
          gradientPhrases={['false hope']}
        />

        {/* Paragraph 3 */}
        <ScrollReadText
          text="After the model gets 100% ready to take action, I give it only one feature or bug to solve, then analyse the output with normal human intervention, and if everything goes right, I proceed to the next steps towards the goal."
          gradientPhrases={['only one feature or bug', 'normal human intervention']}
        />

        {/* Paragraph 4 */}
        <ScrollReadText
          text="And if at the first attempt it gives an unexpected output, then I stop and give an exentential prompt to rethink the feature/bug, also giving it the recent output and telling it to think that it was not what I wanted, but that it should be in my way, as I prompted."
          gradientPhrases={['exentential prompt']}
        />

        {/* Paragraph 5 & 6 */}
        <div className="border-l-2 border-zinc-300 pl-4 sm:pl-5 dark:border-zinc-700 space-y-3">
          <ScrollReadText
            text="Then, from this technique, sometimes it loops every engineer to go backwards (backtracking) and try again."
            className="text-zinc-600 dark:text-zinc-400"
          />
          <ScrollReadText
            text="But here, I think differently!"
            className="font-harmond text-2xl sm:text-3xl font-black italic text-zinc-950 dark:text-zinc-100"
            gradientPhrases={['think differently!']}
          />
        </div>

        {/* Paragraph 7 */}
        <ScrollReadText
          text="Think of the old times when every engineer tracked the bug, and if it went to a dead end, then usually 7 out of 10 engineers debugged the problem by taking reference from “Stack Overflow” or “taking time to read the documentation”."
          gradientPhrases={['taking time to read the documentation']}
        />

        {/* Paragraph 8 */}
        <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-sm">
          <ScrollReadText
            text="This gives every engineer the power to solve/track every problem, rather than debugging the same problem for 5 hours straight. This makes the feature hold value for the long term, rather than being temporary and crashing in production!"
            className="text-zinc-900 dark:text-zinc-100 font-medium text-base sm:text-lg leading-relaxed"
          />
        </div>

        {/* Paragraph 9 */}
        <ScrollReadText
          text="“We know that within 2.5 years the industry will need real developers back, rather than developers who blindly follow AI for project management and everyday tasks!”"
          className="font-palast text-lg sm:text-2xl italic text-zinc-900 dark:text-zinc-100"
          gradientPhrases={['real developers back']}
        />

        {/* Paragraph 10 */}
        <ScrollReadText
          text="We know that AI will get more powerful every day, but touching and moving with the speed of AI makes every developer a real developer in this modern era."
        />

        {/* Paragraph 11 - Final Punch */}
        <div className="border-t border-b border-zinc-200 py-5 sm:py-6 dark:border-zinc-800">
          <ScrollReadText
            text="AGI will be ready soon, but every developer should know what is going on and what the plan of action should be, rather than depending on AI!!!"
            className="font-mono text-xs sm:text-base font-semibold text-zinc-900 dark:text-zinc-100"
            gradientPhrases={['AGI will be ready soon']}
          />
        </div>

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
