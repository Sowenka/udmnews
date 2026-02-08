import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { useTheme } from '@/hooks/useTheme'
import { JsonLdWebsite, JsonLdOrganization } from '@/components/JsonLd'
import { CookieBanner } from '@/components/CookieBanner'
import { PWAPrompt } from '@/components/PWAPrompt'

export function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 isolate">
            <JsonLdWebsite />
            <JsonLdOrganization />
            <Header
                theme={theme}
                toggleTheme={toggleTheme}
                onMenuClick={() => setIsSidebarOpen(true)}
            />

            <div className="flex">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <main className="flex-1 p-4 lg:ml-64 lg:p-6">
                    <Outlet />
                </main>
            </div>

            <CookieBanner />
            <PWAPrompt />
        </div>
    )
}