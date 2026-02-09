import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2'
import PropTypes from 'prop-types'
import { cn } from '@/lib/cn'

export function SearchBar({ className }) {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimmed = query.trim()
        if (trimmed) {
            navigate(`/search?q=${encodeURIComponent(trimmed)}`)
            setQuery('')
        }
    }

    const handleClear = () => {
        setQuery('')
    }

    return (
        <form onSubmit={handleSubmit} className={cn('relative hidden md:block', className)}>
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
        </form>
    )
}

SearchBar.propTypes = {
    className: PropTypes.string
}
