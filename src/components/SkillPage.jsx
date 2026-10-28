import { Link } from 'react-router-dom'

const skills = {
  react: {
    name: 'React',
    icon: 'react/react-original.svg',
    description:
      'I use React to build interactive interfaces from reusable components and keep the UI in sync with application state.',
    areas: ['Reusable components', 'Responsive layouts', 'Client-side navigation'],
    contribution:
      'I built this portfolio with React components, responsive page layouts, and route-based navigation.',
    projects: [
      { number: '01', name: 'MedLink — Safer Clinical Decisions' },
      { number: '02', name: 'Code Debug Visualize' },
      { number: '04', name: 'AI Resume Builder' },
      { number: '05', name: 'Personal Finance Tracker' },
      { number: '08', name: 'Library Audit — RFID System' },
    ],
  },
  java: {
    name: 'Java',
    icon: 'java/java-original.svg',
    description:
      'My Java toolkit includes Core Java and Java Servlets for application logic and server-side web development.',
    areas: ['Core Java', 'Java Servlets', 'JSP'],
    contribution:
      'I work with Core Java and Java Servlets, which are included in the listed stacks for my web application projects.',
    projects: [
      { number: '03', name: 'Food Delivery App' },
      { number: '07', name: 'Startup Community Hub' },
    ],
  },
  spring: {
    name: 'Spring Boot',
    icon: 'spring/spring-original.svg',
    description:
      'I use Spring Boot as part of my full-stack toolkit for backend services and web application development.',
    areas: ['Backend application development', 'Java ecosystem', 'Web services'],
    contribution:
      'Spring Boot is part of the backend stack I work with. I have not listed a project using it in my project showcase yet.',
    projects: [],
  },
  net: {
    name: '.NET',
    icon: 'dotnetcore/dotnetcore-original.svg',
    description:
      'I work with .NET as a backend development platform for building structured application services.',
    areas: ['Backend development', 'Application services', 'C# ecosystem'],
    contribution:
      '.NET is part of the backend toolkit I describe in my portfolio. I have not listed a .NET project in my project showcase yet.',
    projects: [],
  },
  javascript: {
    name: 'JavaScript',
    icon: 'javascript/javascript-original.svg',
    description:
      'I use JavaScript to add application behavior and build interactive experiences across web projects.',
    areas: ['Interactive interfaces', 'Application logic', 'Working with React'],
    contribution:
      'I use JavaScript through React to build the interactive components and navigation in this portfolio.',
    projects: [
      { number: '01', name: 'MedLink — Safer Clinical Decisions' },
      { number: '02', name: 'Code Debug Visualize' },
      { number: '04', name: 'AI Resume Builder' },
      { number: '05', name: 'Personal Finance Tracker' },
      { number: '08', name: 'Library Audit — RFID System' },
    ],
  },
  html: {
    name: 'HTML5',
    icon: 'html5/html5-original.svg',
    description:
      'I use HTML to structure page content and create clear, semantic foundations for web interfaces.',
    areas: ['Semantic page structure', 'Accessible content', 'Web interfaces'],
    contribution:
      'I structure my React pages with semantic HTML elements such as sections, headings, links, and buttons.',
    projects: [
      { number: '03', name: 'Food Delivery App' },
      { number: '07', name: 'Startup Community Hub' },
    ],
  },
  css: {
    name: 'CSS3',
    icon: 'css3/css3-original.svg',
    description:
      'I use CSS to style interfaces, organize layouts, and make pages adapt to different screen sizes.',
    areas: ['Responsive layouts', 'Visual styling', 'Transitions and states'],
    contribution:
      'I style this portfolio with responsive utility classes, layout rules, and interactive visual states.',
    projects: [
      { number: '03', name: 'Food Delivery App' },
      { number: '07', name: 'Startup Community Hub' },
    ],
  },
  tailwind: {
    name: 'Tailwind CSS',
    icon: 'tailwindcss/tailwindcss-original.svg',
    description:
      'I use Tailwind utility classes directly in JSX to build and adjust responsive layouts and visual styles.',
    areas: ['Responsive breakpoints', 'Flex and grid layouts', 'Reusable visual patterns'],
    contribution:
      'I use Tailwind throughout this portfolio to style the pages, cards, buttons, and mobile layouts.',
    projects: [
      { number: '01', name: 'MedLink — Safer Clinical Decisions' },
      { number: '06', name: 'SaaS Business Platform' },
    ],
  },
  bootstrap: {
    name: 'Bootstrap',
    icon: 'bootstrap/bootstrap-original.svg',
    description:
      'I use Bootstrap to create responsive interfaces with its layout utilities and ready-made styling tools.',
    areas: ['Responsive layouts', 'UI styling', 'Frontend development'],
    contribution:
      'Bootstrap is included in the listed technology stack for my AI Resume Builder project.',
    projects: [{ number: '04', name: 'AI Resume Builder' }],
  },
  node: {
    name: 'Node.js',
    icon: 'nodejs/nodejs-original.svg',
    description:
      'I use Node.js to build server-side JavaScript applications and backend functionality for web projects.',
    areas: ['Server-side JavaScript', 'Backend services', 'Application logic'],
    contribution:
      'Node.js appears in the listed technology stacks for my backend-focused projects.',
    projects: [
      { number: '02', name: 'Code Debug Visualize' },
      { number: '05', name: 'Personal Finance Tracker' },
      { number: '08', name: 'Library Audit — RFID System' },
    ],
  },
  express: {
    name: 'Express',
    icon: 'express/express-original.svg',
    description:
      'I use Express with Node.js to structure server-side routes and build web application APIs.',
    areas: ['Server routes', 'API development', 'Node.js applications'],
    contribution:
      'Express is included in the listed technology stack for my Personal Finance Tracker project.',
    projects: [{ number: '05', name: 'Personal Finance Tracker' }],
  },
  mongo: {
    name: 'MongoDB',
    icon: 'mongodb/mongodb-original.svg',
    description:
      'I use MongoDB as a document database option for storing application data in flexible, JSON-like records.',
    areas: ['Document data', 'Database fundamentals', 'Application data'],
    contribution:
      'MongoDB is included in the listed technology stack for my Personal Finance Tracker project.',
    projects: [{ number: '05', name: 'Personal Finance Tracker' }],
  },
  mysql: {
    name: 'MySQL',
    icon: 'mysql/mysql-original.svg',
    description:
      'I use MySQL and relational database concepts to work with structured application data.',
    areas: ['Relational data', 'SQL queries', 'Database fundamentals'],
    contribution:
      'MySQL is one of the database technologies in my skill set. I have not linked a project using it in my project showcase yet.',
    projects: [],
  },
  csharp: {
    name: 'C#',
    icon: 'csharp/csharp-original.svg',
    description:
      'I work with C# in the .NET ecosystem to build application logic and backend software.',
    areas: ['Object-oriented programming', '.NET development', 'Application logic'],
    contribution:
      'C# is part of my .NET backend toolkit. I have not listed a C# project in my project showcase yet.',
    projects: [],
  },
  git: {
    name: 'Git',
    icon: 'git/git-original.svg',
    description:
      'I use Git to track changes, manage project history, and work with branches during development.',
    areas: ['Version control', 'Project history', 'Branch-based workflows'],
    contribution:
      'I use Git to manage the source history of this portfolio and its ongoing updates.',
    projects: [],
  },
  github: {
    name: 'GitHub',
    icon: 'github/github-original.svg',
    description:
      'I use GitHub to host repositories and share source code for my development projects.',
    areas: ['Repository hosting', 'Sharing code', 'Project collaboration'],
    contribution:
      'This portfolio is maintained in a GitHub repository so its code and changes can be shared.',
    projects: [],
  },
}

const SkillPage = ({ skill }) => {
  const { name, icon, description, areas, contribution, projects } = skills[skill]

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

        <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 shadow-sm sm:max-w-sm lg:flex-1 2xl:mr-50">
          <img
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`}
            alt={`${name} logo`}
            className="size-full object-contain"
          />
        </div>
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
