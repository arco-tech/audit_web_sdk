import m from "mithril";
export function createElement(parent) {
    const element = document.createElement("div");
    (parent || document.body).appendChild(element);
    return element;
}
export function mount(content) {
    const element = createElement();
    return new Promise((resolve) => {
        m.mount(element, {
            oncreate: (vnode) => resolve(vnode.dom),
            view: (vnode) => content,
        });
    });
}
//# sourceMappingURL=Mock.js.map