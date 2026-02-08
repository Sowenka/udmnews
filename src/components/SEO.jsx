import PropTypes from 'prop-types'

const SITE_NAME = 'Новости Удмуртии'
const SITE_URL = 'https://udmnews.ru'
const DEFAULT_DESCRIPTION = 'Последние новости Удмуртской Республики и Ижевска. Политика, экономика, общество, культура, спорт — всё о жизни региона.'
const DEFAULT_IMAGE = '/og-image.jpg'

export function SEO({
    title,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_IMAGE,
    url = '',
    type = 'website',
    article = null
}) {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    const fullUrl = `${SITE_URL}${url}`
    const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`

    return (
        <>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:locale" content="ru_RU" />

            {/* Article specific */}
            {article && (
                <>
                    <meta property="article:published_time" content={article.publishedTime} />
                    <meta property="article:section" content={article.section} />
                </>
            )}
        </>
    )
}

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
    article: PropTypes.shape({
        publishedTime: PropTypes.string,
        section: PropTypes.string
    })
}
