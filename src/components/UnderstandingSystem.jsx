import { Link } from 'react-router-dom'
import {
  ScrollReadArticle,
  ScrollReadParagraph,
  computeWordOffsets,
} from './ui/scroll-read-text'

const PARAGRAPHS = [
  // 0
  '“Understanding the system where every developer traps themselves by running multiple agents on a single project to make the development faster, but they forget to read the code and forget to understand what goes where?”',
  // 1
  'They assume everything will work, but here is the catch: every unneeded piece of code and every unneeded library is imported to run that feature, and that makes the project heavy with dependencies.',
  // 2
  'The AI is prompted to get things done, but it forgets to understand the system and take a long-term approach, and hence the feature gets crashed in production and everything collapses.',
  // 3
  'And we know that every day tons of lines of code are generated. Checking them line by line is an overload for the developer, and this makes production take time to push.',
  // 4
  'So what I do in this situation is “focus on only one feature to build or one bug to solve” at every stage. If everything is right, only then I push and move forward.',
  // 5
  'I focus on the main part that usually takes time, and the other underlying tasks are done by any smart agent to make it happen. Then this approach adds human intervention to analyse the task done by the agent and everything.',
  // 6
  'And there are very few chances of production failing. So here is what makes me different: solving any problem by its root cause, and if it’s looping, switching back to real developer mode by reading the essential documents and thinking like an architect to tackle that feature and problem!',
  // 7
  'With AI, development is fast, but reviewing it makes every developer different, so for that we must also know the roots of the technologies that we are working on.',
  // 8
  'And at last I will say: “Job is just a by-product of what we work towards to achieve, and the rest is just like sweating in practice and dropping less blood in war, the same as sweating more in the daily grind and bleeding less at the time of real work.”',
]

const { totalWords, offsets } = computeWordOffsets(PARAGRAPHS)

export default function UnderstandingSystem() {
  return (
    <article className="relative mx-auto w-[92%] sm:w-[90%] max-w-4xl py-8 sm:py-14 md:py-20 transition-colors duration-300">
      
      {/* Top back navigation */}
      <div className="mb-8 sm:mb-12 flex items-center justify-between">
        <Link
          to="/different"
          className="inline-flex items-center gap-1.5 py-1 font-mono text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <span aria-hidden="true">←</span> back to Part 1: “What makes me different”
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 py-1 font-mono text-xs font-medium text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
        >
          home
        </Link>
      </div>

      {/* ===== ESSAY HEADER ===== */}
      <header className="mb-10 sm:mb-16 border-b border-zinc-200 pb-8 sm:pb-10 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Part 02 // Engineering Architecture
          </span>
        </div>

        <h1 className="font-harmond mt-4 sm:mt-5 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tight text-zinc-950 dark:text-zinc-50 break-words leading-[1.1]">
          Understanding the system.
        </h1>
      </header>

      {/* ===== ESSAY BODY: STRICT SEQUENTIAL SCROLL-READING FLOW ===== */}
      <ScrollReadArticle
        totalWords={totalWords}
        offset={["start 60%", "end 85%"]}
        className="space-y-8 sm:space-y-11 text-base sm:text-lg md:text-xl leading-relaxed text-zinc-700 dark:text-zinc-300"
      >
        
        {/* Paragraph 0 - Opening Question / Dilemma */}
        <div className="rounded-xl sm:rounded-2xl border border-zinc-200/90 bg-zinc-50/70 p-5 sm:p-7 md:p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
          <ScrollReadParagraph
            text={PARAGRAPHS[0]}
            globalStartWord={offsets[0].start}
            totalArticleWords={totalWords}
            className="font-palast text-lg sm:text-2xl md:text-3xl italic text-zinc-900 dark:text-zinc-100 leading-snug"
            gradientPhrases={[{ phrase: 'Understanding the system', variant: 'cyan' }]}
          />
        </div>

        {/* Paragraph 1 */}
        <ScrollReadParagraph
          text={PARAGRAPHS[1]}
          globalStartWord={offsets[1].start}
          totalArticleWords={totalWords}
          gradientPhrases={[{ phrase: 'heavy with dependencies', variant: 'rose' }]}
        />

        {/* Paragraph 2 */}
        <ScrollReadParagraph
          text={PARAGRAPHS[2]}
          globalStartWord={offsets[2].start}
          totalArticleWords={totalWords}
          gradientPhrases={[{ phrase: 'gets crashed in production', variant: 'amber' }]}
        />

        {/* Paragraph 3 */}
        <ScrollReadParagraph
          text={PARAGRAPHS[3]}
          globalStartWord={offsets[3].start}
          totalArticleWords={totalWords}
          gradientPhrases={[{ phrase: 'overload for the developer', variant: 'violet' }]}
        />

        {/* Paragraph 4 - Core Rule in Callout Box */}
        <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 md:p-8 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-sm">
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-2 font-semibold">
            The Single-Stage Rule
          </span>
          <ScrollReadParagraph
            text={PARAGRAPHS[4]}
            globalStartWord={offsets[4].start}
            totalArticleWords={totalWords}
            className="text-zinc-900 dark:text-zinc-100 font-medium text-base sm:text-xl leading-relaxed"
            gradientPhrases={[
              { phrase: 'focus on only one feature to build or one bug to solve', variant: 'emerald' },
            ]}
          />
        </div>

        {/* Paragraph 5 */}
        <ScrollReadParagraph
          text={PARAGRAPHS[5]}
          globalStartWord={offsets[5].start}
          totalArticleWords={totalWords}
          gradientPhrases={[
            { phrase: 'smart agent', variant: 'fuchsia' },
            { phrase: 'human intervention', variant: 'cyan' },
          ]}
        />

        {/* Paragraph 6 - Pull Quote & Resolution */}
        <div className="border-l-2 border-zinc-300 pl-4 sm:pl-5 dark:border-zinc-700 space-y-3">
          <ScrollReadParagraph
            text={PARAGRAPHS[6]}
            globalStartWord={offsets[6].start}
            totalArticleWords={totalWords}
            className="text-zinc-800 dark:text-zinc-200 font-medium"
            gradientPhrases={[
              { phrase: 'root cause', variant: 'amber' },
              { phrase: 'real developer mode', variant: 'rose' },
              { phrase: 'thinking like an architect', variant: 'violet' },
            ]}
          />
        </div>

        {/* Paragraph 7 */}
        <ScrollReadParagraph
          text={PARAGRAPHS[7]}
          globalStartWord={offsets[7].start}
          totalArticleWords={totalWords}
          gradientPhrases={[{ phrase: 'roots of the technologies', variant: 'emerald' }]}
        />

        {/* Paragraph 8 - Final Punchline Quote */}
        <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-zinc-900 p-6 sm:p-9 md:p-10 text-white dark:border-zinc-800 dark:bg-zinc-950">
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-400 block mb-2 sm:mb-3">
            Core Philosophy
          </span>
          <ScrollReadParagraph
            text={PARAGRAPHS[8]}
            globalStartWord={offsets[8].start}
            totalArticleWords={totalWords}
            className="font-palast text-lg sm:text-2xl md:text-3xl italic leading-relaxed text-zinc-100"
            gradientPhrases={[
              { phrase: 'sweating more in the daily grind and bleeding less at the time of real work', variant: 'rainbow' },
            ]}
          />
        </div>

      </ScrollReadArticle>

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
