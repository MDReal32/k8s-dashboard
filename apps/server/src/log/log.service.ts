import { Injectable } from "@nestjs/common";

import { WS_EVENTS } from "@k8sd/shared";

import { LogDto } from "./dto/log.dto";
import { LogHeaderDto } from "./dto/log-header.dto";
import { BaseService } from "../base/base.service";

@Injectable()
export class LogService extends BaseService {
  receiveLog(data: LogDto, headers: LogHeaderDto) {
    // ToDO: Implement by project.id
    this.broadcastAll(WS_EVENTS.LOG.LOG_LISTEN, data, headers);
  }
}
