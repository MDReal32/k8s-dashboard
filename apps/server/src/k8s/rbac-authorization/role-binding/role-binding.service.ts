import { Injectable, Logger } from "@nestjs/common";

import { RbacAuthorizationService } from "../rbac-authorization.service";

@Injectable()
export class RoleBindingService extends RbacAuthorizationService {
  constructor() {
    super(new Logger(RoleBindingService.name));
  }

  async getRoleBindingResource(namespace: string) {
    this.expect(namespace, "namespace");

    const roleBindings = await this.catch(() =>
      namespace === "_"
        ? this.k8sApi.listRoleBindingForAllNamespaces()
        : this.k8sApi.listNamespacedRoleBinding(namespace)
    );
    return roleBindings.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/rbac.authorization.k8s.io/v1/rolebindings");
  }
}
