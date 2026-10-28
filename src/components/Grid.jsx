import { Link } from 'react-router-dom'

const Grid = () => {
  const technologies = [
    { name: 'React', icon: 'react/react-original.svg', route: 'react' },
    { name: 'Java', icon: 'java/java-original.svg', route: 'java' },
    { name: 'Spring Boot', icon: 'spring/spring-original.svg', route: 'spring' },
    { name: '.NET', icon: 'dotnetcore/dotnetcore-original.svg', route: 'net' },
    { name: 'JavaScript', icon: 'javascript/javascript-original.svg', route: 'javascript' },
    { name: 'Node.js', icon: 'nodejs/nodejs-original.svg', route: 'node' },
    { name: 'MongoDB', icon: 'mongodb/mongodb-original.svg', route: 'mongo' },
    { name: 'MySQL', icon: 'mysql/mysql-original.svg', route: 'mysql' },
    { name: 'Git', icon: 'git/git-original.svg', route: 'git' },
  ]

  return (
    <section
      aria-label="Full-stack development skills"
      className="flex w-full flex-col items-start justify-between gap-12 px-6 py-12 sm:px-10 lg:ml-8 lg:flex-row lg:items-center lg:gap-16 lg:mr-8 lg:px-0 xl:ml-60 xl:mr-50"
    >
      <div className="max-w-xl">
        <p className="mb-3 text-base font-semibold uppercase tracking-[0.2em] text-indigo-600">
          What I build
        </p>
        <h2 className="mb-5 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          Turning ideas into useful applications
        </h2>
        <p className="text-lg leading-relaxed text-slate-600">
          I create full-stack web applications with React, Java, Spring Boot,
          and .NET—combining thoughtful interfaces, reliable backends, and solid
          database fundamentals.
        </p>
      </div>

      <div className="grid w-full max-w-sm grid-cols-3 gap-3 lg:ml-auto lg:w-auto">
        {technologies.map(({ name, icon, route }) => (
          <Link
            key={name}
            to={`/skills/${route}`}
            aria-label={`View ${name} skills`}
            className="flex aspect-square w-full items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <img
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`}
              alt={`${name} logo`}
              className="size-9 object-contain"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Grid
