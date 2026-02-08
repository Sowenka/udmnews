import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { CategoryPage } from '@/pages/CategoryPage'
import { TagPage } from '@/pages/TagPage'
import { SearchPage } from '@/pages/SearchPage'
import { NewsPage } from '@/pages/NewsPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { CookiesPage } from '@/pages/CookiesPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

function App() {
    return (
        <BrowserRouter basename={basename}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="category/:category" element={<CategoryPage />} />
                    <Route path="tag/:tag" element={<TagPage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="news/:id" element={<NewsPage />} />
                    <Route path="privacy" element={<PrivacyPage />} />
                    <Route path="cookies" element={<CookiesPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App