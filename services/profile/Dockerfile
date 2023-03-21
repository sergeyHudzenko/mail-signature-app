FROM node:16.17.0-bullseye-slim
RUN mkdir /app
WORKDIR /app
ENV NODE_ENV develop
COPY package.json .
RUN npm install
COPY . .

CMD [ "npm", "start" ]

EXPOSE 3146
