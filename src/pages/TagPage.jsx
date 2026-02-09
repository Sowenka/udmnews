import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { NewsCard } from '@/components/news/NewsCard'
import { SEO } from '@/components/SEO'
import { HiOutlineTag } from 'react-icons/hi2'
import { enrichNewsWithTags } from '@/lib/extractTags'

const BASE_PATH = import.meta.env.BASE_URL || '/'
const API_URL = `${BASE_PATH}api/news.php`

// Mock заголовки
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

export function TagPage() {
    const { tag } = useParams()
    const decodedTag = decodeURIComponent(tag)
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchByTag = useCallback(async () => {
        setLoading(true)

        try {
            const response = await fetch(`${API_URL}?tag=${encodeURIComponent(decodedTag)}`)
            if (!response.ok) throw new Error('API недоступен')

            const data = await response.json()
            setNews(enrichNewsWithTags(data.news || []))
        } catch {
            // Mock: добавляем теги и фильтруем
            const enriched = enrichNewsWithTags(MOCK_NEWS)
            const filtered = enriched.filter(item =>
                item.tags?.some(t => t.toLowerCase() === decodedTag.toLowerCase())
            )
            setNews(filtered)
        } finally {
            setLoading(false)
        }
    }, [decodedTag])

    useEffect(() => {
        fetchByTag()
    }, [fetchByTag])

    return (
        <>
            <SEO
                title={`#${decodedTag}`}
                description={`Новости Удмуртии по теме "${decodedTag}"`}
                url={`/tag/${tag}`}
            />

            <article>
                <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                    <HiOutlineTag className="h-7 w-7 text-amber-500" />
                    <span className="text-amber-500">#{decodedTag}</span>
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
                ) : news.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <HiOutlineTag className="mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
                        <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            Новостей не найдено
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            По тегу #{decodedTag} пока нет новостей
                        </p>
                    </div>
                ) : (
                    <>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Найдено: {news.length}
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {news.map((item) => (
                                <NewsCard key={item.id} news={item} />
                            ))}
                        </div>
                    </>
                )}
            </article>
        </>
    )
}
