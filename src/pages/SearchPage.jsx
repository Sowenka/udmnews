import { useSearchParams } from 'react-router-dom'
import { useSearch } from '@/hooks/useSearch'
import { NewsCard } from '@/components/news/NewsCard'
import { SEO } from '@/components/SEO'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

export function SearchPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''
    const { results, loading } = useSearch(query)

    return (
        <>
            <SEO
                title={query ? `Поиск: ${query}` : 'Поиск'}
                description={`Результаты поиска по запросу "${query}" на новостном портале Удмуртии`}
                url={`/search?q=${encodeURIComponent(query)}`}
            />

            <article>
                <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                    {query ? (
                        <>Результаты поиска: <span className="text-amber-500">{query}</span></>
                    ) : (
                        'Поиск'
                    )}
                </h1>

                {loading ? (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                                <div className="mb-4 aspect-video rounded bg-gray-200 dark:bg-gray-700" />
                                <div className="mb-2 h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
                                <div className="mb-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
                                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                            </div>
                        ))}
                    </div>
                ) : !query ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <HiOutlineMagnifyingGlass className="mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
                        <p className="text-gray-500 dark:text-gray-400">
                            Введите запрос для поиска новостей
                        </p>
                    </div>
                ) : results.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <HiOutlineMagnifyingGlass className="mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
                        <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            Ничего не найдено
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            Попробуйте изменить запрос или проверьте написание
                        </p>
                    </div>
                ) : (
                    <>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Найдено: {results.length}
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {results.map((news) => (
                                <NewsCard key={news.id} news={news} />
                            ))}
                        </div>
                    </>
                )}
            </article>
        </>
    )
}
