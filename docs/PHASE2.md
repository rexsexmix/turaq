# Phase 2 — бэкенд и реальные данные

MVP (Phase 1) закрыт: UI, моки, демо-вход, черновики в браузере. Phase 2 — поэтапный переход к серверу **без ломки** текущих страниц.

## Цели

| Цель | Сейчас (Phase 1) | Phase 2 |
|------|------------------|---------|
| **Каталог** | `lib/mockData.ts` на сервере в RSC | Те же данные через API → затем БД |
| **Публикация** | Черновики в `localStorage` | `POST` объявления, статус «на модерации» / «опубликовано» |
| **Auth** | `sessionStorage`, демо-форма | Сессии/JWT, защита `/submit` и профиля |

Принцип: сначала **Route Handlers + mock**, потом **БД**, потом **фото**.

---

## Этап 1 — Route Handlers + mock

**Задача:** единый HTTP-слой; UI пока может читать моки напрямую (как сейчас).

### Файлы

| Действие | Путь |
|----------|------|
| Заглушка API | `app/api/properties/route.ts` — `GET` → `{ properties }` |
| Позже | `app/api/properties/[id]/route.ts` — один объект |
| Позже | `app/api/listings/route.ts` — `POST` черновика/объявления (mock-ответ) |
| Общие типы | `types/property.ts`, ответы API в `types/api.ts` (опционально) |
| Клиент (позже) | `lib/api/properties.ts` — `fetch('/api/properties')` |

### Не трогаем пока

- `app/search/page.tsx` — фильтрация через `filterProperties` из mock
- `components/home/PropertyCard.tsx`, карта, избранное

### Критерии готовности

- [ ] `GET /api/properties` отдаёт JSON, валидная структура `{ properties: Property[] }`
- [ ] `npm run build` без ошибок
- [ ] Страницы `/`, `/search`, `/property/[id]` работают как до Phase 2
- [ ] В README или здесь задокументирован контракт ответа

---

## Этап 2 — Supabase / Postgres (или аналог)

**Задача:** каталог и объявления пользователя в БД; mock — только для seed/тестов.

### Файлы

| Область | Было | Станет |
|---------|------|--------|
| Данные | `lib/mockData.ts` (`properties`) | `lib/db/` + миграции; seed из mock |
| Каталог | `filterProperties` в памяти | SQL/ORM + query по `city`, `type`, `price`, … |
| Поиск | `app/search/page.tsx` | те же фильтры, источник — `GET /api/properties?…` или прямой запрос в RSC |
| Подача | `SubmitListingForm` → `localStorage` | `POST /api/listings` → строка в `listings` |
| Профиль | `lib/listingDrafts.ts` | черновики/объявления пользователя из БД |
| Auth | `lib/demoSession.ts` | Supabase Auth / NextAuth + middleware на `/submit`, `/profile` |

### Критерии готовности

- [ ] Таблицы: пользователи, объявления (поля как в `ListingDraft` + статус, `user_id`)
- [ ] Каталог на `/search` читает из БД (через API или server component)
- [ ] После входа пользователь видит свои объявления в профиле
- [ ] Демо-mock не обязателен для продакшена (остаётся для `dev` seed)
- [ ] `.env.example` с `DATABASE_URL` / ключами Supabase (без секретов в git)

---

## Этап 3 — загрузка фото

**Задача:** не только URL в поле, а файлы в хранилище.

### Файлы

| Действие | Путь |
|----------|------|
| Storage | Supabase Storage / S3 + presigned URL |
| API | `POST /api/upload` или upload из клиента в bucket |
| Форма | `SubmitListingForm` — `input type="file"`, превью |
| Карточка | `imageUrl` / `imageUrls[]` — публичные URL из storage |

### Критерии готовности

- [ ] Загрузка 1–10 фото на объявление
- [ ] В каталоге и на `/property/[id]` отображаются URL из storage
- [ ] Лимиты размера и типа файла, ошибки на русском

---

## Схема потока данных (целевая)

```text
Браузер → /search, /property/[id]
              ↓
         fetch /api/properties  (этап 1: mock)
              ↓
         Postgres (этап 2)
              ↓
         Storage URLs (этап 3)

/submit → POST /api/listings → БД
/login  → auth provider → cookie/session
```

---

## Риски и ограничения

- **Не ломать Phase 1:** до переключения каталога на API страницы продолжают импортировать `lib/mockData`.
- **Секреты:** только в `.env.local` / Vercel Environment Variables.
- **Избранное:** может остаться в `localStorage` до отдельной задачи (синк с аккаунтом — Phase 2+).

---

## Связанные артефакты

- Заглушка API: [`app/api/properties/route.ts`](../app/api/properties/route.ts)
- Типы: [`types/property.ts`](../types/property.ts)
- Текущие моки: [`lib/mockData.ts`](../lib/mockData.ts)
