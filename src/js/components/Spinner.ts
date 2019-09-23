import * as m from "mithril";

interface Attrs {}

type Vnode = m.Vnode<Attrs>;

export const Spinner: m.Component<Attrs> = {
  view: (vnode: Vnode) => {
    return m(".spinner-container", [
      m(".spinner"),
    ]);
  },
}; 
