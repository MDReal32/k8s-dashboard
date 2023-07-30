import { mkdir, writeFile, unlink } from "node:fs/promises";
import * as crypto from "node:crypto";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { WsAdapter } from "@nestjs/platform-ws";

import { loggerFactory } from "@ugrab/k8s-shared";

import { AppModule } from "./app.module";
import { RequestInterceptor } from "./interceptors/request.interceptor";

export const Logger = loggerFactory("Nest");
const logger = new Logger("ApplicationBootstrap");
const port = +process.env.SERVER_PORT || 3000;
const globalPrefix = "api";

const runFile = "/home/mdreal/.cache/ugrab";
const secretFile = `${runFile}/secret.txt`;

export const sessionSecret = crypto.randomBytes(32).toString("hex");

(async () => {
  await mkdir(runFile, { recursive: true });
  await writeFile(secretFile, sessionSecret);

  const app = await NestFactory.create(AppModule);
  app
    .setGlobalPrefix(globalPrefix)
    .useGlobalInterceptors(new RequestInterceptor())
    .useGlobalPipes(new ValidationPipe());
  const wsApp = app.useWebSocketAdapter(new WsAdapter(app));
  await wsApp.listen(port);

  logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);

  process.on("SIGINT", async () => {
    await app.close();
    await unlink(secretFile);
  });
})();
