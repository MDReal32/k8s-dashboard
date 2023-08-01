import { NestFactory } from "@nestjs/core";
import { WsAdapter } from "@nestjs/platform-ws";
import { ValidationPipe } from "@nestjs/common";

import { loggerFactory } from "@ugrab/k8s-shared";

import { AppModule } from "./app.module";
import { RequestInterceptor } from "./interceptors/request.interceptor";

export const Logger = loggerFactory("Nest");
const isDev = process.env.NODE_ENV === "development";
const logger = new Logger("ApplicationBootstrap");
const port = +process.env.SERVER_PORT || 3000;
const globalPrefix = "api";

(async () => {
  const app = await NestFactory.create(AppModule);
  app
    .setGlobalPrefix(globalPrefix)
    .useGlobalInterceptors(new RequestInterceptor())
    .useGlobalPipes(new ValidationPipe());
  const wsApp = app.useWebSocketAdapter(new WsAdapter(app));
  await wsApp.listen(port, isDev ? "localhost" : "0.0.0.0");

  logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
})();
