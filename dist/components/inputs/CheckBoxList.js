import * as m from "mithril";
import { block } from "../../BEM.js";
export const CheckBoxList = {
    view: ({ attrs: { name, changeset, options } }) => {
        const selected = Array.isArray(changeset.getValue(name)) ? changeset.getValue(name) : [];
        return options.map(({ label, value }) => {
            const active = selected.indexOf(value) !== -1;
            return m(".check-box", {
                onclick: () => {
                    if (active) {
                        changeset.change(name, selected.filter((v) => v !== value));
                    }
                    else {
                        changeset.change(name, [...selected, value]);
                    }
                },
            }, [
                m(block("check-box__tick-box", active ? ["active"] : [])),
                m(block("check-box__text", active ? ["active"] : []), label),
            ]);
        });
    },
};
//# sourceMappingURL=CheckBoxList.js.map