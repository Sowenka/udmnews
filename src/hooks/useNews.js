import { useState, useEffect, useCallback } from 'react'
import { enrichNewsWithTags } from '@/lib/extractTags'

const API_URL = '/api/news.php'
const ITEMS_PER_PAGE = 12

// Mock заголовки для более реалистичных данных
const MOCK_TITLES = [
    'Бречалов встретился с жителями Ижевска на форуме',
    'В Глазове открылся новый цех на ЧМЗ',
    'УдГУ вошёл в топ-100 вузов России по качеству образования',
    'Зенит-Ижевск одержал победу в домашнем матче',
    'Благоустройство набережной Ижевского пруда завершат к лету',
    'В Сарапуле отремонтируют исторический центр города',
    'Правительство выделило средства на развитие туризма',
    'Концерн Калашников представил новую продукцию',
    'В Воткинске построят новую поликлинику',
    'Транспортная реформа в Ижевске: новые маршруты'
]

// Mock данные для разработки без PHP
const MOCK_NEWS = Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    title: MOCK_TITLES[i % MOCK_TITLES.length],
    description: 'Подробности события и комментарии экспертов. Следите за развитием ситуации на нашем портале.',
    link: `https://example.com/news/${i + 1}`,
    image: `https://placehold.co/600x400/1e293b/white?text=Новость+${i + 1}`,
    category: ['Общество', 'Экономика', 'Спорт', 'Культура', 'Политика'][i % 5],
    pubDate: new Date(Date.now() - i * 3600000).toISOString(),
    source: i % 2 === 0 ? 'izhlife' : 'susanin'
}))

export function useNews(category = null) {
    const [news, setNews] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [error, setError] = useState(null)

    const filterByCategory = useCallback((items, cat) => {
        if (!cat || cat === 'all') return items
        return items.filter(item =>
            item.category.toLowerCase().includes(cat.toLowerCase())
        )
    }, [])

    const fetchNews = useCallback(async (pageNum, isLoadMore = false) => {
        if (isLoadMore) {
            setLoadingMore(true)
        } else {
            setLoading(true)
        }
        setError(null)

        try {
            const response = await fetch(`${API_URL}?page=${pageNum}&limit=${ITEMS_PER_PAGE}`)

            if (!response.ok) {
                throw new Error('API недоступен')
            }

            const data = await response.json()

            // Добавляем теги к новостям из API
            let enriched = enrichNewsWithTags(data.news || [])
            let filtered = filterByCategory(enriched, category)

            if (isLoadMore) {
                setNews(prev => [...prev, ...filtered])
            } else {
                setNews(filtered)
            }

            setHasMore(data.hasMore)
        } catch {
            // В dev режиме используем mock данные
            const start = (pageNum - 1) * ITEMS_PER_PAGE
            const end = start + ITEMS_PER_PAGE
            // Добавляем теги к mock данным
            let enriched = enrichNewsWithTags(MOCK_NEWS.slice(start, end))
            let filtered = filterByCategory(enriched, category)

            if (isLoadMore) {
                setNews(prev => [...prev, ...filtered])
            } else {
                setNews(filtered)
            }

            setHasMore(end < MOCK_NEWS.length)
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }, [category, filterByCategory])

    // Загрузка первой страницы при изменении категории
    useEffect(() => {
        setPage(1)
        setNews([])
        setHasMore(true)
        fetchNews(1, false)
    }, [category, fetchNews])

    // Функция для подгрузки следующей страницы
    const loadMore = useCallback(() => {
        if (!loadingMore && hasMore) {
            const nextPage = page + 1
            setPage(nextPage)
            fetchNews(nextPage, true)
        }
    }, [page, loadingMore, hasMore, fetchNews])

    return { news, loading, loadingMore, hasMore, error, loadMore }
}
