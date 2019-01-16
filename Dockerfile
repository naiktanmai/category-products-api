FROM node:carbon-alpine

WORKDIR /usr/src/app
COPY . .
RUN apk -U upgrade && npm install && npm install -g nodemon && rm -rf /var/cache/apk/*
EXPOSE 8500
CMD ["nodemon", "index.js"]
