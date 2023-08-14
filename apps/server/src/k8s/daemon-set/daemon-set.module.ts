import { Module } from "@nestjs/common";
import { DaemonSetController } from "./daemon-set.controller";
import { DaemonSetGateway } from "./daemon-set.gateway";
import { DaemonSetService } from "./daemon-set.service";

@Module({
  controllers: [DaemonSetController],
  providers: [DaemonSetGateway, DaemonSetService]
})
export class DaemonSetModule {}
