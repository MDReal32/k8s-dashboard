import { Project } from "@prisma/client";

import { projectInitSchema, WS_EVENTS } from "@k8sd/shared";

import { WebsocketClient } from "./utils/websocket-client";
import { wsUrl } from "./api/api";
import { Core } from "./core";
import { Steps } from "./core/steps";

const ws = new WebsocketClient(wsUrl);
export const core = new Core(ws);

core.fetchPlugins().prepare().onWebsocket<typeof projectInitSchema, Project>({
  event: WS_EVENTS.PROJECT.SETUP,
  cb: Steps.prepare()
});
