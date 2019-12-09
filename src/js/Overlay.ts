import * as m from "mithril";

interface State {
  element: HTMLElement | null;
}

const state: State = {
  element: null,
};

export function open(
  component: m.Component<any>,
  attrs: {[key: string]: any},
): void {
  m.mount(element(), {
    view: () => {
      return m(".overlay-content-container", m(component, attrs));
    },
  });
}

export function close(): void {
  if (state.element) {
    document.body.removeChild(state.element);
    state.element = null;
  }
}

function element(): HTMLElement {
  if (state.element === null) {
    state.element = document.createElement("div");
    state.element.className = "overlay-wrapper";
    document.body.appendChild(state.element);
  }
  return state.element;
}
