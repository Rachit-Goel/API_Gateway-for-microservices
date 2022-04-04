FROM node

WORKDIR /app/users_dailypass

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "start"]