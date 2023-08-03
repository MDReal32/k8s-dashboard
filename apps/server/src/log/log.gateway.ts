import { WebSocketGateway } from "@nestjs/websockets";

import { LogService } from "./log.service";
import { BaseGateway } from "../base/base.gateway";

@WebSocketGateway({ path: "/ws" })
export class LogGateway extends BaseGateway {
  constructor(private readonly logService: LogService) {
    super(logService);
  }

  // @SubscribeMessage(WS_EVENTS.LOG.LOG)
  // @UsePipes(ZodValidationWebsocketPipeFactory(LogDto.schema))
  // receiveLog(
  //   @ConnectedSocket() client: WebSocket,
  //   @MessageBody() data: LogDto,
  //   @MessageHeaders() headers: LogHeaderDto
  // ) {}
}
