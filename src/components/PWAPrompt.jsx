import { usePWA } from '@/hooks/usePWA'
import { HiOutlineDevicePhoneMobile, HiXMark } from 'react-icons/hi2'

export function PWAPrompt() {
    const { showPrompt, isIOS, canInstall, install, dismiss } = usePWA()

    if (!showPrompt || !canInstall) return null

    return (
        <div className="fixed bottom-20 left-4 right-4 z-50 lg:bottom-4 lg:left-auto lg:right-4 lg:w-96">
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700/50 dark:bg-gray-800">
                <button
                    onClick={dismiss}
                    className="absolute right-2 top-2 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    aria-label="Закрыть"
                >
                    <HiXMark className="h-5 w-5" />
                </button>

                <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                        <HiOutlineDevicePhoneMobile className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>

                    <div className="flex-1">
                        <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                            Установить приложение
                        </h3>

                        {isIOS ? (
                            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                                Нажмите{' '}
                                <span className="inline-flex items-center">
                                    <svg className="mx-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                                    </svg>
                                </span>
                                {' '}и выберите «На экран Домой»
                            </p>
                        ) : (
                            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                                Быстрый доступ к новостям без браузера
                            </p>
                        )}

                        {!isIOS && (
                            <div className="flex gap-2">
                                <button
                                    onClick={dismiss}
                                    className="rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                                >
                                    Не сейчас
                                </button>
                                <button
                                    onClick={install}
                                    className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-gray-900 transition-colors hover:bg-amber-400"
                                >
                                    Установить
                                </button>
                            </div>
                        )}

                        {isIOS && (
                            <button
                                onClick={dismiss}
                                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                Понятно
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
