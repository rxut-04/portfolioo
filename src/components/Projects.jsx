const projects = [
  {
    number: '01',
    name: 'Apex — Core Banking Engine',
    description:
      'A high-performance core banking platform with real-time transaction processing, automated fund transfers, deposit & withdrawal management, and live audit ledger verification.',
    technologies: ['React', 'Node.js', 'Core Banking', 'Tailwind CSS'],
    image: '/images/banking-preview.png',
    video: '/banking.mp4',
  },
  {
    number: '02',
    name: 'MedLink — Safer Clinical Decisions',
    description:
      'An AI-assisted platform that helps medical doctors assess risk, seek second opinions, and make safer clinical decisions. Trusted by 500+ clinical specialists.',
    technologies: ['React', 'Next.js', 'AI/ML', 'Tailwind CSS'],
    image: '/images/medlink-preview.png',
    video: '/medlink.mp4',
  },
  {
    number: '03',
    name: 'Food Delivery App',
    description:
      'Complete food delivery platform with restaurant management, order tracking, and user authentication. Responsive design with comprehensive ordering system using Java Servlets, HTML5 & CSS3.',
    technologies: ['JSP', 'Servlets', 'HTML5', 'CSS3'],
    image: '/images/food.png',
    video: '/rfid.mp4',
  },
]

const Projects = () => {
  return (
    <>
      <div className="flex w-full flex-col gap-y-8 pt-6 sm:gap-y-12 sm:pt-10">
        {projects.map((project, index) => {
          const imageFirst = index % 2 === 1

          return (
            <section
              key={project.number}
              aria-labelledby={`project-${project.number}-title`}
              className={`grid w-full grid-cols-1 items-center gap-0 ${imageFirst ? 'lg:grid-cols-[70%_30%]' : 'lg:grid-cols-[30%_70%]'}`}
            >
              <div
                className={`flex flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-8 xl:px-12 ${imageFirst ? 'order-2 lg:order-2' : 'order-1'}`}
              >
                <p className="mb-2 text-sm font-semibold tracking-widest text-indigo-600">
                  {project.number}
                </p>
                <h2
                  id={`project-${project.number}-title`}
                  className="mb-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl"
                >
                  {project.name}
                </h2>
                <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                  {project.description}
                </p>
                <ul
                  aria-label={`${project.name} technologies`}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {project.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  disabled
                  title="Live site URL has not been added yet"
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-indigo-400 bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition duration-200 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                >
                  Visit Live Site
                </button>
              </div>
              <div
                className={`relative mx-4 flex aspect-[2/1] w-[calc(100%-2rem)] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 via-white to-indigo-50 shadow-inner ring-1 ring-inset ring-slate-200 sm:mx-8 sm:w-[calc(100%-4rem)] lg:mx-0 lg:w-full lg:rounded-3xl ${imageFirst ? 'order-1 lg:order-1' : 'order-2'}`}
              >
                {project.video ? (
                  <video
                    src={project.video}
                    poster={project.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="size-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.name} project preview`}
                    className="size-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                ) : (
                  <div
                    aria-label={`${project.name} image placeholder`}
                    className="flex size-full items-center justify-center text-gray-500"
                  >
                    Project image
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </div>

      <section className="bg-gray-900 px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-bold sm:text-4xl">Got A Project?</h2>
        <p className="mt-3 text-xl text-gray-300">Let&apos;s Build It</p>
      </section>
    </>
  )
}

export default Projects
