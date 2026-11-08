import { Link } from 'react-router-dom'

export default function GlossySliderButton({
  label = 'What makes me different',
  to = '/different',
  onClick,
  className = '',
}) {
  const content = (
    <>
      <style>{`
        .book-btn {
          position: relative;
          min-width: 220px;
          width: fit-content;
          max-width: 100%;
          height: 48px;
          background: #101010;
          border: 2px solid #333333;
          border-radius: 999px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          padding-left: 4px;
          padding-right: 20px;
          box-shadow:
            inset 0 3px 6px rgba(0, 0, 0, 0.80),
            inset 0 1px 1px rgba(255, 255, 255, 0.15),
            0 10px 20px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
          font-family: 'Inter', sans-serif;
          text-decoration: none;
        }

        .book-btn .slider {
          position: absolute;
          left: 4px;
          top: 4px;
          bottom: 4px;
          width: 62px;
          background: linear-gradient(180deg, #A4FF3B, #72D80B);
          border-radius: 999px;
          transition: width 0.65s cubic-bezier(0.22, 1, 0.36, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          box-shadow:
            inset 0 2px 3px rgba(255, 255, 255, 0.60),
            inset 0 -2px 3px rgba(0, 0, 0, 0.25),
            0 3px 8px rgba(0, 0, 0, 0.30);
        }
        .book-btn:hover .slider {
          width: calc(100% - 8px);
        }

        .book-btn .icon-arrow {
          position: absolute;
          width: 22px;
          height: 22px;
          color: #111;
          opacity: 1;
          transform: translateX(0);
          transition: opacity 0.40s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .book-btn:hover .icon-arrow {
          opacity: 0;
          transform: translateX(28px);
        }

        .book-btn .icon-phone {
          position: absolute;
          width: 20px;
          height: 20px;
          color: #111;
          opacity: 0;
          transform: translateX(-28px) scale(0.7);
          transition: opacity 0.45s ease 0.10s, transform 0.60s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .book-btn:hover .icon-phone {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .book-btn .text {
          padding-left: 72px;
          color: #ffffff;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: -0.2px;
          white-space: nowrap;
          transition: opacity 0.35s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1;
        }
        .book-btn:hover .text {
          opacity: 0;
          transform: translateX(-12px);
        }

        @media (prefers-reduced-motion: reduce) {
          .book-btn *, .book-btn .slider { transition: none !important; }
        }
      `}</style>

      <div className={`book-btn ${className}`} role="button" tabIndex={0} onClick={onClick}>
        <div className="slider">
          {/* Dotted right-arrow */}
          <svg className="icon-arrow" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            {/* Shaft */}
            <circle cx="6" cy="12" r="1.5" />
            <circle cx="10" cy="12" r="1.5" />
            <circle cx="14" cy="12" r="1.5" />
            <circle cx="18" cy="12" r="1.5" />
            {/* Top wing */}
            <circle cx="14" cy="8" r="1.5" />
            <circle cx="10" cy="4" r="1.5" />
            {/* Bottom wing */}
            <circle cx="14" cy="16" r="1.5" />
            <circle cx="10" cy="20" r="1.5" />
          </svg>

          {/* Action icon (Code brackets </>) */}
          <svg
            className="icon-phone"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M13.5 6L10 18.5" />
            <path d="M6.5 8.5L3 12L6.5 15.5" />
            <path d="M17.5 8.5L21 12L17.5 15.5" />
          </svg>
        </div>
        <div className="text">{label}</div>
      </div>
    </>
  )

  if (to) {
    return (
      <Link to={to} className="inline-block text-decoration-none">
        {content}
      </Link>
    )
  }

  return content
}
