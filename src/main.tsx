import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { V2App } from './v2/V2App.tsx'
import './index.css'

const isV2Route =
  typeof window !== 'undefined' &&
  (window.location.pathname.replace(/\/+$/, '').endsWith('/v2') ||
    window.location.hash.startsWith('#/v2'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isV2Route ? <V2App /> : <App />}
  </React.StrictMode>,
)
