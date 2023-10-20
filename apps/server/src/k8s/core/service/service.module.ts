import { Module } from "@nestjs/common";

import { ServiceController } from "./service.controller";
import { ServiceGateway } from "./service.gateway";
import { ServiceService } from "./service.service";


@Module({
  controllers: [ServiceController],
  providers: [ServiceGateway, ServiceService],
  exports: [ServiceService]
})
export class ServiceModule {}