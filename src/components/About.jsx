const About = () => {
  return (
    <div className="flex w-full flex-col justify-between gap-8 px-6 py-8 sm:px-10 md:flex-row md:items-center md:gap-10 md:px-12">
      <div className="w-full md:mt-16 md:min-w-0 md:flex-1 2xl:ml-50 2xl:mt-42">
        <h1 className="font-manuscribe text-3xl font-extrabold italic leading-[1.1] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl xl:text-6xl">“About me”</h1>
        <p className="mt-5 text-lg leading-relaxed sm:text-xl lg:text-2xl">
          I’m Om, a final-year Information Technology student who has completed{' '}
          <span className="underline decoration-sky-500">CDAC training</span>{' '}
          and builds full-stack applications from the ground up. I work across
          the stack: <span className="underline decoration-pink-500">React on the front end</span>, Java,{' '}
          <span className="uppercase underline decoration-pink-500">Spring Boot</span>,
          and <span className="uppercase underline decoration-sky-500">.NET</span> on the back end, backed by solid DSA and database
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
      <div className="mx-auto w-full max-w-[32rem] md:mt-10 md:w-[45%] md:max-w-[36rem] md:shrink-0 2xl:mr-50 2xl:mt-25 2xl:w-[36rem]">
        <img src="/images/green0m.jpeg" alt="Om Raut" className="h-auto w-full rounded-xl object-cover" />
      </div>
    </div>
  )
}

export default About
