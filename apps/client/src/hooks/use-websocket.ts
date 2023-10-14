import { useCallback, useEffect, useMemo, useState } from "react";

const connections: Record<string, WebSocket> = {};

export const useWebsocket = <TData>(path: string) => {
  const [queue, setQueue] = useState<{ event: string; data?: TData }[]>([]);
  const [connectionState, setConnectionState] = useState<WebSocket["readyState"]>(
    WebSocket.CONNECTING
  );

  const connection = useMemo(
    () => (connections[path] ? connections[path] : (connections[path] = new WebSocket(path))),
    [path]
  );

  useEffect(() => {
    connection.addEventListener("open", () => {
      queue.forEach(({ event, data }) => connection.send(JSON.stringify({ event, data })));
      setQueue([]);
      setConnectionState(connection.readyState);
    });

    connection.addEventListener("close", () => {
      setConnectionState(connection.readyState);
    });

    connection.addEventListener("error", () => {
      setConnectionState(connection.readyState);
    });
  }, []);

  return {
    connection,
    connectionState,
    send(event: string, data?: TData) {
      if (connection.OPEN === connection.readyState) {
        connection.send(JSON.stringify({ event, data }));
      } else {
        setQueue(queue => [...queue, { event, data }]);
      }
    },
    on(event: string, callback: (data?: TData) => void) {
      connection.addEventListener("message", incomingMessage => {
        const message = JSON.parse(incomingMessage.data) as { event: string; data: TData };
        if (message.event === event) {
          callback(message.data);
        }
      });
    },
    useMessage(event: string) {
      const [message, setMessage] = useState<TData | null>(null);

      useEffect(() => {
        connection.addEventListener("message", incomingMessage => {
          const message = JSON.parse(incomingMessage.data) as { event: string; data: TData };
          if (message.event === event) {
            message.data && setMessage(message.data);
          }
        });
      }, [connection]);

      return message;
    }
  };
};
