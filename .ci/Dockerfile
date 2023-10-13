FROM node:alpine

WORKDIR /app
COPY . .

RUN --mount=type=cache,target=/.yarn YARN_CACHE_FOLDER=/.yarn yarn

CMD yarn nx run-many --targets=serve --projects=client,server
