import { Controller, Get } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { ClusterRoleBindingService } from "./cluster-role-binding.service";

@Controller([`k8s/v1/${ResourceTypes.CLUSTER_ROLE_BINDING}`])
export class ClusterRoleBindingController {
  constructor(private readonly clusterRoleBindingService: ClusterRoleBindingService) {}

  @Get()
  getClusterRoleBindingResource() {
    return this.clusterRoleBindingService.getClusterRoleBindingResource();
  }
}
