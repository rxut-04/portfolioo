import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import App from './App'
import About from "./components/About"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Experience from "./components/Experience"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Grid from "./components/Grid"
import Skills from "./components/Skills"

const ProjectRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<><Navbar /><Outlet /></>}>
          <Route index element={<App />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experience" element={<Experience />} />
          <Route path="projects" element={<Projects />} />
          <Route path="hero" element={<Hero />} />
          <Route path="grid" element={<Grid />} />
        </Route>
        <Route path="navbar" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default ProjectRoute
