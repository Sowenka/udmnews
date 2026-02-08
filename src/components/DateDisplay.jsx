import { useState, useEffect } from 'react'

export function DateDisplay() {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        // Обновляем дату каждую минуту
        const timer = setInterval(() => {
            setDate(new Date())
        }, 60000)

        return () => clearInterval(timer)
    }, [])

    const formatted = date.toLocaleDateString('ru-RU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    // Первая буква заглавная
    const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1)

    return (
        <span className="hidden text-sm leading-none text-gray-500 dark:text-gray-400 lg:inline">
            {capitalized}
        </span>
    )
}
