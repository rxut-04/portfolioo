import { useState, useEffect } from 'react'

const Hero = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [zoom, setZoom] = useState(100)

  const handleViewCvClick = () => {
    // 1. Trigger immediate download of the resume
    const link = document.createElement('a')
    link.href = '/OM_RESUME.pdf'
    link.download = 'OM_RESUME.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // 2. Open the on-screen resume viewer container
    setIsViewerOpen(true)
    setZoom(100)
  }

  // Handle ESC key to close modal & lock background scrolling
  useEffect(() => {
    if (!isViewerOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsViewerOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isViewerOpen])

  const zoomIn = () => setZoom((prev) => Math.min(prev + 20, 200))
  const zoomOut = () => setZoom((prev) => Math.max(prev - 20, 60))
  const resetZoom = () => setZoom(100)

  return (
    <>
      <div className="flex w-full flex-col justify-between gap-8 px-6 py-8 sm:px-10 md:flex-row md:items-center md:gap-10 md:px-12 xl:gap-20">
        <div className="w-full md:mt-16 md:min-w-0 md:flex-1 2xl:ml-60 2xl:mt-60">
          <h1 className="text-4xl font-bold italic leading-tight text-gray-900 sm:text-5xl">
            “Hi, I’m Om Raut
            <br />Full-Stack Developer”
          </h1>
          <p className="mt-5 text-base leading-relaxed sm:text-lg">
            Final-year IT student and CDAC graduate. I build web applications with
            React, Java, and Spring Boot, backed by solid DSA and database
            fundamentals. Looking for a developer role where I can learn fast and
            ship real work.
          </p>
          <button
            onClick={handleViewCvClick}
            className="mt-6 rounded-xl bg-blue-700 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-700/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 active:scale-95 sm:text-lg cursor-pointer"
          >
            View CV
          </button>
        </div>

        <div className="mx-auto w-full max-w-[32rem] md:mt-10 md:w-[45%] md:max-w-[36rem] md:shrink-0 2xl:mr-50 2xl:mt-22 2xl:w-[36rem]">
          <img src="/images/om.jpeg" alt="Om Raut" className="h-auto w-full rounded-xl object-cover shadow-lg" />
        </div>
      </div>

      {/* Resume Viewer Container / Modal */}
      {isViewerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume Preview"
          onClick={() => setIsViewerOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-2 sm:p-6 backdrop-blur-sm transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
          >
            {/* Header / Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 bg-slate-900 px-4 py-3 text-white sm:px-6">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs shadow">
                  PDF
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white sm:text-base">
                    Om Raut — Resume
                  </h2>
                  <p className="text-xs text-slate-400">
                    OM_RESUME.pdf • Downloaded automatically
                  </p>
                </div>
              </div>

              {/* Controls: Zoom, Download, Open, Close */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Zoom Controller */}
                <div className="flex items-center rounded-lg border border-slate-700 bg-slate-800 p-1">
                  <button
                    onClick={zoomOut}
                    title="Zoom out"
                    className="flex size-7 items-center justify-center rounded text-base font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-mono text-xs font-semibold text-slate-200 select-none">
                    {zoom}%
                  </span>
                  <button
                    onClick={zoomIn}
                    title="Zoom in"
                    className="flex size-7 items-center justify-center rounded text-base font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition cursor-pointer"
                  >
                    +
                  </button>
                  <button
                    onClick={resetZoom}
                    title="Reset to 100%"
                    className="ml-1 rounded px-2 py-0.5 text-xs font-medium text-slate-400 hover:bg-slate-700 hover:text-white transition cursor-pointer"
                  >
                    Reset
                  </button>
                </div>

                {/* Re-download button */}
                <a
                  href="/OM_RESUME.pdf"
                  download="OM_RESUME.pdf"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-800 cursor-pointer"
                  title="Download OM_RESUME.pdf"
                >
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span className="hidden sm:inline">Download</span>
                </a>

                {/* Open in new tab button */}
                <a
                  href="/OM_RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white cursor-pointer"
                  title="Open PDF in new tab"
                >
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  <span>New Tab</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={() => setIsViewerOpen(false)}
                  title="Close viewer (Esc)"
                  className="flex size-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-400 transition hover:bg-slate-700 hover:text-white cursor-pointer"
                >
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Document Viewing Area */}
            <div className="flex-1 overflow-auto bg-slate-950/60 p-3 sm:p-6 flex justify-center items-start">
              <div
                style={{
                  width: `${zoom}%`,
                  maxWidth: zoom <= 100 ? '52rem' : 'none',
                  transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                className="h-fit overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-white/10"
              >
                <img
                  src="/images/resume-preview.png"
                  alt="Om Raut Resume"
                  className="size-full object-contain select-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Hero
