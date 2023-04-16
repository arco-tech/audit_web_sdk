import m from "mithril";
import { Column } from "../Column.js";
import { ColumnContainer } from "../ColumnContainer.js";
export const InputList = {
    view: ({ attrs: { changeset, name, ...attrs } }) => {
        const valueList = Array.isArray(changeset.getValue(name)) ? changeset.getValue(name) : [];
        if (valueList.length === 0) {
            valueList.push("");
        }
        return [
            valueList.map((value, index) => {
                return m(ColumnContainer, {
                    selector: ".margin-bottom-extra-small",
                    modifiers: ["align-center"],
                }, [
                    m(Column, { flex: 1 }, [
                        m("input", {
                            value,
                            oninput: (event) => {
                                const newValueList = [...valueList];
                                newValueList[index] = event.target.value;
                                changeset.change(name, newValueList);
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
                                changeset.change(name, valueList.filter((_, i) => i !== index));
                            },
                        }),
                    ]),
                ]);
            }),
            m(ColumnContainer, {
                selector: ".margin-top-small.cursor-pointer",
                modifiers: ["align-center"],
                onclick: () => {
                    changeset.change(name, [...valueList, ""]);
                },
            }, [
                m("img.margin-right-small", {
                    src: "/images/icons/plus-circle-grey.svg",
                    style: "width: 20px",
                }),
                m(".color-grey", { style: "flex: 1" }, "add answer"),
            ]),
        ];
    },
};
//# sourceMappingURL=InputList.js.map