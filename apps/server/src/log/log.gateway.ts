import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

import { WS_EVENTS } from "@k8sd/shared";

import { LogService } from "./log.service";
import { BaseGateway } from "../base/base.gateway";
import { MessageHeaders } from "./log.decorator";
import { LogDto } from "./dto/log.dto";
import { LogHeaderDto } from "./dto/log-header.dto";

@WebSocketGateway({ path: "/ws" })
export class LogGateway extends BaseGateway {
  constructor(private readonly logService: LogService) {
    super(logService);
  }

  @SubscribeMessage(WS_EVENTS.LOG.LOG)
  receiveLog(@MessageBody() data: LogDto, @MessageHeaders() headers: LogHeaderDto) {
    this.logService.receiveLog(data, headers);
  }
}
