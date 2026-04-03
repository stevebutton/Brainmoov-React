import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AssetManager from './pages/AssetManager.jsx'
import { AssetProvider } from './context/AssetContext.jsx'
import './index.css'

const path = window.location.pathname
const isAssetManager = path === '/assets'
const isTreatmentFinder = path === '/treatment-finder'

if (isAssetManager) {
  const root = document.getElementById('root')
  root.style.width = '100%'
  root.style.height = 'auto'
  root.style.overflow = 'visible'
}

function Root() {
  if (isAssetManager) return <AssetManager />
  if (isTreatmentFinder) return <App initialSection="treatment-finder" />
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AssetProvider>
      <Root />
    </AssetProvider>
  </React.StrictMode>,
)
