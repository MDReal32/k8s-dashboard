import { Module } from "@nestjs/common";
import { CustomResourceDefinitionController } from "./custom-resource-definition.controller";
import { CustomResourceDefinitionGateway } from "./custom-resource-definition.gateway";
import { CustomResourceDefinitionService } from "./custom-resource-definition.service";

@Module({
  controllers: [CustomResourceDefinitionController],
  providers: [CustomResourceDefinitionGateway, CustomResourceDefinitionService]
})
export class CustomResourceDefinitionModule {}
