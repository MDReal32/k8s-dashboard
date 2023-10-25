import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { CronJobService } from "./cron-job.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/cron-job" })
export class CronJobGateway extends K8sGateway {
  constructor(private readonly cronJobService: CronJobService) {
    super(cronJobService);
  }
}