import * as m from "mithril";
import {Changeset} from "../../Changeset";
import {block} from "../../BEM";

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
            selected.splice(selected.indexOf(value), 1);
          } else {
            selected.push(value);
          }
          changeset.change(name, selected);
        },
      }, [
        m(block("check-box__tick-box", active ? ["active"] : [])),
        m(block("check-box__text", active ? ["active"] : []), label),
      ]);
    });
  },
};
