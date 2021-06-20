FROM node:latest

WORKDIR /app

COPY .env ./

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","run", "build"]

CMD ["npm","run", "start"]