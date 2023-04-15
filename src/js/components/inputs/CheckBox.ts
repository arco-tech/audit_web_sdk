import * as m from "mithril";
import {Changeset} from "../../Changeset.js";
import {block} from "../../BEM.js";

interface Attrs {
  name: string;
  changeset: Changeset;
  text?: any;
  textUnselectable?: boolean;
}

type Vnode = m.Vnode<Attrs>;

export const CheckBox: m.Component<Attrs> = {
  view: ({attrs: {name, changeset, text, textUnselectable}}: Vnode) => {
    const active = changeset.getValue(name);
    const change = () => changeset.change(name, !active);
    return m(block("check-box", [textUnselectable && "no-button-transition"]), {
      onclick: !textUnselectable ? change : null,
    }, [
      m(block("check-box__tick-box", active ? ["active"] : []), {
        onclick: textUnselectable ? change : null,
      }),
      m(block("check-box__text", active ? ["active"] : []), text),
    ]);
  },
};
