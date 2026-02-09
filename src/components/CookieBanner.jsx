import { useState } from 'react'
import { Link } from 'react-router-dom'

const COOKIE_CONSENT_KEY = 'cookie_consent'

function getInitialVisibility() {
    if (typeof window === 'undefined') return false
    return !localStorage.getItem(COOKIE_CONSENT_KEY)
}

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(getInitialVisibility)

    const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-3 shadow-lg dark:border-gray-800 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <p className="text-center text-sm text-gray-600 dark:text-gray-300 sm:text-left">
                    На сайте осуществляется обработка файлов cookie для персонализации и повышения удобства
                    пользования сайтом с использованием сервиса веб-аналитики Яндекс.Метрика. Продолжая просмотр сайта, вы соглашаетесь с{' '}
                    <Link
                        to="/privacy"
                        className="text-amber-600 underline hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
                    >
                        Политикой конфиденциальности
                    </Link>
                    {' '}и{' '}
                    <Link
                        to="/cookies"
                        className="text-amber-600 underline hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
                    >
                        Политикой обработки файлов cookie
                    </Link>.
                </p>

                <button
                    onClick={handleAccept}
                    className="shrink-0 rounded-lg bg-amber-500 px-6 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-amber-400"
                >
                    Принимаю
                </button>
            </div>
        </div>
    )
}
