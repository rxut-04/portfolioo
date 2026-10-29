import { Link } from 'react-router-dom'

const SkillPage = ({
  name = '',
  icon = '',
  description = '',
  areas = [],
  contribution = '',
  projects = [],
}) => {
  return (
    <div className="w-full px-6 py-10 sm:px-10 md:px-12 lg:py-16">
      <section className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-12">
        <div className="w-full min-w-0 lg:flex-1 2xl:ml-50">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Skill spotlight
          </p>
          <h1 className="mt-3 break-words text-4xl font-extrabold italic leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {name}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
            {description}
          </p>
        </div>

        {icon && (
          <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 shadow-sm sm:max-w-sm lg:flex-1 2xl:mr-50">
            <img
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`}
              alt={`${name} logo`}
              className="size-full object-contain"
            />
          </div>
        )}
      </section>

      <section className="mt-12 grid gap-8 border-t border-slate-200 pt-8 lg:grid-cols-2 2xl:mx-50">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-gray-900">How I use it</h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
            {description}
          </p>
        </div>
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-gray-900">What I work on</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {areas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-gray-900">My contribution</h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
            {contribution}
          </p>
        </div>
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-gray-900">Projects using it</h2>
          {projects.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {projects.map((project) => (
                <li key={project.number}>
                  <Link
                    to={`/projects#project-${project.number}-title`}
                    className="break-words font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
              No project using {name} is listed in the project showcase yet.
            </p>
          )}
        </div>
      </section>

      <div className="mt-10 2xl:mx-50">
        <Link
          to="/skills"
          className="inline-flex rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Back to skills
        </Link>
      </div>
    </div>
  )
}

export default SkillPage
