const Hero = () => {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 py-10 sm:px-10 sm:py-14 md:flex-row md:gap-8 lg:gap-14 lg:px-12">
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-bold italic leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Hi, I’m Om Raut
          <br />
          Full-Stack Developer
        </h1>
        <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
          Final-year IT student and CDAC graduate. I build web applications
          with React, Java, and Spring Boot, backed by solid DSA and database
          fundamentals. Looking for a developer role where I can learn fast and
          ship real work.
        </p>
        <button className="mt-7 rounded-xl bg-indigo-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-indigo-600 sm:text-lg">
            Register Here
        </button>
      </div>
      <div className="w-full max-w-md md:w-1/2 md:max-w-none">
        <img src="/images/om.jpeg" alt="Om Raut" className="aspect-square w-full rounded-2xl object-cover shadow-lg sm:rounded-3xl" />
      </div>
    </section>
  )
}

export default Hero
