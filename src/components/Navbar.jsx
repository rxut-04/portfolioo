import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative z-10 mt-3 flex flex-wrap items-center justify-between gap-4 p-4 font-sans text-lg font-semibold sm:mt-5 sm:text-xl">
      <div className="flex items-center gap-3 sm:gap-6 2xl:ml-50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 10C5.48 10 7.34 7 7.34 7S9.2 10 11.69 10 16.66 7 16.66 7 19.14 10 21 10M3 17c2.48 0 4.34-3 4.34-3s1.87 3 4.35 3 4.97-3 4.97-3 2.48 3 4.34 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>Om Raut</div>
      </div>

      <button
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
        className="inline-flex size-11 items-center justify-center rounded-lg border border-gray-300 text-gray-800 xl:hidden"
      >
        <span className="text-2xl leading-none" aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
      </button>

      <nav
        id="primary-navigation"
        aria-label="Main navigation"
        className={`${menuOpen ? 'flex' : 'hidden'} order-3 w-full flex-col gap-1 pb-2 xl:order-none xl:flex xl:w-auto xl:flex-row xl:items-center xl:gap-5 xl:pb-0 2xl:gap-10 2xl:mr-50`}
      >
        <div><NavLink onClick={() => setMenuOpen(false)} to="/">Home</NavLink></div>
        <div><NavLink onClick={() => setMenuOpen(false)} to="/about">About</NavLink></div>
        <div><NavLink onClick={() => setMenuOpen(false)} to="/projects">Projects</NavLink></div>
        <div><NavLink onClick={() => setMenuOpen(false)} to="/skills">Skills</NavLink></div>
        <div><NavLink onClick={() => setMenuOpen(false)} to="/experience">Experience</NavLink></div>
        <div><NavLink onClick={() => setMenuOpen(false)} to="/contact">Contact</NavLink></div>
      </nav>
    </div>
  )
}

export default Navbar
