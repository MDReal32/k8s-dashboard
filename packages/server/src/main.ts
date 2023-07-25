import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { WsAdapter } from "@nestjs/platform-ws";

import { AppModule } from "./app.module";
import { RequestInterceptor } from "./interceptors/request.interceptor";

const logger = new Logger("ApplicationBootstrap");
const port = process.env.PORT || 3000;
const globalPrefix = "api";

(async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix).useGlobalInterceptors(new RequestInterceptor());
  const wsApp = app.useWebSocketAdapter(new WsAdapter(app));
  await wsApp.listen(port);

  logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
})();
