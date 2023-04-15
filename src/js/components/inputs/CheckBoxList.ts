import * as m from "mithril";
import {Changeset} from "../../Changeset.js";
import {block} from "../../BEM.js";

interface Attrs {
  name: string;
  changeset: Changeset;
  options: Array<{label: string, value: any}>;
}

type Vnode = m.Vnode<Attrs>;

export const CheckBoxList: m.Component<Attrs> = {
  view: ({attrs: {name, changeset, options}}: Vnode) => {
    const selected =
      Array.isArray(changeset.getValue(name)) ? changeset.getValue(name) : [];
    return options.map(({label, value}) => {
      const active = selected.indexOf(value) !== -1;
      return m(".check-box", {
        onclick: () => {
          if (active) {
            changeset.change(name, selected.filter((v) => v !== value))
          } else {
            changeset.change(name, [...selected, value])
          }
        },
      }, [
        m(block("check-box__tick-box", active ? ["active"] : [])),
        m(block("check-box__text", active ? ["active"] : []), label),
      ]);
    });
  },
};
