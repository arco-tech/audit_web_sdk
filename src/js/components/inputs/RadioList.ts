import m from "mithril";
import {Changeset} from "../../Changeset.js";
import {block} from "../../BEM.js";

interface Attrs {
  name: string;
  changeset: Changeset;
  options: Array<{label: string, value: any}>;
}

type Vnode = m.Vnode<Attrs>;

export const RadioList: m.Component<Attrs> = {
  view: ({attrs: {name, changeset, options}}: Vnode) => {
    const active = changeset.getValue(name);
    return options.map(({label, value}) => {
      return m(".radio", {
        onclick: () => changeset.change(name, value),
      }, [
        m(block("radio__dot", active === value ? ["active"] : [])),
        m(block("radio__text", active === value ? ["active"] : []), label),
      ]);
    });
  },
};
