
import { Link } from 'react-router-dom'

const Featured = () => {
    return (
        <><div className="mt-12 flex flex-col items-center justify-center gap-5 px-4 text-center">
            <div aria-hidden="true" className="h-px w-[90%] max-w-5xl bg-slate-300" />
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                <a
                    href="#featured-first"
                    className="inline-flex rounded-xl border border-blue-200 bg-blue-100 px-5 py-3 italic text-slate-950 transition-colors hover:bg-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:px-7 sm:py-4"
                >
                    Featured Projects
                </a>
            </h1>
            <div aria-hidden="true" className="h-px w-[90%] max-w-5xl bg-slate-300" />
        </div>

            <section id="featured-first" className="mx-auto flex scroll-mt-8 w-[90%] flex-col items-center justify-between gap-8 py-8 sm:gap-10 sm:py-12 lg:min-h-screen lg:flex-row-reverse lg:gap-16">
                {/* Text side (right on desktop) */}
                <div className="w-full lg:w-2/5">
                    <h1 className="text-3xl font-extrabold italic tracking-tight text-gray-900 sm:text-5xl xl:text-7xl">
                        “Apex — Core Banking Engine”
                    </h1>
                    <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg xl:text-xl">
                        A high-performance core banking platform with real-time transaction processing, automated fund transfers, deposit & withdrawal management, and live audit ledger verification.
                    </p>
                    <br />
                    <button className="antialiased mt-6 inline-flex items-center rounded-full bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 active:scale-95 sm:mt-8 sm:px-8 sm:py-3.5 sm:text-lg">
                        Visit
                    </button>
                </div>

                {/* Video side (left on desktop) */}
                <div className="w-full overflow-hidden rounded-2xl lg:w-3/5">
                    <video
                        src="/banking.mp4"
                        poster="/images/banking-preview.png"
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        className="aspect-video w-full object-cover shadow-2xl ring-1 ring-gray-200 transition duration-300 hover:scale-[1.02]"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            <div aria-hidden="true" className="mx-auto h-px w-[90%] bg-slate-300" />
        
            <section id="featured-medlink" className="mx-auto flex scroll-mt-8 w-[90%] flex-col items-center justify-between gap-8 py-8 sm:gap-10 sm:py-12 lg:min-h-screen lg:flex-row lg:gap-16">
                {/* Text side */}
                <div className="w-full lg:w-2/5">
                    <h1 className="text-3xl font-extrabold italic tracking-tight text-gray-900 sm:text-5xl xl:text-7xl">
                        “MedLink — Safer Clinical Decisions”
                    </h1>
                    <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg xl:text-xl">
                        An AI-assisted platform that helps medical doctors assess risk, seek second opinions, and make safer clinical decisions. Trusted by 500+ clinical specialists.
                    </p>
                    <br />
                    <button className="antialiased mt-6 inline-flex items-center rounded-full bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 active:scale-95 sm:mt-8 sm:px-8 sm:py-3.5 sm:text-lg">
                        Visit
                    </button>
                </div>

                {/* Video side (landscape) */}
                <div className="w-full overflow-hidden rounded-2xl lg:w-3/5">
                    <video
                        src="/medlink.mp4"
                        poster="/images/medlink-preview.png"
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        className="aspect-video w-full object-cover shadow-2xl ring-1 ring-gray-200 transition duration-300 hover:scale-[1.02]"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            <div aria-hidden="true" className="mx-auto h-px w-[90%] bg-slate-300" />

            <section className="mx-auto flex w-[90%] flex-col items-center justify-between gap-8 py-8 sm:gap-10 sm:py-12 lg:min-h-screen lg:flex-row-reverse lg:gap-16">
                {/* Text side (right on desktop) */}
                <div className="w-full lg:w-2/5">
                    <h1 className="text-3xl font-extrabold italic tracking-tight text-gray-900 sm:text-5xl xl:text-7xl">
                        “Food Delivery App”
                    </h1>
                    <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg xl:text-xl">
                        Complete food delivery platform with restaurant management, order tracking, and user authentication. Responsive design with comprehensive ordering system using
                        Java Servlets,HTML5 & CSS3 .
                    </p>
                    <br />
                    <button className="antialiased mt-6 inline-flex items-center rounded-full bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 active:scale-95 sm:mt-8 sm:px-8 sm:py-3.5 sm:text-lg">
                        Visit
                    </button>
                </div>

                {/* Video side (left on desktop) */}
                <div className="w-full overflow-hidden rounded-2xl lg:w-3/5">
                    <video
                        src="/rfid.mp4"
                        poster="/images/food.png"
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        className="aspect-video w-full object-cover shadow-2xl ring-1 ring-gray-200 transition duration-300 hover:scale-[1.02]"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            <div aria-hidden="true" className="mx-auto h-px w-[90%] bg-slate-300" />

            <section className="mx-auto flex w-[90%] flex-col items-center justify-center py-12 text-center sm:py-16 lg:min-h-screen">
                <h2 className="text-3xl font-extrabold italic tracking-tight text-gray-900 sm:text-5xl xl:text-7xl">
                    “Want to see more projects?”
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg xl:text-xl">
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
