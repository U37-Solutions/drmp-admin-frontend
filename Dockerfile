FROM node:18-alpine

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VITE_SOCKET_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL

COPY package.json package-lock.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "serve", "-s", "dist" ]
