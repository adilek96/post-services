# Этап сборки
FROM node:22 AS build

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Копируем исходный код и генерируем клиента Prisma
COPY . .
RUN npx prisma generate

# Сборка проекта
RUN npm run build

# Этап продакшн
FROM node:22 AS production

WORKDIR /app

# Копируем только необходимые файлы из этапа сборки
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Открываем порт 4002
EXPOSE 4002

# Применяем миграции базы данных
RUN npx prisma migrate deploy --schema ./dist/prisma/schema.prisma

# Запускаем приложение из dist/src
ENTRYPOINT ["node", "dist/src/main.js"]
