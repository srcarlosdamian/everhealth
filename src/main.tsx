import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { V2App } from './v2/V2App.tsx'
import { V3App } from './v3/V3App.tsx'
import './index.css'

const pathname = typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') : '';
const hash = typeof window !== 'undefined' ? window.location.hash : '';

const isV3Route = pathname.endsWith('/v3') || hash.startsWith('#/v3');
const isV2Route = !isV3Route && (pathname.endsWith('/v2') || hash.startsWith('#/v2'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isV3Route ? <V3App /> : isV2Route ? <V2App /> : <App />}
  </React.StrictMode>,
)
