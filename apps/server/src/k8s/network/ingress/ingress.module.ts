import { Module } from "@nestjs/common";

import { IngressController } from "./ingress.controller";
import { IngressGateway } from "./ingress.gateway";
import { IngressService } from "./ingress.service";


@Module({
  controllers: [IngressController],
  providers: [IngressGateway, IngressService],
  exports: [IngressService]
})
export class IngressModule {}