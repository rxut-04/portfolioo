import { Link } from 'react-router-dom'

// ===== Background rows configuration for each featured project =====
const apexRows = [
    { text: 'Apex Banking', animation: 'bg-marquee-track', repeat: 4 },
    { text: 'Core Engine', animation: 'bg-marquee-track-reverse', repeat: 4 },
]

const medlinkRows = [
    { text: 'MedLink', animation: 'bg-marquee-track', repeat: 4 },
    { text: 'Clinical Decisions', animation: 'bg-marquee-track-reverse', repeat: 4 },
]

const rfidRows = [
    { text: 'Library Auditing', animation: 'bg-marquee-track', repeat: 4 },
    { text: 'RFID System', animation: 'bg-marquee-track-reverse', repeat: 4 },
]

const SEPARATOR = '✦'

// Reusable desktop background marquee with generous gap between rows for web view
const DesktopMarquee = ({ rows }) => (
    <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden select-none flex-col justify-center gap-28 lg:flex lg:gap-48"
    >
        {rows.map((row) => (
            <div key={row.text} className="w-full overflow-hidden">
                <div className={`${row.animation} flex w-max`}>
                    {[0, 1].map((group) => (
                        <div key={group} className="flex shrink-0 items-center">
                            {Array.from({ length: row.repeat }).map((_, i) => (
                                <div key={i} className="flex items-center">
                                    <span
                                        className="font-palast whitespace-nowrap text-[5rem] font-semibold italic tracking-tight text-slate-200 transition-colors duration-300 dark:text-zinc-800/80 sm:text-[9rem] lg:text-[13rem]"
                                    >
                                        {row.text}
                                    </span>
                                    <span
                                        className="px-6 text-[5rem] font-normal text-slate-200 transition-colors duration-300 dark:text-zinc-800/80 sm:text-[9rem] lg:text-[13rem]"
                                    >
                                        {SEPARATOR}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
)

// Reusable mobile marquee ribbon rendered after the Visit button
const MobileMarquee = ({ row1, row2 }) => (
    <div className="mt-4 mb-1 -mx-4 flex flex-col gap-0 overflow-hidden sm:-mx-6 lg:hidden" aria-hidden="true">
        {/* Row 1 */}
        <div className="overflow-hidden">
            <div className="bg-marquee-track flex w-max select-none">
                {[0, 1].map((group) => (
                    <div key={group} className="flex shrink-0 items-center">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex items-center">
                                <span
                                    className="font-palast whitespace-nowrap text-2xl font-semibold italic leading-none tracking-tight text-slate-300 transition-colors duration-300 dark:text-zinc-600 sm:text-3xl"
                                >
                                    {row1}
                                </span>
                                <span
                                    className="px-3 text-xl font-normal leading-none text-slate-300 transition-colors duration-300 dark:text-zinc-600 sm:text-2xl"
                                >
                                    {SEPARATOR}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>

        {/* Row 2 (Reverse) */}
        <div className="overflow-hidden">
            <div className="bg-marquee-track-reverse flex w-max select-none">
                {[0, 1].map((group) => (
                    <div key={group} className="flex shrink-0 items-center">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex items-center">
                                <span
                                    className="font-palast whitespace-nowrap text-2xl font-semibold italic leading-none tracking-tight text-slate-300 transition-colors duration-300 dark:text-zinc-600 sm:text-3xl"
                                >
                                    {row2}
                                </span>
                                <span
                                    className="px-3 text-xl font-normal leading-none text-slate-300 transition-colors duration-300 dark:text-zinc-600 sm:text-2xl"
                                >
                                    {SEPARATOR}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </div>
)

const Featured = () => {
    return (
        <>
            <div className="mt-12 flex flex-col gap-5">
                <div aria-hidden="true" className="mx-auto h-px w-[90%] max-w-5xl bg-slate-300 transition-colors duration-300 dark:bg-zinc-800" />

                <div className="w-full overflow-hidden py-2">
                    <div className="marquee-track flex w-max">
                        {[0, 1].map((group) => (
                            <div
                                key={group}
                                aria-hidden={group === 1}
                                className="flex shrink-0 items-center"
                            >
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="flex items-center">
                                        <span className="font-harmond whitespace-nowrap text-3xl font-black italic tracking-tight text-gray-900 transition-colors duration-300 dark:text-zinc-100 sm:text-4xl lg:text-5xl">
                                            Featured Projects
                                        </span>
                                        <span className="px-6 text-3xl font-normal text-gray-900 transition-colors duration-300 dark:text-zinc-100 sm:text-4xl lg:text-5xl">
                                            -
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div aria-hidden="true" className="mx-auto h-px w-[90%] max-w-5xl bg-slate-300 transition-colors duration-300 dark:bg-zinc-800" />
            </div>

            {/* ===== APEX: full-width wrapper with moving background text ===== */}
            <div className="relative isolate overflow-hidden">
                <DesktopMarquee rows={apexRows} />

                {/* Foreground: Apex section above the background */}
                <section id="featured-first" className="relative z-10 mx-auto flex scroll-mt-8 w-[90%] flex-col items-center justify-between gap-8 py-8 sm:gap-10 sm:py-12 lg:min-h-screen lg:flex-row-reverse lg:gap-16">
                    {/* Text side (right on desktop) */}
                    <div className="w-full lg:w-2/5">
                        <h1 className="font-harmond text-3xl font-black italic tracking-tight text-gray-900 transition-colors duration-300 dark:text-zinc-100 sm:text-5xl xl:text-7xl">
                            “Apex — Core Banking Engine”
                        </h1>
                        <p className="mt-6 text-base leading-relaxed text-gray-600 transition-colors duration-300 dark:text-zinc-400 sm:text-lg xl:text-xl">
                            A high-performance core banking platform with real-time transaction processing, automated fund transfers, deposit & withdrawal management, and live audit ledger verification.
                        </p>

                        <div className="mt-6 sm:mt-8">
                            <Link
                                to="/projects/banking"
                                className="antialiased inline-flex items-center rounded-full bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 active:scale-95 sm:px-8 sm:py-3.5 sm:text-lg"
                            >
                                Visit
                            </Link>
                        </div>

                        <MobileMarquee row1="Apex Banking" row2="Core Engine" />
                    </div>

                    {/* Video side (left on desktop) */}
                    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-2xl ring-1 ring-slate-200 transition-all duration-500 hover:scale-[1.02] dark:border-zinc-800 dark:ring-zinc-800 lg:w-3/5">
                        <video
                            src="/banking.mp4"
                            poster="/images/banking-preview.png"
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            className="aspect-video w-full object-cover"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </section>
            </div>

            <div aria-hidden="true" className="mx-auto h-px w-[90%] bg-slate-300 transition-colors duration-300 dark:bg-zinc-800" />

            {/* ===== MEDLINK: full-width wrapper with moving background text ===== */}
            <div className="relative isolate overflow-hidden">
                <DesktopMarquee rows={medlinkRows} />

                <section id="featured-medlink" className="relative z-10 mx-auto flex scroll-mt-8 w-[90%] flex-col items-center justify-between gap-8 py-8 sm:gap-10 sm:py-12 lg:min-h-screen lg:flex-row lg:gap-16">
                    {/* Text side */}
                    <div className="w-full lg:w-2/5">
                        <h1 className="font-harmond text-3xl font-black italic tracking-tight text-gray-900 transition-colors duration-300 dark:text-zinc-100 sm:text-5xl xl:text-7xl">
                            “MedLink — Safer Clinical Decisions”
                        </h1>
                        <p className="mt-6 text-base leading-relaxed text-gray-600 transition-colors duration-300 dark:text-zinc-400 sm:text-lg xl:text-xl">
                            An AI-assisted platform that helps medical doctors assess risk, seek second opinions, and make safer clinical decisions. Trusted by 500+ clinical specialists.
                        </p>

                        <div className="mt-6 sm:mt-8">
                            <Link
                                to="/projects/medlink"
                                className="antialiased inline-flex items-center rounded-full bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 active:scale-95 sm:px-8 sm:py-3.5 sm:text-lg"
                            >
                                Visit
                            </Link>
                        </div>

                        <MobileMarquee row1="MedLink" row2="Clinical Decisions" />
                    </div>

                    {/* Video side (landscape) */}
                    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-2xl ring-1 ring-slate-200 transition-all duration-500 hover:scale-[1.02] dark:border-zinc-800 dark:ring-zinc-800 lg:w-3/5">
                        <video
                            src="/medlink.mp4"
                            poster="/images/medlink-preview.png"
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            className="aspect-video w-full object-cover"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </section>
            </div>

            <div aria-hidden="true" className="mx-auto h-px w-[90%] bg-slate-300 transition-colors duration-300 dark:bg-zinc-800" />

            {/* ===== LIBRARY AUDITING (RFID): full-width wrapper with moving background text ===== */}
            <div className="relative isolate overflow-hidden">
                <DesktopMarquee rows={rfidRows} />

                <section className="relative z-10 mx-auto flex w-[90%] flex-col items-center justify-between gap-8 py-8 sm:gap-10 sm:py-12 lg:min-h-screen lg:flex-row-reverse lg:gap-16">
                    {/* Text side (right on desktop) */}
                    <div className="w-full lg:w-2/5">
                        <h1 className="font-harmond text-3xl font-black italic tracking-tight text-gray-900 transition-colors duration-300 dark:text-zinc-100 sm:text-5xl xl:text-7xl">
                            “Library Auditing System”
                        </h1>
                        <p className="mt-6 text-base leading-relaxed text-gray-600 transition-colors duration-300 dark:text-zinc-400 sm:text-lg xl:text-xl">
                            Complete food delivery platform with restaurant management, order tracking, and user authentication. Responsive design with comprehensive ordering system using
                            Java Servlets,HTML5 & CSS3 .
                        </p>

                        <div className="mt-6 sm:mt-8">
                            <Link
                                to="/projects/rfid"
                                className="antialiased inline-flex items-center rounded-full bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 active:scale-95 sm:px-8 sm:py-3.5 sm:text-lg"
                            >
                                Visit
                            </Link>
                        </div>

                        <MobileMarquee row1="Library Auditing" row2="RFID System" />
                    </div>

                    {/* Video side (left on desktop) */}
                    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-2xl ring-1 ring-slate-200 transition-all duration-500 hover:scale-[1.02] dark:border-zinc-800 dark:ring-zinc-800 lg:w-3/5">
                        <video
                            src="/rfid.mp4"
                            poster="/images/food.png"
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            className="aspect-video w-full object-cover"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </section>
            </div>

            <div aria-hidden="true" className="mx-auto h-px w-[90%] bg-slate-300 transition-colors duration-300 dark:bg-zinc-800" />

            <section className="mx-auto flex w-[90%] flex-col items-center justify-center py-12 text-center sm:py-16 lg:min-h-screen">
                <h2 className="text-3xl font-extrabold italic tracking-tight text-gray-900 transition-colors duration-300 dark:text-zinc-100 sm:text-5xl xl:text-7xl">
                    “Want to see more projects?”
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-600 transition-colors duration-300 dark:text-zinc-400 sm:text-lg xl:text-xl">
                    This is just a glimpse of what I've built. Explore my full collection of web, mobile, and hardware projects.
                </p>
                <Link
                    to="/projects"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-700 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 active:scale-95 sm:text-lg"
                >
                    Click here
                    <span aria-hidden="true">→</span>
                </Link>
            </section>
        </>
    )
}

export default Featured
