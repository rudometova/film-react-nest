# ЭТАП 1: СБОРКА
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Копируем .env 
COPY .env .env

# Устанавливаем все зависимости (включая dev)
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем проект
RUN npm run build

#  ЭТАП 2: ПРОДАКШН 
FROM node:20-alpine

WORKDIR /app

# Копируем package.json
COPY package*.json ./

# Копируем .env в продакшен
COPY .env .env

# Устанавливаем только production зависимости
RUN npm ci --omit=dev

# Копируем собранный бэкенд и статические файлы
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Открываем порт
EXPOSE 3000

# Запускаем
CMD ["node", "dist/main.js"]