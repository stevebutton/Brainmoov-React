import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AssetManager from './pages/AssetManager.jsx'
import TreatmentFinderApp from './pages/TreatmentFinderApp.jsx'
import { AssetProvider } from './context/AssetContext.jsx'
import './index.css'

const path = window.location.pathname
const isAssetManager = path === '/assets'
const isTreatmentFinder = path === '/treatment-finder'
const isStandalonePage = isAssetManager || isTreatmentFinder

if (isStandalonePage) {
  // Reset root to full-page scrollable layout for standalone pages
  const root = document.getElementById('root')
  root.style.position = 'relative'
  root.style.top = 'auto'
  root.style.left = 'auto'
  root.style.transform = 'none'
  root.style.width = '100%'
  root.style.height = 'auto'
  root.style.overflow = 'visible'
  document.body.style.overflow = 'auto'
  document.body.style.height = 'auto'
} else {
  // Scale the 1280×720 canvas to fit the current viewport, maintaining aspect ratio
  const updateScale = () => {
    const scale = Math.min(
      window.innerWidth / 1280,
      window.innerHeight / 720
    )
    document.documentElement.style.setProperty('--scale', scale)
  }
  updateScale()
  window.addEventListener('resize', updateScale)
}

function Root() {
  if (isAssetManager) return <AssetManager />
  if (isTreatmentFinder) return <TreatmentFinderApp />
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AssetProvider>
      <Root />
    </AssetProvider>
  </React.StrictMode>,
)
