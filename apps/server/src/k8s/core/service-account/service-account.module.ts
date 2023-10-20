import { Module } from "@nestjs/common";

import { ServiceAccountController } from "./service-account.controller";
import { ServiceAccountGateway } from "./service-account.gateway";
import { ServiceAccountService } from "./service-account.service";


@Module({
  controllers: [ServiceAccountController],
  providers: [ServiceAccountGateway, ServiceAccountService],
  exports: [ServiceAccountService]
})
export class ServiceAccountModule {}