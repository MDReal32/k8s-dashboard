import { Module } from "@nestjs/common";
import { OperatorController } from "./operator.controller";
import { OperatorGateway } from "./operator.gateway";
import { OperatorService } from "./operator.service";

@Module({
  controllers: [OperatorController],
  providers: [OperatorGateway, OperatorService]
})
export class OperatorModule {}
