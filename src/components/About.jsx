const About = () => {
  return (
    <div className="flex justify-between">

      <div className='ml-50 mt-42'>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold italic tracking-tight leading-[1.1] text-gray-900">“About me”</h1>
        <br />
        <p className="text-lg leading-relaxed sm:text-xl lg:text-2xl">
          I’m Om, a final-year Information Technology student who has completed <a class="underline decoration-sky-500">CDAC training</a> and builds full-stack applications
          from the ground up. <br /> I work across the stack:
          <a class="underline decoration-pink-500">React on the front end</a>, Java, <a class="underline decoration-pink-500">Spring Boot</a>, and .NET on the back end, <a class="underline decoration-indigo-500">backed by solid DSA 
            and database fundamentals</a><br />. I like turning an idea into something real that people can use,<br />
          and I’m looking for an opportunity where I can build, learn fast, and contribute from day one..</p>
        <br />


        {/* <button className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-base sm:text-lg lg:text-xl font-semibold text-white shadow-lg shadow-sky-500/30 transition duration-300 hover:bg-sky-600 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 cursor-pointer">
          Click here
        </button> */}

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

      <div className="mr-50 mt-25 w-[32rem] shrink-0 sm:w-[36rem]">
        <img src="/images/green0m.jpeg" alt="Om Raut" className="h-[32rem] w-full rounded-xl object-cover sm:h-[36rem]" />
      </div>

    </div>
  )
}

export default About
