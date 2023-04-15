import * as m from "mithril";
import { block } from "../../BEM.js";
export const CheckBox = {
    view: ({ attrs: { name, changeset, text, textUnselectable } }) => {
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
//# sourceMappingURL=CheckBox.js.map