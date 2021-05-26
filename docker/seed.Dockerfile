FROM node:14-alpine

RUN apk update && apk add bash

RUN mkdir -p /home/node/app/node_modules

ARG DB_HOST
ARG DB_PORT
ARG DB_NAME
ARG DB_USERNAME
ARG DB_PASSWORD

ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_NAME=$DB_NAME
ENV DB_USERNAME=$DB_USERNAME
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_OPTIONS=authSource=admin

WORKDIR /home/node/app

RUN npm install -g mongo-seeding-cli

COPY seed /home/node/app

RUN ls -la

RUN chown -R node:node /home/node/app

USER node

CMD seed --drop-database /home/node/app/
