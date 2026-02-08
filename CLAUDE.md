# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UdmNews — новостной агрегатор Удмуртии. React SPA с PWA-поддержкой. Агрегирует новости из RSS-лент местных СМИ (izhlife.ru, susanin.news) через PHP API.

## Commands

```bash
npm run dev      # Development server (Vite)
npm run build    # Production build → dist/
npm run lint     # ESLint check
npm run preview  # Preview production build
```

## Tech Stack

- **React 19** with React Router 7
- **Vite** (rolldown-vite) — bundler, `base: '/udmnews/'` для деплоя в субдиректорию
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **PHP** — backend API для агрегации RSS
- **JavaScript** (JSX, ES modules, no TypeScript)

## Architecture

```
src/
├── components/layout/   # Header, Sidebar, Layout
├── components/news/     # NewsCard, NewsList, PopularNews
├── pages/               # Route pages
├── hooks/               # Custom hooks (useNews, useWeather, useCurrency, useTheme, usePWA)
├── lib/                 # Utilities (cn.js, extractTags.js)
├── App.jsx              # Router configuration
└── main.jsx             # Entry point + Service Worker registration

api/
├── news.php             # Агрегирует RSS из izhlife.ru и susanin.news, кеш 5 мин
├── sitemap.php          # Генерация sitemap
└── cache/               # Кеш новостей
```

### News API

`api/news.php` парсит RSS-ленты и возвращает JSON:
- Endpoint: `/api/news.php?page=1&limit=12`
- Response: `{ success, page, total, hasMore, news: [...] }`
- Кеширование: 5 минут в `api/cache/news_all.json`

`useNews(category)` в dev-режиме использует mock-данные при недоступности API.

### Routing

React Router with nested routes. `Layout` is the parent route rendering `<Outlet />`:
- `/` → HomePage
- `/category/:category` → CategoryPage
- `/tag/:tag` → TagPage (поиск по тегу)
- `/search` → SearchPage
- `/news/:id` → NewsPage
- `/privacy`, `/cookies` → статические страницы
- `*` → NotFoundPage

### Data Hooks

- `useNews(category)` — новости с пагинацией, mock fallback
- `useWeather()` — погода для городов Удмуртии via Open-Meteo API
- `useCurrency()` — курсы USD/EUR via CBR API
- `useTheme()` — dark mode с localStorage persistence
- `usePWA()` — PWA install prompt

### Dark Mode

Class-based (`dark` class on `<html>`). Tailwind v4 custom variant в `index.css`:
```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

### PWA

Service Worker в `public/sw.js`, manifest в `public/manifest.json`.

### Path Aliases

`@/` → `./src/` (vite.config.js)

## Code Conventions

- Named exports (не default), кроме `App.jsx`
- PropTypes для валидации props
- 4-space indentation
- Icons: `react-icons/hi2` (Heroicons v2)
