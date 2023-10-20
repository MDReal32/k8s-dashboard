import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../../base/k8s.service";
import { RbacAuthorizationService } from "../rbac-authorization.service";

@Injectable()
export class RoleService extends RbacAuthorizationService {
  constructor() {
    super(new Logger(RoleService.name));
  }

  async getRoleResource(namespace: string) {
    this.expect(namespace, "namespace");

    const roles = await this.catch(
      namespace === "_"
        ? this.k8sApi.listRoleForAllNamespaces()
        : this.k8sApi.listNamespacedRole(namespace)
    );
    return roles.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/rbac.authorization.k8s.io/v1/roles");
  }
}
