import { WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({ path: "/ws" })
export class ProjectGateway {}
