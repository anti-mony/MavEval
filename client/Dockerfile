FROM node:14.5-alpine3.12

WORKDIR /usr/src/app

# Installing dependencies
COPY yarn.lock .
COPY package*.json .
RUN yarn install

# Copying source files
COPY . .

RUN yarn build