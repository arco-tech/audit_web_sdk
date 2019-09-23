import * as m from "mithril";
import {Changeset} from "../../Changeset";
import {block} from "../../BEM";
import {Input} from "./Input";

interface Attrs {
  changeset: Changeset;
  name: string;
  [key: string]: any;
}

type Vnode = m.Vnode<Attrs>;

export const NumberInput: m.Component<Attrs> = {
  view: ({attrs: {changeset, name, ...attrs}}: Vnode) => {
    return m(".input-wrapper", [
      m("input.input-wrapper__input", {
        value: changeset.getValue(name),
        type: "number",
        onkeypress: checkInput,
        oninput: (event) => {
          const value = event.target.value;
          const numberValue = value ? parseFloat(value) : null;
          changeset.change(name, numberValue);
        },
        ...attrs,
      }),
      m(block("input-wrapper__icon", ["split"]), [
        m(block("input-wrapper__icon__split", ["up-arrow"]), {
          onclick: () => {
            const value = changeset.getValue(name) || 0;
            changeset.change(name, Math.round(value + 1));
          },
        }),
        m(block("input-wrapper__icon__split", ["down-arrow"]), {
          onclick: () => {
            const value = changeset.getValue(name) || 0;
            changeset.change(name, Math.round(value - 1));
          },
        }),
      ]),
    ]);
  },
};

function checkInput(event: KeyboardEvent) {
  if (".0123456789".split("").indexOf(event.key) === -1) {
    event.preventDefault();
  }
}
