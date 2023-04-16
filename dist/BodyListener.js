import { log } from "./Log.js";
let idCounter = 1;
const listeners = {};
export function listen(eventName, callback) {
    if (!listeners[eventName]) {
        listeners[eventName] = [];
        document.body.addEventListener(eventName, (event) => {
            listeners[eventName].forEach(({ callback }) => {
                try {
                    callback(event);
                }
                catch (error) {
                    log("error", error);
                }
            });
        });
    }
    const id = idCounter++;
    listeners[eventName].push({ id, callback });
    return id;
}
export function remove(removeID) {
    for (const eventName in listeners) {
        const index = listeners[eventName].findIndex(({ id }) => id === removeID);
        if (index !== -1) {
            listeners[eventName].splice(index, 1);
            break;
        }
    }
}
//# sourceMappingURL=BodyListener.js.map