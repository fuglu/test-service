FROM node:10.13-alpine
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN ["yarn"]
COPY . .
RUN ["yarn", "build"]
EXPOSE 3000
USER node
CMD ["node", "dist/index.js"]
