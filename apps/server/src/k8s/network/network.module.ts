import { Logger, Module, OnModuleInit } from "@nestjs/common";

import { IngressModule } from "./ingress/ingress.module";
import { NetworkService } from "./network.service";

@Module({
  imports: [IngressModule],
  providers: [NetworkService, Logger],
  exports: [NetworkService]
})
export class NetworkModule implements OnModuleInit {
  constructor(private readonly networkService: NetworkService) {}

  async onModuleInit() {
    await this.networkService.init();
  }
}
