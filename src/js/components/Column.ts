import * as m from "mithril";

interface Attrs {
  selector?: string;
  flex?: number;
  [key: string]: any;
}

type Vnode = m.Vnode<Attrs>;

export const Column: m.Component<Attrs> = {
  view: ({attrs: {selector= "", flex, ...attrs}, children}: Vnode) => {
    return m(selector + ".column", {
      style: flex ? `flex: ${flex};` : "",
      ...attrs,
    }, children);
  },
};
