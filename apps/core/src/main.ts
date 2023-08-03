import { WebsocketClient } from "./utils/websocket-client";

const port = +process.env.SERVER_PORT || 3000;
const host = process.env.SERVER_HOST || "localhost";
const ws = new WebsocketClient(`ws://${host}:${port}/ws`);
ws.connect().handle().on("welcome", console.log);
