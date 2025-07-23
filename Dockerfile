FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_URL
ARG VITE_SOCKET_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL

RUN --mount=type=secret,id=VITE_MAP_API_KEY \
    --mount=type=secret,id=VITE_MAP_ID \
    export VITE_MAP_API_KEY=$(cat /run/secrets/VITE_MAP_API_KEY) && \
    export VITE_MAP_ID=$(cat /run/secrets/VITE_MAP_ID) && \
    npm run build

FROM node:18-alpine

WORKDIR /app
RUN npm i -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 5173
CMD [ "serve", "-s", "dist" ]
