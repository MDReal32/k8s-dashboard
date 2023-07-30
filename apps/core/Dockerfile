FROM node:lts-alpine

WORKDIR /app
COPY --from=builder /app/build/core /app
CMD ls -la .
