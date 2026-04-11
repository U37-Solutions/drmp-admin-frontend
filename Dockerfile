FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_URL
ARG VITE_SOCKET_URL
ARG VITE_TILES_URL
ARG VITE_NOMINATIM_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL
ENV VITE_TILES_URL=$VITE_TILES_URL
ENV VITE_NOMINATIM_URL=$VITE_NOMINATIM_URL

RUN npm run build

FROM node:18-alpine

WORKDIR /app
RUN npm i -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 5173
CMD [ "serve", "-s", "dist" ]
