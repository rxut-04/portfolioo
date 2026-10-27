import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import ProjectRoute from './ProjectRoute.jsx'
import './index.css'

const ab = ReactDOM.createRoot(document.getElementById('root'))
ab.render(
  <StrictMode>
    <ProjectRoute />
  </StrictMode>,
)
