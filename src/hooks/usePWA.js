import { useState, useEffect } from 'react'

const PWA_DISMISSED_KEY = 'pwa_dismissed'
const PWA_INSTALLED_KEY = 'pwa_installed'
const SHOW_DELAY = 30000 // 30 секунд после загрузки
const DISMISS_DAYS = 7 // Не показывать 7 дней после отказа

function getIsIOS() {
    if (typeof window === 'undefined') return false
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

function getIsInstalled() {
    if (typeof window === 'undefined') return false
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
        || window.navigator.standalone === true
    if (isStandalone) {
        localStorage.setItem(PWA_INSTALLED_KEY, 'true')
    }
    return isStandalone
}

export function usePWA() {
    const [installPrompt, setInstallPrompt] = useState(null)
    const [showPrompt, setShowPrompt] = useState(false)
    const [isIOS] = useState(getIsIOS)
    const [isInstalled, setIsInstalled] = useState(getIsInstalled)

    useEffect(() => {
        if (isInstalled) return

        // Проверяем было ли отклонено недавно
        const dismissedAt = localStorage.getItem(PWA_DISMISSED_KEY)
        if (dismissedAt) {
            const dismissedDate = new Date(parseInt(dismissedAt))
            const daysSinceDismiss = (Date.now() - dismissedDate) / (1000 * 60 * 60 * 24)
            if (daysSinceDismiss < DISMISS_DAYS) {
                return
            }
        }

        // Проверяем было ли установлено
        if (localStorage.getItem(PWA_INSTALLED_KEY)) {
            return
        }

        // Для Android/Desktop - ловим событие beforeinstallprompt
        const handleBeforeInstall = (e) => {
            e.preventDefault()
            setInstallPrompt(e)

            // Показываем с задержкой
            setTimeout(() => {
                setShowPrompt(true)
            }, SHOW_DELAY)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstall)

        // Для iOS показываем инструкцию с задержкой
        if (isIOS) {
            setTimeout(() => {
                setShowPrompt(true)
            }, SHOW_DELAY)
        }

        // Отслеживаем установку
        window.addEventListener('appinstalled', () => {
            setIsInstalled(true)
            setShowPrompt(false)
            localStorage.setItem(PWA_INSTALLED_KEY, 'true')
        })

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
        }
    }, [isIOS, isInstalled])

    const install = async () => {
        if (!installPrompt) return false

        installPrompt.prompt()
        const { outcome } = await installPrompt.userChoice

        if (outcome === 'accepted') {
            setIsInstalled(true)
            localStorage.setItem(PWA_INSTALLED_KEY, 'true')
        }

        setInstallPrompt(null)
        setShowPrompt(false)
        return outcome === 'accepted'
    }

    const dismiss = () => {
        localStorage.setItem(PWA_DISMISSED_KEY, Date.now().toString())
        setShowPrompt(false)
    }

    return {
        showPrompt,
        isIOS,
        isInstalled,
        canInstall: !!installPrompt || isIOS,
        install,
        dismiss
    }
}
