import { Module } from "@nestjs/common";

import { StatefulSetController } from "./stateful-set.controller";
import { StatefulSetGateway } from "./stateful-set.gateway";
import { StatefulSetService } from "./stateful-set.service";

@Module({
  controllers: [StatefulSetController],
  providers: [StatefulSetGateway, StatefulSetService],
  exports: [StatefulSetService]
})
export class StatefulSetModule {}
