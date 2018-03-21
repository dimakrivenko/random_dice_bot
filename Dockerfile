FROM node:latest

RUN mkdir -p /usr/src/random_dice_bot
WORKDIR /usr/src/random_dice_bot

COPY package.json ./
RUN npm install

COPY . /usr/src/random_dice_bot

CMD ["npm", "run", "start"]