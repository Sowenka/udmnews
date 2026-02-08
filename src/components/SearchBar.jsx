import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2'
import PropTypes from 'prop-types'
import { cn } from '@/lib/cn'

export function SearchBar({ className }) {
    const [query, setQuery] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimmed = query.trim()
        if (trimmed) {
            navigate(`/search?q=${encodeURIComponent(trimmed)}`)
            setIsExpanded(false)
        }
    }

    const handleClear = () => {
        setQuery('')
    }

    return (
        <form onSubmit={handleSubmit} className={cn('relative', className)}>
            {/* Desktop */}
            <div className="hidden md:block">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Поиск новостей..."
                        className="w-48 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-8 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:w-64 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-amber-500 dark:focus:bg-gray-900"
                    />
                    <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    {query && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <HiOutlineXMark className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
                {isExpanded ? (
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Поиск..."
                                autoFocus
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-8 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-amber-500 dark:focus:bg-gray-900"
                            />
                            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <HiOutlineXMark className="h-5 w-5" />
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsExpanded(true)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                        <HiOutlineMagnifyingGlass className="h-5 w-5" />
                    </button>
                )}
            </div>
        </form>
    )
}

SearchBar.propTypes = {
    className: PropTypes.string
}
