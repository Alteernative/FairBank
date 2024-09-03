FROM node:21.7.3

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
