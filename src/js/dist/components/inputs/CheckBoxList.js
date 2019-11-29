"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var BEM_1 = require("../../BEM");
exports.CheckBoxList = {
    view: function (_a) {
        var _b = _a.attrs, name = _b.name, changeset = _b.changeset, options = _b.options;
        var selected = Array.isArray(changeset.getValue(name)) ? changeset.getValue(name) : [];
        return options.map(function (_a) {
            var label = _a.label, value = _a.value;
            var active = selected.indexOf(value) !== -1;
            return m(".check-box", {
                onclick: function () {
                    if (active) {
                        selected.splice(selected.indexOf(value), 1);
                    }
                    else {
                        selected.push(value);
                    }
                    changeset.change(name, selected);
                },
            }, [
                m(BEM_1.block("check-box__tick-box", active ? ["active"] : [])),
                m(BEM_1.block("check-box__text", active ? ["active"] : []), label),
            ]);
        });
    },
};
//# sourceMappingURL=CheckBoxList.js.map