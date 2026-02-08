import { useParams } from 'react-router-dom'
import { useNews } from '@/hooks/useNews'
import { NewsList } from '@/components/news/NewsList'
import { SEO } from '@/components/SEO'

const categoryNames = {
    politics: 'Политика',
    economy: 'Экономика',
    society: 'Общество',
    culture: 'Культура',
    sport: 'Спорт'
}

const categoryDescriptions = {
    politics: 'Политические новости Удмуртии. Решения властей, законы, выборы и политическая жизнь региона.',
    economy: 'Экономические новости Удмуртской Республики. Бизнес, финансы, промышленность и развитие региона.',
    society: 'Новости общества Удмуртии. События, происшествия, социальная жизнь Ижевска и республики.',
    culture: 'Культурные новости Удмуртии. Мероприятия, выставки, концерты, театры и культурная жизнь.',
    sport: 'Спортивные новости Удмуртии. Соревнования, достижения спортсменов, спортивная жизнь региона.'
}

const categoryFilters = {
    politics: 'полити',
    economy: 'эконом',
    society: 'общество',
    culture: 'культур',
    sport: 'спорт'
}

export function CategoryPage() {
    const { category } = useParams()
    const filter = categoryFilters[category] || category
    const { news, loading, loadingMore, hasMore, error, loadMore } = useNews(filter)

    const title = categoryNames[category] || category
    const description = categoryDescriptions[category] || `Новости категории ${title} в Удмуртии`

    return (
        <>
            <SEO
                title={title}
                description={description}
                url={`/category/${category}`}
            />

            <article>
                <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                    {title}
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
