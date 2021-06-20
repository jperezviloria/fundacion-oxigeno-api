FROM node:latest

WORKDIR /app

ENV PATH .:$PATH

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","run", "build"]

CMD ["npm","run", "start"]