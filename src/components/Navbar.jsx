import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

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

const Navbar = () => {
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

      {/* Right controls on mobile: Theme Toggle + Menu Hamburger */}
      <div className="flex items-center gap-2 xl:hidden">
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

        {/* Desktop Theme Toggle */}
        <div className="hidden xl:flex items-center ml-2">
          <ThemeToggleBtn theme={theme} toggleTheme={toggleTheme} />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
