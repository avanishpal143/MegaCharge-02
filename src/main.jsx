/**
 * ========================================
 * Main Entry Point
 * Purpose:
 * Mounts the React application and binds
 * the global stylesheet.
 *
 * Developer Notes:
 * Imports standard React hooks and the
 * root App component.
 *
 * ========================================
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

