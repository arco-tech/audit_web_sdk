import * as m from "mithril";
import {Changeset} from "../../Changeset";
import {block} from "../../BEM";

interface Attrs {
  name: string;
  changeset: Changeset;
  [key: string]: any;
}

type Vnode = m.Vnode<Attrs>;

export const DateInput: m.Component<Attrs> = {
  view: ({attrs: {name, changeset, ...attrs}}: Vnode) => {
    return m("input", {
      type: "date",
      value: changeset.getValue(name),
      oninput: (event) => {
        const date = new Date(event.target.value);
        if (!isNaN(date.getTime())) {
          changeset.change(name, date.toISOString().substring(0, 10));
        }
      },
      ...attrs,
    });
  },
};
