import { Module } from "@nestjs/common";
import { AdmissionControllerController } from "./admission-controller.controller";
import { AdmissionControllerGateway } from "./admission-controller.gateway";
import { AdmissionControllerService } from "./admission-controller.service";

@Module({
  controllers: [AdmissionControllerController],
  providers: [AdmissionControllerGateway, AdmissionControllerService]
})
export class AdmissionControllerModule {}
