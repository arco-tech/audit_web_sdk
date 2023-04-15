import * as m from "mithril";
import { block } from "../../BEM.js";
export const RadioList = {
    view: ({ attrs: { name, changeset, options } }) => {
        const active = changeset.getValue(name);
        return options.map(({ label, value }) => {
            return m(".radio", {
                onclick: () => changeset.change(name, value),
            }, [
                m(block("radio__dot", active === value ? ["active"] : [])),
                m(block("radio__text", active === value ? ["active"] : []), label),
            ]);
        });
    },
};
//# sourceMappingURL=RadioList.js.map