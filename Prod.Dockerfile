# syntax=docker/dockerfile:1
FROM node:12.18.1
# Will only install production dependancies
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD [ "node", "./dist/api/index.js" ]
