import { WebSocketGateway } from "@nestjs/websockets";

import { BaseGateway } from "../base/base.gateway";
import { ProjectService } from "./project.service";

@WebSocketGateway({ path: "/ws" })
export class ProjectGateway extends BaseGateway {
  constructor(private readonly projectService: ProjectService) {
    super(projectService);
  }
}
