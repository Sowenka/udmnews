import PropTypes from 'prop-types'

const SITE_NAME = 'Новости Удмуртии'
const SITE_URL = 'https://udmnews.ru'

export function JsonLdWebsite() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: 'Новостной портал Удмуртской Республики',
        inLanguage: 'ru-RU',
        potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_URL}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

export function JsonLdOrganization() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'NewsMediaOrganization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`
        },
        sameAs: [],
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Ижевск',
            addressRegion: 'Удмуртская Республика',
            addressCountry: 'RU'
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

export function JsonLdBreadcrumbs({ items }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.url}`
        }))
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

JsonLdBreadcrumbs.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired
}

export function JsonLdNewsArticle({ article }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.description,
        image: article.image,
        datePublished: article.pubDate,
        dateModified: article.pubDate,
        author: {
            '@type': 'Organization',
            name: SITE_NAME
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': article.link
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

JsonLdNewsArticle.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        image: PropTypes.string,
        pubDate: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    }).isRequired
}
