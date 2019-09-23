import * as m from "mithril";
import {Changeset} from "../../Changeset";
import {Column} from "../Column";
import {ColumnContainer} from "../ColumnContainer";

interface Attrs {
  changeset: Changeset;
  name: string;
  [key: string]: any;
}

type Vnode = m.Vnode<Attrs>;

export const InputList: m.Component<Attrs> = {
  view: ({attrs: {changeset, name, ...attrs}}: Vnode) => {
    const valueList =
      Array.isArray(changeset.getValue(name)) ? changeset.getValue(name) : [];

    if (valueList.length === 0) { valueList.push(""); }

    return [
      valueList.map((value: string, index: number) => {
        return m(ColumnContainer, {
          selector: ".margin-bottom-extra-small",
          modifiers: "align-center",
        }, [
          m(Column, {flex: 1}, [
            m("input", {
              value,
              oninput: (event) => {
                valueList[index] = event.target.value;
                changeset.change(name, valueList);
              },
              ...attrs,
            }),
          ]),
          index !== 0 && m(Column, {
            selector: ".margin-x-small",
            style: "width: 20px; height: 20px;",
          }, [
            m("img.cursor-pointer", {
              src: "/images/icons/cross-circle-red.svg",
              onclick: () => {
                valueList.splice(index, 1);
                changeset.change(name, valueList);
              },
            }),
          ]),
        ]);
      }),
      m(ColumnContainer, {
        selector: ".margin-top-small.cursor-pointer",
        modifiers: "align-center",
        onclick: () => {
          valueList.push("");
          changeset.change(name, valueList);
        },
      }, [
        m("img.margin-right-small", {
          src: "/images/icons/plus-circle-grey.svg",
          style: "width: 20px",
        }),
        m(".color-grey", {style: "flex: 1"}, "add answer"),
      ]),
    ];
  },
};
