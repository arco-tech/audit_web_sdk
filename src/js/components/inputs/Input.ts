import * as m from "mithril";
import {Changeset} from "../../Changeset.js";

interface Attrs {
  selector?: string;
  changeset: Changeset;
  name: string;
  [key: string]: any;
}

type Vnode = m.Vnode<Attrs>;

export const Input: m.Component<Attrs> = {
  view: ({attrs: {selector, changeset, name, ...attrs}}: Vnode) => {
    return m("input" + (selector || ""), {
      value: changeset.getValue(name),
      oninput: (event) => {
        changeset.change(name, event.target.value);
      },
      ...attrs,
    });
  },
};
