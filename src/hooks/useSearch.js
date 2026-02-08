import { useState, useEffect, useCallback } from 'react'
import { enrichNewsWithTags } from '@/lib/extractTags'

const API_URL = '/api/search.php'

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

// Mock данные — те же что в useNews
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

export function useSearch(query) {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const search = useCallback(async (searchQuery) => {
        const trimmed = searchQuery?.trim()
        if (!trimmed || trimmed.length < 2) {
            setResults([])
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_URL}?q=${encodeURIComponent(trimmed)}`)

            if (!response.ok) {
                throw new Error('API недоступен')
            }

            const data = await response.json()
            // Добавляем теги к результатам
            setResults(enrichNewsWithTags(data.results || []))
        } catch {
            // Поиск по mock данным с динамическими тегами
            const enriched = enrichNewsWithTags(MOCK_NEWS)
            const lowerQuery = trimmed.toLowerCase()
            const filtered = enriched.filter(item =>
                item.title.toLowerCase().includes(lowerQuery) ||
                item.description.toLowerCase().includes(lowerQuery) ||
                item.category.toLowerCase().includes(lowerQuery) ||
                item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
            )
            setResults(filtered)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            search(query)
        }, 300) // Debounce 300ms

        return () => clearTimeout(timeoutId)
    }, [query, search])

    return { results, loading, error }
}
