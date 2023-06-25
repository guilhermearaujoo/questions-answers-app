FROM node:16

RUN mkdir -p /app && chown -R node:node /app
USER node

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .