FROM node:22

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=qwerty

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]