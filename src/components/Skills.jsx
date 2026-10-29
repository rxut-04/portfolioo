import { Link } from 'react-router-dom'

const skills = [
  { name: 'React', icon: 'react/react-original.svg', route: 'react' },
  { name: 'Java', icon: 'java/java-original.svg', route: 'java' },
  { name: 'Spring Boot', icon: 'spring/spring-original.svg', route: 'spring' },
  { name: '.NET', icon: 'dotnetcore/dotnetcore-original.svg', route: 'net' },
  { name: 'JavaScript', icon: 'javascript/javascript-original.svg', route: 'javascript' },
  { name: 'HTML5', icon: 'html5/html5-original.svg', route: 'html' },
  { name: 'CSS3', icon: 'css3/css3-original.svg', route: 'css' },
  { name: 'Tailwind CSS', icon: 'tailwindcss/tailwindcss-original.svg', route: 'tailwind' },
  { name: 'Bootstrap', icon: 'bootstrap/bootstrap-original.svg', route: 'bootstrap' },
  { name: 'Node.js', icon: 'nodejs/nodejs-original.svg', route: 'node' },
  { name: 'Express', icon: 'express/express-original.svg', route: 'express' },
  { name: 'MongoDB', icon: 'mongodb/mongodb-original.svg', route: 'mongo' },
  { name: 'MySQL', icon: 'mysql/mysql-original.svg', route: 'mysql' },
  { name: 'C#', icon: 'csharp/csharp-original.svg', route: 'csharp' },
  { name: 'Git', icon: 'git/git-original.svg', route: 'git' },
  { name: 'GitHub', icon: 'github/github-original.svg', route: 'github' },
]

const Skills = () => {
  return (
    <section className="flex w-full flex-col justify-between gap-10 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:px-0">
      <div className="w-full lg:min-w-0 lg:flex-1 lg:mt-16 2xl:ml-50 2xl:mt-42">
        <h1 className="font-manuscribe text-3xl font-black italic leading-[1.1] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl xl:text-6xl">
          My Skills
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl xl:text-2xl">
          I build full-stack applications using React, Java, Spring Boot, and
          .NET. My experience also includes front-end development, databases,
          and the tools I use to build and maintain projects.
        </p>
      </div>

      <div aria-label="Technology skills" className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:mt-10 lg:flex-1 2xl:mr-50 2xl:mt-25">
        {skills.map(({ name, icon, route }) => (
          <Link
            key={name}
            to={`/skills/${route}`}
            aria-label={`View ${name} skills`}
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
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Skills
