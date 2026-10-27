const skills = [
  { name: 'React', icon: 'react/react-original.svg' },
  { name: 'Java', icon: 'java/java-original.svg' },
  { name: 'Spring Boot', icon: 'spring/spring-original.svg' },
  { name: '.NET', icon: 'dotnetcore/dotnetcore-original.svg' },
  { name: 'JavaScript', icon: 'javascript/javascript-original.svg' },
  { name: 'HTML5', icon: 'html5/html5-original.svg' },
  { name: 'CSS3', icon: 'css3/css3-original.svg' },
  { name: 'Tailwind CSS', icon: 'tailwindcss/tailwindcss-original.svg' },
  { name: 'Bootstrap', icon: 'bootstrap/bootstrap-original.svg' },
  { name: 'Node.js', icon: 'nodejs/nodejs-original.svg' },
  { name: 'Express', icon: 'express/express-original.svg' },
  { name: 'MongoDB', icon: 'mongodb/mongodb-original.svg' },
  { name: 'MySQL', icon: 'mysql/mysql-original.svg' },
  { name: 'C#', icon: 'csharp/csharp-original.svg' },
  { name: 'Git', icon: 'git/git-original.svg' },
  { name: 'GitHub', icon: 'github/github-original.svg' },
]

const Skills = () => {
  return (
    <section className="flex flex-col justify-between gap-10 px-6 py-12 sm:px-10 lg:flex-row lg:px-0">
      <div className="lg:ml-50 lg:mt-42">
        <h1 className="text-3xl font-extrabold italic leading-[1.1] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl xl:text-6xl">
          My Skills
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl xl:text-2xl">
          I build full-stack applications using React, Java, Spring Boot, and
          .NET. My experience also includes front-end development, databases,
          and the tools I use to build and maintain projects.
        </p>
      </div>

      <div
        aria-label="Technology skills"
        className="grid grid-cols-4 gap-3 sm:gap-4 lg:mr-50 lg:mt-25"
      >
        {skills.map(({ name, icon }) => (
          <div
            key={name}
            className="flex aspect-square min-w-0 flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-3"
          >
            <img
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`}
              alt={`${name} logo`}
              loading="lazy"
              className="size-8 object-contain sm:size-10 lg:size-12"
            />
            <span className="text-center text-xs font-medium text-gray-700 sm:text-sm">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
