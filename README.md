# Сервис публикаций (Post Service)

Сервис для управления публикациями (постами) с поддержкой GraphQL API, созданный на базе фреймворка NestJS.

## Описание

Сервис предоставляет API для создания, чтения, обновления и удаления публикаций (постов). Каждая публикация может иметь категории, подкатегории и связанные медиафайлы.

## Необходимые переменные окружения

Для работы сервиса требуется настроить следующие переменные окружения в файле `.env`:

```bash
# URL подключения к PostgreSQL базе данных
DATABASE_URL="postgresql://username:password@host:port/database_name"

# Настройки Redis
REDIS_PORT="5600"        # Порт Redis сервера
REDIS_HOST="localhost"   # Хост Redis сервера
REDIS_PASSWORD="password" # Пароль Redis сервера

# Секретный ключ для JWT аутентификации
AUTH_SERVICE_JWT_SECRET="your_jwt_secret_key"

# Порт для запуска сервиса (опционально)
PORT=4002  # По умолчанию 4002
```

## Установка и настройка

```bash
# Установка зависимостей
$ npm install

# Генерация Prisma клиента
$ npx prisma generate

# Миграция базы данных
$ npx prisma migrate dev
```

## Запуск приложения

```bash
# Development режим
$ npm run start

# Watch режим
$ npm run start:dev

# Production режим
$ npm run start:prod
```

## GraphQL API

Сервис предоставляет GraphQL API, доступный по адресу: `http://localhost:4002/graphql`

### Доступные запросы (Query)

#### Получение всех постов

```graphql
query GetAllPosts($filter: GetAllPostsInput) {
  getAllPosts(filter: $filter) {
    id
    title
    content
    createdAt
    updatedAt
    categories {
      id
      name
    }
    subcategories {
      id
      name
    }
    media {
      id
      url
      type
    }
  }
}
```

Параметры фильтрации:

```graphql
input GetAllPostsInput {
  sort: String # Сортировка
  category: String # Фильтр по категории
  subcategory: String # Фильтр по подкатегории
  page: Int = 1 # Номер страницы (по умолчанию 1)
  limit: Int = 10 # Количество постов на странице (по умолчанию 10)
}
```

#### Получение поста по ID

```graphql
query GetPostById($id: Int!) {
  getPostById(id: $id) {
    id
    title
    content
    createdAt
    updatedAt
    categories {
      id
      name
    }
    subcategories {
      id
      name
    }
    media {
      id
      url
      type
    }
  }
}
```

### Доступные мутации (Mutation)

#### Создание поста

```graphql
mutation CreatePost($data: CreatePostInput!) {
  createPost(data: $data) {
    id
    title
    content
    createdAt
    updatedAt
  }
}
```

Входные данные:

```graphql
input CreatePostInput {
  title: String! # Заголовок поста
  content: String! # Содержание поста
  categories: [String!]! # Список названий категорий
  subcategories: [String!]! # Список названий подкатегорий
  media: [CreateMediaInput!] # Список медиафайлов (опционально)
}

input CreateMediaInput {
  url: String! # URL медиафайла
  type: String! # Тип медиафайла (image, video, etc.)
}
```

#### Обновление поста

```graphql
mutation UpdatePost($id: Int!, $data: UpdatePostInput!) {
  updatePost(id: $id, data: $data) {
    id
    title
    content
    createdAt
    updatedAt
    categories {
      id
      name
    }
    subcategories {
      id
      name
    }
    media {
      id
      url
      type
    }
  }
}
```

Входные данные:

```graphql
input UpdatePostInput {
  title: String # Заголовок поста (опционально)
  content: String # Содержание поста (опционально)
  categories: [String!] # Список названий категорий (опционально)
  subcategories: [String!] # Список названий подкатегорий (опционально)
  media: [MediaInput!] # Список медиафайлов (опционально)
}

input MediaInput {
  url: String! # URL медиафайла
  type: String! # Тип медиафайла
}
```

#### Удаление поста

```graphql
mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
```

## Модели базы данных

### Post

- id: Int (PK)
- title: String
- content: String
- createdAt: DateTime
- updatedAt: DateTime
- categories: Category[] (M:N)
- subcategories: Subcategory[] (M:N)
- media: Media[] (1:N)

### Category

- id: Int (PK)
- name: String (unique)
- posts: Post[] (M:N)

### Subcategory

- id: Int (PK)
- name: String (unique)
- posts: Post[] (M:N)

### Media

- id: Int (PK)
- url: String
- type: String
- postId: Int (FK)
- post: Post (M:1)

## Кэширование

Сервис использует Redis для кэширования данных, что повышает производительность API при частых запросах.

## Технологии

- NestJS - основной фреймворк
- GraphQL - API
- Prisma - ORM
- PostgreSQL - база данных
- Redis - кэширование
