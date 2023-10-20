import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../../base/base-k8s.gateway";
import { JobService } from "./job.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/job" })
export class JobGateway extends BaseK8sGateway {
  constructor(private readonly jobService: JobService) {
    super(jobService);
  }
}