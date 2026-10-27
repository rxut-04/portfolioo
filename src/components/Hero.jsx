const Hero = () => {
  return (
    <div className="flex gap-20 ml-60 justify justify-between">


      <div className='mt-70'>
        <h1 className='italic font stroke-mist-800 text-5xl font-bold'>“Hi, I’m Om Raut
            <br />Full-Stack Developer”</h1>

        <br />
        <p className="text-lg leading-relaxed">Final-year IT student and CDAC graduate. I build web applications with React, Java, and Spring Boot,<br /> backed by solid DSA and database fundamentals. Looking for a developer role where <br /> I can learn fast and ship real work.
        </p>

        <br/>

        <button className='bg-indigo-500 hover:bg-indigo-600 ... rounded-xl p-4 text-lg'>
            Register Here
        </button>

      </div>

      <div className="mr-50 mt-25 w-[32rem] shrink-0 sm:w-[36rem]">
        <img src="/images/om.jpeg" alt="Om Raut" className="h-[32rem] w-full rounded-xl object-cover shadow-lg sm:h-[36rem]"/>
      </div>
    </div>
  )
}

export default Hero
