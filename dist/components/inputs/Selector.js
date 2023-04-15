import * as m from "mithril";
import { block } from "../../BEM.js";
export const Selector = {
    view: (vnode) => {
        const { attrs: { name, changeset, options, integerValues, objectValues, }, } = vnode;
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
                    }
                    else if (objectValues) {
                        changeset.change(name, JSON.parse(changeValue));
                    }
                    else if (integerValues) {
                        changeset.change(name, parseInt(changeValue) || null);
                    }
                    else {
                        changeset.change(name, changeValue);
                    }
                },
            }, [
                vnode.attrs.hasOwnProperty("nullLabel") &&
                    m("option", { value: "" }, vnode.attrs.nullLabel),
                options.map((option) => {
                    return m("option", {
                        value: objectValues ? JSON.stringify(option.value) : `${option.value}`,
                    }, option.label);
                }),
            ]),
            m(block("input-wrapper__icon", ["arrow-icon", "click-through"])),
        ]);
    },
};
//# sourceMappingURL=Selector.js.map