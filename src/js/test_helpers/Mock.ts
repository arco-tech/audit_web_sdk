import * as m from "mithril";

export function createElement(parent?: Element): Element {
  const element = document.createElement("div");
  (parent || document.body).appendChild(element);
  return element;
}

export function mount(content: any): Promise<Element> {
  const element = createElement();
  return new Promise((resolve) => {
    m.mount(element, {
      oncreate: (vnode) => resolve(vnode.dom),
      view: (vnode) => content,
    });
  });
}
