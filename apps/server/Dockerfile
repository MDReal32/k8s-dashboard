FROM node:lts-alpine as server

WORKDIR /app

COPY --from=builder /app/package.json /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/build/libs /app/node_modules/@ugrab
COPY --from=builder /app/build/apps/server /app/build

CMD node build/main.js
