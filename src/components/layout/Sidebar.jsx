import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { cn } from '@/lib/cn'
import { PopularNews } from '@/components/news/PopularNews'
import {
    HiOutlineNewspaper,
    HiOutlineBuildingLibrary,
    HiOutlineBriefcase,
    HiOutlineUserGroup,
    HiOutlineSparkles,
    HiOutlineTrophy
} from 'react-icons/hi2'

export function Sidebar({ isOpen, onClose }) {
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
                    'fixed left-0 top-0 z-50 h-full w-64 shrink-0 transform border-r border-gray-200 bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900',
                    'lg:fixed lg:top-16 lg:z-40 lg:h-[calc(100vh-4rem)] lg:translate-x-0',
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

                <div className="flex h-full flex-col lg:h-[calc(100vh-4rem)]">
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

                    <div className="flex-1 border-t border-gray-200 p-4 dark:border-gray-800">
                        <PopularNews />
                    </div>

                    <div className="border-t border-gray-200 p-4 dark:border-gray-800">
                        <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                            <Link
                                to="/privacy"
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                Конфиденциальность
                            </Link>
                            <Link
                                to="/cookies"
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                Cookie
                            </Link>
                        </div>

                        <p className="mb-2 text-xs text-gray-400 dark:text-gray-500">
                            Новостной агрегатор Удмуртской Республики. Материалы взяты из открытых источников.
                        </p>

                        <p className="text-xs text-gray-400 dark:text-gray-500">
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