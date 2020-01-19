"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("./Log");
var idCounter = 1;
var listeners = {};
function listen(eventName, callback) {
    if (!listeners[eventName]) {
        listeners[eventName] = [];
        document.body.addEventListener(eventName, function (event) {
            listeners[eventName].forEach(function (_a) {
                var callback = _a.callback;
                try {
                    callback(event);
                }
                catch (error) {
                    Log_1.log("error", error);
                }
            });
        });
    }
    var id = idCounter++;
    listeners[eventName].push({ id: id, callback: callback });
    return id;
}
exports.listen = listen;
function remove(removeID) {
    for (var eventName in listeners) {
        var index = listeners[eventName].findIndex(function (_a) {
            var id = _a.id;
            return id === removeID;
        });
        if (index !== -1) {
            listeners[eventName].splice(index, 1);
            break;
        }
    }
}
exports.remove = remove;
//# sourceMappingURL=BodyListener.js.map