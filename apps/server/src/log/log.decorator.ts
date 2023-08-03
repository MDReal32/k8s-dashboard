import { WebSocket } from "ws";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const MessageHeaders = createParamDecorator((key: string, ctx: ExecutionContext) => {
  const client: WebSocket = ctx.switchToWs().getClient();
  return key ? client.message.headers[key] : client.message.headers;
});
