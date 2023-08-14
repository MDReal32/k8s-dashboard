import { Module } from "@nestjs/common";
import { PodController } from "./pod.controller";
import { PodGateway } from "./pod.gateway";
import { PodService } from "./pod.service";

@Module({
  controllers: [PodController],
  providers: [PodGateway, PodService],
  exports: [PodService]
})
export class PodModule {}
