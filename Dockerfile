# 使用 Node 的版本
FROM node:8.9-alpine

# Node 環境設定為 production
ENV NODE_ENV production

# Node 在容器內的位置
WORKDIR /usr/src/app

COPY package*.json ./


# RUN yarn --production --silent && mv node_modules ../
RUN npm install

COPY . .

# 開放對外的 port
EXPOSE 3000

# 執行專案
# CMD yarn start
CMD npm start
