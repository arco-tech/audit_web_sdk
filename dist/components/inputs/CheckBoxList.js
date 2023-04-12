"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBoxList = void 0;
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
                        changeset.change(name, selected.filter(function (v) { return v !== value; }));
                    }
                    else {
                        changeset.change(name, __spreadArray(__spreadArray([], selected, true), [value], false));
                    }
                },
            }, [
                m((0, BEM_1.block)("check-box__tick-box", active ? ["active"] : [])),
                m((0, BEM_1.block)("check-box__text", active ? ["active"] : []), label),
            ]);
        });
    },
};
//# sourceMappingURL=CheckBoxList.js.map