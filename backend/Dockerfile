FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY package*.json ./
RUN npm install --production

# Copy built JS output
COPY --from=builder /app/dist ./dist
COPY .env .env

ENV PORT=500d
EXPOSE 500

CMD ["node", "dist/app.js"]
