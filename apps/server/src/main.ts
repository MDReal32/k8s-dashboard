import EventEmitter from "node:events";
import { networkInterfaces } from "node:os";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";


import { AppModule } from "./app.module";
import { WsAdapter } from "./adapters/ws.adapter";
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
  await wsApp.listen(port);

  const network = networkInterfaces();
  const networkAdapters = Object.values(network)
    .flat(1)
    .filter(({ family, internal }) => family === "IPv4" && !internal);
  logger.log(`🚀 Application is running on: ${await wsApp.getUrl()}/${globalPrefix}`);
  for (const adapter of networkAdapters) {
    logger.log(`🚀 Application is running on: http://${adapter.address}:${port}/${globalPrefix}`);
  }
})();
