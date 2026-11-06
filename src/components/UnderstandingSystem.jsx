import { Link } from 'react-router-dom'
import { ScrollReadText } from './ui/scroll-read-text'

export default function UnderstandingSystem() {
  return (
    <article className="relative mx-auto w-[92%] sm:w-[90%] max-w-4xl py-8 sm:py-14 md:py-20 transition-colors duration-300">
      
      {/* Top back navigation breadcrumbs */}
      <div className="mb-8 sm:mb-12 flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
        <Link
          to="/different"
          className="inline-flex items-center gap-1.5 py-1 text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <span aria-hidden="true">←</span> Part 1: What makes me different
        </Link>
        <span className="text-zinc-300 dark:text-zinc-700">/</span>
        <Link
          to="/"
          className="py-1 hover:text-zinc-950 dark:hover:text-white transition-colors"
        >
          Home
        </Link>
      </div>

      {/* ===== ESSAY HEADER ===== */}
      <header className="mb-10 sm:mb-16 border-b border-zinc-200 pb-8 sm:pb-10 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-blue-600 dark:bg-blue-400" />
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Part 02 // Engineering Architecture
          </span>
        </div>

        <h1 className="font-harmond mt-4 sm:mt-5 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tight text-zinc-950 dark:text-zinc-50 break-words leading-[1.1]">
          Understanding the system.
        </h1>
      </header>

      {/* ===== ESSAY BODY: EXACT WORD-BY-WORD CONTENT WITH SCROLL-READ ANIMATION ===== */}
      <div className="space-y-8 sm:space-y-11 text-base sm:text-lg md:text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        
        {/* Paragraph 1 - Opening Question / Dilemma */}
        <div className="rounded-xl sm:rounded-2xl border border-zinc-200/90 bg-zinc-50/70 p-5 sm:p-7 md:p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
          <ScrollReadText
            text='“Understanding the system where every developer traps themselves by running multiple agents on a single project to make the development faster, but they forget to read the code and forget to understand what goes where?”'
            className="font-palast text-lg sm:text-2xl md:text-3xl italic text-zinc-900 dark:text-zinc-100 leading-snug"
            gradientPhrases={['Understanding the system']}
          />
        </div>

        {/* Paragraph 2 */}
        <ScrollReadText
          text="They assume everything will work, but here is the catch: every unneeded piece of code and every unneeded library is imported to run that feature, and that makes the project heavy with dependencies."
          gradientPhrases={['heavy with dependencies']}
        />

        {/* Paragraph 3 */}
        <ScrollReadText
          text="The AI is prompted to get things done, but it forgets to understand the system and take a long-term approach, and hence the feature gets crashed in production and everything collapses."
          gradientPhrases={['gets crashed in production']}
        />

        {/* Paragraph 4 */}
        <ScrollReadText
          text="And we know that every day tons of lines of code are generated. Checking them line by line is an overload for the developer, and this makes production take time to push."
        />

        {/* Paragraph 5 - Core Rule in Callout Box */}
        <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 md:p-8 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-sm">
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-2 font-semibold">
            The Single-Stage Rule
          </span>
          <ScrollReadText
            text="So what I do in this situation is “focus on only one feature to build or one bug to solve” at every stage. If everything is right, only then I push and move forward."
            className="text-zinc-900 dark:text-zinc-100 font-medium text-base sm:text-xl leading-relaxed"
            gradientPhrases={['focus on only one feature to build or one bug to solve']}
          />
        </div>

        {/* Paragraph 6 */}
        <ScrollReadText
          text="I focus on the main part that usually takes time, and the other underlying tasks are done by any smart agent to make it happen. Then this approach adds human intervention to analyse the task done by the agent and everything."
          gradientPhrases={['human intervention']}
        />

        {/* Paragraph 7 - Pull Quote & Resolution */}
        <div className="border-l-2 border-zinc-300 pl-4 sm:pl-5 dark:border-zinc-700 space-y-3">
          <ScrollReadText
            text="And there are very few chances of production failing. So here is what makes me different: solving any problem by its root cause, and if it’s looping, switching back to real developer mode by reading the essential documents and thinking like an architect to tackle that feature and problem!"
            className="text-zinc-800 dark:text-zinc-200 font-medium"
            gradientPhrases={['real developer mode']}
          />
        </div>

        {/* Paragraph 8 */}
        <ScrollReadText
          text="With AI, development is fast, but reviewing it makes every developer different, so for that we must also know the roots of the technologies that we are working on."
          gradientPhrases={['roots of the technologies']}
        />

        {/* Paragraph 9 - Final Punchline Quote */}
        <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-zinc-900 p-6 sm:p-9 md:p-10 text-white dark:border-zinc-800 dark:bg-zinc-950">
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-400 block mb-2 sm:mb-3">
            Core Philosophy
          </span>
          <ScrollReadText
            text="And at last I will say: “Job is just a by-product of what we work towards to achieve, and the rest is just like sweating in practice and dropping less blood in war, the same as sweating more in the daily grind and bleeding less at the time of real work.”"
            className="font-palast text-lg sm:text-2xl md:text-3xl italic leading-relaxed text-zinc-100"
            gradientPhrases={['sweating more in the daily grind and bleeding less at the time of real work']}
          />
        </div>

      </div>

      {/* ===== FOOTER CTA & NAVIGATION ===== */}
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
            to="/different"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 active:scale-95 cursor-pointer text-center"
          >
            <span>← Part 1</span>
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900 bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 active:scale-95 cursor-pointer text-center"
          >
            <span>View My Projects</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 active:scale-95 cursor-pointer text-center"
          >
            <span>Contact Me</span>
          </Link>
        </div>
      </footer>

    </article>
  )
}
