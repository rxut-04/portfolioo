import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div className="flex w-full flex-col justify-between gap-8 px-6 py-8 sm:px-10 md:flex-row md:items-center md:gap-10 md:px-12">
      <div className="w-full md:mt-16 md:min-w-0 md:flex-1 2xl:ml-50 2xl:mt-42">
        <h1 className="font-manuscribe text-3xl font-black italic leading-[1.1] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl xl:text-6xl">“Contact me”</h1>
        <p className="mt-5 text-lg leading-relaxed sm:text-xl lg:text-2xl">
          Have a project in mind, a question about my work, or just want to say
          hello? My inbox is always open — I’ll get back to you as soon as I can.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="mailto:oraut9025@gmail.com"
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition duration-300 hover:bg-sky-600 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 cursor-pointer"
          >
            Email Me
          </a>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 active:scale-95 sm:px-8 sm:py-3.5 sm:text-lg"
          >
            See My Work
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[32rem] md:mt-10 md:w-[45%] md:max-w-[36rem] md:shrink-0 2xl:mr-50 2xl:mt-25 2xl:w-[36rem]">
        <img src="/images/om.jpeg" alt="Om Raut" className="h-auto w-full rounded-xl object-cover" />
      </div>
    </div>
  )
}

export default Contact
