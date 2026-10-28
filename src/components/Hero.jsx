const Hero = () => {
  return (
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
        <button className="mt-6 rounded-xl bg-indigo-500 p-4 text-base text-white transition-colors hover:bg-indigo-600 sm:text-lg">
          Register Here
        </button>
      </div>

      <div className="mx-auto w-full max-w-[32rem] md:mt-10 md:w-[45%] md:max-w-[36rem] md:shrink-0 2xl:mr-50 2xl:mt-22 2xl:w-[36rem]">
        <img src="/images/om.jpeg" alt="Om Raut" className="h-auto w-full rounded-xl object-cover shadow-lg" />
      </div>
    </div>
  )
}

export default Hero
