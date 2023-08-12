import { LOG_EVENTS } from "./events/log-events";

export interface WebSocketData<Data = unknown, Headers extends object = object> {
  event: string;
  data?: Data;
  headers?: Headers;
}

type ActionEvent<Event extends string, Actions extends readonly string[]> = {
  [K in Actions[number] as Uppercase<K>]: `${Event}::${K}`;
};

export function actionEvent<Event extends string, Actions extends readonly string[]>(
  event: Event,
  ...actions: Actions
) {
  return Object.assign<Omit<Event, string>, ActionEvent<Event, Actions>>(
    event,
    actions.reduce(
      (acc, action) => ({
        ...acc,
        [action.toUpperCase()]: `${event}::${action}`
      }),
      {} as ActionEvent<Event, Actions>
    )
  );
}

export const WS_EVENTS = {
  LOG: LOG_EVENTS,
  WELCOME: "ws-events::welcome",
  GOODBYE: "ws-events::goodbye"
};
