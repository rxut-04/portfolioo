import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useVoiceAgent } from '../context/VoiceAgentContext'
import { LiquidGlassOrb } from './liquid-glass-orb'
import { ShiningText } from './ui/shining-text'

const ThemeToggleBtn = ({ theme, toggleTheme, className = '' }) => (
  <button
    type="button"
    onClick={toggleTheme}
    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    data-cursor="grow"
    className={`group relative inline-flex size-10 items-center justify-center rounded-full border border-gray-300 bg-gray-100/90 text-gray-800 transition-all duration-300 hover:scale-105 hover:bg-gray-200 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-200 dark:hover:bg-zinc-700 cursor-pointer ${className}`}
  >
    {theme === 'dark' ? (
      // Sun Icon
      <svg
        className="size-5 transition-transform duration-500 group-hover:rotate-90 text-amber-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ) : (
      // Moon Icon
      <svg
        className="size-5 transition-transform duration-500 group-hover:-rotate-12 text-slate-700"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    )}
  </button>
)

const NavbarVoiceOrb = () => {
  const { isActivated, stopSession, currentState, stateLabel, errorMessage, isSpeaking, audioLevel } = useVoiceAgent()
  const location = useLocation()

  // Only render on the navbar when voice is active AND user is not on the home page ('/')
  if (!isActivated || location.pathname === '/') {
    return null
  }

  return (
    <div className="inline-flex items-center gap-2 select-none animate-in fade-in zoom-in-95 duration-300 mr-1 sm:mr-2">
      {/* On the LEFT of the orb: text of current state */}
      <ShiningText text={errorMessage || stateLabel} className="text-xs sm:text-sm font-medium" />

      {/* Liquid Glass Orb */}
      <div
        role="button"
        tabIndex={0}
        onClick={stopSession}
        title={isSpeaking ? "Assistant is speaking (Click to end)" : "Listening to your voice (Click to end)"}
        className="relative size-8 sm:size-9 rounded-full overflow-hidden shrink-0 shadow-sm cursor-pointer transition-transform hover:scale-105 active:scale-95 ring-1 ring-zinc-300 dark:ring-zinc-700/80 bg-zinc-100 dark:bg-zinc-900"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] pointer-events-none scale-[0.14] sm:scale-[0.155] origin-center">
          <LiquidGlassOrb
            baseColor={"#ffffff"}
            colorA={"#000000"}
            colorB={"#4d4d4d"}
            colorC={"#a9a9a9"}
            seed={145}
            startTime={18}
            speed={1.5}
            distortion={0.8}
            clusterCount={7.2}
            clusterIntensity={3}
            clusterSize={22.5}
            scale={0.23}
            spotSize={1.15}
            rotation={0}
            softness={0.31}
            relief={2.94}
            refraction={0.65}
            roughness={0}
            reflection={1.3}
            caustics={0}
            dispersion={1}
            colorDistribution={0}
            grain={0.3}
            grainSize={1}
            paused={false}
            animateDistortion={true}
            grainMode={"fine"}
            flowType={"drift"}
            state={currentState}
            thinkingAnimation={"ripples"}
            searchingAnimation={"lens"}
            preserveWhites={true}
            animateEntrance={false}
            size={250}
            audioLevel={audioLevel || (isSpeaking ? 0.78 : 0.42)}
          />
        </div>
      </div>

      {/* Subtle close button */}
      <button
        type="button"
        onClick={stopSession}
        className="text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 text-xs px-1 py-0.5 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded transition-colors cursor-pointer"
        title="End conversation"
        aria-label="End conversation"
      >
        ✕
      </button>
    </div>
  )
}

const Navbar = ({ onOpenCommand }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative z-10 mt-3 flex flex-wrap items-center justify-between gap-4 p-4 font-sans text-lg font-semibold sm:mt-5 sm:text-xl transition-colors duration-300">
      <div className="flex items-center gap-3 sm:gap-6 2xl:ml-50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gray-900 dark:text-zinc-100 transition-colors">
          <path d="M3 10C5.48 10 7.34 7 7.34 7S9.2 10 11.69 10 16.66 7 16.66 7 19.14 10 21 10M3 17c2.48 0 4.34-3 4.34-3s1.87 3 4.35 3 4.97-3 4.97-3 2.48 3 4.34 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <NavLink to="/" onClick={() => setMenuOpen(false)} className="text-gray-900 dark:text-zinc-100 transition-colors">
          Om Raut
        </NavLink>
      </div>

      {/* Right controls on mobile: Voice Orb (on other pages) + Search + Theme Toggle + Menu Hamburger */}
      <div className="flex items-center gap-2 xl:hidden">
        <NavbarVoiceOrb />
        <button
          type="button"
          onClick={onOpenCommand}
          aria-label="Open search and command menu"
          className="inline-flex size-10 items-center justify-center rounded-full border border-gray-300 bg-gray-100/90 text-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-200 cursor-pointer"
        >
          <svg className="size-4 text-zinc-600 dark:text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
        <ThemeToggleBtn theme={theme} toggleTheme={toggleTheme} />
        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-gray-300 text-gray-800 dark:border-zinc-700 dark:text-zinc-200 cursor-pointer"
        >
          <span className="text-2xl leading-none" aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
      </div>

      <nav
        id="primary-navigation"
        aria-label="Main navigation"
        className={`${menuOpen ? 'flex' : 'hidden'} order-3 w-full flex-col gap-2 pb-2 xl:order-none xl:flex xl:w-auto xl:flex-row xl:items-center xl:gap-5 xl:pb-0 2xl:gap-8 2xl:mr-50`}
      >
        <div className="text-gray-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">
          <NavLink onClick={() => setMenuOpen(false)} to="/">Home</NavLink>
        </div>
        <div className="text-gray-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">
          <NavLink onClick={() => setMenuOpen(false)} to="/about">About</NavLink>
        </div>
        <div className="text-gray-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">
          <NavLink onClick={() => setMenuOpen(false)} to="/projects">Projects</NavLink>
        </div>
        <div className="text-gray-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">
          <NavLink onClick={() => setMenuOpen(false)} to="/skills">Skills</NavLink>
        </div>
        <div className="text-gray-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">
          <NavLink onClick={() => setMenuOpen(false)} to="/experience">Experience</NavLink>
        </div>
        <div className="text-gray-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">
          <NavLink onClick={() => setMenuOpen(false)} to="/contact">Contact</NavLink>
        </div>

        {/* Desktop Search Trigger + Theme Toggle */}
        <div className="hidden xl:flex items-center gap-2.5 ml-2">
          <NavbarVoiceOrb />
          <button
            type="button"
            onClick={onOpenCommand}
            aria-label="Open Command Menu"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50/90 px-3 py-1.5 font-mono text-xs text-zinc-600 transition-all hover:border-zinc-400 hover:text-zinc-900 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200 cursor-pointer shadow-sm"
          >
            <svg className="size-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span>Search</span>
            <kbd className="rounded border border-zinc-300 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              ⌘K
            </kbd>
          </button>
          <ThemeToggleBtn theme={theme} toggleTheme={toggleTheme} />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
