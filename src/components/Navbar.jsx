import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex gap-4 text-xl mt-5 p-4 justify justify-between font-sans font-semibold">

        <div className='ml-50 gap-6 flex'>
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 10C5.48276 10 7.34483 7 7.34483 7C7.34483 7 9.2069 10 11.6897 10C14.1724 10 16.6552 7 16.6552 7C16.6552 7 19.1379 10 21 10" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 17C5.48276 17 7.34483 14 7.34483 14C7.34483 14 9.2069 17 11.6897 17C14.1724 17 16.6552 14 16.6552 14C16.6552 14 19.1379 17 21 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <div >Om Raut</div>
        </div>

        <div className='flex gap-10 mr-50'>
            <div><NavLink to="/">Home</NavLink></div>
            <div><NavLink to="/about">About</NavLink></div>
            <div><NavLink to="/projects">Projects</NavLink></div>
            <div><NavLink to="/skills">Skills</NavLink></div>
            <div><NavLink to="/experience">Experience</NavLink></div>
            <div><NavLink to="/contact">Contact</NavLink></div>
        </div>
    </div>
    
    

  )
}

export default Navbar
