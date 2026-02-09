import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Weather } from '@/components/Weather'
import { Currency } from '@/components/Currency'
import { DateDisplay } from '@/components/DateDisplay'
import { SearchBar } from '@/components/SearchBar'

export function Header({ theme, toggleTheme, onMenuClick }) {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="relative flex items-center justify-between px-4 py-4 lg:justify-start lg:gap-4">
                {/* Burger menu (mobile only) */}
                <button
                    onClick={onMenuClick}
                    className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 lg:hidden"
                    aria-label="Открыть меню"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Logo — centered on mobile, left-aligned on desktop */}
                <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
                    <div className="flex items-baseline gap-3">
                        <Link to="/" className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            Новости Удмуртии
                        </Link>
                        <DateDisplay />
                    </div>
                </div>

                {/* Right side — theme toggle on mobile, full controls on desktop */}
                <div className="flex items-center gap-3 lg:ml-auto">
                    <SearchBar />
                    <span className="hidden text-gray-300 dark:text-gray-600 md:block">|</span>
                    <Currency />
                    <span className="hidden text-gray-300 dark:text-gray-600 lg:block">|</span>
                    <Weather />

                    <button
                        onClick={toggleTheme}
                        className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        aria-label="Переключить тему"
                    >
                        {theme === 'light' ? (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {
    theme: PropTypes.string.isRequired,
    toggleTheme: PropTypes.func.isRequired,
    onMenuClick: PropTypes.func.isRequired,
}