import EventEmiter from "node:events";

import { NestFactory } from "@nestjs/core";

import { Logger } from "@k8sd/shared";

import { AppModule } from "./app.module";
import { WsAdapter } from "./adapters/ws.adapter";
import { RequestInterceptor } from "./interceptors/request.interceptor";
import { ZodValidationPipe } from "./validations/zod-validation.pipe";

const logger = new Logger("ApplicationBootstrap");
const port = +process.env.SERVER_PORT || 3000;
const globalPrefix = "api";

EventEmiter.setMaxListeners(30);

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
