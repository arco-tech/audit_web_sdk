import * as m from "mithril";
import { DateInput } from "./DateInput.js";
import { Changeset } from "../../Changeset.js";
export const DateRangeInput = {
    oninit: ({ attrs: { changeset, name }, state }) => {
        const value = changeset.getValue(name);
        if (value && typeof value === "object") {
            state.dateChangeset = new Changeset({ from: value.from, to: value.to });
        }
        else {
            state.dateChangeset = new Changeset({ from: null, to: null });
        }
        state.dateChangeset.listen(() => {
            changeset.change(name, state.dateChangeset.getValues());
        });
    },
    view: ({ state: { dateChangeset } }) => {
        return m(".date-range-input", [
            m(".date-range-input__date-input", [
                m(DateInput, { changeset: dateChangeset, name: "from" }),
            ]),
            m(".date-range-input__divider", "to"),
            m(".date-range-input__date-input", [
                m(DateInput, { changeset: dateChangeset, name: "to" }),
            ]),
        ]);
    },
};
//# sourceMappingURL=DateRangeInput.js.map