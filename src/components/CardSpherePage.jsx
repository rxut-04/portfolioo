import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CardSphere from './CardSphere'
import { useTheme } from '../context/ThemeContext'

const FEATURED_PROJECTS = [
  {
    index: 0,
    title: 'Apex — Core Banking',
    badge: '01 // Core Financial Engine',
    route: '/projects/banking',
    tag: 'ACID Guaranteed',
    accentColor: '#38bdf8',
  },
  {
    index: 1,
    title: 'MedLink — Clinical Aid',
    badge: '02 // Clinical Decisions',
    route: '/projects/medlink',
    tag: 'Clinical Triage',
    accentColor: '#a855f7',
  },
  {
    index: 2,
    title: 'RFID Library Auditing',
    badge: '03 // Physical Computing',
    route: '/projects/rfid',
    tag: 'Hardware Bridge',
    accentColor: '#f59e0b',
  },
  {
    index: 3,
    title: 'Archive & Ledger',
    badge: '04 // Immutable Ledger',
    route: '/projects/archive-ledger',
    tag: 'Cryptographic Audit',
    accentColor: '#10b981',
  },
  {
    index: 4,
    title: 'Feasto Smart Delivery',
    badge: '05 // Smart Logistics',
    route: '/projects/feasto',
    tag: 'Geospatial Dispatch',
    accentColor: '#f43f5e',
  },
]

export default function CardSpherePage() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [settledHero, setSettledHero] = useState(0)

  const currentProject = FEATURED_PROJECTS[settledHero % FEATURED_PROJECTS.length]

  return (
    <div className="fixed inset-0 z-40 w-screen h-screen overflow-hidden bg-[#09090b] text-white select-none">
      {/* Fullscreen 3D Card Sphere Canvas with Featured Project Videos */}
      <CardSphere
        theme="dark"
        allowThemeToggle={false}
        onSelectProject={(route) => navigate(route)}
        onSettle={(heroIndex) => setSettledHero(heroIndex)}
        className="w-full h-full"
      />

      {/* Floating HUD: Top Left Back Button */}
      <div className="pointer-events-none absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
        <Link
          to="/"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-zinc-800/90 bg-zinc-950/80 px-4 py-2 font-mono text-xs font-semibold text-zinc-200 hover:text-white backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span aria-hidden="true">←</span>
          <span>Back to Portfolio</span>
        </Link>
      </div>

      {/* Floating HUD: Bottom Center Featured Project Case Study Link */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5">
        <Link
          to={currentProject.route}
          className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-zinc-700/80 bg-zinc-950/85 px-4.5 py-2 font-mono text-xs font-semibold text-zinc-200 hover:text-white backdrop-blur-md shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span
            className="inline-block size-2 rounded-full animate-pulse"
            style={{ backgroundColor: currentProject.accentColor }}
          />
          <span className="text-zinc-400">{currentProject.badge}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-white font-bold">{currentProject.title}</span>
          <span
            className="font-bold underline decoration-zinc-500 underline-offset-2 ml-1"
            style={{ color: currentProject.accentColor }}
          >
            Explore Case Study →
          </span>
        </Link>
      </div>
    </div>
  )
}
