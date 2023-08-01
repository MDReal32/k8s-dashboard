import { loggerFactory } from "@ugrab/k8s-shared";

import { WebsocketClient } from "./utils/websocket-client";
import { APP_NAME } from "./constants";

export const Logger = loggerFactory(APP_NAME);

const port = +process.env.SERVER_PORT || 3000;
const host = process.env.SERVER_HOST || "localhost";
const ws = new WebsocketClient(`ws://${host}:${port}/ws`);
ws.connect().handle().on("welcome", console.log);
