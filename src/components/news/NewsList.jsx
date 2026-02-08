import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { NewsCard } from './NewsCard'

export function NewsList({ news, loading, loadingMore, hasMore, error, onLoadMore }) {
    const observerRef = useRef(null)
    const loadMoreRef = useRef(null)

    // Intersection Observer для бесконечной прокрутки
    useEffect(() => {
        if (loading || !hasMore || !onLoadMore) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loadingMore) {
                    onLoadMore()
                }
            },
            { threshold: 0.1 }
        )

        observerRef.current = observer

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current)
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [loading, loadingMore, hasMore, onLoadMore])

    if (loading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                        <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
                        <div className="p-4">
                            <div className="mb-2 h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                            <div className="mb-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
                            <div className="mb-3 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                            <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
                <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
        )
    }

    if (news.length === 0) {
        return (
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
                <p className="text-gray-600 dark:text-gray-400">
                    Новости не найдены
                </p>
            </div>
        )
    }

    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {news.map((item) => (
                    <NewsCard key={item.id} news={item} />
                ))}
            </div>

            {/* Триггер для подгрузки */}
            {hasMore && (
                <div ref={loadMoreRef} className="mt-8 flex justify-center">
                    {loadingMore ? (
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            <span>Загрузка...</span>
                        </div>
                    ) : (
                        <div className="h-10" />
                    )}
                </div>
            )}

            {!hasMore && news.length > 0 && (
                <p className="mt-8 text-center text-sm text-gray-400 dark:text-gray-500">
                    Все новости загружены
                </p>
            )}
        </>
    )
}

NewsList.propTypes = {
    news: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    loadingMore: PropTypes.bool,
    hasMore: PropTypes.bool,
    error: PropTypes.string,
    onLoadMore: PropTypes.func
}
