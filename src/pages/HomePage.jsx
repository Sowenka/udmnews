import { useNews } from '@/hooks/useNews'
import { NewsList } from '@/components/news/NewsList'
import { SEO } from '@/components/SEO'

export function HomePage() {
    const { news, loading, loadingMore, hasMore, error, loadMore } = useNews()

    return (
        <>
            <SEO
                title="Последние новости"
                description="Свежие новости Удмуртской Республики и Ижевска. Будьте в курсе главных событий региона."
                url="/"
            />

            <article>
                <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                    Актуальные новости
                </h1>

                <NewsList
                    news={news}
                    loading={loading}
                    loadingMore={loadingMore}
                    hasMore={hasMore}
                    error={error}
                    onLoadMore={loadMore}
                />
            </article>
        </>
    )
}
