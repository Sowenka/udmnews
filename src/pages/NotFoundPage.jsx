import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO'
import { HiOutlineNewspaper, HiOutlineHome, HiOutlineMagnifyingGlass } from 'react-icons/hi2'

export function NotFoundPage() {
    return (
        <>
            <SEO
                title="Страница не найдена"
                description="Запрашиваемая страница не существует"
                url="/404"
            />

            <div className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
                <div className="relative mb-6">
                    <span className="text-[120px] font-bold leading-none text-gray-200 dark:text-gray-800 sm:text-[180px]">
                        404
                    </span>
                    <HiOutlineNewspaper className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-amber-500 sm:h-20 sm:w-20" />
                </div>

                <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    Страница не найдена
                </h1>

                <p className="mb-8 max-w-md text-gray-500 dark:text-gray-400">
                    Возможно, эта новость была удалена или вы перешли по неверной ссылке
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-medium text-white transition-colors hover:bg-amber-600"
                    >
                        <HiOutlineHome className="h-5 w-5" />
                        На главную
                    </Link>

                    <Link
                        to="/search"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        <HiOutlineMagnifyingGlass className="h-5 w-5" />
                        Поиск новостей
                    </Link>
                </div>
            </div>
        </>
    )
}
