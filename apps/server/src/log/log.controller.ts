import { Body, Controller, Headers, Post, UsePipes } from "@nestjs/common";

import { ZodValidationPipe } from "../validations/zod-validation.pipe";
import { BaseController } from "../base/base.controller";
import { LogService } from "./log.service";
import { LogDto } from "./dto/log.dto";
import { LogHeaderDto } from "./dto/log-header.dto";

@Controller("v1/log")
@UsePipes(ZodValidationPipe)
export class LogController extends BaseController {
  constructor(private readonly logService: LogService) {
    super(logService);
  }

  @Post()
  retrieveLog(@Body() data: LogDto, @Headers() headers: LogHeaderDto) {
    return this.logService.receiveLog(data, headers);
  }
}
