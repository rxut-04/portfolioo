import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      // Reset any stale 'light' preference so the site loads in dark theme first
      const initialized = localStorage.getItem('theme_default_dark_v1')
      if (!initialized) {
        localStorage.setItem('theme', 'dark')
        localStorage.setItem('theme_default_dark_v1', 'true')
        return 'dark'
      }
      const saved = localStorage.getItem('theme')
      if (saved === 'light') return 'light'
      return 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Handle storage quota or private browsing exceptions
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
