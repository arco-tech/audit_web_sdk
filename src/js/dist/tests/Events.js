"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function simulateMouseClick(element) {
    element.dispatchEvent(new window.MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
    }));
}
exports.simulateMouseClick = simulateMouseClick;
;
function simulateInput(element, value) {
    var event = new window.Event("input", { bubbles: true });
    element.value = value;
    element.dispatchEvent(event);
}
exports.simulateInput = simulateInput;
//# sourceMappingURL=Events.js.map