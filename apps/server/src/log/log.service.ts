import { Injectable } from "@nestjs/common";

import { LogDto } from "./dto/log.dto";
import { LogHeaderDto } from "./dto/log-header.dto";
import { BaseService } from "../base/base.service";

@Injectable()
export class LogService extends BaseService {
  receiveLog(data: LogDto, headers: LogHeaderDto) {
    return { data, headers };
  }
}
