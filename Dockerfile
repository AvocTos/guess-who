FROM node:16 AS ui-build

WORKDIR /usr/guess-who/client
COPY /client ./
RUN npm install
RUN npm run build

FROM node:16 AS server-build

WORKDIR /usr/guess-who

COPY --from=ui-build /usr/guess-who/client/build/ ./client/build
WORKDIR /usr/guess-who/server/

COPY /server/package*.json ./
RUN npm install

COPY /server/index.js ./

EXPOSE 8080

CMD [ "node", "index.js" ]