import * as m from "mithril";
import {Changeset} from "../..//Changeset";

interface Attrs {
  selector?: string;
  changeset: Changeset;
  name: string;
  [key: string]: any;
}

export const TextArea: m.Component<Attrs> = {
  view: ({attrs: {selector, changeset, name, rows=10, ...attrs}}) => {
    return m("textarea" + (selector || ""), {
      value: changeset.getValue(name),
      oninput: (event) => {
        changeset.change(name, event.target.value);
      },
      rows: rows,
      ...attrs,
    });
  },
};
