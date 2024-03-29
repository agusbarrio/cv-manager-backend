FROM node:18.17-alpine

WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

COPY ./config ./config
COPY ./core ./core
COPY ./migrations ./migrations
COPY ./modules ./modules
COPY ./server.js ./server.js
COPY ./.sequelizerc ./.sequelizerc

# Instala las dependencias
RUN npm install

CMD ["npm", "run", "start:migrate"]

EXPOSE 8080