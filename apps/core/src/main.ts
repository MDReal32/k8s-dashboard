import { WebsocketClient } from "./utils/websocket-client";

const port = +process.env.SERVER_PORT || 3000;
const ws = new WebsocketClient(`ws://localhost:${port}/ws`);
ws.connect();
