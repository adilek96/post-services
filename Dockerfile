# Этап сборки
FROM node:22 AS build

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Копируем исходный код
COPY . .

# Генерируем клиента Prisma
RUN npx prisma generate

# Сборка проекта
RUN npm run build

# Этап продакшн
FROM node:22-slim AS production

WORKDIR /app

# Копируем package.json
COPY --from=build /app/package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production --legacy-peer-deps

# Убедимся, что axios установлен
RUN npm install axios@1.6.2

# Копируем необходимые файлы из этапа сборки
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/.env ./.env

# Открываем порт 4002
EXPOSE 4002

# Копируем файлы Prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Запускаем приложение из dist/src/main
CMD ["node", "dist/src/main.js"]
