import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BergApp from './BergApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BergApp />
  </StrictMode>,
)
