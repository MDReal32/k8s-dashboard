import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../base/base-k8s.gateway";
import { CronJobService } from "./cron-job.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/cron-job" })
export class CronJobGateway extends BaseK8sGateway {
  constructor(private readonly cronJobService: CronJobService) {
    super(cronJobService);
  }
}
