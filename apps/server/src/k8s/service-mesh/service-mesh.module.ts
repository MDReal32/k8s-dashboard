import { Module } from "@nestjs/common";
import { ServiceMeshController } from "./service-mesh.controller";
import { ServiceMeshGateway } from "./service-mesh.gateway";
import { ServiceMeshService } from "./service-mesh.service";

@Module({
  controllers: [ServiceMeshController],
  providers: [ServiceMeshGateway, ServiceMeshService]
})
export class ServiceMeshModule {}
