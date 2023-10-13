import { Module } from "@nestjs/common";

import { DeploymentController } from "./deployment.controller";
import { DeploymentGateway } from "./deployment.gateway";
import { DeploymentService } from "./deployment.service";
import { PodModule } from "../pod/pod.module";

@Module({
  imports: [PodModule],
  controllers: [DeploymentController],
  providers: [DeploymentGateway, DeploymentService]
})
export class DeploymentModule {}