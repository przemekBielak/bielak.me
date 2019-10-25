FROM node

WORKDIR /usr/src/bielak.me

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD [ "node", "server.js" ]