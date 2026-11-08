import { useState } from 'react'
import { Link } from 'react-router-dom'
import CardSphere from './CardSphere'
import { useTheme } from '../context/ThemeContext'

export default function CardSpherePage() {
  const { theme, toggleTheme } = useTheme()
  const [settledHero, setSettledHero] = useState(0)

  const HERO_TITLES = [
    'Cue Lime Mark',
    'Dot Cluster Array',
    'Inter Typography Spec',
    'Morphing Icon Vector',
    'Target Coordinate Reticle',
    'Where Design Meets Code',
    'Cue Glow Box',
    'Copy. Paste. Ship.',
  ]

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] flex flex-col bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-hidden">
      {/* Top Header Bar */}
      <div className="relative z-20 mx-auto w-[92%] sm:w-[90%] max-w-6xl pt-4 sm:pt-6 pb-2 flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors py-1"
        >
          <span aria-hidden="true">←</span> back to portfolio
        </Link>

        {/* Minimalist interaction instructions pill */}
        <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 px-3 py-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400 shadow-xs">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>DRAG • FLICK • SCROLL • ARROWS</span>
          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
          <span className="hidden sm:inline">DOUBLE-CLICK TO FLIP THEME</span>
        </div>
      </div>

      {/* Main 3D Card Sphere Container */}
      <div className="relative z-10 flex-1 w-full min-h-[550px] sm:min-h-[650px] flex items-center justify-center">
        <CardSphere
          theme={theme === 'dark' ? 'dark' : 'light'}
          allowThemeToggle={true}
          onThemeChange={(newTheme) => {
            if (newTheme !== theme) toggleTheme()
          }}
          onSettle={(heroIndex) => setSettledHero(heroIndex)}
          className="w-full h-full"
        />
      </div>

      {/* Bottom Status strip */}
      <div className="relative z-20 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-900/50 py-2.5 px-4 sm:px-8 font-mono text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 dark:text-zinc-500">ACTIVE HERO:</span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">
            [0{settledHero + 1} // {HERO_TITLES[settledHero] || 'Hero Card'}]
          </span>
        </div>
        <div className="flex items-center gap-4 text-zinc-400 dark:text-zinc-500 text-[11px]">
          <span>PHYSICS: QUATERNION COAST</span>
          <span>•</span>
          <Link
            to="/projects"
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            View Projects List →
          </Link>
        </div>
      </div>
    </div>
  )
}
