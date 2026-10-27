const About = () => {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 py-10 sm:px-10 sm:py-14 md:flex-row md:gap-8 lg:gap-14 lg:px-12">
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-extrabold italic leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          About me
        </h1>
        <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg lg:text-xl">
          I’m Om, a final-year Information Technology student who has completed{' '}
          <span className="underline decoration-sky-500">CDAC training</span>{' '}
          and builds full-stack applications from the ground up. I work across
          the stack: <span className="underline decoration-pink-500">React on
          the front end</span>, Java,{' '}
          <span className="underline decoration-pink-500">Spring Boot</span>,
          and .NET on the back end, backed by solid DSA and database
          fundamentals. I like turning an idea into something real that people
          can use, and I’m looking for an opportunity where I can build, learn
          fast, and contribute from day one.
        </p>
        <div className="relative group inline-block">
          <button
            onClick={() => window.open('/cdac-certificate.pdf', '_blank', 'noopener,noreferrer')}
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-base sm:text-lg lg:text-xl font-semibold text-white shadow-lg shadow-sky-500/30 transition duration-300 hover:bg-sky-600 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 cursor-pointer"
          >
            Click here
          </button>

          <span className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
            Check my CDAC certificate
            <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </span>
        </div>


      </div>
      <div className="w-full max-w-md md:w-1/2 md:max-w-none">
        <img src="/images/green0m.jpeg" alt="Om Raut" className="aspect-square w-full rounded-2xl object-cover shadow-lg sm:rounded-3xl" />
      </div>
    </section>
  )
}

export default About
