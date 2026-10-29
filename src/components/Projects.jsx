import { Link } from 'react-router-dom'

const projects = [
  {
    number: '01',
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
    name: 'Food Delivery App',
    description:
      'Complete food delivery platform with restaurant management, order tracking, and user authentication. Responsive design with comprehensive ordering system using Java Servlets, HTML5 & CSS3.',
    technologies: ['JSP', 'Servlets', 'HTML5', 'CSS3'],
    image: '/images/food.png',
    video: '/rfid.mp4',
    link: '/projects/rfid',
  },
]

const Projects = () => {
  return (
    <>
      <div className="flex w-full flex-col gap-y-12 pt-6 pb-14 sm:gap-y-16 sm:pt-10 sm:pb-20">
        {projects.map((project, index) => {
          // MedLink (index 1) has video on right, content on left
          const isVideoOnRight = index === 1

          return (
            <section
              key={project.number}
              aria-labelledby={`project-${project.number}-title`}
              className={`grid w-full grid-cols-1 items-center gap-6 sm:gap-8 lg:gap-0 ${
                isVideoOnRight
                  ? 'lg:grid-cols-[42%_58%]'
                  : 'lg:grid-cols-[58%_42%]'
              }`}
            >
              {/* Content Side */}
              <div
                className={`flex flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-8 xl:px-12 ${
                  isVideoOnRight ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
                }`}
              >
                <p className="mb-2 text-sm font-semibold tracking-widest text-blue-700">
                  {project.number}
                </p>
                <h2
                  id={`project-${project.number}-title`}
                  className="font-manuscribe mb-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl"
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
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
                <Link
                  to={project.link}
                  className="mt-6 inline-flex w-fit items-center justify-center rounded-full bg-blue-700 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-blue-700/25 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 active:scale-95"
                >
                  Visit Project
                </Link>
              </div>

              {/* Video Side */}
              <div
                className={`relative mx-4 flex aspect-[2/1] w-[calc(100%-2rem)] items-center justify-center overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-slate-200 sm:mx-8 sm:w-[calc(100%-4rem)] lg:mx-0 lg:w-full lg:rounded-3xl ${
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

      {/* Bottom CTA Section with bottom margin */}
      <section className="mb-16 sm:mb-24 bg-gray-900 px-6 py-16 text-center text-white">
        <h2 className="font-manuscribe text-3xl font-bold sm:text-4xl">Got A Project?</h2>
        <p className="mt-3 text-xl text-gray-300">Let&apos;s Build It</p>
      </section>
    </>
  )
}

export default Projects
