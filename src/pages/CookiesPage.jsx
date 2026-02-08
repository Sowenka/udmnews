import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO'

export function CookiesPage() {
    return (
        <>
            <SEO
                title="Политика обработки файлов cookie"
                description="Политика использования файлов cookie на сайте Новости Удмуртии. Информация о типах cookie и способах управления ими."
                url="/cookies"
            />

            <article className="prose prose-gray max-w-none dark:prose-invert">
                <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                    Политика обработки файлов cookie
                </h1>

                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                        Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
                    </p>

                    <section className="mb-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            1. Что такое файлы cookie
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем
                            устройстве при посещении веб-сайтов. Они помогают сайту запоминать информацию
                            о вашем визите, что делает следующее посещение проще и удобнее.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            2. Какие cookie мы используем
                        </h2>

                        <div className="mb-4">
                            <h3 className="mb-2 font-medium text-gray-900 dark:text-white">
                                Необходимые cookie
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Эти файлы необходимы для работы сайта. Они включают cookie для сохранения
                                ваших настроек (например, выбор темы оформления) и согласия на использование cookie.
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3 className="mb-2 font-medium text-gray-900 dark:text-white">
                                Аналитические cookie
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Мы используем сервисы аналитики (Яндекс.Метрика) для понимания того,
                                как посетители используют наш сайт. Это помогает нам улучшать качество
                                контента и удобство использования.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-2 font-medium text-gray-900 dark:text-white">
                                Рекламные cookie
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Эти cookie используются рекламными сетями (РСЯ) для показа релевантной
                                рекламы на основе ваших интересов и истории посещений.
                            </p>
                        </div>
                    </section>

                    <section className="mb-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            3. Срок хранения cookie
                        </h2>
                        <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                            <li>
                                <strong>Сессионные cookie</strong> — удаляются при закрытии браузера
                            </li>
                            <li>
                                <strong>Постоянные cookie</strong> — хранятся от 30 дней до 2 лет в зависимости от назначения
                            </li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            4. Как управлять cookie
                        </h2>
                        <p className="mb-2 text-gray-600 dark:text-gray-300">
                            Вы можете контролировать и удалять файлы cookie по своему усмотрению:
                        </p>
                        <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                            <li>В настройках браузера можно удалить все сохранённые cookie</li>
                            <li>Можно настроить браузер на блокировку cookie</li>
                            <li>Можно настроить уведомления о каждом новом cookie</li>
                        </ul>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Обратите внимание: отключение cookie может повлиять на функциональность сайта.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            5. Использование сервиса Яндекс.Метрика
                        </h2>
                        <p className="mb-3 text-gray-600 dark:text-gray-300">
                            На данном сайте используется сервис веб-аналитики Яндекс.Метрика, предоставляемый
                            компанией ООО «ЯНДЕКС» (119021, Россия, г. Москва, ул. Льва Толстого, д. 16).
                        </p>
                        <p className="mb-3 text-gray-600 dark:text-gray-300">
                            Сервис Яндекс.Метрика использует технологию «cookie» — небольшие текстовые файлы,
                            размещаемые на компьютере пользователей с целью анализа их пользовательской активности.
                        </p>
                        <p className="mb-3 text-gray-600 dark:text-gray-300">
                            Собранная при помощи cookie информация не может идентифицировать вас, однако может помочь
                            нам улучшить работу нашего сайта. Информация об использовании вами данного сайта, собранная
                            при помощи cookie, будет передаваться Яндексу и храниться на сервере Яндекса в РФ.
                        </p>
                        <p className="mb-3 text-gray-600 dark:text-gray-300">
                            Яндекс будет обрабатывать эту информацию для оценки использования вами сайта, составления
                            для нас отчётов о деятельности нашего сайта, и предоставления других услуг.
                        </p>
                        <p className="mb-3 text-gray-600 dark:text-gray-300">
                            Яндекс обрабатывает эту информацию в порядке, установленном в условиях использования
                            сервиса Яндекс.Метрика.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            Вы можете отказаться от использования cookies, выбрав соответствующие настройки в браузере,
                            или установить дополнение для браузера{' '}
                            <a
                                href="https://yandex.ru/support/metrica/general/opt-out.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-500 hover:underline dark:text-amber-400"
                            >
                                для блокировки Яндекс.Метрики
                            </a>.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            6. Рекламная сеть Яндекса (РСЯ)
                        </h2>
                        <p className="mb-3 text-gray-600 dark:text-gray-300">
                            На сайте размещается реклама Рекламной сети Яндекса (РСЯ). Для показа релевантной рекламы
                            РСЯ может использовать cookie-файлы и собирать обезличенные данные о ваших интересах
                            и посещённых страницах.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            Вы можете управлять персонализацией рекламы в{' '}
                            <a
                                href="https://yandex.ru/tune/adv/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-500 hover:underline dark:text-amber-400"
                            >
                                настройках рекламных предпочтений Яндекса
                            </a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                            7. Изменения в политике
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Мы можем обновлять данную политику. Актуальная версия всегда доступна на этой странице.
                            Продолжая использовать сайт после внесения изменений, вы соглашаетесь с обновлённой политикой.
                        </p>
                    </section>

                    <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                        <Link
                            to="/privacy"
                            className="text-amber-500 hover:underline dark:text-amber-400"
                        >
                            ← Политика конфиденциальности
                        </Link>
                    </div>
                </div>
            </article>
        </>
    )
}
