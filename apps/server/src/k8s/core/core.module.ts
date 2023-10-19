import { Module } from "@nestjs/common";

import { ConfigMapModule } from "./config-map/config-map.module";
import { NamespaceModule } from "./namespace/namespace.module";
import { NodeModule } from "./node/node.module";
import { PodModule } from "./pod/pod.module";
import { SecretModule } from "./secret/secret.module";
import { ServiceAccountService } from "./service-account/service-account.service";
import { ServiceModule } from "./service/service.module";

@Module({
  imports: [
    NodeModule,
    NamespaceModule,
    ServiceAccountService,
    ServiceModule,
    PodModule,
    ConfigMapModule,
    SecretModule
  ]
})
export class CoreModule {}
