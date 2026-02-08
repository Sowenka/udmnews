import { useWeather, getWeatherInfo } from '@/hooks/useWeather'

export function Weather() {
    const { weather, loading } = useWeather()

    if (loading) {
        return (
            <div className="hidden items-center gap-3 text-sm lg:flex">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                ))}
            </div>
        )
    }

    if (!weather || weather.length === 0) return null

    return (
        <div className="hidden items-center gap-1 text-sm lg:flex">
            {weather.map((city, index) => {
                const { icon, desc } = getWeatherInfo(city.code)
                const temp = city.temp > 0 ? `+${city.temp}` : city.temp

                return (
                    <div key={city.id} className="flex items-center">
                        <div
                            className="flex items-center gap-1 px-2 text-gray-600 dark:text-gray-300"
                            title={`${city.name}: ${desc}`}
                        >
                            <span className="text-xs text-gray-400 dark:text-gray-500">{city.name}</span>
                            <span>{icon}</span>
                            <span className="font-medium">{temp}°</span>
                        </div>
                        {index < weather.length - 1 && (
                            <span className="text-gray-300 dark:text-gray-600">|</span>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
