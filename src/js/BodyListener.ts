import {log} from "./Log";

type ID = number;

interface Listener {
  id: ID;
  callback: (event: any) => void;
}

interface Listeners {
  [eventName: string]: Listener[];
}

let idCounter: ID = 1;

const listeners: Listeners = {};

export function listen(
  eventName: string,
  callback: (event: any) => void
): ID {
  if (!listeners[eventName]) {
    listeners[eventName] = [];
    document.body.addEventListener(eventName, (event) => {
      listeners[eventName].forEach(({callback}) => {
        try { callback(event); } catch(error) { log("error", error); }
      });
    });
  }
  const id: ID = idCounter++;
  listeners[eventName].push({id, callback});
  return id;
}

export function remove(removeID: ID): void {
  for (const eventName in listeners) {
    const index = listeners[eventName].findIndex(({id}) => id === removeID);
    if (index !== -1) {
      listeners[eventName].splice(index, 1);
      break;
    }
  }
}
