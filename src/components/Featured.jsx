
import { Link } from 'react-router-dom'

const Featured = () => {
    return (
        <><div className="mt-12 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                <a
                    href="#featured-medlink"
                    className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-3 text-white shadow-xl shadow-indigo-500/25 ring-1 ring-white/30 transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-2xl hover:shadow-violet-500/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 sm:gap-4 sm:px-8 sm:py-4 motion-reduce:transform-none motion-reduce:transition-none"
                >
                    <span className="italic">Featured Projects</span>
                    <span
                        aria-hidden="true"
                        className="flex size-8 items-center justify-center rounded-full bg-white/20 text-lg transition-transform duration-300 group-hover:translate-y-1 sm:size-10"
                    >
                        ↓
                    </span>
                </a>
            </h1>
        </div>
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
                    <button className="antialiased mt-6 inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 active:scale-95 sm:mt-8 sm:px-8 sm:py-3.5 sm:text-lg">
                        Visit
                    </button>
                </div>

                {/* Image side (landscape) */}
                <div className="w-full overflow-hidden rounded-2xl lg:w-3/5">
                    <img
                        src="/images/medlink-preview.png"
                        alt="MedLink project preview"
                        className="aspect-video w-full object-cover shadow-2xl ring-1 ring-gray-200 transition duration-300 hover:scale-[1.02]"
                    />
                </div>
            </section>

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
                    <button className="antialiased mt-6 inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 active:scale-95 sm:mt-8 sm:px-8 sm:py-3.5 sm:text-lg">
                        Visit
                    </button>
                </div>

                {/* Image side (left on desktop) */}
                <div className="w-full overflow-hidden rounded-2xl lg:w-3/5">
                    <img
                        src="/images/food.png"
                        alt="Food delivery Application"
                        className="aspect-video w-full object-cover shadow-2xl ring-1 ring-gray-200 transition duration-300 hover:scale-[1.02]"
                    />
                </div>
            </section>



            <section className="mx-auto flex w-[90%] flex-col items-center justify-center py-12 text-center sm:py-16 lg:min-h-screen">
                <h2 className="text-3xl font-extrabold italic tracking-tight text-gray-900 sm:text-5xl xl:text-7xl">
                    “Want to see more projects?”
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg xl:text-xl">
                    This is just a glimpse of what I've built. Explore my full collection of web, mobile, and hardware projects.
                </p>
                <Link
                    to="/projects"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 active:scale-95 sm:text-lg"
                >
                    Click here
                    <span aria-hidden="true">→</span>
                </Link>
            </section>


        </>


    )
}

export default Featured
