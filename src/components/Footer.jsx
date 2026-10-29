import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <footer className="mt-12 w-full bg-gray-900 px-6 py-16 text-center text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
        <p className="text-base text-gray-300 sm:text-lg">
          © {year} Om Raut. All rights reserved.
        </p>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-6">
          {quickLinks.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className="text-base font-medium text-gray-300 transition-colors hover:text-white"
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default Footer
