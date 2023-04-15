import * as m from "mithril";
import {Changeset} from "../../Changeset.js";
import {block} from "../../BEM.js";

export interface Option {
  label: string;
  value: any;
}

interface Attrs {
  name: string;
  changeset: Changeset;
  integerValues?: boolean;
  objectValues?: boolean;
  nullLabel?: string;
  options: Option[];
}

type Vnode = m.Vnode<Attrs>;

export const Selector: m.Component<Attrs> = {
  view: (vnode: Vnode) => {
    const {
      attrs: {
        name,
        changeset,
        options,
        integerValues,
        objectValues,
      },
    } = vnode;
    const value = changeset.getValue(name);
    return m(".input-wrapper.cursor-pointer", [
      m("select.input-wrapper__input", {
        required: true,
        value: value === null ? "" :
          objectValues ? JSON.stringify(value) : `${value}`,
        onchange: (event) => {
          const changeValue = event.target.value;
          if (changeValue === "") {
            changeset.change(name, null);
          } else if (objectValues) {
            changeset.change(name, JSON.parse(changeValue));
          } else if (integerValues) {
            changeset.change(name, parseInt(changeValue) || null);
          } else {
            changeset.change(name, changeValue);
          }
        },
      }, [
        vnode.attrs.hasOwnProperty("nullLabel") &&
          m("option", {value: ""}, vnode.attrs.nullLabel),
        options.map((option: Option) => {
          return m("option", {
            value:
              objectValues ? JSON.stringify(option.value) : `${option.value}`,
          }, option.label);
        }),
      ]),
      m(block("input-wrapper__icon", ["arrow-icon", "click-through"])),
    ]);
  },
};
