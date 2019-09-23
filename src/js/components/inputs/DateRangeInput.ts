import * as m from "mithril";
import {Changeset} from "../../Changeset";

interface Attrs {
  name: string;
  changeset: Changeset;
  [key: string]: any;
}

type Vnode = m.Vnode<Attrs>;

export const DateRangeInput: m.Component<Attrs> = {
  view: ({attrs: {name, changeset, ...attrs}}: Vnode) => {
    const value = changeset.getValue(name) || {};
    if (!value.from) { value.from = new Date().toISOString().substring(0, 10); }
    if (!value.to) { value.to = new Date().toISOString().substring(0, 10); }
    return [
      m("input", {
        type: "date",
        value: value.from,
        oninput: (event) => {
          const fromDate = new Date(event.target.value);
          if (!isNaN(fromDate.getTime())) {
            changeset.change(name, {
              from: fromDate.toISOString().substring(0, 10),
              to: value.to,
            });
          }
        },
        ...attrs,
      }),
      m(".align-center.color-grey", "to"),
      m("input", {
        type: "date",
        value: value.to,
        oninput: (event) => {
          const toDate = new Date(event.target.value);
          if (!isNaN(toDate.getTime())) {
            changeset.change(name, {
              from: value.from,
              to: toDate.toISOString().substring(0, 10),
            });
          }
        },
        ...attrs,
      }),
    ];
  },
};
