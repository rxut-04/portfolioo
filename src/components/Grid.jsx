const Grid = () => {
  const technologies = [
    { name: 'React', icon: 'react/react-original.svg' },
    { name: 'Java', icon: 'java/java-original.svg' },
    { name: 'Spring Boot', icon: 'spring/spring-original.svg' },
    { name: '.NET', icon: 'dotnetcore/dotnetcore-original.svg' },
    { name: 'JavaScript', icon: 'javascript/javascript-original.svg' },
    { name: 'Node.js', icon: 'nodejs/nodejs-original.svg' },
    { name: 'MongoDB', icon: 'mongodb/mongodb-original.svg' },
    { name: 'MySQL', icon: 'mysql/mysql-original.svg' },
    { name: 'Git', icon: 'git/git-original.svg' },
  ]

  return (
    <section
      aria-label="Full-stack development skills"
      className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-12 px-6 py-12 sm:px-10 sm:py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-12"
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
        {technologies.map(({ name, icon }) => (
          <div
            key={name}
            className="flex aspect-square w-full items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <img
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`}
              alt={`${name} logo`}
              className="size-9 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Grid
