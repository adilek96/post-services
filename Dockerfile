FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Скопировать исходники и Prisma
COPY prisma ./prisma
COPY . .

# Сгенерировать Prisma Client
RUN npx prisma generate

# Собрать проект
RUN npm run build

EXPOSE 4002

CMD ["node", "dist/main"]
