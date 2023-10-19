import { Module } from "@nestjs/common";

import { ConfigMapController } from "./config-map.controller";
import { ConfigMapGateway } from "./config-map.gateway";
import { ConfigMapService } from "./config-map.service";

@Module({
  controllers: [ConfigMapController],
  providers: [ConfigMapGateway, ConfigMapService],
  exports: [ConfigMapService]
})
export class ConfigMapModule {}
