"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var BEM_1 = require("../../BEM");
exports.RadioList = {
    view: function (_a) {
        var _b = _a.attrs, name = _b.name, changeset = _b.changeset, options = _b.options;
        var active = changeset.getValue(name);
        return options.map(function (_a) {
            var label = _a.label, value = _a.value;
            return m(".radio", {
                onclick: function () { return changeset.change(name, value); },
            }, [
                m(BEM_1.block("radio__dot", active === value ? ["active"] : [])),
                m(BEM_1.block("radio__text", active === value ? ["active"] : []), label),
            ]);
        });
    },
};
//# sourceMappingURL=RadioList.js.map