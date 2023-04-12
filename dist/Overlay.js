"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.open = void 0;
var m = require("mithril");
var state = {
    element: null,
};
function open(component, attrs) {
    m.mount(element(), {
        view: function () {
            return m(".overlay-content-container", m(component, attrs));
        },
    });
}
exports.open = open;
function close() {
    if (state.element) {
        document.body.removeChild(state.element);
        state.element = null;
    }
}
exports.close = close;
function element() {
    if (state.element === null) {
        state.element = document.createElement("div");
        state.element.className = "overlay-wrapper";
        document.body.appendChild(state.element);
    }
    return state.element;
}
//# sourceMappingURL=Overlay.js.map