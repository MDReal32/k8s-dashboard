import { Injectable } from "@nestjs/common";

import { WS_EVENTS } from "@k8sd/shared";

import { BaseService } from "../base/base.service";
import { PrismaLogsService } from "../prisma/prisma-logs/prisma-logs.service";
import { LogHeaderDto } from "./dto/log-header.dto";
import { LogDto } from "./dto/log.dto";

@Injectable()
export class LogService extends BaseService {
  constructor(private readonly prismaLogsService: PrismaLogsService) {
    super();
  }

  receiveLog(data: LogDto, headers: LogHeaderDto) {
    // ToDO: Implement by project.id
    this.broadcastAll(WS_EVENTS.LOG.LOG_LISTEN, data, headers);
  }
}
