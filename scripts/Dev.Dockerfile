# syntax=docker/dockerfile:1
FROM node:12.18.1
# keep dev and pro as close as possible. Therefore tell node it is prod
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g nodemon
# to force npm to install development modules set production to false
RUN npm install --production=false
COPY . .
CMD [ "nodemon", "./dist/api/index.js", "--watch"]
