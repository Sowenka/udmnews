<?php
header('Content-Type: application/xml; charset=utf-8');

$siteUrl = 'https://udmnews.ru';

// Статические страницы
$staticPages = [
    ['url' => '/', 'priority' => '1.0', 'changefreq' => 'hourly'],
    ['url' => '/category/politics', 'priority' => '0.8', 'changefreq' => 'hourly'],
    ['url' => '/category/economy', 'priority' => '0.8', 'changefreq' => 'hourly'],
    ['url' => '/category/society', 'priority' => '0.8', 'changefreq' => 'hourly'],
    ['url' => '/category/culture', 'priority' => '0.8', 'changefreq' => 'daily'],
    ['url' => '/category/sport', 'priority' => '0.8', 'changefreq' => 'daily'],
];

echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
<?php foreach ($staticPages as $page): ?>
    <url>
        <loc><?= $siteUrl . $page['url'] ?></loc>
        <changefreq><?= $page['changefreq'] ?></changefreq>
        <priority><?= $page['priority'] ?></priority>
        <lastmod><?= date('Y-m-d') ?></lastmod>
    </url>
<?php endforeach; ?>
</urlset>
