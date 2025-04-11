# Используем Node.js 22
FROM node:22-alpine

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код
COPY . .

# Сборка проекта
RUN npm run build

# Указываем порт
EXPOSE 4002

# Запускаем приложение
CMD ["node", "dist/main"]
