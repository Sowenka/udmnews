import { useState, useEffect } from 'react'
import { HiOutlineFire } from 'react-icons/hi2'

const POPULAR_CACHE_KEY = 'popular_news_cache'
const CACHE_TIME = 15 * 60 * 1000 // 15 минут

// Mock данные популярных новостей
const MOCK_POPULAR = [
    {
        id: 'p1',
        title: 'В Ижевске открылся новый спортивный комплекс',
        link: 'https://example.com/news/p1',
        views: 15420
    },
    {
        id: 'p2',
        title: 'Удмуртия вошла в топ-10 регионов по качеству жизни',
        link: 'https://example.com/news/p2',
        views: 12350
    },
    {
        id: 'p3',
        title: 'Новые маршруты общественного транспорта запустят в марте',
        link: 'https://example.com/news/p3',
        views: 9870
    },
    {
        id: 'p4',
        title: 'Фестиваль удмуртской культуры пройдёт в выходные',
        link: 'https://example.com/news/p4',
        views: 8540
    },
    {
        id: 'p5',
        title: 'Ижевский зоопарк объявил о пополнении',
        link: 'https://example.com/news/p5',
        views: 7230
    }
]

export function PopularNews() {
    const [popular, setPopular] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPopular = async () => {
            // Проверяем кэш
            try {
                const cached = localStorage.getItem(POPULAR_CACHE_KEY)
                if (cached) {
                    const { data, timestamp } = JSON.parse(cached)
                    if (Array.isArray(data) && Date.now() - timestamp < CACHE_TIME) {
                        setPopular(data)
                        setLoading(false)
                        return
                    }
                }
            } catch {
                localStorage.removeItem(POPULAR_CACHE_KEY)
            }

            try {
                const response = await fetch('/api/popular.php')
                if (!response.ok) throw new Error('API недоступен')

                const data = await response.json()

                localStorage.setItem(POPULAR_CACHE_KEY, JSON.stringify({
                    data: data.news,
                    timestamp: Date.now()
                }))

                setPopular(data.news)
            } catch {
                // Используем mock данные
                setPopular(MOCK_POPULAR)
            } finally {
                setLoading(false)
            }
        }

        fetchPopular()
    }, [])

    if (loading) {
        return (
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                ))}
            </div>
        )
    }

    if (!popular.length) return null

    return (
        <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                <HiOutlineFire className="h-4 w-4 text-amber-500" />
                Популярное
            </h3>

            <ul className="space-y-2">
                {popular.map((item, index) => (
                    <li key={item.id}>
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex gap-2 text-sm"
                        >
                            <span className="shrink-0 font-medium text-amber-500">
                                {index + 1}
                            </span>
                            <span className="line-clamp-2 text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                                {item.title}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
