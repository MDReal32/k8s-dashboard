import { Controller, Get } from "@nestjs/common";

import { ClusterRoleBindingService } from "./cluster-role-binding.service";

@Controller([
  "k8s/v1/namespace/:namespace/resource/cluster-role-binding",
  "k8s/v1/cluster-role-binding"
])
export class ClusterRoleBindingController {
  constructor(private readonly clusterRoleBindingService: ClusterRoleBindingService) {}

  @Get()
  getClusterRoleBindingResource() {
    return this.clusterRoleBindingService.getClusterRoleBindingResource();
  }
}
