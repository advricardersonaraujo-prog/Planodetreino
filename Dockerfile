FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=5173
COPY --from=build /app/dist ./dist
COPY serve-dist.js ./serve-dist.js
EXPOSE 5173
CMD ["node", "serve-dist.js"]
