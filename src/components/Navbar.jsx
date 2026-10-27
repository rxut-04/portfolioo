import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/skills', label: 'Skills' },
    { to: '/experience', label: 'Experience' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className="relative z-10 mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 font-sans text-lg font-semibold sm:px-8 lg:px-10">
      <NavLink to="/" className="flex items-center gap-3 text-gray-900">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 10C5.48 10 7.34 7 7.34 7S9.2 10 11.69 10 16.66 7 16.66 7 19.14 10 21 10M3 17c2.48 0 4.34-3 4.34-3s1.87 3 4.35 3 4.97-3 4.97-3 2.48 3 4.34 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Om Raut</span>
      </NavLink>

      <button
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
        className="inline-flex size-11 items-center justify-center rounded-lg border border-gray-300 text-gray-800 md:hidden"
      >
        <span className="text-2xl leading-none" aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
      </button>

      <nav
        id="primary-navigation"
        aria-label="Main navigation"
        className={`${menuOpen ? 'flex' : 'hidden'} w-full flex-col gap-1 pb-2 md:flex md:w-auto md:flex-row md:items-center md:gap-7 md:pb-0`}
      >
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 hover:text-indigo-700 md:px-0 md:py-1 md:hover:bg-transparent ${isActive ? 'text-indigo-700' : 'text-gray-700'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
