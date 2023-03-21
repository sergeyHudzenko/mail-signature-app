FROM node:16.17.0-bullseye-slim
ENV NODE_ENV develop
RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

CMD [ "npm", "start" ]

EXPOSE 3146
