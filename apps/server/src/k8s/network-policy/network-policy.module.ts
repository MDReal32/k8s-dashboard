import { Module } from "@nestjs/common";
import { NetworkPolicyController } from "./network-policy.controller";
import { NetworkPolicyGateway } from "./network-policy.gateway";
import { NetworkPolicyService } from "./network-policy.service";

@Module({
  controllers: [NetworkPolicyController],
  providers: [NetworkPolicyGateway, NetworkPolicyService]
})
export class NetworkPolicyModule {}
