FROM node

WORKDIR /usr/src/bielak.me

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]