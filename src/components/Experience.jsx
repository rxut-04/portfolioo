const experiences = [
  {
    role: 'Freelance Full Stack Developer',
    company: 'Self-Employed — Portfolio',
    period: 'Jan 2023 – Present',
    highlights: [
      'Shipped 15+ responsive web apps with real-time features using Next.js, Node.js, WebSockets, PostgreSQL.',
      'Improved Lighthouse performance scores by 30%+ via code splitting, lazy loading, and API caching strategies.',
      'Integrated third-party APIs, webhooks, and OAuth flows for multi-service digital products.',
    ],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'R3Sys Pvt. Ltd.',
    period: 'Jun 2024 – Jul 2024',
    highlights: [
      'Developed modular web features with JavaScript and Java Servlets connected to relational backends.',
      'Enhanced UI responsiveness and form validation for internal service modules.',
    ],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'Calibers Infotech',
    period: 'May 2022 – Jun 2022',
    highlights: [
      'Built customer-facing pages with HTML, CSS, JavaScript, PHP.',
    ],
  },
]

const Experience = () => {
  return (
    <div className="flex w-full flex-col justify-between gap-8 px-6 py-8 sm:px-10 md:flex-row md:items-start md:gap-10 md:px-12">
      <div className="w-full md:mt-16 md:min-w-0 md:flex-1 2xl:ml-50 2xl:mt-42">
        <h1 className="font-manuscribe text-3xl font-black italic leading-[1.1] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl xl:text-6xl">
          “My Experience”
        </h1>
        <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
          A timeline of my professional experience building full-stack applications, optimizing web performance, and delivering real-time digital products.
        </p>

        <div className="mt-10 space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative border-l-2 border-blue-600 pl-6 sm:pl-8 pb-4"
            >
              <div className="absolute -left-[9px] top-1.5 size-4 rounded-full border-2 border-blue-600 bg-white" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {exp.role}
                </h2>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-700">
                  {exp.period}
                </span>
              </div>
              <p className="mt-1 text-sm sm:text-base font-medium text-gray-600">
                {exp.company}
              </p>
              <ul className="mt-3 space-y-2">
                {exp.highlights.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm sm:text-base leading-relaxed text-gray-600"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[32rem] md:sticky md:top-24 md:mt-10 md:w-[45%] md:max-w-[36rem] md:shrink-0 2xl:mr-50 2xl:mt-25 2xl:w-[36rem]">
        <img
          src="/images/green0m.jpeg"
          alt="Om Raut"
          className="h-auto w-full rounded-xl object-cover shadow-lg"
        />
      </div>
    </div>
  )
}

export default Experience
