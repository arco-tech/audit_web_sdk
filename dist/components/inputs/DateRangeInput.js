"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var DateInput_1 = require("./DateInput");
var Changeset_1 = require("../../Changeset");
exports.DateRangeInput = {
    oninit: function (_a) {
        var _b = _a.attrs, changeset = _b.changeset, name = _b.name, state = _a.state;
        var value = changeset.getValue(name);
        if (value && typeof value === "object") {
            state.dateChangeset = new Changeset_1.Changeset({ from: value.from, to: value.to });
        }
        else {
            state.dateChangeset = new Changeset_1.Changeset({ from: null, to: null });
        }
        state.dateChangeset.listen(function () {
            changeset.change(name, state.dateChangeset.getValues());
        });
    },
    view: function (_a) {
        var dateChangeset = _a.state.dateChangeset;
        return m(".date-range-input", [
            m(".date-range-input__date-input", [
                m(DateInput_1.DateInput, { changeset: dateChangeset, name: "from" }),
            ]),
            m(".date-range-input__divider", "to"),
            m(".date-range-input__date-input", [
                m(DateInput_1.DateInput, { changeset: dateChangeset, name: "to" }),
            ]),
        ]);
    },
};
//# sourceMappingURL=DateRangeInput.js.map