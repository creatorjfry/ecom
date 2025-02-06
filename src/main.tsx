import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PersonProvider } from './components/context/PersonContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersonProvider>
    <App />
    </PersonProvider>
  </StrictMode>,
)
