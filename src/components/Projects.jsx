import { Link } from 'react-router-dom'

const projects = [
  {
    number: '01',
    category: 'Core Infrastructure',
    name: 'Apex — Core Banking Engine',
    description:
      'A high-performance core banking platform with real-time transaction processing, automated fund transfers, deposit & withdrawal management, and live audit ledger verification.',
    technologies: ['React', 'Node.js', 'Core Banking', 'Tailwind CSS'],
    image: '/images/banking-preview.png',
    video: '/banking.mp4',
    link: '/projects/banking',
  },
  {
    number: '02',
    category: 'Clinical Decision AI',
    name: 'MedLink — Safer Clinical Decisions',
    description:
      'An AI-assisted platform that helps medical doctors assess risk, seek second opinions, and make safer clinical decisions. Trusted by 500+ clinical specialists.',
    technologies: ['React', 'Next.js', 'AI/ML', 'Tailwind CSS'],
    image: '/images/medlink-preview.png',
    video: '/medlink.mp4',
    link: '/projects/medlink',
  },
  {
    number: '03',
    category: 'Physical Computing',
    name: 'RFID Library Auditing System',
    description:
      'Real-time physical auditing and circulation platform linking high-frequency RFID hardware scanning with relational backends, automated inventory checks, and student checkout workflows.',
    technologies: ['Java Servlets', 'RFID Hardware', 'MySQL', 'HTML5 & CSS3'],
    image: '/images/food.png',
    video: '/rfid.mp4',
    link: '/projects/rfid',
  },
]

const Projects = () => {
  return (
    <>
      <div className="flex w-full flex-col gap-y-16 pt-6 pb-16 sm:gap-y-24 sm:pt-10 sm:pb-24">
        {projects.map((project, index) => {
          const isVideoOnRight = index === 1

          return (
            <section
              key={project.number}
              aria-labelledby={`project-${project.number}-title`}
              className={`grid w-full grid-cols-1 items-center gap-8 sm:gap-10 lg:gap-12 max-w-7xl mx-auto px-6 sm:px-10 md:px-12 ${
                isVideoOnRight
                  ? 'lg:grid-cols-[45%_55%]'
                  : 'lg:grid-cols-[55%_45%]'
              }`}
            >
              {/* Content Side */}
              <div
                className={`flex flex-col justify-center ${
                  isVideoOnRight ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    {project.number} // {project.category}
                  </span>
                </div>

                <h2
                  id={`project-${project.number}-title`}
                  className="font-harmond mt-2 text-3xl sm:text-4xl lg:text-5xl font-black italic tracking-tight text-gray-900 dark:text-zinc-100"
                >
                  {project.name}
                </h2>

                <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-zinc-400">
                  {project.description}
                </p>

                {/* Tech pills */}
                <ul
                  aria-label={`${project.name} technologies`}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {project.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 font-mono text-xs text-zinc-600 transition-colors dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>

                {/* Minimalist CTA */}
                <div className="mt-7">
                  <Link
                    to={project.link}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-900 bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-zinc-800 hover:-translate-y-0.5 active:scale-95 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer"
                  >
                    <span>View Case Study</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              {/* Video Side */}
              <div
                className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200 bg-zinc-950 shadow-xl transition-all duration-500 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-700 ${
                  isVideoOnRight ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
                }`}
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
                    className="aspect-video w-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.name} project preview`}
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center text-zinc-500">
                    Project preview
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </div>

      {/* Bottom CTA Section */}
      <section className="mb-16 sm:mb-24 mx-auto w-[90%] max-w-5xl rounded-3xl border border-zinc-200 bg-zinc-900 p-8 sm:p-14 text-center text-white dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="font-harmond text-3xl sm:text-5xl font-black italic tracking-tight text-white">
          “Got a project in mind?”
        </h2>
        <p className="mt-3 text-base sm:text-lg text-zinc-400 max-w-md mx-auto">
          Let’s architect and ship something real that users love.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-200 active:scale-95 cursor-pointer"
          >
            <span>Start a conversation</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Projects