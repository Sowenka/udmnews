import { useState, useEffect } from 'react'

const API_URL = 'https://www.cbr-xml-daily.ru/daily_json.js'
const CACHE_KEY = 'currency_cache_v1'
const CACHE_TIME = 60 * 60 * 1000 // 1 час

export function useCurrency() {
    const [currency, setCurrency] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCurrency = async () => {
            // Проверяем кэш
            try {
                const cached = localStorage.getItem(CACHE_KEY)
                if (cached) {
                    const { data, timestamp } = JSON.parse(cached)
                    if (data && Date.now() - timestamp < CACHE_TIME) {
                        setCurrency(data)
                        setLoading(false)
                        return
                    }
                }
            } catch {
                localStorage.removeItem(CACHE_KEY)
            }

            try {
                const response = await fetch(API_URL)
                if (!response.ok) throw new Error('API error')

                const data = await response.json()

                const currencyData = {
                    usd: {
                        value: data.Valute.USD.Value.toFixed(2),
                        diff: data.Valute.USD.Value - data.Valute.USD.Previous
                    },
                    eur: {
                        value: data.Valute.EUR.Value.toFixed(2),
                        diff: data.Valute.EUR.Value - data.Valute.EUR.Previous
                    }
                }

                // Сохраняем в кэш
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    data: currencyData,
                    timestamp: Date.now()
                }))

                setCurrency(currencyData)
            } catch {
                // При ошибке пробуем использовать кэш
                try {
                    const cached = localStorage.getItem(CACHE_KEY)
                    if (cached) {
                        const { data } = JSON.parse(cached)
                        if (data) {
                            setCurrency(data)
                        }
                    }
                } catch {
                    // Игнорируем
                }
            } finally {
                setLoading(false)
            }
        }

        fetchCurrency()
    }, [])

    return { currency, loading }
}
