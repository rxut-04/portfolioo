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
    <div className="fixed inset-0 z-40 w-screen h-screen overflow-hidden bg-white dark:bg-[#111111] transition-colors duration-200">
      {/* Fullscreen 3D Card Sphere Canvas */}
      <CardSphere
        theme={theme === 'dark' ? 'dark' : 'light'}
        allowThemeToggle={true}
        onThemeChange={(newTheme) => {
          if (newTheme !== theme) toggleTheme()
        }}
        onSettle={(heroIndex) => setSettledHero(heroIndex)}
        className="w-full h-full"
      />

      {/* Floating HUD: Top Left Back Button */}
      <div className="pointer-events-none absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
        <Link
          to="/"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-zinc-200/90 dark:border-zinc-800/90 bg-white/80 dark:bg-zinc-950/80 px-4 py-2 font-mono text-xs font-semibold text-zinc-800 hover:text-black dark:text-zinc-200 dark:hover:text-white backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span aria-hidden="true">←</span>
          <span>Back to Portfolio</span>
        </Link>
      </div>

      {/* Floating HUD: Bottom Center Settled Hero Indicator */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-zinc-200/90 dark:border-zinc-800/90 bg-white/80 dark:bg-zinc-950/80 px-4 py-1.5 font-mono text-xs font-medium text-zinc-700 dark:text-zinc-300 backdrop-blur-md shadow-lg">
        <span className="text-zinc-400 dark:text-zinc-500">HERO:</span>
        <span className="font-bold text-zinc-900 dark:text-zinc-100">
          0{settledHero + 1} // {HERO_TITLES[settledHero] || 'Hero Card'}
        </span>
      </div>
    </div>
  )
}
