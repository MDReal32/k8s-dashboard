import { Module } from "@nestjs/common";
import { PodSecurityPolicyController } from "./pod-security-policy.controller";
import { PodSecurityPolicyGateway } from "./pod-security-policy.gateway";
import { PodSecurityPolicyService } from "./pod-security-policy.service";

@Module({
  controllers: [PodSecurityPolicyController],
  providers: [PodSecurityPolicyGateway, PodSecurityPolicyService]
})
export class PodSecurityPolicyModule {}
