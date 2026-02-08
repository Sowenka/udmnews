import { useState, useEffect } from 'react'

const API_URL = 'https://api.open-meteo.com/v1/forecast'
const CACHE_KEY = 'weather_cache_v2'
const CACHE_TIME = 30 * 60 * 1000 // 30 минут

const CITIES = [
    { id: 'izhevsk', name: 'Ижевск', lat: 56.8519, lon: 53.2114 },
    { id: 'sarapul', name: 'Сарапул', lat: 56.4792, lon: 53.7960 },
    { id: 'glazov', name: 'Глазов', lat: 58.1394, lon: 52.6583 }
]

export function useWeather() {
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchWeather = async () => {
            // Проверяем кэш
            try {
                const cached = localStorage.getItem(CACHE_KEY)
                if (cached) {
                    const { data, timestamp } = JSON.parse(cached)
                    // Проверяем что кэш валидный (массив городов)
                    if (Array.isArray(data) && Date.now() - timestamp < CACHE_TIME) {
                        setWeather(data)
                        setLoading(false)
                        return
                    }
                }
            } catch {
                localStorage.removeItem(CACHE_KEY)
            }

            try {
                const results = await Promise.all(
                    CITIES.map(async (city) => {
                        const params = new URLSearchParams({
                            latitude: city.lat,
                            longitude: city.lon,
                            current: 'temperature_2m,weather_code',
                            timezone: 'Europe/Moscow'
                        })

                        const response = await fetch(`${API_URL}?${params}`)
                        if (!response.ok) throw new Error('API error')

                        const data = await response.json()

                        return {
                            id: city.id,
                            name: city.name,
                            temp: Math.round(data.current.temperature_2m),
                            code: data.current.weather_code
                        }
                    })
                )

                // Сохраняем в кэш
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    data: results,
                    timestamp: Date.now()
                }))

                setWeather(results)
            } catch {
                // При ошибке пробуем использовать кэш
                try {
                    const cached = localStorage.getItem(CACHE_KEY)
                    if (cached) {
                        const { data } = JSON.parse(cached)
                        if (Array.isArray(data)) {
                            setWeather(data)
                        }
                    }
                } catch {
                    // Игнорируем ошибку кэша
                }
            } finally {
                setLoading(false)
            }
        }

        fetchWeather()
    }, [])

    return { weather, loading }
}

// Коды погоды WMO -> иконка и описание
export function getWeatherInfo(code) {
    const weatherCodes = {
        0: { icon: '☀️', desc: 'Ясно' },
        1: { icon: '🌤️', desc: 'Малооблачно' },
        2: { icon: '⛅', desc: 'Переменная облачность' },
        3: { icon: '☁️', desc: 'Пасмурно' },
        45: { icon: '🌫️', desc: 'Туман' },
        48: { icon: '🌫️', desc: 'Туман' },
        51: { icon: '🌧️', desc: 'Морось' },
        53: { icon: '🌧️', desc: 'Морось' },
        55: { icon: '🌧️', desc: 'Морось' },
        61: { icon: '🌧️', desc: 'Дождь' },
        63: { icon: '🌧️', desc: 'Дождь' },
        65: { icon: '🌧️', desc: 'Сильный дождь' },
        66: { icon: '🌧️', desc: 'Ледяной дождь' },
        67: { icon: '🌧️', desc: 'Ледяной дождь' },
        71: { icon: '❄️', desc: 'Снег' },
        73: { icon: '❄️', desc: 'Снег' },
        75: { icon: '❄️', desc: 'Сильный снег' },
        77: { icon: '❄️', desc: 'Снежная крупа' },
        80: { icon: '🌧️', desc: 'Ливень' },
        81: { icon: '🌧️', desc: 'Ливень' },
        82: { icon: '🌧️', desc: 'Сильный ливень' },
        85: { icon: '🌨️', desc: 'Снегопад' },
        86: { icon: '🌨️', desc: 'Сильный снегопад' },
        95: { icon: '⛈️', desc: 'Гроза' },
        96: { icon: '⛈️', desc: 'Гроза с градом' },
        99: { icon: '⛈️', desc: 'Гроза с градом' }
    }

    return weatherCodes[code] || { icon: '🌡️', desc: 'Н/Д' }
}
