FROM node:15

WORKDIR /usr/src/deepflow
COPY package.json .
RUN npm install
COPY . .

RUN npm run build
CMD node dist/src/main.js