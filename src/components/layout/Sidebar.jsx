import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { cn } from '@/lib/cn'
import { PopularNews } from '@/components/news/PopularNews'
import { useWeather, getWeatherInfo } from '@/hooks/useWeather'
import { useCurrency } from '@/hooks/useCurrency'
import {
    HiOutlineNewspaper,
    HiOutlineBuildingLibrary,
    HiOutlineBriefcase,
    HiOutlineUserGroup,
    HiOutlineSparkles,
    HiOutlineTrophy,
    HiOutlineMagnifyingGlass
} from 'react-icons/hi2'

export function Sidebar({ isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const { weather } = useWeather()
    const { currency } = useCurrency()

    // Блокируем скролл body когда sidebar открыт на мобильных
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery('')
            onClose()
        }
    }

    const today = new Date().toLocaleDateString('ru-RU', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    const categories = [
        { id: 'all', name: 'Все новости', icon: HiOutlineNewspaper },
        { id: 'politics', name: 'Политика', icon: HiOutlineBuildingLibrary },
        { id: 'economy', name: 'Экономика', icon: HiOutlineBriefcase },
        { id: 'society', name: 'Общество', icon: HiOutlineUserGroup },
        { id: 'culture', name: 'Культура', icon: HiOutlineSparkles },
        { id: 'sport', name: 'Спорт', icon: HiOutlineTrophy },
    ]

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-0 z-50 h-[100dvh] w-full shrink-0 flex flex-col transform border-r border-gray-200 bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900',
                    'lg:top-16 lg:z-40 lg:h-[calc(100vh-4rem)] lg:w-64 lg:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-800 lg:hidden">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Меню</span>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto">
                    {/* Мобильная информационная панель */}
                    <div className="border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50 lg:hidden">
                        {/* Дата */}
                        <p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                            {today.charAt(0).toUpperCase() + today.slice(1)}
                        </p>

                        {/* Поиск */}
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="relative">
                                <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Поиск новостей..."
                                    className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                                />
                            </div>
                        </form>

                        {/* Валюты */}
                        {currency && (
                            <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
                                <span className="flex items-center gap-1">
                                    <span className="text-gray-400">$</span>
                                    <span className="font-medium">{currency.usd.value} ₽</span>
                                    {currency.usd.diff !== 0 && (
                                        <span className={currency.usd.diff > 0 ? 'text-green-500' : 'text-red-500'}>
                                            {currency.usd.diff > 0 ? '↑' : '↓'}
                                        </span>
                                    )}
                                </span>
                                <span className="text-gray-300 dark:text-gray-600">|</span>
                                <span className="flex items-center gap-1">
                                    <span className="text-gray-400">€</span>
                                    <span className="font-medium">{currency.eur.value} ₽</span>
                                    {currency.eur.diff !== 0 && (
                                        <span className={currency.eur.diff > 0 ? 'text-green-500' : 'text-red-500'}>
                                            {currency.eur.diff > 0 ? '↑' : '↓'}
                                        </span>
                                    )}
                                </span>
                            </div>
                        )}

                        {weather && weather.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600 dark:text-gray-300">
                                {weather.map((city) => {
                                    const { icon } = getWeatherInfo(city.code)
                                    const temp = city.temp > 0 ? `+${city.temp}` : city.temp
                                    return (
                                        <span key={city.id} className="flex items-center gap-1">
                                            <span className="text-gray-400">{city.name}</span>
                                            <span>{icon}</span>
                                            <span className="font-medium">{temp}°</span>
                                        </span>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    <nav className="p-4">
                        <ul className="space-y-2">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        to={category.id === 'all' ? '/' : `/category/${category.id}`}
                                        onClick={onClose}
                                        className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        <category.icon className="h-5 w-5" />
                                        <span>{category.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="border-t border-gray-200 p-4 dark:border-gray-800">
                        <PopularNews />
                    </div>

                    <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                        <div className="mb-4 flex justify-between gap-4 text-xs">
                            <Link
                                to="/privacy"
                                onClick={onClose}
                                className="text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
                            >
                                Конфиденциальность
                            </Link>
                            <Link
                                to="/cookies"
                                onClick={onClose}
                                className="text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
                            >
                                Cookie
                            </Link>
                        </div>

                        <p className="mb-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                            Новостной агрегатор Удмуртской Республики. Материалы взяты из открытых источников.
                        </p>

                        <p className="flex justify-center items-center text-xs font-medium text-gray-400 dark:text-gray-500">
                            © {new Date().getFullYear()} Новости Удмуртии
                        </p>
                    </div>
                </div>
            </aside>
        </>
    )
}

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}