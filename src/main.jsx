import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Регистрация Service Worker для PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swPath = import.meta.env.BASE_URL + 'sw.js'
        navigator.serviceWorker.register(swPath).catch(() => {
            // Service Worker не зарегистрирован
        })
    })
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)