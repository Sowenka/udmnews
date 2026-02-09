import { useState, useEffect, useCallback } from 'react'
import { enrichNewsWithTags } from '@/lib/extractTags'

const BASE_PATH = import.meta.env.BASE_URL || '/'
const API_URL = `${BASE_PATH}api/news.php`
const ITEMS_PER_PAGE = 12

// Mock данные для разработки без PHP
const MOCK_DATA = [
    {
        title: 'Бречалов встретился с жителями Ижевска на форуме',
        description: 'Глава Удмуртской Республики Александр Бречалов провёл встречу с жителями Ижевска в рамках ежегодного гражданского форума. На мероприятии обсуждались вопросы развития городской инфраструктуры, благоустройства дворовых территорий и строительства новых социальных объектов. Участники форума представили свои проекты по улучшению городской среды.'
    },
    {
        title: 'В Глазове открылся новый цех на ЧМЗ',
        description: 'На Чепецком механическом заводе в Глазове состоялось торжественное открытие нового производственного цеха. Инвестиции в проект составили более 2 миллиардов рублей. Новый цех оснащён современным оборудованием и позволит увеличить объёмы выпуска продукции на 30 процентов. На предприятии будет создано более 200 новых рабочих мест.'
    },
    {
        title: 'УдГУ вошёл в топ-100 вузов России по качеству образования',
        description: 'Удмуртский государственный университет занял высокую позицию в национальном рейтинге качества образования. Эксперты отметили сильную научно-исследовательскую базу вуза, высокий уровень подготовки выпускников и активное международное сотрудничество. Ректор университета подчеркнул, что это результат системной работы всего коллектива.'
    },
    {
        title: 'Зенит-Ижевск одержал победу в домашнем матче',
        description: 'Футбольный клуб Зенит-Ижевск одержал уверенную победу в домашнем матче чемпионата России со счётом 3:1. Голы забили Иванов, Петров и Сидоров. Команда поднялась на третье место в турнирной таблице. Главный тренер отметил отличную физическую подготовку и командный дух игроков.'
    },
    {
        title: 'Благоустройство набережной Ижевского пруда завершат к лету',
        description: 'Масштабный проект реконструкции набережной Ижевского пруда планируется завершить к началу летнего сезона. В рамках благоустройства обновят пешеходные дорожки, установят новое освещение, скамейки и детские площадки. Общая протяжённость обновлённой набережной составит более 3 километров. Проект реализуется при поддержке федерального бюджета.'
    },
    {
        title: 'В Сарапуле отремонтируют исторический центр города',
        description: 'Администрация Сарапула объявила о начале масштабной программы реставрации исторического центра города. Работы затронут более 20 зданий — памятников архитектуры XIX века. На реализацию проекта выделено 500 миллионов рублей из республиканского бюджета. Планируется восстановить фасады купеческих домов и создать пешеходную зону.'
    },
    {
        title: 'Правительство выделило средства на развитие туризма',
        description: 'Правительство Удмуртской Республики утвердило программу развития внутреннего туризма на ближайшие три года. На реализацию программы выделено 1,2 миллиарда рублей. Средства направят на создание новых туристических маршрутов, строительство гостиниц и развитие инфраструктуры в районах республики.'
    },
    {
        title: 'Концерн Калашников представил новую продукцию',
        description: 'Концерн Калашников представил линейку новой гражданской продукции на международной выставке. Среди новинок — охотничьи ружья нового поколения, беспилотные летательные аппараты и катера. Компания активно диверсифицирует производство и наращивает долю гражданской продукции в общем объёме выпуска.'
    },
    {
        title: 'В Воткинске построят новую поликлинику',
        description: 'В Воткинске началось строительство новой поликлиники на 500 посещений в смену. Объект возводится в рамках национального проекта Здравоохранение. Поликлиника будет оснащена современным диагностическим оборудованием, включая МРТ и КТ. Завершение строительства запланировано на конец следующего года.'
    },
    {
        title: 'Транспортная реформа в Ижевске: новые маршруты',
        description: 'В столице Удмуртии стартовала транспортная реформа. Введены 15 новых автобусных маршрутов, которые свяжут отдалённые районы города с центром. Обновлён подвижной состав — на линии вышли 50 новых автобусов с кондиционерами и низким полом. Интервалы движения на ключевых направлениях сокращены до 5-7 минут.'
    }
]

const MOCK_NEWS = Array.from({ length: 50 }, (_, i) => {
    const data = MOCK_DATA[i % MOCK_DATA.length]
    return {
        id: String(i + 1),
        title: data.title,
        description: data.description,
        link: i % 2 === 0 ? `https://izhlife.ru/news/${i + 1}` : `https://susanin.news/news/${i + 1}`,
        image: `https://placehold.co/600x400/1e293b/white?text=Новость+${i + 1}`,
        category: ['Общество', 'Экономика', 'Спорт', 'Культура', 'Политика'][i % 5],
        pubDate: new Date(Date.now() - i * 3600000).toISOString(),
        source: i % 2 === 0 ? 'izhlife' : 'susanin'
    }
})

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
