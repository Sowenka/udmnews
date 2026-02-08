import { useCurrency } from '@/hooks/useCurrency'

export function Currency() {
    const { currency, loading } = useCurrency()

    if (loading) {
        return (
            <div className="hidden items-center gap-2 text-sm lg:flex">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
        )
    }

    if (!currency) return null

    return (
        <div className="hidden items-center gap-1 text-sm lg:flex">
            <CurrencyItem
                symbol="$"
                name="USD"
                value={currency.usd.value}
                diff={currency.usd.diff}
            />
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <CurrencyItem
                symbol="€"
                name="EUR"
                value={currency.eur.value}
                diff={currency.eur.diff}
            />
        </div>
    )
}

function CurrencyItem({ symbol, name, value, diff }) {
    const isUp = diff > 0
    const isDown = diff < 0
    const arrow = isUp ? '↑' : isDown ? '↓' : ''
    const colorClass = isUp
        ? 'text-green-500'
        : isDown
            ? 'text-red-500'
            : 'text-gray-400'

    return (
        <div
            className="flex items-center gap-1 px-2 text-gray-600 dark:text-gray-300"
            title={`${name}: ${value} ₽ (${isUp ? '+' : ''}${diff.toFixed(2)})`}
        >
            <span className="text-xs text-gray-400 dark:text-gray-500">{symbol}</span>
            <span className="font-medium">{value} ₽</span>
            {arrow && <span className={`text-xs ${colorClass}`}>{arrow}</span>}
        </div>
    )
}
