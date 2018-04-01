FROM node:latest

RUN mkdir -p /home/ec2-user/random_dice_bot
WORKDIR /home/ec2-user/random_dice_bot

COPY package.json ./
RUN npm install

COPY . /home/ec2-user/random_dice_bot

CMD ["npm", "run", "dev"]