import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function CommandPalette({ isOpen, setIsOpen }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [toastMessage, setToastMessage] = useState('')
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const COMMAND_ITEMS = [
    // --- Architecture & Case Studies ---
    {
      id: 'excalibur',
      title: 'Case Study 1: Excalibur',
      description: 'Deterministic architecture co-pilot & live state blueprint',
      category: 'Case Studies',
      keywords: 'excalibur blueprint diagram state machine flow',
      icon: '📐',
      action: () => navigate('/projects/excalibur'),
    },
    {
      id: 'personal-gpt',
      title: 'Case Study 2: Personal GPT',
      description: 'Autonomous AI assistant with self-correcting execution loops',
      category: 'Case Studies',
      keywords: 'personal gpt ai agent llm python autonomous reasoning',
      icon: '🤖',
      action: () => navigate('/projects/personal-gpt'),
    },
    {
      id: 'production-execution',
      title: 'Case Study 3: Production Execution',
      description: 'Zero-downtime deployment telemetry & verification pipeline',
      category: 'Case Studies',
      keywords: 'production deployment devops execution ci cd docker',
      icon: '⚡',
      action: () => navigate('/projects/production-execution'),
    },
    {
      id: 'archive-ledger',
      title: 'Case Study 4: Archive Ledger',
      description: 'Immutable high-integrity transaction indexing & audit pipeline',
      category: 'Case Studies',
      keywords: 'archive ledger audit immutable records financial logs',
      icon: '📜',
      action: () => navigate('/projects/archive-ledger'),
    },
    {
      id: 'feasto',
      title: 'Case Study 5: Feasto Delivery',
      description: 'Real-time dispatch system & live order tracking architecture',
      category: 'Case Studies',
      keywords: 'feasto food delivery logistics dispatch geolocation',
      icon: '🛵',
      action: () => navigate('/projects/feasto'),
    },

    // --- Featured Systems ---
    {
      id: 'apex-banking',
      title: 'Apex Banking System',
      description: 'Core banking platform with real-time ACID transaction ledger',
      category: 'Featured Projects',
      keywords: 'apex banking finance transactions acid accounts',
      icon: '🏦',
      action: () => navigate('/projects/banking'),
    },
    {
      id: 'medlink',
      title: 'MedLink Clinical Decision System',
      description: 'Hospital patient triage & emergency medical telemetry platform',
      category: 'Featured Projects',
      keywords: 'medlink medical hospital healthcare clinical triage',
      icon: '🏥',
      action: () => navigate('/projects/medlink'),
    },
    {
      id: 'rfid-system',
      title: 'RFID Edge Inventory Audit',
      description: 'Hardware IoT bridge & continuous inventory reconciliation',
      category: 'Featured Projects',
      keywords: 'rfid iot hardware sensors inventory library tracking',
      icon: '📡',
      action: () => navigate('/projects/rfid'),
    },

    // --- Core Navigation ---
    {
      id: 'nav-home',
      title: 'Home // Overview',
      description: 'Landing page, engineering intro, and featured projects',
      category: 'Navigation',
      keywords: 'home main landing start hero',
      icon: '🏠',
      action: () => navigate('/'),
    },
    {
      id: 'nav-different',
      title: 'What Makes Me Different',
      description: 'Editorial engineering philosophy: Architect mindset vs brute prompt loops',
      category: 'Navigation',
      keywords: 'different philosophy essay architect thinking part 1',
      icon: '✦',
      action: () => navigate('/different'),
    },
    {
      id: 'nav-system',
      title: 'Part 2: Understanding The System',
      description: 'System decomposition, distributed state routing, and control loops',
      category: 'Navigation',
      keywords: 'understanding system architecture part 2 loops blueprint',
      icon: '⚙️',
      action: () => navigate('/understanding-the-system'),
    },
    {
      id: 'nav-projects',
      title: 'All Projects Matrix',
      description: 'Comprehensive catalogue of software and engineering applications',
      category: 'Navigation',
      keywords: 'all projects portfolio work list',
      icon: '📁',
      action: () => navigate('/projects'),
    },
    {
      id: 'nav-about',
      title: 'About Om Raut',
      description: 'Background, developer journey, and architectural ethos',
      category: 'Navigation',
      keywords: 'about bio profile background journey education',
      icon: '👤',
      action: () => navigate('/about'),
    },
    {
      id: 'nav-skills',
      title: 'Skills & Tech Stack',
      description: 'Languages, distributed frameworks, and cloud infrastructure',
      category: 'Navigation',
      keywords: 'skills tech stack react node java spring typescript tailwind',
      icon: '🛠',
      action: () => navigate('/skills'),
    },
    {
      id: 'nav-experience',
      title: 'Experience & Timeline',
      description: 'Career journey, milestones, and production deliverables',
      category: 'Navigation',
      keywords: 'experience history work career resume jobs',
      icon: '💼',
      action: () => navigate('/experience'),
    },
    {
      id: 'nav-contact',
      title: 'Get In Touch',
      description: 'Direct email and collaboration inquiries',
      category: 'Navigation',
      keywords: 'contact email message hire reach out',
      icon: '📬',
      action: () => navigate('/contact'),
    },

    // --- Quick Actions ---
    {
      id: 'action-theme',
      title: `Toggle Theme (${theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'})`,
      description: `Currently ${theme} mode active across all pages`,
      category: 'Quick Actions',
      keywords: 'theme dark light mode toggle switch color style',
      icon: theme === 'dark' ? '☀️' : '🌙',
      action: () => {
        toggleTheme()
        showToast(`Theme switched to ${theme === 'dark' ? 'Light' : 'Dark'} mode`)
      },
    },
    {
      id: 'action-resume',
      title: 'Download Resume (PDF)',
      description: 'Latest curriculum vitae with verified project experience',
      category: 'Quick Actions',
      keywords: 'resume cv pdf download job hire curriculum vitae',
      icon: '📄',
      action: () => {
        const link = document.createElement('a')
        link.href = '/OM_RESUME.pdf'
        link.download = 'OM_RESUME.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        showToast('Resume download started')
      },
    },
    {
      id: 'action-email',
      title: 'Copy Email Address',
      description: 'oraut9025@gmail.com',
      category: 'Quick Actions',
      keywords: 'copy email oraut9025 gmail clipboard mail contact',
      icon: '📋',
      action: () => {
        navigator.clipboard.writeText('oraut9025@gmail.com')
        showToast('Copied oraut9025@gmail.com to clipboard!')
      },
    },
    {
      id: 'action-url',
      title: 'Copy Portfolio URL',
      description: 'Copy link to share portfolio',
      category: 'Quick Actions',
      keywords: 'copy url link share website domain',
      icon: '🔗',
      action: () => {
        navigator.clipboard.writeText(window.location.origin)
        showToast('Portfolio link copied to clipboard!')
      },
    },
  ]

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 2500)
  }

  // Filter items based on query
  const filteredItems = COMMAND_ITEMS.filter((item) => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords.toLowerCase().includes(q)
    )
  })

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, setIsOpen])

  // Custom event listener so external triggers can open the palette
  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-command-palette', handleOpen)
    return () => window.removeEventListener('open-command-palette', handleOpen)
  }, [setIsOpen])

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Arrow key navigation inside modal
  const handleInputKeyDown = (e) => {
    if (filteredItems.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
      scrollSelectedIntoView((selectedIndex + 1) % filteredItems.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
      scrollSelectedIntoView((selectedIndex - 1 + filteredItems.length) % filteredItems.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = filteredItems[selectedIndex]
      if (selected) {
        selected.action()
        if (selected.id !== 'action-theme') {
          setIsOpen(false)
        }
      }
    }
  }

  const scrollSelectedIntoView = (index) => {
    if (!listRef.current) return
    const items = listRef.current.querySelectorAll('[data-command-item]')
    if (items[index]) {
      items[index].scrollIntoView({ block: 'nearest' })
    }
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick Command Navigation"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6 bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl border border-zinc-200 bg-white/95 text-zinc-900 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:bg-[#0c0c0e]/95 dark:text-zinc-100 overflow-hidden transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3.5 dark:border-zinc-800">
          <svg
            className="size-5 text-zinc-400 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command, case study, or page..."
            className="w-full bg-transparent font-sans text-sm sm:text-base outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto p-2 space-y-1 divide-y divide-transparent"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-zinc-400 dark:text-zinc-500">
              No matching commands or pages found.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex
              return (
                <div
                  key={item.id}
                  data-command-item
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => {
                    item.action()
                    if (item.id !== 'action-theme') setIsOpen(false)
                  }}
                  className={`group flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer select-none ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-base shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>
                          {item.title}
                        </span>
                        <span
                          className={`font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-blue-700 text-blue-100'
                              : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p className={`text-xs truncate mt-0.5 ${isSelected ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`font-mono text-xs shrink-0 ${
                      isSelected ? 'text-white' : 'text-zinc-400 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    ↵ Jump
                  </span>
                </div>
              )
            })
          )}
        </div>

        {/* Footer info & keyboard legend */}
        <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-2.5 font-mono text-[11px] text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="rounded border border-zinc-300 bg-zinc-100 px-1 py-0.5 dark:border-zinc-700 dark:bg-zinc-800 text-[10px]">↑</kbd>
              <kbd className="ml-1 rounded border border-zinc-300 bg-zinc-100 px-1 py-0.5 dark:border-zinc-700 dark:bg-zinc-800 text-[10px]">↓</kbd> navigate
            </span>
            <span>
              <kbd className="rounded border border-zinc-300 bg-zinc-100 px-1 py-0.5 dark:border-zinc-700 dark:bg-zinc-800 text-[10px]">↵</kbd> select
            </span>
          </div>

          {toastMessage ? (
            <span className="font-sans text-xs font-semibold text-emerald-500 animate-pulse">
              ✓ {toastMessage}
            </span>
          ) : (
            <span>Om Raut // Portfolio OS</span>
          )}
        </div>
      </div>
    </div>
  )
}
