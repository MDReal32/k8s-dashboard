import { Injectable, Logger } from "@nestjs/common";

import { ALL_NAMESPACES } from "@k8sd/shared";

import { RbacAuthorizationService } from "../rbac-authorization.service";

@Injectable()
export class RoleBindingService extends RbacAuthorizationService {
  constructor() {
    super(new Logger(RoleBindingService.name));
  }

  async getRoleBindingResource(namespace: string) {
    const roleBindings = await this.catch(() =>
      namespace === ALL_NAMESPACES
        ? this.k8sApi.listRoleBindingForAllNamespaces()
        : this.k8sApi.listNamespacedRoleBinding(namespace)
    );
    return roleBindings.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/rbac.authorization.k8s.io/v1/rolebindings");
  }
}
