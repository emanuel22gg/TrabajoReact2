import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './features/landing/pages/landing.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> 
  </StrictMode>,
)
