import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO'

export function PrivacyPage() {
    return (
        <>
            <SEO
                title="Политика конфиденциальности"
                description="Политика конфиденциальности сайта Новости Удмуртии. Информация о сборе и обработке персональных данных."
                url="/privacy"
            />

            <article className="prose prose-gray max-w-none dark:prose-invert">
                <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                    Политика конфиденциальности
                </h1>

                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                        Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
                    </p>

                    <section className="mb-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            1. Общие положения
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Настоящая Политика конфиденциальности определяет порядок обработки и защиты
                            персональных данных пользователей сайта «Новости Удмуртии» (далее — Сайт).
                            Используя Сайт, вы соглашаетесь с условиями данной Политики.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            2. Какие данные мы собираем
                        </h2>
                        <p className="mb-2 text-gray-600 dark:text-gray-300">
                            Мы можем собирать следующую информацию:
                        </p>
                        <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                            <li>Техническая информация (IP-адрес, тип браузера, операционная система)</li>
                            <li>Данные о посещении (просмотренные страницы, время посещения)</li>
                            <li>Файлы cookie и аналогичные технологии</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            3. Цели обработки данных
                        </h2>
                        <p className="mb-2 text-gray-600 dark:text-gray-300">
                            Собранные данные используются для:
                        </p>
                        <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                            <li>Обеспечения работоспособности Сайта</li>
                            <li>Анализа посещаемости и улучшения качества контента</li>
                            <li>Показа релевантной рекламы</li>
                            <li>Защиты от мошенничества и злоупотреблений</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            4. Передача данных третьим лицам
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Мы не продаём и не передаём ваши персональные данные третьим лицам,
                            за исключением случаев, предусмотренных законодательством РФ,
                            а также для работы рекламных и аналитических сервисов.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            5. Защита данных
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Мы принимаем необходимые технические и организационные меры для защиты
                            ваших персональных данных от несанкционированного доступа, изменения,
                            раскрытия или уничтожения.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            6. Ваши права
                        </h2>
                        <p className="mb-2 text-gray-600 dark:text-gray-300">
                            В соответствии с законодательством РФ вы имеете право:
                        </p>
                        <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                            <li>Получить информацию о ваших данных, которые мы обрабатываем</li>
                            <li>Требовать исправления неточных данных</li>
                            <li>Требовать удаления ваших данных</li>
                            <li>Отозвать согласие на обработку данных</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            7. Контакты
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            По вопросам, связанным с обработкой персональных данных,
                            вы можете связаться с нами по электронной почте:{' '}
                            <a
                                href="mailto:privacy@udmnews.ru"
                                className="text-amber-500 hover:underline dark:text-amber-400"
                            >
                                privacy@udmnews.ru
                            </a>
                        </p>
                    </section>

                    <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                        <Link
                            to="/cookies"
                            className="text-amber-500 hover:underline dark:text-amber-400"
                        >
                            Политика обработки файлов cookie →
                        </Link>
                    </div>
                </div>
            </article>
        </>
    )
}
