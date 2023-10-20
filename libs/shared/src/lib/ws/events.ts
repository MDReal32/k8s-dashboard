import { K8S_EVENTS } from "./events/k8s-event";
import { LOG_EVENTS } from "./events/log-events";
import { PROJECT_EVENTS } from "./events/project-events";

export interface WebSocketData<Data = unknown, Headers extends object = object> {
  event: string;
  data?: Data;
  headers?: Headers;
}

type ActionEvent<
  EventName extends string,
  Event extends string,
  Actions extends readonly string[]
> = { [K in EventName as Uppercase<K>]: Lowercase<Event> } & {
  [K in Actions[number] as Uppercase<`${EventName}_${K}`>]: Lowercase<`${Event}::${K}`>;
};

export function actionEvent<
  EventName extends string,
  Event extends string,
  Actions extends readonly string[]
>(name: EventName, event: Event, ...actions: Actions) {
  return actions.reduce(
    (acc, action) => ({
      ...acc,
      [`${name}_${action}`.toUpperCase()]: ["ws-events", event, action].join("::").toLowerCase()
    }),
    { [name.toUpperCase()]: ["ws-events", event.toLowerCase()].join("::") } as ActionEvent<
      EventName,
      Event,
      Actions
    >
  );
}

export const WS_EVENTS = {
  LOG: LOG_EVENTS,
  PROJECT: PROJECT_EVENTS,
  K8S: K8S_EVENTS,
  WELCOME: "welcome",
  INTRODUCE: "introduce",
  GOODBYE: "goodbye"
} as const;
