import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './auth.css'
import './meter-readings.css'
import './billing-summary.css'
import './tenant-dashboard.css'
import './penalties.css'
import App from './app/App.tsx'
import { AuthProvider } from './modules/auth/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider><App /></AuthProvider>
  </StrictMode>,
)
