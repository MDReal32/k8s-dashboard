import { Module } from "@nestjs/common";
import { ReplicaSetController } from "./replica-set.controller";
import { ReplicaSetGateway } from "./replica-set.gateway";
import { ReplicaSetService } from "./replica-set.service";

@Module({
  controllers: [ReplicaSetController],
  providers: [ReplicaSetGateway, ReplicaSetService]
})
export class ReplicaSetModule {}
