import EventEmitter from "node:events";
import { networkInterfaces } from "node:os";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { WsAdapter } from "@nestjs/platform-ws";

import { AppModule } from "./app.module";
import { RequestInterceptor } from "./interceptors/request.interceptor";
import { ZodValidationPipe } from "./validations/zod-validation.pipe";

const logger = new Logger("ApplicationBootstrap");
const port = +process.env.SERVER_PORT || 3000;
const globalPrefix = "api";

EventEmitter.setMaxListeners(30);

(async () => {
  const app = await NestFactory.create(AppModule);
  app
    .setGlobalPrefix(globalPrefix)
    .useGlobalInterceptors(new RequestInterceptor())
    .useGlobalPipes(new ZodValidationPipe());
  const wsApp = app.useWebSocketAdapter(new WsAdapter(app));
  await wsApp.listen(port, "0.0.0.0");

  logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
})();
