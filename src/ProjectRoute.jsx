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
import ReactSkill from './skills/React'
import JavaSkill from './skills/Java'
import SpringSkill from './skills/Spring'
import NetSkill from './skills/Net'
import JavascriptSkill from './skills/Javascript'
import NodeSkill from './skills/Node'
import MongoSkill from './skills/Mongo'
import MysqlSkill from './skills/Mysql'
import GitSkill from './skills/Git'

const SiteLayout = () => {
  return (
    <div className="flow-root relative min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  )
}

const ProjectRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<App />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="skills/react" element={<ReactSkill />} />
          <Route path="skills/java" element={<JavaSkill />} />
          <Route path="skills/spring" element={<SpringSkill />} />
          <Route path="skills/net" element={<NetSkill />} />
          <Route path="skills/javascript" element={<JavascriptSkill />} />
          <Route path="skills/node" element={<NodeSkill />} />
          <Route path="skills/mongo" element={<MongoSkill />} />
          <Route path="skills/mysql" element={<MysqlSkill />} />
          <Route path="skills/git" element={<GitSkill />} />
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
