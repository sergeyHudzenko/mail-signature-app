FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
EXPOSE 8080
COPY . .

CMD ["npm", "run", "serve"]