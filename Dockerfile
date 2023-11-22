
FROM node:18.12-alpine

ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

#CMD ["npm", "start"]

ENTRYPOINT npm start
