import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ShareButtons } from '@/components/ShareButtons'

export function NewsCard({ news }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const sourceNames = {
        izhlife: 'IzhLife',
        susanin: 'Сусанин'
    }

    const getFirstSentence = (text) => {
        if (!text) return ''
        const match = text.match(/^[^.!?]+[.!?]/)
        return match ? match[0] : text
    }

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            {news.image && (
                <div className="aspect-video overflow-hidden">
                    <img
                        src={news.image}
                        alt={news.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>
            )}

            <div className="p-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        {news.category}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500">
                        Источник: {sourceNames[news.source] || news.source}
                    </span>
                </div>

                <h3 className="mb-2 line-clamp-2 min-h-[3.5rem] text-lg font-semibold text-gray-900 dark:text-white">
                    {news.title}
                </h3>

                {news.description && (
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                        {getFirstSentence(news.description)}
                    </p>
                )}

                {news.tags && news.tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1">
                        {news.tags.slice(0, 3).map((tag) => (
                            <Link
                                key={tag}
                                to={`/tag/${encodeURIComponent(tag)}`}
                                className="rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">

                        <time className="text-xs text-gray-400 dark:text-gray-500">
                            {formatDate(news.pubDate)}
                        </time>
                        <a
                            href={news.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
                        >
                            Читать на {sourceNames[news.source] || 'источнике'}
                        </a>
                    </div>
                    <ShareButtons url={news.link} title={news.title} />
                </div>
            </div>
        </div>
    )
}

NewsCard.propTypes = {
    news: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        link: PropTypes.string.isRequired,
        image: PropTypes.string,
        category: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        pubDate: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired
    }).isRequired
}
