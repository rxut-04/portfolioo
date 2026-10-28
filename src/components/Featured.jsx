


const Featured = () => {
    return (
        <><div className="mt-12 flex flex-col items-center justify-center text-center">
            <h1 className="italic text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Featured Projects
            </h1>
        </div>

            {/* <div className="flex justify-between">
        <div className="mt-100 mb-100 ml-20">
            <h1>Here are my Projects</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque ullam velit debitis minima enim porro distinctio quo optio labore, aliquid quos voluptatem error?</p>
        </div>

        <div className="mt-50"><img src="/images/medlink-preview.png" alt="" /></div>
      </div> */}
            <section className="mx-auto flex min-h-screen w-[90%] flex-col items-center justify-between gap-10 py-12 lg:flex-row lg:gap-16">
                {/* Text side */}
                <div className="w-full lg:w-2/5">
                    <h1 className="italic text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-7xl">
                        “MedLink — Safer Clinical Decisions”
                    </h1>
                    <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg xl:text-xl">
                        An AI-assisted platform that helps medical doctors assess risk, seek second opinions, and make safer clinical decisions. Trusted by 500+ clinical specialists.
                    </p>
                    <br/>
                    <button  className="antialiased mt-8 inline-flex items-center rounded-full bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 active:scale-95 sm:text-lg">
                        Visit
                    </button>
                </div>

                {/* Image side (landscape) */}
                <div className="w-full lg:w-3/5">
                    <img
                        src="/images/medlink-preview.png"
                        alt="MedLink project preview"
                        className="aspect-video w-full rounded-2xl object-cover shadow-2xl ring-1 ring-gray-200 transition duration-300 hover:scale-[1.02]"
                    />
                </div>
            </section>

            <section className="mx-auto flex min-h-screen w-[90%] flex-col items-center justify-between gap-10 py-12 lg:flex-row-reverse lg:gap-16">
                {/* Text side (right on desktop) */}
                <div className="w-full lg:w-2/5">
                    <h1 className="italic text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-7xl">
                        “Food Delivery App”
                    </h1>
                    <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg xl:text-xl">
                        Complete food delivery platform with restaurant management, order tracking, and user authentication. Responsive design with comprehensive ordering system using
                        Java Servlets,HTML5 & CSS3 . 
                    </p>
                    <br/>
                    <button className="antialiased mt-8 inline-flex items-center rounded-full bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 active:scale-95 sm:text-lg">
                        Visit
                    </button>
                </div>

                {/* Image side (left on desktop) */}
                <div className="w-full lg:w-3/5">
                    <img
                        src="/images/food.png"
                        alt="Food delivery Application"
                        className="aspect-video w-full rounded-2xl object-cover shadow-2xl ring-1 ring-gray-200 transition duration-300 hover:scale-[1.02]"
                    />
                </div>
            </section>
        </>


    )
}

export default Featured
