export function simulateMouseClick(element) {
    element.dispatchEvent(new window.MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
    }));
}
export function simulateInput(element, value) {
    const event = new window.Event("input", { bubbles: true });
    element.value = value;
    element.dispatchEvent(event);
}
//# sourceMappingURL=Events.js.map