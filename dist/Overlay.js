import m from "mithril";
const state = {
    element: null,
};
export function open(component, attrs) {
    m.mount(element(), {
        view: () => {
            return m(".overlay-content-container", m(component, attrs));
        },
    });
}
export function close() {
    if (state.element) {
        document.body.removeChild(state.element);
        state.element = null;
    }
}
function element() {
    if (state.element === null) {
        state.element = document.createElement("div");
        state.element.className = "overlay-wrapper";
        document.body.appendChild(state.element);
    }
    return state.element;
}
//# sourceMappingURL=Overlay.js.map