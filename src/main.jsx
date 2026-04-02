import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AssetManager from './pages/AssetManager.jsx'
import { AssetProvider } from './context/AssetContext.jsx'
import './index.css'

const isAssetManager = window.location.pathname === '/assets'

if (isAssetManager) {
  const root = document.getElementById('root')
  root.style.width = '100%'
  root.style.height = 'auto'
  root.style.overflow = 'visible'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AssetProvider>
      {isAssetManager ? <AssetManager /> : <App />}
    </AssetProvider>
  </React.StrictMode>,
)
