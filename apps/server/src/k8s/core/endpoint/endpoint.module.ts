import { Module } from "@nestjs/common";

import { EndpointController } from "./endpoint.controller";
import { EndpointGateway } from "./endpoint.gateway";
import { EndpointService } from "./endpoint.service";

@Module({
  controllers: [EndpointController],
  providers: [EndpointGateway, EndpointService],
  exports: [EndpointService]
})
export class EndpointModule {}
