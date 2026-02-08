// Словарь известных сущностей Удмуртии для автоматического тегирования
const TAG_DICTIONARY = {
    // Города и районы
    cities: [
        'Ижевск', 'Сарапул', 'Глазов', 'Воткинск', 'Можга',
        'Игра', 'Ува', 'Балезино', 'Камбарка', 'Кизнер',
        'Завьялово', 'Малопургинский', 'Увинский', 'Якшур-Бодья'
    ],

    // Персоны
    persons: [
        'Бречалов', 'Семёнов', 'Чулкин', 'Питкевич'
    ],

    // Организации и предприятия
    organizations: [
        'Ижмаш', 'Калашников', 'ЧМЗ', 'Ижсталь', 'Аксион',
        'УдГУ', 'ИжГТУ', 'ИГМА',
        'Правительство', 'Госсовет', 'Администрация'
    ],

    // Спорт
    sports: [
        'Зенит-Ижевск', 'Ижсталь', 'Купол-Родники', 'Динамо',
        'Чемпионат', 'Олимпиада', 'Спартакиада'
    ],

    // Темы
    topics: [
        'ЖКХ', 'Благоустройство', 'Транспорт', 'Здравоохранение',
        'Образование', 'Строительство', 'Туризм', 'Сельское хозяйство'
    ]
}

// Все теги в одном массиве для быстрого поиска
const ALL_TAGS = [
    ...TAG_DICTIONARY.cities,
    ...TAG_DICTIONARY.persons,
    ...TAG_DICTIONARY.organizations,
    ...TAG_DICTIONARY.sports,
    ...TAG_DICTIONARY.topics
]

/**
 * Извлекает теги из текста новости
 * @param {string} title - Заголовок новости
 * @param {string} description - Описание новости
 * @returns {string[]} - Массив найденных тегов
 */
export function extractTags(title = '', description = '') {
    const text = `${title} ${description}`.toLowerCase()
    const foundTags = []

    for (const tag of ALL_TAGS) {
        // Ищем тег как отдельное слово (с учётом падежей — простой поиск вхождения)
        if (text.includes(tag.toLowerCase())) {
            foundTags.push(tag)
        }
    }

    // Убираем дубликаты и ограничиваем количество
    return [...new Set(foundTags)].slice(0, 5)
}

/**
 * Добавляет теги к массиву новостей
 * @param {Array} news - Массив новостей
 * @returns {Array} - Массив новостей с тегами
 */
export function enrichNewsWithTags(news) {
    return news.map(item => ({
        ...item,
        tags: item.tags || extractTags(item.title, item.description)
    }))
}
