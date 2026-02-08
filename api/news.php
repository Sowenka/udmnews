<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Параметры пагинации
$page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
$limit = isset($_GET['limit']) ? min(50, max(1, (int)$_GET['limit'])) : 12;
$offset = ($page - 1) * $limit;

// Кэширование на 5 минут
$cacheFile = __DIR__ . '/cache/news_all.json';
$cacheTime = 300;

$allNews = [];

// Проверяем кэш
if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTime)) {
    $allNews = json_decode(file_get_contents($cacheFile), true);
} else {
    $sources = [
        [
            'url' => 'https://izhlife.ru/rss.xml',
            'source' => 'izhlife'
        ],
        [
            'url' => 'https://susanin.news/rss.xml',
            'source' => 'susanin'
        ]
    ];

    foreach ($sources as $source) {
        $xml = @simplexml_load_file($source['url']);

        if ($xml === false) {
            continue;
        }

        foreach ($xml->channel->item as $item) {
            $enclosure = $item->enclosure;
            $image = $enclosure ? (string)$enclosure['url'] : null;

            $category = (string)$item->category;
            $category = trim(explode('/', $category)[0]);

            $allNews[] = [
                'id' => md5((string)$item->link),
                'title' => (string)$item->title,
                'description' => strip_tags((string)$item->description),
                'link' => (string)$item->link,
                'image' => $image,
                'category' => $category ?: 'Новости',
                'pubDate' => date('c', strtotime((string)$item->pubDate)),
                'timestamp' => strtotime((string)$item->pubDate),
                'source' => $source['source']
            ];
        }
    }

    // Сортировка по дате (новые первые)
    usort($allNews, function($a, $b) {
        return $b['timestamp'] - $a['timestamp'];
    });

    // Сохраняем в кэш
    if (!is_dir(__DIR__ . '/cache')) {
        mkdir(__DIR__ . '/cache', 0755, true);
    }
    file_put_contents($cacheFile, json_encode($allNews, JSON_UNESCAPED_UNICODE));
}

$total = count($allNews);
$totalPages = ceil($total / $limit);
$hasMore = $page < $totalPages;

// Применяем пагинацию
$pagedNews = array_slice($allNews, $offset, $limit);

// Убираем timestamp из вывода
$pagedNews = array_map(function($item) {
    unset($item['timestamp']);
    return $item;
}, $pagedNews);

$response = [
    'success' => true,
    'page' => $page,
    'limit' => $limit,
    'total' => $total,
    'totalPages' => $totalPages,
    'hasMore' => $hasMore,
    'news' => $pagedNews
];

echo json_encode($response, JSON_UNESCAPED_UNICODE);
