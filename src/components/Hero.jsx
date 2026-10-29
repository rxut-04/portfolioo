import { useState, useEffect } from 'react'

const Hero = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false)

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
            className="relative flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
          >
            {/* Header: Download & Close */}
            <div className="flex items-center justify-end gap-3 border-b border-slate-700 bg-slate-900 px-4 py-3 sm:px-6">
              {/* Re-download button */}
              <a
                href="/OM_RESUME.pdf"
                download="OM_RESUME.pdf"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-800 cursor-pointer"
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
                <span>Download</span>
              </a>

              {/* Close Button */}
              <button
                onClick={() => setIsViewerOpen(false)}
                title="Close viewer (Esc)"
                className="flex size-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white cursor-pointer"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Document Viewing Area */}
            <div className="flex-1 overflow-auto bg-slate-950/60 p-3 sm:p-6 flex justify-center items-start">
              <div className="h-fit w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-white/10">
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
