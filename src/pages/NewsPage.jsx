import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SEO } from '@/components/SEO'
import { ShareButtons } from '@/components/ShareButtons'
import { HiOutlineArrowLeft, HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2'
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

const MOCK_CONTENT = `
Подробности события и комментарии экспертов. Следите за развитием ситуации на нашем портале.

В ходе мероприятия были обсуждены ключевые вопросы развития региона. Участники отметили важность совместной работы для достижения поставленных целей.

По словам представителей, данная инициатива позволит улучшить качество жизни жителей республики и создать новые возможности для развития.

Напомним, что ранее в этом году уже были предприняты значительные шаги в данном направлении. Результаты работы будут подведены в конце года.
`

// Mock данные
const MOCK_NEWS = Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    title: MOCK_TITLES[i % MOCK_TITLES.length],
    description: 'Подробности события и комментарии экспертов. Следите за развитием ситуации на нашем портале.',
    content: MOCK_CONTENT,
    link: `https://example.com/news/${i + 1}`,
    image: `https://placehold.co/800x450/1e293b/white?text=Новость+${i + 1}`,
    category: ['Общество', 'Экономика', 'Спорт', 'Культура', 'Политика'][i % 5],
    pubDate: new Date(Date.now() - i * 3600000).toISOString(),
    source: i % 2 === 0 ? 'izhlife' : 'susanin'
}))

const sourceNames = {
    izhlife: 'IzhLife',
    susanin: 'Сусанин'
}

export function NewsPage() {
    const { id } = useParams()
    const [news, setNews] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true)

            try {
                const response = await fetch(`${API_URL}?id=${id}`)
                if (!response.ok) throw new Error('API недоступен')

                const data = await response.json()
                const enriched = enrichNewsWithTags([data.news])[0]
                setNews(enriched)
            } catch {
                // Mock: ищем по ID
                const found = MOCK_NEWS.find(item => item.id === id)
                if (found) {
                    const enriched = enrichNewsWithTags([found])[0]
                    setNews(enriched)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [id])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (loading) {
        return (
            <div className="mx-auto max-w-3xl animate-pulse">
                <div className="mb-4 h-6 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mb-4 h-10 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mb-6 aspect-video rounded-lg bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-3">
                    <div className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>
        )
    }

    if (!news) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                    Новость не найдена
                </p>
                <Link
                    to="/"
                    className="text-amber-500 hover:text-amber-600"
                >
                    Вернуться на главную
                </Link>
            </div>
        )
    }

    const currentUrl = `${window.location.origin}/news/${id}`

    return (
        <>
            <SEO
                title={news.title}
                description={news.description}
                url={`/news/${id}`}
            />

            <article className="mx-auto max-w-3xl">
                {/* Навигация */}
                <Link
                    to="/"
                    className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-500 dark:text-gray-400"
                >
                    <HiOutlineArrowLeft className="h-4 w-4" />
                    Назад к новостям
                </Link>

                {/* Мета */}
                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded bg-amber-100 px-2 py-1 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        {news.category}
                    </span>
                    <time className="text-gray-500 dark:text-gray-400">
                        {formatDate(news.pubDate)}
                    </time>
                </div>

                {/* Заголовок */}
                <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    {news.title}
                </h1>

                {/* Изображение */}
                {news.image && (
                    <div className="mb-6 overflow-hidden rounded-lg">
                        <img
                            src={news.image}
                            alt={news.title}
                            className="h-auto w-full object-cover"
                        />
                    </div>
                )}

                {/* Контент */}
                <div className="prose prose-gray mb-8 max-w-none dark:prose-invert">
                    {(news.content || news.description).split('\n').filter(p => p.trim()).map((paragraph, i) => (
                        <p key={i} className="mb-4 text-gray-700 dark:text-gray-300">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Теги */}
                {news.tags && news.tags.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                        {news.tags.map((tag) => (
                            <Link
                                key={tag}
                                to={`/tag/${encodeURIComponent(tag)}`}
                                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-amber-100 hover:text-amber-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-amber-900/30 dark:hover:text-amber-400"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Поделиться */}
                <div className="mb-6 flex items-center gap-3 border-t border-b border-gray-200 py-4 dark:border-gray-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Поделиться:</span>
                    <ShareButtons url={currentUrl} title={news.title} />
                </div>

                {/* Источник */}
                <div className="rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800">
                    <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                        Источник: {sourceNames[news.source] || news.source}
                    </p>
                    <a
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-amber-500 hover:text-amber-600"
                    >
                        <HiOutlineArrowTopRightOnSquare className="h-3 w-3" />
                        Читать оригинал на сайте источника
                    </a>
                </div>
            </article>
        </>
    )
}
